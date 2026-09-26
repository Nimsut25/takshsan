import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { memoryJobs } from "@/lib/career-data";

/**
 * GET /api/career/jobs
 * Returns all ACTIVE job openings. Tries Prisma DB first; falls back to
 * in-memory sample store if the DB is not reachable.
 */
export async function GET() {
  try {
    let jobs;
    try {
      jobs = await db.jobOpening.findMany({
        where: { active: true },
        orderBy: { postedAt: "desc" },
      });
      // Seed DB from sample list if empty.
      if (jobs.length === 0) {
        await db.jobOpening.createMany({
          data: memoryJobs.map((j) => ({
            id: j.id,
            title: j.title,
            department: j.department,
            location: j.location,
            experience: j.experience,
            employmentType: j.employmentType,
            description: j.description,
            postedAt: new Date(j.postedAt),
            active: true,
          })),
          skipDuplicates: true,
        });
        jobs = await db.jobOpening.findMany({
          where: { active: true },
          orderBy: { postedAt: "desc" },
        });
      }
      const out = jobs.map((j) => ({
        id: j.id,
        title: j.title,
        department: j.department,
        location: j.location,
        experience: j.experience,
        employmentType: j.employmentType,
        description: j.description,
        postedAt:
          j.postedAt instanceof Date ? j.postedAt.toISOString().slice(0, 10) : String(j.postedAt),
        active: j.active,
      }));
      return NextResponse.json({ ok: true, jobs: out });
    } catch (dbErr) {
      console.warn("Career jobs DB fallback:", dbErr);
      return NextResponse.json({ ok: true, jobs: memoryJobs });
    }
  } catch (err) {
    console.error("Career jobs API error:", err);
    return NextResponse.json(
      { ok: false, jobs: [], message: "Unable to load job openings." },
      { status: 500 }
    );
  }
}
