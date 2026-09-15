import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(80),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address").max(120),
  loanType: z.string().min(2),
  loanAmount: z.string().max(40).optional().nullable(),
  employment: z.string().max(60).optional().nullable(),
  city: z.string().max(80).optional().nullable(),
  message: z.string().max(1500).optional().nullable(),
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

    const enquiry = await db.enquiry.create({
      data: {
        fullName: data.fullName.trim(),
        mobile: data.mobile.trim(),
        email: data.email.trim().toLowerCase(),
        loanType: data.loanType,
        loanAmount: data.loanAmount?.trim() || null,
        employment: data.employment?.trim() || null,
        city: data.city?.trim() || null,
        message: data.message?.trim() || null,
      },
    });

    return NextResponse.json({
      ok: true,
      id: enquiry.id,
      message:
        "Thank you! Your loan enquiry has been received. Our team will contact you shortly.",
    });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong while submitting your enquiry. Please try again or call us directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.enquiry.count();
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: true, count: 0 });
  }
}
