"use client";

import {
  CheckCircle2,
  FileText,
  ListChecks,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  LOAN_PRODUCTS,
  LOAN_ROUTE,
  COMPANY,
  DISCLAIMER,
  type LoanProduct,
} from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { BrandButton } from "@/components/tnl/brand-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * Shared loan detail content (used by both the modal and the /loans/[slug] page).
 * `onEnquire` lets the caller decide what happens when the Enquire CTA is
 * clicked (modal closes itself first; page opens the enquiry modal).
 */
export function LoanDetailContent({
  loan,
  onEnquire,
}: {
  loan: LoanProduct;
  onEnquire?: () => void;
}) {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
        <Image
          src={loan.image}
          alt={`${loan.title} assistance by TNL Fincorp`}
          fill
          sizes="(max-width: 1024px) 95vw, 1200px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/20" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
                loan.accent
              )}
            >
              <loan.icon className="size-6" />
            </span>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <Sparkles className="size-3" />
                Loan Service
              </span>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                {loan.title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Overview */}
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:max-w-4xl">
          {loan.overview}
        </p>

        {/* Benefits + Use cases */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 text-royal">
              <ListChecks className="size-5" />
              <h3 className="font-display text-base font-bold text-navy">
                Key Benefits
              </h3>
            </div>
            <ul className="mt-3 space-y-2.5">
              {loan.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 text-royal">
              <Target className="size-5" />
              <h3 className="font-display text-base font-bold text-navy">
                Suitable For
              </h3>
            </div>
            <ul className="mt-3 space-y-2.5">
              {loan.useCases.map((u) => (
                <li
                  key={u}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-royal to-sky" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Eligibility + Documents */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 text-royal">
              <Users className="size-5" />
              <h3 className="font-display text-base font-bold text-navy">
                Basic Eligibility Guidance
              </h3>
            </div>
            <ul className="mt-3 space-y-2.5">
              {loan.eligibility.map((e) => (
                <li
                  key={e}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-royal" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Final eligibility is subject to the respective lender&apos;s
              policies and verification.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 text-royal">
              <FileText className="size-5" />
              <h3 className="font-display text-base font-bold text-navy">
                Typical Documentation
              </h3>
            </div>
            <ul className="mt-3 space-y-2.5">
              {loan.documents.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-teal-brand to-cyan-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5 p-5">
          <div className="flex items-center gap-2 text-royal">
            <ShieldCheck className="size-5" />
            <h3 className="font-display text-base font-bold text-navy">
              Application Process
            </h3>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {loan.process.map((p, i) => (
              <div
                key={p}
                className="relative rounded-xl border border-primary/10 bg-white p-4"
              >
                <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-royal to-sky text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-2 text-xs font-semibold text-navy">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6">
          <h3 className="font-display text-lg font-bold text-navy">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="mt-3">
            {loan.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="border-b border-primary/10"
              >
                <AccordionTrigger className="text-left font-display text-sm font-semibold text-navy hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex gap-2.5 rounded-2xl border border-primary/10 bg-secondary/40 p-4">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-royal" />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {DISCLAIMER}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-navy via-royal to-sky p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold">
              Interested in a {loan.title}?
            </h3>
            <p className="text-sm text-white/80">
              Share your requirement and our team will guide you.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <BrandButton
              variant="white"
              onClick={() => {
                onEnquire?.();
                openEnquiry(loan.title);
              }}
            >
              <Sparkles className="size-4" />
              Enquire Now
            </BrandButton>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="size-4" />
              Call
            </a>
          </div>
        </div>

        {/* Other loans */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-muted-foreground">
            Explore other loan solutions
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {LOAN_PRODUCTS.filter((p) => p.slug !== loan.slug).map((p) => (
              <Link
                key={p.slug}
                href={LOAN_ROUTE[p.slug]}
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-2 text-xs font-semibold text-royal transition-colors hover:bg-primary/5"
              >
                <p.icon className="size-3.5" />
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
