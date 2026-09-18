import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { BOND_TYPES } from "@/lib/bonds-data";

/**
 * POST /api/bonds/apply
 *
 * Creates a new Bonds application record.
 *
 * SECURITY: Bond details (bondType, bondName, tenure, couponRate, faceValue)
 * are re-fetched from the server-side BOND_TYPES list using the supplied
 * bondId. Client-supplied bond details are NEVER trusted.
 */

// ── Validation schema ──
const applySchema = z.object({
  // Bond selection
  bondId: z.string().trim().min(1, "Please select a bond type."),

  // Applicant
  fullName: z.string().trim().min(2, "Full name is required."),
  fatherHusbandName: z.string().trim().max(120).optional().nullable(),
  dateOfBirth: z.string().trim().max(20).optional().nullable(),
  panNumber: z
    .string()
    .trim()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid 10-character PAN."),
  aadhaarNumber: z
    .string()
    .trim()
    .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits."),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  residentialAddress: z.string().trim().max(500).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  state: z.string().trim().max(80).optional().nullable(),
  pinCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Pin code must be exactly 6 digits."),

  // Investment
  investmentAmount: z
    .number()
    .refine((v) => Number.isFinite(v) && v > 0, "Investment amount must be a positive number."),
  quantity: z
    .number()
    .int()
    .refine((v) => v > 0, "Quantity must be a positive whole number."),

  // Bank
  bankName: z.string().trim().max(120).optional().nullable(),
  branch: z.string().trim().max(120).optional().nullable(),
  accountNumber: z.string().trim().max(40).optional().nullable(),
  ifscCode: z
    .string()
    .trim()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid IFSC code (e.g. HDFC0001234).")
    .optional()
    .nullable()
    .or(z.literal("")),
  accountType: z.string().trim().max(40).optional().nullable(),

  // Nominee
  nomineeName: z.string().trim().max(120).optional().nullable(),
  nomineeRelationship: z.string().trim().max(60).optional().nullable(),
  nomineeDateOfBirth: z.string().trim().max(20).optional().nullable(),
  nomineeAddress: z.string().trim().max(500).optional().nullable(),

  // Declaration
  declarationAccepted: z.literal(true, {
    message: "You must accept the declaration to proceed.",
  }),
  place: z.string().trim().max(120).optional().nullable(),
  signatureDate: z.string().trim().max(20).optional().nullable(),

  // Signatures
  applicantSignature: z.string().trim().max(20000).optional().nullable(),
  jointApplicantSignature: z.string().trim().max(20000).optional().nullable(),

  // Documents
  panDocumentUrl: z.string().trim().max(2000).optional().nullable(),
  addressDocumentUrl: z.string().trim().max(2000).optional().nullable(),
  bankDocumentUrl: z.string().trim().max(2000).optional().nullable(),
  photographUrl: z.string().trim().max(2000).optional().nullable(),
  otherDocumentUrl: z.string().trim().max(2000).optional().nullable(),
  otherDocumentDescription: z.string().trim().max(500).optional().nullable(),

  userId: z.string().trim().max(120).optional().nullable(),
});

/** Generate an 8-char uppercase alphanumeric token. */
function randomToken(len = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1 for clarity
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/** Build the application number: BND-2026-XXXXXXXX */
function buildApplicationNumber(): string {
  return `BND-2026-${randomToken(8)}`;
}

/** Ensure the application number is unique by retrying. */
async function generateUniqueApplicationNumber(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = buildApplicationNumber();
    const exists = await db.bonds.findUnique({
      where: { applicationNumber: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  // Fallback: append an extra random segment to break collision.
  return `BND-2026-${randomToken(10)}`;
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
          message: "Please correct the highlighted fields and try again.",
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ── Re-fetch authoritative bond details from server-side data ──
    const bond = BOND_TYPES.find((b) => b.id === data.bondId);
    if (!bond) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The selected bond type is not available. Please refresh the page and choose a listed bond.",
        },
        { status: 400 }
      );
    }

    // ── Generate a unique application number ──
    const applicationNumber = await generateUniqueApplicationNumber();

    // ── Normalise optional IFSC (allow empty string -> null) ──
    const ifscCode = data.ifscCode && data.ifscCode.trim().length > 0
      ? data.ifscCode.trim()
      : null;

    const now = new Date();

    // ── Persist the application ──
    const record = await db.bonds.create({
      data: {
        applicationNumber,
        userId: data.userId ?? null,
        bondId: bond.id,
        status: "submitted",

        // Applicant
        fullName: data.fullName,
        fatherHusbandName: data.fatherHusbandName ?? null,
        dateOfBirth: data.dateOfBirth ?? null,
        panNumber: data.panNumber,
        aadhaarNumber: data.aadhaarNumber,
        mobileNumber: data.mobileNumber,
        email: data.email,
        residentialAddress: data.residentialAddress ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        pinCode: data.pinCode,

        // Bond details — server-authoritative
        bondType: bond.title,
        bondName: bond.title,
        tenure: bond.tenure ?? null,
        faceValue: bond.faceValue ?? null,
        investmentAmount: data.investmentAmount,
        quantity: data.quantity,
        couponRate: bond.couponRate ?? null,
        applicationDate: now,

        // Bank
        bankName: data.bankName ?? null,
        branch: data.branch ?? null,
        accountNumber: data.accountNumber ?? null,
        ifscCode,
        accountType: data.accountType ?? null,

        // Nominee
        nomineeName: data.nomineeName ?? null,
        nomineeRelationship: data.nomineeRelationship ?? null,
        nomineeDateOfBirth: data.nomineeDateOfBirth ?? null,
        nomineeAddress: data.nomineeAddress ?? null,

        // Declaration
        declarationAccepted: true,
        declarationAcceptedAt: now,
        place: data.place ?? null,
        signatureDate: data.signatureDate ? new Date(data.signatureDate) : now,

        // Signatures / Documents
        applicantSignature: data.applicantSignature ?? null,
        jointApplicantSignature: data.jointApplicantSignature ?? null,
        panDocumentUrl: data.panDocumentUrl ?? null,
        addressDocumentUrl: data.addressDocumentUrl ?? null,
        bankDocumentUrl: data.bankDocumentUrl ?? null,
        photographUrl: data.photographUrl ?? null,
        otherDocumentUrl: data.otherDocumentUrl ?? null,
        otherDocumentDescription: data.otherDocumentDescription ?? null,

        // Payment
        paymentStatus: "pending",
        paymentCurrency: "INR",

        // Admin
        dateReceived: now,
      },
      select: { id: true, applicationNumber: true },
    });

    return NextResponse.json(
      {
        ok: true,
        applicationNumber: record.applicationNumber,
        id: record.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("bonds/apply error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not submit your bond application. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
