import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { VERIFICATION_FEE } from "@/lib/instant-loan-data";
import Razorpay from "razorpay";

/**
 * POST /api/instant-loan/payment/create
 *
 * Creates a REAL Razorpay payment order for the ₹49 verification fee.
 * The order is created server-side using the secret key. The frontend
 * receives the order ID and opens the Razorpay checkout modal.
 */

const createSchema = z.object({
  applicationReference: z
    .string()
    .trim()
    .min(6, "Application reference is required")
    .max(60),
});

/** Lazily-initialised Razorpay instance (server-side only). */
function getRazorpay(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    console.error("Razorpay keys not configured in environment");
    return null;
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

async function createVerificationPayment(application: {
  applicationReference: string;
  fullName: string;
  mobileNumber: string;
  email: string;
}): Promise<{
  gatewayOrderId: string;
  gatewayProvider: string;
} | null> {
  const rzp = getRazorpay();
  if (!rzp) return null;

  const order = await rzp.orders.create({
    amount: VERIFICATION_FEE * 100, // Razorpay expects paise
    currency: "INR",
    receipt: application.applicationReference,
    notes: {
      applicationReference: application.applicationReference,
      mobile: application.mobileNumber,
      email: application.email,
    },
  });

  return {
    gatewayOrderId: order.id,
    gatewayProvider: "razorpay",
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

    // ── Create the real Razorpay order ──
    const paymentData = await createVerificationPayment({
      applicationReference: application.applicationReference,
      fullName: application.fullName,
      mobileNumber: application.mobileNumber,
      email: application.email,
    });

    if (!paymentData) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment gateway is not configured. Please contact support to complete your verification.",
        },
        { status: 503 }
      );
    }

    // Persist the gateway order id
    await db.instantLoanApplication.update({
      where: { id: application.id },
      data: {
        paymentOrderId: paymentData.gatewayOrderId,
        paymentProvider: paymentData.gatewayProvider,
        paymentAmount: VERIFICATION_FEE,
        paymentCurrency: "INR",
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: paymentData.gatewayOrderId,
      amount: VERIFICATION_FEE,
      currency: "INR",
      provider: "razorpay",
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      applicationReference: application.applicationReference,
      message: "Razorpay payment order created successfully.",
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
