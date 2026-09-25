/**
 * Career data — job openings + in-memory application fallback store.
 *
 * The Prisma models (JobOpening, CareerApplication) are the source of truth
 * when the database is connected. In environments where the DB is not
 * reachable, this module provides an in-memory fallback so the Career page,
 * Open Positions page, and application submission all function end-to-end.
 */

export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  employmentType: string;
  description: string;
  postedAt: string; // ISO date
  active: boolean;
};

/** Sample openings — realistic Indian financial-services roles. */
export const SAMPLE_JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-rm-001",
    title: "Relationship Manager — Loans",
    department: "Sales & Business Development",
    location: "Surat, Gujarat",
    experience: "2-5 Years",
    employmentType: "Full-time",
    description:
      "Own a portfolio of loan customers, understand their financing needs across personal, business and home loans, and guide them through the application journey end-to-end. You will be the primary point of contact for customers and partner lenders.",
    postedAt: "2026-08-15",
    active: true,
  },
  {
    id: "job-se-002",
    title: "Sales Executive — Investments",
    department: "Sales & Business Development",
    location: "Surat, Gujarat",
    experience: "0-2 Years",
    employmentType: "Full-time",
    description:
      "Drive awareness and onboarding for our FD, RD and government bond products. Identify prospective customers, explain product features, and support them through the investment process. Freshers with strong communication skills are welcome.",
    postedAt: "2026-08-20",
    active: true,
  },
  {
    id: "job-cse-003",
    title: "Customer Service Executive",
    department: "Customer Services",
    location: "Surat, Gujarat",
    experience: "2-5 Years",
    employmentType: "Full-time",
    description:
      "Be the voice of TNL Fincorp for our customers. Handle inbound queries on loan applications, deposits and insurance, follow up on documentation, and resolve concerns with empathy and clarity. Track every interaction to closure.",
    postedAt: "2026-09-01",
    active: true,
  },
  {
    id: "job-fe-004",
    title: "Finance Executive",
    department: "Finance & Operations",
    location: "Surat, Gujarat",
    experience: "5+ Years",
    employmentType: "Full-time",
    description:
      "Manage day-to-day financial operations including reconciliations, payouts, compliance reporting and MIS. Work closely with the leadership team on cash flow monitoring, vendor payments and statutory filings. Strong accounting fundamentals required.",
    postedAt: "2026-08-28",
    active: true,
  },
  {
    id: "job-dm-005",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Remote / Surat",
    experience: "2-5 Years",
    employmentType: "Full-time",
    description:
      "Plan and execute digital campaigns across social, search and email. Create content calendars, manage lead-gen funnels, track performance and optimise spend. Opportunity to shape the digital presence of a growing fintech brand.",
    postedAt: "2026-09-05",
    active: true,
  },
  {
    id: "job-hr-006",
    title: "HR Executive",
    department: "Human Resources",
    location: "Surat, Gujarat",
    experience: "2-5 Years",
    employmentType: "Full-time",
    description:
      "Support the full hiring lifecycle — sourcing, screening, coordinating interviews and onboarding. Maintain employee records, assist with payroll inputs, and help build a positive workplace culture. Great opportunity to grow with the people team.",
    postedAt: "2026-09-10",
    active: true,
  },
];

/* ------------------------------------------------------------------ */
/* In-memory fallback store (used when the database is not reachable) */
/* ------------------------------------------------------------------ */

type StoredApplication = {
  id: string;
  jobId: string | null;
  jobTitle: string;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string | null;
  gender: string | null;
  currentCity: string | null;
  state: string | null;
  highestQualification: string | null;
  currentCompany: string | null;
  totalExperience: string | null;
  expectedSalary: string | null;
  noticePeriod: string | null;
  coverLetter: string | null;
  linkedinProfile: string | null;
  cvUrl: string;
  consent: boolean;
  status: string;
  createdAt: string;
};

const globalForCareer = globalThis as unknown as {
  __careerJobs?: JobOpening[];
  __careerApplications?: StoredApplication[];
};

export const memoryJobs: JobOpening[] =
  globalForCareer.__careerJobs ?? SAMPLE_JOB_OPENINGS;
globalForCareer.__careerJobs = memoryJobs;

export const memoryApplications: StoredApplication[] =
  globalForCareer.__careerApplications ?? [];
globalForCareer.__careerApplications = memoryApplications;

export type { StoredApplication };
