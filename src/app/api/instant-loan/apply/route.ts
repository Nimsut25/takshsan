import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

/**
 * POST /api/instant-loan/apply
 *
 * Creates a new InstantLoanApplication record with a unique
 * `applicationReference` in the format `TNL-IL-YYYYMMDD-XXXXXX`.
 *
 * If an existing application for the same mobile number is already
 * verified/unlocked, we short-circuit and return `alreadyVerified: true`
 * so the frontend can skip the ₹49 payment step and proceed straight to
 * the partner application links.
 */

const applySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(160, "Email is too long")
    .transform((v) => v.toLowerCase()),
  dateOfBirth: z.string().trim().max(20).optional().nullable(),
  employmentType: z.string().trim().max(80).optional().nullable(),
  monthlyIncome: z.string().trim().max(40).optional().nullable(),
  city: z.string().trim().max(120).optional().nullable(),
  state: z.string().trim().max(120).optional().nullable(),
  requestedAmount: z.string().trim().max(40).optional().nullable(),
  category: z.string().trim().min(2, "Please select a loan category").max(60),
  partnerId: z.string().trim().max(80).optional().nullable(),
  partnerName: z.string().trim().max(160).optional().nullable(),
});

/** Build a reference like `TNL-IL-20251104-A3F9K2`. */
function generateApplicationReference(date = new Date()): string {
  const yyyymmdd =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `TNL-IL-${yyyymmdd}-${suffix}`;
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

    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
          message: "Please correct the highlighted fields.",
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const mobile = data.mobileNumber;

    // ── Check for an already-unlocked application for this mobile ──
    // If a user has previously completed verification, we must NOT make them
    // pay again. Return the existing reference so the frontend can route them
    // directly to the unlocked partner links.
    const existingVerified = await db.instantLoanApplication.findFirst({
      where: {
        mobileNumber: mobile,
        partnerAccessUnlocked: true,
        verificationStatus: "verified",
      },
      orderBy: { createdAt: "desc" },
      select: { applicationReference: true, id: true },
    });

    if (existingVerified) {
      return NextResponse.json({
        ok: true,
        alreadyVerified: true,
        applicationReference: existingVerified.applicationReference,
        id: existingVerified.id,
        message:
          "Your mobile number is already verified. You can proceed directly to the partner application links.",
      });
    }

    // ── Create the new application record ──
    // Generate a reference that is (almost certainly) unique. We add a small
    // retry loop to handle the rare unique-constraint collision.
    let applicationReference = "";
    let created = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      applicationReference = generateApplicationReference();
      try {
        created = await db.instantLoanApplication.create({
          data: {
            applicationReference,
            fullName: data.fullName,
            mobileNumber: mobile,
            email: data.email,
            dateOfBirth: data.dateOfBirth || null,
            employmentType: data.employmentType || null,
            monthlyIncome: data.monthlyIncome || null,
            city: data.city || null,
            state: data.state || null,
            requestedAmount: data.requestedAmount || null,
            category: data.category,
            partnerId: data.partnerId || null,
            partnerName: data.partnerName || null,
            paymentAmount: 49,
            paymentCurrency: "INR",
            paymentStatus: "pending",
            verificationStatus: "pending",
            partnerAccessUnlocked: false,
          },
        });
        break;
      } catch (err: unknown) {
        // P2002 = unique constraint violation (Prisma). Try a new reference.
        const code =
          (err as { code?: string } | null)?.code ?? "";
        if (code !== "P2002" && attempt === 4) {
          throw err;
        }
      }
    }

    if (!created) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not generate a unique application reference. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      applicationReference: created.applicationReference,
      id: created.id,
    });
  } catch (err) {
    console.error("instant-loan/apply error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong while submitting your application. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
