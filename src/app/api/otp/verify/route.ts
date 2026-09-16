import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOtp, hasActiveOtp, isRateLimited } from "@/lib/otp-store";
import { db } from "@/lib/db";

const schema = z.object({
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  otp: z
    .string()
    .regex(/^\d{6}$/, "Please enter the 6-digit OTP"),
});

/**
 * POST /api/otp/verify
 * Body: { mobile: string, otp: string }
 *
 * Verifies the OTP the user typed in. The OTP value is matched server-side
 * against the value stored when /api/otp/send was called. The verify path is
 * rate-limited to MAX_VERIFY_ATTEMPTS (=5) per mobile per 5-minute window —
 * enforced inside verifyOtp() itself.
 *
 * Responses:
 *   200 { ok: true, verified: true }
 *   200 { ok: false, message: "Invalid or expired OTP" }   (bad/used/expired OTP)
 *   400 { ok: false, message: "..." }                       (validation error)
 *   429 { ok: false, message: "..." }                       (too many attempts)
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
      parsed.error.issues?.[0]?.message ?? "Please enter a valid OTP.";
    return NextResponse.json({ ok: false, message: msg }, { status: 400 });
  }

  const { mobile, otp } = parsed.data;
  const normalizedMobile = mobile.trim();

  // If no OTP was ever issued (or it expired and got pruned), short-circuit.
  if (!hasActiveOtp(normalizedMobile)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your OTP has expired or was never requested. Please request a new one.",
      },
      { status: 400 }
    );
  }

  // verifyOtp enforces the per-mobile attempt rate-limit (5 / 5 min) and
  // deletes the OTP on success (single-use).
  const ok = verifyOtp(normalizedMobile, otp);

  if (!ok) {
    // Detect if the per-mobile rate limit (5 attempts / 5 min) was hit and
    // respond with 429 in that case so the client can guide the user.
    if (isRateLimited(normalizedMobile)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Too many incorrect attempts. Please request a new OTP after some time.",
        },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Invalid or expired OTP" },
      { status: 200 }
    );
  }

  // Success — mark the most recent pending OtpRequest row as verified.
  try {
    const pending = await db.otpRequest.findFirst({
      where: { mobile: normalizedMobile, verified: false },
      orderBy: { createdAt: "desc" },
    });
    if (pending) {
      await db.otpRequest.update({
        where: { id: pending.id },
        data: { verified: true },
      });
    }
  } catch (dbErr) {
    // DB update is best-effort; verification already succeeded in-memory.
    console.error("OtpRequest DB update failed (continuing):", dbErr);
  }

  return NextResponse.json({ ok: true, verified: true });
}
