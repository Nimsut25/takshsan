import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";

/**
 * POST /api/instant-loan/payment/verify
 *
 * Verifies a Razorpay payment using server-side signature verification.
 * On success it unlocks partner application links (partnerAccessUnlocked = true).
 *
 * SECURITY: The signature is verified using RAZORPAY_KEY_SECRET. The frontend
 * is untrusted — partner access is ONLY unlocked after a valid signature check.
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
  // Legacy fields for backward compat
  paymentId: z.string().trim().max(120).optional().nullable(),
  signature: z.string().trim().max(500).optional().nullable(),
});

/**
 * Real Razorpay signature verification.
 * Razorpay sends: razorpay_order_id + "|" + razorpay_payment_id
 * HMAC-SHA256 with RAZORPAY_KEY_SECRET → must match razorpay_signature.
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

    // Use the Razorpay-specific fields, falling back to legacy field names
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

    // ── Verify the order id matches what we created ──
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

    // ── Server-side Razorpay signature verification ──
    // If we have paymentId + signature, do real verification.
    // If not (e.g. test mode without a real payment), we cannot verify.
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

    const isVerified = verifyRazorpaySignature({
      orderId,
      paymentId: finalPaymentId,
      signature: finalSignature,
    });

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
