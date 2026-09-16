import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOtp, canResend } from "@/lib/otp-store";
import { db } from "@/lib/db";

const schema = z.object({
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

/**
 * POST /api/otp/send
 * Body: { mobile: string }
 *
 * Generates a 6-digit OTP server-side, stores it (in-memory) and ALSO persists
 * a hash to the OtpRequest DB table for audit. The OTP is NEVER returned to the
 * client — it is only logged to the server console in development so it can be
 * tested without an actual SMS gateway.
 *
 * Responses:
 *   200 { ok: true, message: "OTP sent successfully" }
 *   400 { ok: false, message: "..." }      (invalid mobile)
 *   429 { ok: false, message: "..." }      (resend cooldown active)
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const msg =
      parsed.error.issues?.[0]?.message ??
      "Please enter a valid 10-digit Indian mobile number.";
    return NextResponse.json({ ok: false, message: msg }, { status: 400 });
  }

  const mobile = parsed.data.mobile.trim();

  // Enforce 30-second resend cooldown.
  if (!canResend(mobile)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "An OTP was sent recently. Please wait 30 seconds before requesting a new one.",
      },
      { status: 429 }
    );
  }

  try {
    const otp = createOtp(mobile);

    // Persist a (very simple, dev-only) hash to the DB for audit trail.
    // In production this should be a real cryptographic hash (bcrypt / argon2).
    const otpHash = `dev:${otp}:hash`;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    try {
      await db.otpRequest.create({
        data: {
          mobile,
          otpHash,
          expiresAt,
        },
      });
    } catch (dbErr) {
      // DB is optional for this flow — fall back to in-memory only.
      console.error("OtpRequest DB write failed (continuing in-memory):", dbErr);
    }

    // DEV ONLY: log the OTP to the server console so it can be tested without
    // an SMS gateway. NEVER expose this to the client.
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[OTP][dev] mobile=+91${mobile} otp=${otp} (expires in 5 min)`
      );
    }

    // In production: invoke your SMS provider here, e.g.:
    //   await sendSms(`+91${mobile}`, `Your TNL Fincorp OTP is ${otp}. Valid for 5 minutes.`);

    return NextResponse.json({
      ok: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong while sending the OTP. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
