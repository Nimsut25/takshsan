import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import Razorpay from "razorpay";

/**
 * POST /api/bonds/payment/create
 *
 * Creates a REAL Razorpay order for a Bonds application.
 *
 * SECURITY: The payable amount is computed server-side from the DB record
 * (investmentAmount * quantity). The client only supplies the applicationNumber.
 */

const createSchema = z.object({
  applicationNumber: z
    .string()
    .trim()
    .min(6, "Application number is required")
    .max(40),
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
          message: "Please provide a valid application number.",
        },
        { status: 400 }
      );
    }

    const { applicationNumber } = parsed.data;

    // ── Look up the application ──
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

    // ── Already paid & certificate issued — idempotent success ──
    if (
      application.paymentStatus === "paid" &&
      application.certificateIssued === true
    ) {
      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        applicationNumber: application.applicationNumber,
        certificateNumber: application.certificateNumber,
        message:
          "This application has already been paid. Your certificate has been issued.",
      });
    }

    // ── Compute the payable amount server-side ──
    const investmentAmount = application.investmentAmount
      ? Number(application.investmentAmount)
      : 0;
    const quantity = application.quantity ?? 0;
    const paymentAmount = Number((investmentAmount * quantity).toFixed(2));

    if (!(paymentAmount > 0)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The payable amount for this application could not be calculated. Please contact support.",
        },
        { status: 400 }
      );
    }

    // ── Create the Razorpay order ──
    const rzp = getRazorpay();
    if (!rzp) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment gateway is not configured. Please contact support to complete your payment.",
        },
        { status: 503 }
      );
    }

    let order: { id: string };
    try {
      order = await rzp.orders.create({
        amount: Math.round(paymentAmount * 100), // paise
        currency: "INR",
        receipt: applicationNumber,
        notes: {
          applicationNumber,
          bondId: application.bondId,
          mobile: application.mobileNumber,
          email: application.email,
        },
      });
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not create your payment order with the gateway. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    // ── Persist the order id and amount ──
    await db.bonds.update({
      where: { id: application.id },
      data: {
        paymentOrderId: order.id,
        paymentAmount,
        paymentCurrency: "INR",
        paymentStatus: "processing",
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: paymentAmount,
      currency: "INR",
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      applicationNumber: application.applicationNumber,
      message: "Razorpay payment order created successfully.",
    });
  } catch (err) {
    console.error("bonds/payment/create error:", err);
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
