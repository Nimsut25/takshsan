import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import {
  generateApplicationNumber,
  memoryMsmeApplications,
} from "@/lib/msme-loans-data";

/**
 * POST /api/msme-loans/apply
 *
 * Validates and stores an MSME loan application. Generates a unique
 * application number (MSME-YYYY-XXXXXX). Tries the database (Prisma) first;
 * falls back to in-memory storage if the DB is not reachable.
 */

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(120),
  fatherHusbandName: z.string().max(120).optional().nullable(),
  dateOfBirth: z.string().max(20).optional().nullable(),
  gender: z.string().max(20).optional().nullable(),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid 10-character PAN")
    .optional()
    .nullable()
    .or(z.literal("")),
  aadhaarId: z.string().max(20).optional().nullable(),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address").max(150),
  residentialAddress: z.string().max(500).optional().nullable(),
  city: z.string().max(120).optional().nullable(),
  state: z.string().max(120).optional().nullable(),
  pinCode: z
    .string()
    .regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code")
    .optional()
    .nullable()
    .or(z.literal("")),

  businessName: z.string().min(2, "Please enter your business name").max(200),
  businessType: z.string().max(80).optional().nullable(),
  businessRegistrationNumber: z.string().max(80).optional().nullable(),
  natureOfBusiness: z.string().max(200).optional().nullable(),
  businessAddress: z.string().max(500).optional().nullable(),
  businessCity: z.string().max(120).optional().nullable(),
  businessState: z.string().max(120).optional().nullable(),
  businessPinCode: z
    .string()
    .regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN code")
    .optional()
    .nullable()
    .or(z.literal("")),
  yearsInBusiness: z.string().max(60).optional().nullable(),
  annualTurnover: z.string().max(60).optional().nullable(),

  loanType: z.string().max(80).optional().nullable(),
  requiredLoanAmount: z
    .string()
    .min(1, "Please enter the required loan amount")
    .max(60),
  preferredLoanTenure: z.string().max(60).optional().nullable(),
  loanPurpose: z.string().max(500).optional().nullable(),
  existingLoan: z.string().max(60).optional().nullable(),
  existingMonthlyEmi: z.string().max(60).optional().nullable(),
  preferredContactTime: z.string().max(60).optional().nullable(),
  additionalRemarks: z.string().max(3000).optional().nullable(),

  consent: z
    .boolean()
    .refine((v) => v === true, "Please provide your consent to proceed"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

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
    const applicationNumber = generateApplicationNumber();

    const row = {
      applicationNumber,
      fullName: data.fullName.trim(),
      fatherHusbandName: data.fatherHusbandName?.trim() || null,
      dateOfBirth: data.dateOfBirth?.trim() || null,
      gender: data.gender || null,
      panNumber: data.panNumber?.trim() || null,
      aadhaarId: data.aadhaarId?.trim() || null,
      mobileNumber: data.mobileNumber.trim(),
      email: data.email.trim().toLowerCase(),
      residentialAddress: data.residentialAddress?.trim() || null,
      city: data.city?.trim() || null,
      state: data.state?.trim() || null,
      pinCode: data.pinCode?.trim() || null,
      businessName: data.businessName.trim(),
      businessType: data.businessType || null,
      businessRegistrationNumber: data.businessRegistrationNumber?.trim() || null,
      natureOfBusiness: data.natureOfBusiness?.trim() || null,
      businessAddress: data.businessAddress?.trim() || null,
      businessCity: data.businessCity?.trim() || null,
      businessState: data.businessState?.trim() || null,
      businessPinCode: data.businessPinCode?.trim() || null,
      yearsInBusiness: data.yearsInBusiness?.trim() || null,
      annualTurnover: data.annualTurnover?.trim() || null,
      loanType: data.loanType || null,
      requiredLoanAmount: data.requiredLoanAmount.trim(),
      preferredLoanTenure: data.preferredLoanTenure?.trim() || null,
      loanPurpose: data.loanPurpose?.trim() || null,
      existingLoan: data.existingLoan?.trim() || null,
      existingMonthlyEmi: data.existingMonthlyEmi?.trim() || null,
      preferredContactTime: data.preferredContactTime?.trim() || null,
      additionalRemarks: data.additionalRemarks?.trim() || null,
      consent: data.consent,
      status: "Pending Review" as const,
    };

    try {
      const created = await db.msme.create({ data: row });
      return NextResponse.json({
        ok: true,
        id: created.id,
        applicationNumber,
        message:
          "Your MSME loan application has been submitted successfully. Our team will review your application and contact you soon.",
      });
    } catch (dbErr) {
      console.warn("MSME loans apply DB fallback:", dbErr);
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const now = new Date().toISOString();
      memoryMsmeApplications.push({ ...row, id, createdAt: now, updatedAt: now });
      return NextResponse.json({
        ok: true,
        id,
        applicationNumber,
        message:
          "Your MSME loan application has been submitted successfully. Our team will review your application and contact you soon.",
      });
    }
  } catch (err) {
    console.error("MSME loans apply API error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn’t submit your application right now. Please try again or call us at +91 94279 79991.",
      },
      { status: 500 }
    );
  }
}
