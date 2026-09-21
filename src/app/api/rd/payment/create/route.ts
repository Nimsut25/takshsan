import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import Razorpay from "razorpay";

/**
 * POST /api/rd/payment/create
 *
 * Creates a REAL Razorpay order for a Recurring Deposit application.
 *
 * SECURITY: The payable amount is computed server-side from the DB record's
 * `depositAmount` (the monthly deposit). The client only supplies the
 * `applicationNo`.
 */

const createSchema = z.object({
  applicationNo: z
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

    const { applicationNo } = parsed.data;

    // ── Look up the RD application ──
    const application = await db.rD.findUnique({
      where: { applicationNo },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find a Recurring Deposit application with that number. Please apply again.",
        },
        { status: 404 }
      );
    }

    // ── Already paid & certificate generated — idempotent success ──
    if (
      application.paymentStatus === "paid" &&
      application.certificateGenerated === true
    ) {
      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        applicationNo: application.applicationNo,
        rdAccountNo: application.rdAccountNo,
        certificateNo: application.certificateNo,
        message:
          "This application has already been paid. Your RD certificate has been generated.",
      });
    }

    // ── Compute the payable amount server-side ──
    const depositAmount = application.depositAmount
      ? Number(application.depositAmount)
      : 0;

    const paymentAmount = Number(depositAmount.toFixed(2));

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
        receipt: applicationNo,
        notes: {
          applicationNo,
          mobile: application.mobile,
          email: application.email,
          applicantName: application.applicantName,
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

    // ── Persist the order id, amount, and processing status ──
    await db.rD.update({
      where: { id: application.id },
      data: {
        paymentOrderId: order.id,
        paymentAmount,
        paymentStatus: "processing",
        paymentProviderReference: order.id,
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: paymentAmount,
      currency: "INR",
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      applicationNo: application.applicationNo,
      message: "Razorpay payment order created successfully.",
    });
  } catch (err) {
    console.error("rd/payment/create error:", err);
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
