import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

/**
 * POST /api/rd/apply
 *
 * Creates a new Recurring Deposit application record.
 *
 * SECURITY:
 *  - Server validates every input (PAN, mobile, email, PIN, IFSC, Aadhaar).
 *  - Maturity date and maturity amount are calculated server-side from
 *    depositDate + tenure and the monthly deposit + interestRate. Client
 *    values for these derived fields are NEVER trusted.
 *  - amountInWords is computed server-side from depositAmount (the monthly
 *    deposit) using the Indian numbering system (Thousand, Lakh, Crore).
 *  - Application starts life as `paymentStatus = "pending"` and
 *    `status = "submitted"`. It only advances to `certificate_generated`
 *    after payment is verified.
 *
 * RD MATURITY FORMULA:
 *   maturity = monthlyDeposit × (((1 + i)^n - 1) / i) × (1 + i)
 *   where  i = rate / 12 / 100  (monthly rate as decimal)
 *          n = total months = tenureYears * 12 + tenureMonths
 *   When i === 0 (interest-free), falls back to monthlyDeposit × n.
 */

// ── Validation schema ──
const applySchema = z.object({
  // Applicant
  applicantName: z.string().trim().min(2, "Applicant name is required."),
  fatherHusbandName: z.string().trim().max(120).optional().nullable(),
  dateOfBirth: z.string().trim().max(20).optional().nullable(),
  gender: z.string().trim().max(20).optional().nullable(),
  panNo: z
    .string()
    .trim()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid 10-character PAN."),
  aadhaarIdNo: z
    .string()
    .trim()
    .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits.")
    .optional()
    .nullable()
    .or(z.literal("")),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  residentialAddress: z.string().trim().max(500).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  state: z.string().trim().max(80).optional().nullable(),
  pin: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "PIN code must be exactly 6 digits."),

  // Occupation
  occupation: z.string().trim().max(80).optional().nullable(),
  employerBusinessName: z.string().trim().max(160).optional().nullable(),
  annualIncome: z.string().trim().max(60).optional().nullable(),

  // RD Details
  depositAmount: z
    .union([z.number(), z.string()])
    .transform((v) => (typeof v === "string" ? parseFloat(v) : v))
    .refine((v) => Number.isFinite(v) && v > 0, "Monthly deposit amount must be a positive number."),
  tenureMonths: z.union([z.number(), z.string()]).transform((v) => typeof v === "string" ? parseInt(v) || 0 : v).optional().nullable(),
  tenureYears: z.union([z.number(), z.string()]).transform((v) => typeof v === "string" ? parseInt(v) || 0 : v).optional().nullable(),
  interestRate: z
    .union([z.number(), z.string()])
    .transform((v) => (typeof v === "string" ? parseFloat(v) : v))
    .refine((v) => Number.isFinite(v) && v >= 0 && v <= 30, "Interest rate is out of range.")
    .optional()
    .nullable(),
  interestPaymentOption: z.string().trim().max(60).optional().nullable(),
  depositType: z.string().trim().max(60).optional().nullable(),
  depositDate: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .optional()
    .default(() => new Date().toISOString()),

  // Maturity Instructions
  maturityInstruction: z.string().trim().max(60).optional().nullable(),
  bankAccountNo: z.string().trim().max(40).optional().nullable(),
  bankName: z.string().trim().max(120).optional().nullable(),
  branch: z.string().trim().max(120).optional().nullable(),
  ifscCode: z
    .string()
    .trim()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid IFSC code (e.g. HDFC0001234).")
    .optional()
    .nullable()
    .or(z.literal("")),

  // Nominee
  nomineeName: z.string().trim().max(120).optional().nullable(),
  nomineeRelationship: z.string().trim().max(60).optional().nullable(),
  nomineeDateOfBirth: z.string().trim().max(20).optional().nullable(),
  nomineeAddress: z.string().trim().max(500).optional().nullable(),
  nomineeMobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$|^$/)
    .optional()
    .nullable()
    .or(z.literal("")),

  // Joint Applicant
  jointApplicantName: z.string().trim().max(120).optional().nullable(),
  jointApplicantRelationship: z.string().trim().max(60).optional().nullable(),
  jointApplicantPan: z
    .string()
    .trim()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .optional()
    .nullable()
    .or(z.literal("")),
  jointApplicantMobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$|^$/)
    .optional()
    .nullable()
    .or(z.literal("")),
  modeOfOperation: z.string().trim().max(60).optional().nullable(),
  jointApplicantEnabled: z.boolean().optional().default(false),

  // Documents Checklist
  panDocument: z.boolean().optional().default(false),
  aadhaarDocument: z.boolean().optional().default(false),
  addressProofDocument: z.boolean().optional().default(false),
  photographDocument: z.boolean().optional().default(false),
  bankAccountProofDocument: z.boolean().optional().default(false),
  kycDocuments: z.boolean().optional().default(false),
  otherDocuments: z.string().trim().max(500).optional().nullable(),

  // Declaration
  declarationAccepted: z.literal(true, {
    message: "You must accept the declaration to proceed.",
  }),
  applicantSignature: z.string().trim().max(20000).optional().nullable(),
  jointApplicantSignature: z.string().trim().max(20000).optional().nullable(),

  userId: z.string().trim().max(120).optional().nullable(),
});

// ── Application number generator: RD-APP-2026-XXXXXX ──
function randomToken(len = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function buildApplicationNumber(): string {
  return `RD-APP-2026-${randomToken(6)}`;
}

async function generateUniqueApplicationNumber(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = buildApplicationNumber();
    const exists = await db.rD.findUnique({
      where: { applicationNo: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  // Fallback: extend to 8 chars to break collision.
  return `RD-APP-2026-${randomToken(8)}`;
}

// ── Indian number → words (Thousand, Lakh, Crore) ──
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return TENS[t] + (o ? " " + ONES[o] : "");
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  let out = "";
  if (h > 0) out += ONES[h] + " Hundred";
  if (rest > 0) out += (h > 0 ? " " : "") + twoDigits(rest);
  return out;
}

/**
 * Convert a non-negative integer to words using the Indian numbering system.
 * Supports up to 9,99,99,99,999 (≈ 999 crore). Returns "" for 0.
 */
function indianNumberToWords(num: number): string {
  if (!Number.isFinite(num) || num < 0) return "";
  if (num === 0) return "Zero";

  const crore = Math.floor(num / 1_00_00_000);
  let remainder = num % 1_00_00_000;
  const lakh = Math.floor(remainder / 1_00_000);
  remainder = remainder % 1_00_000;
  const thousand = Math.floor(remainder / 1_000);
  remainder = remainder % 1_000;

  const parts: string[] = [];
  if (crore > 0) parts.push(threeDigits(crore) + " Crore");
  if (lakh > 0) parts.push(twoDigits(lakh) + " Lakh");
  if (thousand > 0) parts.push(twoDigits(thousand) + " Thousand");
  if (remainder > 0) parts.push(threeDigits(remainder));

  return parts.join(" ").trim();
}

/**
 * Convert a Decimal money amount to Indian English words.
 * Splits on the decimal point and adds "Rupees" / "Paise Only".
 */
function amountInIndianWords(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const rupees = Math.floor(rounded);
  const paise = Math.round((rounded - rupees) * 100);

  const rupeeWords = indianNumberToWords(rupees);
  const paiseWords = paise > 0 ? indianNumberToWords(paise) + " Paise" : "";

  let out = "Rupees " + rupeeWords;
  if (paiseWords) out += " and " + paiseWords;
  out += " Only";
  return out;
}

// ── Maturity calculation ──
/**
 * Compute the maturity date by adding total months to the deposit date.
 */
function computeMaturityDate(depositDate: Date, totalMonths: number): Date {
  const d = new Date(depositDate.getTime());
  // Use setMonth which handles year rollover automatically.
  d.setMonth(d.getMonth() + totalMonths);
  return d;
}

/**
 * Compute RD maturity amount using the standard RD formula:
 *
 *   maturity = monthlyDeposit × (((1 + i)^n - 1) / i) × (1 + i)
 *
 *   i  = monthly interest rate as decimal = annualRatePct / 12 / 100
 *   n  = total number of monthly installments
 *
 * When i === 0 (interest-free), maturity is simply monthlyDeposit × n.
 *
 * @param monthlyDeposit  principal contributed each month
 * @param annualRatePct   annual interest rate in PERCENT (e.g. 7.5)
 * @param totalMonths     total number of monthly installments (n)
 */
function computeRdMaturityAmount(
  monthlyDeposit: number,
  annualRatePct: number,
  totalMonths: number
): number {
  const n = totalMonths;
  const i = annualRatePct / 12 / 100;

  let amount: number;
  if (i === 0) {
    // No interest — just the sum of all monthly deposits.
    amount = monthlyDeposit * n;
  } else {
    const factor = (Math.pow(1 + i, n) - 1) / i;
    amount = monthlyDeposit * factor * (1 + i);
  }
  return Math.round(amount * 100) / 100;
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

    // ── Compute tenure & maturity ──
    const tenureMonths = data.tenureMonths ?? 0;
    const tenureYears = data.tenureYears ?? 0;
    const totalMonths = tenureYears * 12 + tenureMonths;

    if (totalMonths <= 0) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please select a valid tenure (at least one month) for your Recurring Deposit.",
        },
        { status: 400 }
      );
    }

    const depositDate = new Date(data.depositDate);
    if (Number.isNaN(depositDate.getTime())) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid deposit date." },
        { status: 400 }
      );
    }

    const maturityDate = computeMaturityDate(depositDate, totalMonths);

    // ── Compute maturity amount (RD formula) ──
    const rate = data.interestRate ?? 0;
    const maturityAmount = computeRdMaturityAmount(
      data.depositAmount,
      rate,
      totalMonths
    );

    // ── Compute amount in words (from monthly deposit) ──
    const words = amountInIndianWords(data.depositAmount);

    // ── Generate unique application number ──
    const applicationNo = await generateUniqueApplicationNumber();

    // ── Normalise optional fields that accept empty strings ──
    const ifsc = data.ifscCode && data.ifscCode.trim().length > 0
      ? data.ifscCode.trim()
      : null;
    const aadhaar = data.aadhaarIdNo && data.aadhaarIdNo.trim().length > 0
      ? data.aadhaarIdNo.trim()
      : null;
    const nomineeMobile = data.nomineeMobile && data.nomineeMobile.trim().length > 0
      ? data.nomineeMobile.trim()
      : null;
    const jointApplicantPan =
      data.jointApplicantPan && data.jointApplicantPan.trim().length > 0
        ? data.jointApplicantPan.trim()
        : null;
    const jointApplicantMobile =
      data.jointApplicantMobile && data.jointApplicantMobile.trim().length > 0
        ? data.jointApplicantMobile.trim()
        : null;

    // ── Persist the RD application ──
    const record = await db.rD.create({
      data: {
        applicationNo,

        // Applicant
        applicantName: data.applicantName,
        fatherHusbandName: data.fatherHusbandName ?? null,
        dateOfBirth: data.dateOfBirth ?? null,
        gender: data.gender ?? null,
        panNo: data.panNo,
        aadhaarIdNo: aadhaar,
        mobile: data.mobile,
        email: data.email,
        residentialAddress: data.residentialAddress ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        pin: data.pin,

        // Occupation
        occupation: data.occupation ?? null,
        employerBusinessName: data.employerBusinessName ?? null,
        annualIncome: data.annualIncome ?? null,

        // RD Details (server-computed)
        depositAmount: data.depositAmount,
        amountInWords: words,
        tenureMonths: tenureMonths || null,
        tenureYears: tenureYears || null,
        interestRate: rate ?? null,
        interestPaymentOption: data.interestPaymentOption ?? null,
        depositType: data.depositType ?? null,
        depositDate,
        maturityDate,
        maturityAmount,

        // Maturity Instructions
        maturityInstruction: data.maturityInstruction ?? null,
        bankAccountNo: data.bankAccountNo ?? null,
        bankName: data.bankName ?? null,
        branch: data.branch ?? null,
        ifscCode: ifsc,

        // Nominee
        nomineeName: data.nomineeName ?? null,
        nomineeRelationship: data.nomineeRelationship ?? null,
        nomineeDateOfBirth: data.nomineeDateOfBirth ?? null,
        nomineeAddress: data.nomineeAddress ?? null,
        nomineeMobile,

        // Joint Applicant
        jointApplicantName: data.jointApplicantName ?? null,
        jointApplicantRelationship: data.jointApplicantRelationship ?? null,
        jointApplicantPan,
        jointApplicantMobile,
        modeOfOperation: data.modeOfOperation ?? null,
        jointApplicantEnabled: data.jointApplicantEnabled === true,

        // Documents Checklist
        panDocument: data.panDocument === true,
        aadhaarDocument: data.aadhaarDocument === true,
        addressProofDocument: data.addressProofDocument === true,
        photographDocument: data.photographDocument === true,
        bankAccountProofDocument: data.bankAccountProofDocument === true,
        kycDocuments: data.kycDocuments === true,
        otherDocuments: data.otherDocuments ?? null,

        // Declaration / Signature
        declarationAccepted: true,
        applicantSignature: data.applicantSignature ?? null,
        jointApplicantSignature: data.jointApplicantSignature ?? null,

        // Payment
        paymentStatus: "pending",
        paymentProviderReference: null,

        // Admin / status
        userId: data.userId ?? null,
        status: "submitted",
      },
      select: { id: true, applicationNo: true },
    });

    return NextResponse.json(
      {
        ok: true,
        applicationNo: record.applicationNo,
        id: record.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("rd/apply error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not submit your Recurring Deposit application. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
