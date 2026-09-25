"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  CalendarDays,
  Clock,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import {
  JobApplicationModal,
  type JobForApplication,
} from "@/components/tnl/career/job-application-modal";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  employmentType: string;
  description: string;
  postedAt: string;
  active: boolean;
};

const EXPERIENCE_OPTIONS = ["Fresher", "0-2 Years", "2-5 Years", "5+ Years"];

function formatDate(d: string) {
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export default function OpenPositionsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [experience, setExperience] = useState("All");

  const [applyJob, setApplyJob] = useState<JobForApplication | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/career/jobs", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) {
          if (data.ok) setJobs(data.jobs);
          else setError(data.message ?? "Unable to load openings.");
        }
      } catch {
        if (!cancelled) setError("Unable to load openings. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (location !== "All" && j.location !== location) return false;
      if (experience !== "All" && j.experience !== experience) return false;
      if (q) {
        const hay = [j.title, j.department, j.description, j.location].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, query, location, experience]);

  const openApply = (job: Job) => {
    setApplyJob({ id: job.id, title: job.title, location: job.location, experience: job.experience });
    setApplyOpen(true);
  };

  const hasFilters = query || location !== "All" || experience !== "All";

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20 sm:pt-32">
        {/* Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#1d3fcc] to-royal py-16 text-white sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-sky/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/25">
              <Briefcase className="size-3.5" />
              Careers
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Open Positions</h1>
            <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
              Explore our current openings and find the role that’s right for you.
            </p>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="relative -mt-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-2xl border border-primary/10 bg-white p-4 shadow-glow sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search jobs by title, department or keyword"
                    className="h-11 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  aria-label="Filter by location"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>
                  ))}
                </select>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  aria-label="Filter by experience"
                >
                  <option value="All">All Experience Levels</option>
                  {EXPERIENCE_OPTIONS.map((x) => (
                    <option key={x} value={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading openings…" : `${filtered.length} opening${filtered.length === 1 ? "" : "s"} found`}
              </p>
              {hasFilters && !loading && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setLocation("All"); setExperience("All"); }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-royal transition-colors hover:text-navy"
                >
                  <X className="size-3.5" />
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-8 animate-spin text-royal" />
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-10 text-center">
                <Search className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-3 font-display text-lg font-bold text-navy">No openings match your search</p>
                <p className="mt-1.5 text-sm text-muted-foreground">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} onApply={() => openApply(job)} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
      <JobApplicationModal job={applyJob} open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-glow sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-extrabold text-navy">{job.title}</h3>
          <p className="mt-0.5 text-sm font-medium text-royal">{job.department}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <CalendarDays className="size-3" />
          {formatDate(job.postedAt)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-royal" />{job.location}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-royal" />{job.experience}</span>
        <span className="inline-flex items-center gap-1.5"><Briefcase className="size-3.5 text-royal" />{job.employmentType}</span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{job.description}</p>

      <div className="mt-5">
        <button
          type="button"
          onClick={onApply}
          className="group/apply inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal via-[#3b6df0] to-sky px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-12px_rgba(56,102,243,0.6)] sm:w-auto sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
        >
          <Briefcase className="size-4" />
          Apply Now
        </button>
      </div>
    </article>
  );
}
