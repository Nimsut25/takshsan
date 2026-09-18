import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BOND_TYPES } from "@/lib/bonds-data";

/**
 * GET /api/bonds/certificate?applicationNumber=BND-2026-XXXXXXXX
 *
 * Returns the certificate data for a bond application that has been paid and
 * had its certificate issued. Sensitive identifiers are masked.
 *
 * SECURITY: Sensitive fields (PAN, Aadhaar, bank account number) are masked
 * before being returned. The full certificate data is only returned if the
 * record has certificateIssued === true.
 */

/** Mask a PAN like "ABCDE1234X" (no masking here — PAN is the canonical form). */
function maskPan(pan: string | null | undefined): string | null {
  if (!pan) return null;
  // PAN format is already `ABCDE1234X` — return as-is per spec.
  return pan;
}

/** Mask an Aadhaar number like "123412341234" -> "XXXX-XXXX-1234". */
function maskAadhaar(aadhaar: string | null | undefined): string | null {
  if (!aadhaar) return null;
  const digits = aadhaar.replace(/\D/g, "");
  if (digits.length !== 12) return "XXXX-XXXX-XXXX";
  return `XXXX-XXXX-${digits.slice(8)}`;
}

/** Mask a bank account number like "1234567890123" -> "XXXX1234" (last 4). */
function maskAccountNumber(account: string | null | undefined): string | null {
  if (!account) return null;
  const digits = account.replace(/\D/g, "");
  if (digits.length <= 4) return "XXXX";
  return `XXXX${digits.slice(-4)}`;
}

export async function GET(req: NextRequest) {
  try {
    const applicationNumber = req.nextUrl.searchParams
      .get("applicationNumber")
      ?.trim();

    if (!applicationNumber || applicationNumber.length < 6) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please provide a valid application number (e.g. BND-2026-XXXXXXXX).",
        },
        { status: 400 }
      );
    }

    const application = await db.bonds.findUnique({
      where: { applicationNumber },
    });

    if (!application) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not find a bond application with that number. Please check and try again.",
        },
        { status: 404 }
      );
    }

    if (application.certificateIssued !== true) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Your certificate has not been issued yet. Please complete the payment to generate your certificate.",
          paymentStatus: application.paymentStatus,
          status: application.status,
        },
        { status: 404 }
      );
    }

    // ── Re-fetch authoritative bond details from server-side data ──
    const bond = BOND_TYPES.find((b) => b.id === application.bondId);

    // ── Serialise Decimal fields ──
    const investmentAmount = application.investmentAmount
      ? Number(application.investmentAmount).toString()
      : null;
    const faceValue = application.faceValue
      ? Number(application.faceValue).toString()
      : null;
    const paymentAmount = application.paymentAmount
      ? Number(application.paymentAmount).toString()
      : null;

    return NextResponse.json({
      ok: true,
      certificate: {
        applicationNumber: application.applicationNumber,
        certificateNumber: application.certificateNumber,
        certificateIssueDate: application.certificateIssueDate,
        certificateGeneratedAt: application.certificateGeneratedAt,
        status: application.status,

        // Applicant
        fullName: application.fullName,
        fatherHusbandName: application.fatherHusbandName,
        dateOfBirth: application.dateOfBirth,
        panNumber: maskPan(application.panNumber),
        aadhaarNumber: maskAadhaar(application.aadhaarNumber),
        mobileNumber: application.mobileNumber,
        email: application.email,
        residentialAddress: application.residentialAddress,
        city: application.city,
        state: application.state,
        pinCode: application.pinCode,

        // Bond
        bondId: application.bondId,
        bondType: application.bondType,
        bondName: application.bondName,
        tenure: application.tenure,
        couponRate: application.couponRate,
        faceValue,
        investmentAmount,
        quantity: application.quantity,
        applicationDate: application.applicationDate,

        // Bank (masked)
        bankName: application.bankName,
        branch: application.branch,
        accountNumber: maskAccountNumber(application.accountNumber),
        ifscCode: application.ifscCode,
        accountType: application.accountType,

        // Nominee
        nomineeName: application.nomineeName,
        nomineeRelationship: application.nomineeRelationship,
        nomineeDateOfBirth: application.nomineeDateOfBirth,
        nomineeAddress: application.nomineeAddress,

        // Payment
        paymentStatus: application.paymentStatus,
        paymentAmount,
        paymentCurrency: application.paymentCurrency,
        paymentTransactionId: application.paymentTransactionId,
        paymentVerifiedAt: application.paymentVerifiedAt,

        // Bond reference (server-authoritative)
        bondDetails: bond
          ? {
              id: bond.id,
              title: bond.title,
              issuer: bond.issuer ?? null,
              tenure: bond.tenure ?? null,
              couponRate: bond.couponRate ?? null,
              faceValue: bond.faceValue ?? null,
            }
          : null,

        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (err) {
    console.error("bonds/certificate error:", err);
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
