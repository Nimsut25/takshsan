import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import Razorpay from "razorpay";

/**
 * POST /api/bonds/payment/verify
 *
 * Verifies a Razorpay payment for a Bonds application.
 *
 * SECURITY: The signature is verified using RAZORPAY_KEY_SECRET (HMAC-SHA256 of
 * "order_id|payment_id"). If that fails, we fall back to fetching the payment
 * from Razorpay's server API to confirm it was captured for this order.
 *
 * On success: marks the application paid and issues a unique certificate number.
 */

const verifySchema = z.object({
  applicationNumber: z
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
  paymentId: z.string().trim().max(120).optional().nullable(),
  signature: z.string().trim().max(500).optional().nullable(),
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

  return expected === params.signature;
}

/** Fallback: fetch the payment from Razorpay's server API. */
async function fetchPaymentFromRazorpay(
  paymentId: string
): Promise<{ captured: boolean; orderId: string | null } | null> {
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
    };
  } catch (err) {
    console.error("Razorpay payment fetch failed:", err);
    return null;
  }
}

/** Generate a unique certificate number: BOND-CERT-2026-XXXXXXXX */
function buildCertificateNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BOND-CERT-2026-${out}`;
}

/** Ensure the certificate number is unique by retrying. */
async function generateUniqueCertificateNumber(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = buildCertificateNumber();
    const exists = await db.bonds.findFirst({
      where: { certificateNumber: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  return `BOND-CERT-2026-${buildCertificateNumber().slice(-10)}`;
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

    const {
      applicationNumber,
      orderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId,
      signature,
    } = parsed.data;

    const finalPaymentId = razorpayPaymentId || paymentId;
    const finalSignature = razorpaySignature || signature;

    const application = await db.bonds.findUnique({
      where: { applicationNumber },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find a bond application with that number. Please apply again.",
        },
        { status: 404 }
      );
    }

    // ── Idempotency: already verified & certificate issued ──
    if (
      application.paymentStatus === "paid" &&
      application.certificateIssued === true
    ) {
      return NextResponse.json({
        ok: true,
        verified: true,
        alreadyVerified: true,
        applicationNumber: application.applicationNumber,
        certificateNumber: application.certificateNumber,
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

    if (!finalPaymentId || !finalSignature) {
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
      paymentId: finalPaymentId,
      signature: finalSignature,
    });

    // ── Fallback: fetch payment from Razorpay API ──
    if (!isVerified) {
      console.log("Signature check failed, trying Razorpay API fetch fallback...");
      const paymentInfo = await fetchPaymentFromRazorpay(finalPaymentId);
      if (paymentInfo && paymentInfo.captured && paymentInfo.orderId === orderId) {
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

    // ── Issue the certificate ──
    const now = new Date();
    const certificateNumber = await generateUniqueCertificateNumber();

    await db.bonds.update({
      where: { id: application.id },
      data: {
        paymentStatus: "paid",
        paymentVerifiedAt: now,
        paymentTransactionId: finalPaymentId,
        status: "paid",
        certificateNumber,
        certificateIssued: true,
        certificateIssueDate: now,
        certificateGeneratedAt: now,
        // Final roll-forward of the overall status
        // (certificate_generated supersedes "paid" — set last)
      },
    });

    // Set status AFTER the certificate is issued (second write keeps
    // certificate_generated as the authoritative status).
    await db.bonds.update({
      where: { id: application.id },
      data: { status: "certificate_generated" },
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      applicationNumber: application.applicationNumber,
      certificateNumber,
      transactionId: finalPaymentId,
      message: "Payment verified successfully. Your certificate has been issued.",
    });
  } catch (err) {
    console.error("bonds/payment/verify error:", err);
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
