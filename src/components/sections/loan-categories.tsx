"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LOAN_PRODUCTS, LOAN_ROUTE } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";

export function LoanCategories() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-1/2 size-80 -translate-y-1/2 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quick Categories"
          title="Choose Your"
          highlight="Loan Category"
          description="Pick a category to explore suitable loan options with personalized guidance and documentation support."
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOAN_PRODUCTS.map((loan) => (
            <StaggerItem key={loan.slug}>
              <Link
                href={LOAN_ROUTE[loan.slug]}
                className="group relative block w-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-card-hover"
              >
                {/* hover gradient wash */}
                <div
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30",
                    loan.accent
                  )}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={cn(
                      "grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                      loan.accent
                    )}
                  >
                    <loan.icon className="size-7" />
                  </div>
                  <span className="grid size-9 place-items-center rounded-full border border-primary/10 text-royal transition-all group-hover:bg-primary/5 group-hover:rotate-12">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-bold text-navy">
                  {loan.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {loan.short}
                </p>

                <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                  Learn More
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Banner mini CTA */}
        <Reveal direction="up" className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center shadow-glow sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Not sure which loan fits you?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Our team helps you explore suitable options based on your
                requirement. No pressure, just guidance.
              </p>
              <a
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#enquiry")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Check Loan Options
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
