import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

/**
 * GET /api/instant-loan/status?mobile=XXXXXXXXXX
 *
 * Checks whether a mobile number has an unlocked (verified) Instant Loan
 * application. Used by the frontend to decide whether partner cards should
 * show "Apply Instantly" (already unlocked) vs "Apply Now" (needs the ₹49
 * verification flow).
 */

const querySchema = z.object({
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const mobileParam = url.searchParams.get("mobile") ?? "";

    const parsed = querySchema.safeParse({ mobile: mobileParam });
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.flatten().fieldErrors.mobile?.[0] ?? "Invalid mobile number.",
        },
        { status: 400 }
      );
    }

    const mobile = parsed.data.mobile;

    // Find the most recent unlocked application for this mobile number.
    const unlocked = await db.instantLoanApplication.findFirst({
      where: {
        mobileNumber: mobile,
        partnerAccessUnlocked: true,
        verificationStatus: "verified",
        paymentStatus: "paid",
      },
      orderBy: { createdAt: "desc" },
      select: {
        applicationReference: true,
        createdAt: true,
        paymentVerifiedAt: true,
      },
    });

    if (!unlocked) {
      return NextResponse.json({
        ok: true,
        unlocked: false,
        applicationReference: null,
      });
    }

    return NextResponse.json({
      ok: true,
      unlocked: true,
      applicationReference: unlocked.applicationReference,
      verifiedAt: unlocked.paymentVerifiedAt ?? unlocked.createdAt,
    });
  } catch (err) {
    console.error("instant-loan/status error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not check your application status right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
