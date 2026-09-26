import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { memoryApplications, memoryJobs } from "@/lib/career-data";

/**
 * POST /api/career/apply
 *
 * Accepts multipart/form-data with all application fields + a CV file under
 * the "cv" field (PDF/DOC/DOCX, max 5MB). Stores the CV under
 * /public/uploads/career-resumes/<unique>.<ext> and creates a
 * CareerApplication record. Falls back to in-memory storage if DB is down.
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "career-resumes");

const text = (v: unknown) => (typeof v === "string" ? v : "");

const schema = z.object({
  jobId: z.string().max(120).optional().nullable(),
  jobTitle: z.string().min(2, "Job title is required").max(200),
  fullName: z.string().min(2, "Please enter your full name").max(120),
  email: z.string().email("Enter a valid email address").max(150),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  dateOfBirth: z.string().max(20).optional().nullable(),
  gender: z.string().max(20).optional().nullable(),
  currentCity: z.string().max(120).optional().nullable(),
  state: z.string().max(120).optional().nullable(),
  highestQualification: z.string().max(200).optional().nullable(),
  currentCompany: z.string().max(200).optional().nullable(),
  totalExperience: z.string().max(60).optional().nullable(),
  expectedSalary: z.string().max(60).optional().nullable(),
  noticePeriod: z.string().max(60).optional().nullable(),
  coverLetter: z.string().max(3000).optional().nullable(),
  linkedinProfile: z.string().max(300).optional().nullable(),
  consent: z
    .preprocess(
      (v) => (v === "true" || v === true),
      z.boolean().refine((v) => v === true, "Please provide your consent to proceed")
    ),
});

function sanitizeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase().replace(/^\./, "");
  const safeExt = ALLOWED_EXT.includes(ext) ? ext : "pdf";
  const rand = crypto.randomBytes(10).toString("hex");
  const ts = Date.now();
  return `cv-${ts}-${rand}.${safeExt}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const fields: Record<string, string | null> = {};
    for (const key of [
      "jobId", "jobTitle", "fullName", "email", "mobile", "dateOfBirth",
      "gender", "currentCity", "state", "highestQualification",
      "currentCompany", "totalExperience", "expectedSalary",
      "noticePeriod", "coverLetter", "linkedinProfile", "consent",
    ]) {
      const v = form.get(key);
      fields[key] = v === null || v === undefined ? null : text(v);
    }

    const parsed = schema.safeParse(fields);
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

    // ---- CV file handling ----
    const file = form.get("cv");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, errors: { cv: ["Please upload your CV / resume."] }, message: "Please upload your CV." },
        { status: 400 }
      );
    }
    const ext = path.extname(file.name).toLowerCase().replace(/^\./, "");
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json(
        { ok: false, errors: { cv: ["Only PDF, DOC and DOCX files are allowed."] }, message: "Only PDF, DOC and DOCX files are allowed." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, errors: { cv: ["File is too large. Maximum size is 5 MB."] }, message: "File is too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }
    if (file.size === 0) {
      return NextResponse.json(
        { ok: false, errors: { cv: ["The uploaded file is empty."] }, message: "The uploaded file is empty." },
        { status: 400 }
      );
    }

    try {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    } catch {
      /* ignore */
    }

    const safeName = sanitizeFilename(file.name);
    const filePath = path.join(UPLOAD_DIR, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    const publicPath = `/uploads/career-resumes/${safeName}`;

    const data = parsed.data;

    try {
      const created = await db.careerApplication.create({
        data: {
          jobId: data.jobId || null,
          jobTitle: data.jobTitle.trim(),
          fullName: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          mobile: data.mobile.trim(),
          dateOfBirth: data.dateOfBirth?.trim() || null,
          gender: data.gender || null,
          currentCity: data.currentCity?.trim() || null,
          state: data.state?.trim() || null,
          highestQualification: data.highestQualification?.trim() || null,
          currentCompany: data.currentCompany?.trim() || null,
          totalExperience: data.totalExperience?.trim() || null,
          expectedSalary: data.expectedSalary?.trim() || null,
          noticePeriod: data.noticePeriod?.trim() || null,
          coverLetter: data.coverLetter?.trim() || null,
          linkedinProfile: data.linkedinProfile?.trim() || null,
          cvUrl: publicPath,
          consent: data.consent,
          status: "Applied",
        },
      });
      return NextResponse.json({
        ok: true,
        id: created.id,
        message:
          "Application Submitted Successfully. Thank you for your interest in TNL Fincorp. Our recruitment team will review your application and contact you when appropriate.",
      });
    } catch (dbErr) {
      console.warn("Career apply DB fallback:", dbErr);
      const id = crypto.randomBytes(12).toString("hex");
      memoryApplications.push({
        id,
        jobId: data.jobId || null,
        jobTitle: data.jobTitle.trim(),
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        mobile: data.mobile.trim(),
        dateOfBirth: data.dateOfBirth?.trim() || null,
        gender: data.gender || null,
        currentCity: data.currentCity?.trim() || null,
        state: data.state?.trim() || null,
        highestQualification: data.highestQualification?.trim() || null,
        currentCompany: data.currentCompany?.trim() || null,
        totalExperience: data.totalExperience?.trim() || null,
        expectedSalary: data.expectedSalary?.trim() || null,
        noticePeriod: data.noticePeriod?.trim() || null,
        coverLetter: data.coverLetter?.trim() || null,
        linkedinProfile: data.linkedinProfile?.trim() || null,
        cvUrl: publicPath,
        consent: data.consent,
        status: "Applied",
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({
        ok: true,
        id,
        message:
          "Application Submitted Successfully. Thank you for your interest in TNL Fincorp. Our recruitment team will review your application and contact you when appropriate.",
      });
    }
  } catch (err) {
    console.error("Career apply API error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn’t submit your application right now. Please try again or email us at care@tnlfincorp.in.",
      },
      { status: 500 }
    );
  }
}

void memoryJobs;
