import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import Razorpay from "razorpay";

/**
 * POST /api/fd/payment/verify
 *
 * Verifies a Razorpay payment for a Fixed Deposit application.
 *
 * SECURITY:
 *  - The signature is verified using RAZORPAY_KEY_SECRET (HMAC-SHA256 of
 *    "order_id|payment_id").
 *  - If the signature is missing or invalid, we fall back to fetching the
 *    payment from Razorpay's server API to confirm it was captured for this
 *    order.
 *  - Only after verification do we mark the application paid, issue a unique
 *    FD account number and certificate number, and flip the status to
 *    `certificate_generated`.
 */

const verifySchema = z.object({
  applicationNo: z
    .string()
    .trim()
    .min(6, "Application number is required")
    .max(40),
  orderId: z
    .string()
    .trim()
    .min(4, "Order id is required")
    .max(120),
  razorpayPaymentId: z.string().trim().max(120).optional().nullable(),
  razorpaySignature: z.string().trim().max(500).optional().nullable(),
});

/** Verify Razorpay signature: HMAC-SHA256 of "order_id|payment_id". */
function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error("RAZORPAY_KEY_SECRET not configured");
    return false;
  }

  const body = `${params.orderId}|${params.paymentId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  // Timing-safe comparison to avoid leaking match state.
  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(params.signature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return expected === params.signature;
  }
}

/** Fallback: fetch the payment from Razorpay's server API. */
async function fetchPaymentFromRazorpay(
  paymentId: string
): Promise<{ captured: boolean; orderId: string | null; amount: number | null } | null> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;

  try {
    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const payment = await rzp.payments.fetch(paymentId);
    return {
      captured:
        (payment as { status?: string }).status === "captured",
      orderId: (payment as { order_id?: string }).order_id ?? null,
      amount: (payment as { amount?: number }).amount ?? null,
    };
  } catch (err) {
    console.error("Razorpay payment fetch failed:", err);
    return null;
  }
}

// ── Unique number generators ──
function randomToken(len: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/** FD account number: FD-2026-XXXXXX (6 chars). */
function buildFdAccountNo(): string {
  return `FD-2026-${randomToken(6)}`;
}

/** Certificate number: FDC-2026-XXXXXXXX (8 chars). */
function buildCertificateNo(): string {
  return `FDC-2026-${randomToken(8)}`;
}

async function generateUniqueFdAccountNo(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = buildFdAccountNo();
    const exists = await db.fD.findFirst({
      where: { fdAccountNo: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  return `FD-2026-${randomToken(8)}`;
}

async function generateUniqueCertificateNo(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = buildCertificateNo();
    const exists = await db.fD.findFirst({
      where: { certificateNo: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  return `FDC-2026-${randomToken(10)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
          message: "Please provide a valid application number and order id.",
        },
        { status: 400 }
      );
    }

    const { applicationNo, orderId, razorpayPaymentId, razorpaySignature } =
      parsed.data;

    const application = await db.fD.findUnique({
      where: { applicationNo },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find a Fixed Deposit application with that number. Please apply again.",
        },
        { status: 404 }
      );
    }

    // ── Idempotency: already verified & certificate generated ──
    if (
      application.paymentStatus === "paid" &&
      application.certificateGenerated === true
    ) {
      return NextResponse.json({
        ok: true,
        verified: true,
        alreadyVerified: true,
        applicationNo: application.applicationNo,
        fdAccountNo: application.fdAccountNo,
        certificateNo: application.certificateNo,
        message: "This application has already been paid and verified.",
      });
    }

    // ── Validate the stored order id ──
    if (!application.paymentOrderId) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "No payment order exists for this application. Please create a payment order first.",
        },
        { status: 400 }
      );
    }

    if (application.paymentOrderId !== orderId) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The order id does not match the payment order for this application.",
        },
        { status: 400 }
      );
    }

    if (!razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        {
          ok: false,
          verified: false,
          message:
            "Payment verification requires the Razorpay payment ID and signature. Please complete the payment through the Razorpay checkout.",
        },
        { status: 400 }
      );
    }

    // ── Primary verification: signature check ──
    let isVerified = verifyRazorpaySignature({
      orderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    // ── Fallback: fetch payment from Razorpay API ──
    if (!isVerified) {
      console.log("Signature check failed, trying Razorpay API fetch fallback...");
      const paymentInfo = await fetchPaymentFromRazorpay(razorpayPaymentId);
      if (
        paymentInfo &&
        paymentInfo.captured &&
        paymentInfo.orderId === orderId
      ) {
        console.log("Razorpay API fetch confirmed payment captured for this order");
        isVerified = true;
      }
    }

    if (!isVerified) {
      return NextResponse.json(
        {
          ok: false,
          verified: false,
          message:
            "We could not verify your payment. If money was debited, please contact support with your payment details.",
        },
        { status: 400 }
      );
    }

    // ── Issue FD account number & certificate number ──
    const now = new Date();
    const fdAccountNo = await generateUniqueFdAccountNo();
    const certificateNo = await generateUniqueCertificateNo();

    await db.fD.update({
      where: { id: application.id },
      data: {
        // Payment
        paymentStatus: "paid",
        paymentDate: now,
        paymentTransactionId: razorpayPaymentId,

        // Certificate
        certificateNo,
        fdAccountNo,
        certificateGenerated: true,
        certificateIssueDate: now,
        certificateGeneratedAt: now,

        // Overall status — terminal state.
        status: "certificate_generated",
      },
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      applicationNo: application.applicationNo,
      fdAccountNo,
      certificateNo,
      transactionId: razorpayPaymentId,
      message:
        "Payment verified successfully. Your Fixed Deposit certificate has been generated.",
    });
  } catch (err) {
    console.error("fd/payment/verify error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not verify your payment at this time. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
