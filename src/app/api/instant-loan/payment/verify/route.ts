import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import Razorpay from "razorpay";

/**
 * POST /api/instant-loan/payment/verify
 *
 * Verifies a Razorpay payment using server-side signature verification.
 * On success it unlocks partner application links (partnerAccessUnlocked = true).
 *
 * SECURITY: The signature is verified using RAZORPAY_KEY_SECRET. The frontend
 * is untrusted — partner access is ONLY unlocked after a valid signature check
 * or a confirmed payment fetch from Razorpay's server API.
 */

const verifySchema = z.object({
  applicationReference: z
    .string()
    .trim()
    .min(6, "Application reference is required")
    .max(60),
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

/**
 * Verify the Razorpay signature: HMAC-SHA256 of "order_id|payment_id" using
 * the key secret, compared against the signature returned by checkout.
 */
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
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === params.signature;
}

/**
 * Fallback: fetch the payment from Razorpay's server API to confirm it was
 * actually captured for this order. This is used when the signature check
 * fails (e.g., key rotation) as a secondary verification method.
 */
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
      captured: (payment as { status?: string; order_id?: string }).status === "captured",
      orderId: (payment as { order_id?: string }).order_id ?? null,
    };
  } catch (err) {
    console.error("Razorpay payment fetch failed:", err);
    return null;
  }
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
          message: "Please provide a valid application reference and order id.",
        },
        { status: 400 }
      );
    }

    const {
      applicationReference,
      orderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId,
      signature,
    } = parsed.data;

    const finalPaymentId = razorpayPaymentId || paymentId;
    const finalSignature = razorpaySignature || signature;

    const application = await db.instantLoanApplication.findUnique({
      where: { applicationReference },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find an application with that reference. Please apply again.",
        },
        { status: 404 }
      );
    }

    // ── Already unlocked — idempotent success ──
    if (application.partnerAccessUnlocked === true) {
      return NextResponse.json({
        ok: true,
        verified: true,
        alreadyVerified: true,
        applicationReference: application.applicationReference,
        partnerAccessUnlocked: true,
        message:
          "This application is already verified. You can proceed to the partner application links.",
      });
    }

    // ── Verify the order id matches ──
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
    // If signature check fails, try fetching the payment directly from
    // Razorpay's server API to confirm it was captured for this order.
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

    // ── Persist the verified state ──
    const now = new Date();

    const updated = await db.instantLoanApplication.update({
      where: { id: application.id },
      data: {
        paymentStatus: "paid",
        verificationStatus: "verified",
        partnerAccessUnlocked: true,
        paymentVerifiedAt: now,
        paymentTransactionId: finalPaymentId,
      },
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      applicationReference: updated.applicationReference,
      partnerAccessUnlocked: true,
      transactionId: finalPaymentId,
      message:
        "Payment verified successfully. Partner application links are now unlocked.",
    });
  } catch (err) {
    console.error("instant-loan/payment/verify error:", err);
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
