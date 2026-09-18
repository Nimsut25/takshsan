import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { VERIFICATION_FEE } from "@/lib/instant-loan-data";

/**
 * POST /api/instant-loan/payment/create
 *
 * Creates a payment order for the ₹49 verification fee.
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  PAYMENT GATEWAY INTEGRATION POINT                                    ║
 * ║  ---------------------------                                          ║
 * ║  This route is the single abstraction point where a real payment     ║
 * ║  gateway (Razorpay / Cashfree / PhonePe / PayU / etc.) should be     ║
 * ║  wired in. The function `createVerificationPayment()` below is the   ║
 * ║  intended seam:                                                      ║
 * ║                                                                      ║
 * ║    async function createVerificationPayment(order) {                 ║
 * ║      // e.g. Razorpay: instance.orders.create({ amount: 4900, ... }) ║
 * ║      return { gatewayOrderId, gatewayProvider, rawResponse };        ║
 * ║    }                                                                 ║
 * ║                                                                      ║
 * ║  The returned `gatewayOrderId` must be persisted on the application  ║
 * ║  record (the `paymentOrderId` field) so that the /verify route can   ║
 * ║  match it against the gateway callback / signature check.            ║
 * ║                                                                      ║
 * ║  For now, with no gateway configured, we simulate the order creation ║
 * ║  so the frontend can be developed end-to-end. DO NOT ship this       ║
 * ║  simulation to production.                                            ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

const createSchema = z.object({
  applicationReference: z
    .string()
    .trim()
    .min(6, "Application reference is required")
    .max(60),
});

/** Generate a unique order id like `TNLPAY-1730000000000-A3F9K2`. */
function generatePaymentOrderId(now = new Date()): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `TNLPAY-${now.getTime()}-${suffix}`;
}

/**
 * Integration seam for the real payment gateway. Replace this body with the
 * real SDK call once a gateway account is provisioned. The function must
 * return at minimum a `gatewayOrderId` (the gateway's own order id) which
 * will be stored on the InstantLoanApplication row.
 */
async function createVerificationPayment(_application: {
  applicationReference: string;
  fullName: string;
  mobileNumber: string;
  email: string;
}): Promise<{
  gatewayOrderId: string;
  gatewayProvider: string;
}> {
  // TODO(gateway): call Razorpay/Cashfree/etc. here.
  // Example (Razorpay):
  //   const order = await razorpay.orders.create({
  //     amount: VERIFICATION_FEE * 100, // paise
  //     currency: "INR",
  //     receipt: applicationReference,
  //     notes: { applicationReference, mobile, email },
  //   });
  //   return { gatewayOrderId: order.id, gatewayProvider: "razorpay" };

  // SIMULATED (no real gateway yet) — replace before production.
  return {
    gatewayOrderId: generatePaymentOrderId(),
    gatewayProvider: "tnl-simulated",
  };
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

    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
          message: "Please provide a valid application reference.",
        },
        { status: 400 }
      );
    }

    const application = await db.instantLoanApplication.findUnique({
      where: { applicationReference: parsed.data.applicationReference },
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

    // ── Already paid & unlocked — nothing to do ──
    if (
      application.paymentStatus === "paid" &&
      application.partnerAccessUnlocked === true
    ) {
      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        applicationReference: application.applicationReference,
        message:
          "This application has already been paid and verified. You can proceed to the partner application links.",
      });
    }

    // ── Create the gateway order ──
    const { gatewayOrderId, gatewayProvider } = await createVerificationPayment({
      applicationReference: application.applicationReference,
      fullName: application.fullName,
      mobileNumber: application.mobileNumber,
      email: application.email,
    });

    // Persist the gateway order id (with a retry in case of a unique
    // constraint collision on `paymentOrderId`).
    let updated = application;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        updated = await db.instantLoanApplication.update({
          where: { id: application.id },
          data: {
            paymentOrderId: gatewayOrderId,
            paymentProvider: gatewayProvider,
            paymentAmount: VERIFICATION_FEE,
            paymentCurrency: "INR",
          },
        });
        break;
      } catch (err: unknown) {
        const code = (err as { code?: string } | null)?.code ?? "";
        if (code !== "P2002" && attempt === 2) {
          throw err;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      orderId: gatewayOrderId,
      amount: VERIFICATION_FEE,
      currency: "INR",
      provider: gatewayProvider,
      applicationReference: updated.applicationReference,
      message:
        "Payment order created. In production, this would redirect to the payment gateway.",
    });
  } catch (err) {
    console.error("instant-loan/payment/create error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not create your payment order. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
