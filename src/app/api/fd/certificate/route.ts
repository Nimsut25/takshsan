import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/fd/certificate?applicationNo=FD-APP-2026-XXXXXX
 *
 * Returns the FD certificate data for an application that has been paid and
 * had its certificate generated. Sensitive identifiers are masked.
 *
 * SECURITY:
 *  - The full certificate data is ONLY returned when `certificateGenerated`
 *    is true. Otherwise we return a 404 with the current payment status.
 *  - PAN is masked: `ABCDE1234X` → `ABCDE****4X` (reveal only first 5 and
 *    the last char).
 *  - Aadhaar is masked: 12 digits → `XXXX-XXXX-1234` (last 4 visible).
 *  - Bank account number is masked: → `XXXX1234` (last 4 visible).
 */

/**
 * Mask a PAN like "ABCDE1234X" → "ABCDE****4X".
 * Keeps the first 5 alpha chars and the last alpha char; masks the 4 digits.
 */
function maskPan(pan: string | null | undefined): string | null {
  if (!pan) return null;
  if (pan.length !== 10) return "*****";
  return `${pan.slice(0, 5)}****${pan.slice(9)}`;
}

/** Mask an Aadhaar number like "123412341234" → "XXXX-XXXX-1234". */
function maskAadhaar(aadhaar: string | null | undefined): string | null {
  if (!aadhaar) return null;
  const digits = aadhaar.replace(/\D/g, "");
  if (digits.length !== 12) return "XXXX-XXXX-XXXX";
  return `XXXX-XXXX-${digits.slice(8)}`;
}

/** Mask a bank account number like "1234567890123" → "XXXX1234" (last 4). */
function maskAccountNumber(account: string | null | undefined): string | null {
  if (!account) return null;
  const digits = account.replace(/\D/g, "");
  if (digits.length <= 4) return "XXXX";
  return `XXXX${digits.slice(-4)}`;
}

/** Serialise a Prisma Decimal field to a plain string for JSON. */
function dec(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n.toString() : null;
}

export async function GET(req: NextRequest) {
  try {
    const applicationNo = req.nextUrl.searchParams
      .get("applicationNo")
      ?.trim();

    if (!applicationNo || applicationNo.length < 6) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please provide a valid application number (e.g. FD-APP-2026-XXXXXX).",
        },
        { status: 400 }
      );
    }

    const application = await db.fD.findUnique({
      where: { applicationNo },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find a Fixed Deposit application with that number. Please check and try again.",
        },
        { status: 404 }
      );
    }

    if (application.certificateGenerated !== true) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Your FD certificate has not been generated yet. Please complete the payment to generate your certificate.",
          paymentStatus: application.paymentStatus,
          status: application.status,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      certificate: {
        // Identifiers
        applicationNo: application.applicationNo,
        applicationDate: application.applicationDate,
        fdAccountNo: application.fdAccountNo,
        certificateNo: application.certificateNo,
        certificateIssueDate: application.certificateIssueDate,
        certificateGeneratedAt: application.certificateGeneratedAt,
        status: application.status,

        // Applicant (sensitive fields masked)
        applicantName: application.applicantName,
        fatherHusbandName: application.fatherHusbandName,
        dateOfBirth: application.dateOfBirth,
        gender: application.gender,
        panNo: maskPan(application.panNo),
        aadhaarIdNo: maskAadhaar(application.aadhaarIdNo),
        mobile: application.mobile,
        email: application.email,
        residentialAddress: application.residentialAddress,
        city: application.city,
        state: application.state,
        pin: application.pin,

        // Occupation
        occupation: application.occupation,
        employerBusinessName: application.employerBusinessName,
        annualIncome: application.annualIncome,

        // FD Details
        depositAmount: dec(application.depositAmount),
        amountInWords: application.amountInWords,
        tenureMonths: application.tenureMonths,
        tenureYears: application.tenureYears,
        interestRate: dec(application.interestRate),
        interestPaymentOption: application.interestPaymentOption,
        depositType: application.depositType,
        depositDate: application.depositDate,
        maturityDate: application.maturityDate,
        maturityAmount: dec(application.maturityAmount),

        // Maturity Instructions (bank account masked)
        maturityInstruction: application.maturityInstruction,
        bankAccountNo: maskAccountNumber(application.bankAccountNo),
        bankName: application.bankName,
        branch: application.branch,
        ifscCode: application.ifscCode,

        // Nominee
        nomineeName: application.nomineeName,
        nomineeRelationship: application.nomineeRelationship,
        nomineeDateOfBirth: application.nomineeDateOfBirth,
        nomineeAddress: application.nomineeAddress,
        nomineeMobile: application.nomineeMobile,

        // Joint Applicant (PAN/mobile masked)
        jointApplicantName: application.jointApplicantName,
        jointApplicantRelationship: application.jointApplicantRelationship,
        jointApplicantPan: maskPan(application.jointApplicantPan),
        jointApplicantMobile: application.jointApplicantMobile,
        modeOfOperation: application.modeOfOperation,
        jointApplicantEnabled: application.jointApplicantEnabled,

        // Documents Checklist
        panDocument: application.panDocument,
        aadhaarDocument: application.aadhaarDocument,
        addressProofDocument: application.addressProofDocument,
        photographDocument: application.photographDocument,
        bankAccountProofDocument: application.bankAccountProofDocument,
        kycDocuments: application.kycDocuments,
        otherDocuments: application.otherDocuments,

        // Declaration
        declarationAccepted: application.declarationAccepted,
        applicantSignature: application.applicantSignature,
        jointApplicantSignature: application.jointApplicantSignature,

        // Payment
        paymentStatus: application.paymentStatus,
        paymentAmount: dec(application.paymentAmount),
        paymentDate: application.paymentDate,
        paymentTransactionId: application.paymentTransactionId,

        // Office / Admin
        customerId: application.customerId,
        fdReceiptNo: application.fdReceiptNo,
        kycVerified: application.kycVerified,
        documentsVerifiedBy: application.documentsVerifiedBy,
        depositReceived: application.depositReceived,
        interestRateApproved: dec(application.interestRateApproved),
        authorizedOfficerName: application.authorizedOfficerName,

        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (err) {
    console.error("fd/certificate error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not retrieve your certificate at this time. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
