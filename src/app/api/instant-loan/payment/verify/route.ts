import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

/**
 * POST /api/instant-loan/payment/verify
 *
 * Verifies a payment for an InstantLoanApplication. On success it unlocks
 * the partner application links (`partnerAccessUnlocked = true`) and flips
 * the application to the verified state.
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  SERVER-SIDE VERIFICATION — DO NOT TRUST THE FRONTEND                 ║
 * ║  ----------------------------------------------------                 ║
 * ║  In production this route MUST perform the gateway's own server-side  ║
 * ║  verification (e.g. Razorpay signature check using                   ║
 * ║  `razorpay_payment_id` + `razorpay_order_id` + `razorpay_signature`  ║
 * ║  against `RAZORPAY_KEY_SECRET`, or the equivalent Cashfree/PayU      ║
 * ║  webhook signature verification). The `paymentVerifiedAt`,           ║
 * ║  `paymentStatus = "paid"`, `verificationStatus = "verified"` and     ║
 * ║  `partnerAccessUnlocked = true` flags may only be set after a        ║
 * ║  successful server-side signature check or a verified webhook.       ║
 * ║                                                                      ║
 * ║  NEVER flip these flags based on a frontend-supplied boolean. The    ║
 * ║  frontend is untrusted.                                              ║
 * ║                                                                      ║
 * ║  For now, with no real gateway configured, we simulate a successful  ║
 * ║  verification so the frontend flow can be developed. DO NOT ship     ║
 * ║  this simulation to production.                                      ║
 * ╚══════════════════════════════════════════════════════════════════════╝
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
  // Optional fields a real gateway would send back. We accept but ignore
  // them for the simulation — in production these become inputs to the
  // signature check.
  paymentId: z.string().trim().max(120).optional().nullable(),
  signature: z.string().trim().max(500).optional().nullable(),
});

/** Generate a transaction id like `TXN-1730000000000-A3F9K2`. */
function generateTransactionId(now = new Date()): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `TXN-${now.getTime()}-${suffix}`;
}

/**
 * Integration seam for the real payment gateway verification. Replace this
 * body with the gateway's server-side signature check. Must return
 * `{ verified: true }` ONLY when the gateway confirms the payment.
 */
async function verifyWithGateway(_params: {
  orderId: string;
  paymentId?: string | null;
  signature?: string | null;
}): Promise<{ verified: boolean; transactionId?: string }> {
  // TODO(gateway): perform real verification here.
  // Example (Razorpay):
  //   const body = `${orderId}|${paymentId}`;
  //   const expected = crypto
  //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  //     .update(body)
  //     .digest("hex");
  //   if (expected !== signature) return { verified: false };
  //   return { verified: true, transactionId: paymentId };

  // SIMULATED (no real gateway yet) — replace before production.
  return { verified: true, transactionId: generateTransactionId() };
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

    const { applicationReference, orderId, paymentId, signature } = parsed.data;

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

    // ── Server-side gateway verification ──
    const result = await verifyWithGateway({ orderId, paymentId, signature });
    if (!result.verified) {
      // Do NOT flip any flags. Return 400 so the frontend can show an error.
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
    const transactionId = result.transactionId ?? generateTransactionId(now);

    const updated = await db.instantLoanApplication.update({
      where: { id: application.id },
      data: {
        paymentStatus: "paid",
        verificationStatus: "verified",
        partnerAccessUnlocked: true,
        paymentVerifiedAt: now,
        paymentTransactionId: transactionId,
      },
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      applicationReference: updated.applicationReference,
      partnerAccessUnlocked: true,
      transactionId,
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
