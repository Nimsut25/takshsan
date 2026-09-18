"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PartnerCard } from "@/components/tnl/partner-card";
import { LoanApplicationModal } from "@/components/tnl/loan-application-modal";
import {
  getCategoryBySlug, getPartnersByCategory, INSTANT_LOAN_FAQS,
  INSTANT_LOAN_DISCLAIMER, type InstantLoanPartner,
} from "@/lib/instant-loan-data";

export function InstantLoanCategoryPage({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  const partners = getPartnersByCategory(categorySlug as "personal-loan" | "business-loan" | "credit-cards");
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<InstantLoanPartner | null>(null);

  useEffect(() => {
    // Check localStorage for unlock flag (frontend fallback)
    const flag = localStorage.getItem("tnl_il_unlocked");
    if (flag === "true") {
      queueMicrotask(() => setUnlocked(true));
      return;
    }
    // Try API check
    const mobile = localStorage.getItem("tnl_il_mobile");
    if (mobile) {
      fetch(`/api/instant-loan/status?mobile=${mobile}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.ok && d.unlocked) {
            setUnlocked(true);
            localStorage.setItem("tnl_il_unlocked", "true");
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleApply = (partner: InstantLoanPartner) => {
    setSelectedPartner(partner);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    // Re-check unlock state after modal close (payment may have succeeded)
    const flag = localStorage.getItem("tnl_il_unlocked");
    if (flag === "true") setUnlocked(true);
  };

  if (!category) return null;

  return (
    <div className="overflow-hidden">
      {/* Category Hero */}
      <section className="relative overflow-hidden bg-mesh pt-28 pb-12 sm:pt-32 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <div className="pointer-events-none absolute -top-24 left-1/4 size-80 rounded-full bg-royal/15 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Reveal direction="up">
            <Link href="/instant-loan" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:gap-2 transition-all">
              <ArrowLeft className="size-4" /> Back to Instant Loan
            </Link>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              {category.title} <span className="text-gradient-brand">Partners</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {category.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Unlock banner */}
      {unlocked && (
        <div className="relative border-b border-teal-brand/20 bg-teal-brand/5">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3 lg:px-8">
            <CheckCircle2 className="size-5 shrink-0 text-teal-brand" />
            <p className="text-sm font-semibold text-teal-brand">
              Verification Completed — Partner applications are now unlocked for your eligible application session.
            </p>
          </div>
        </div>
      )}

      {/* Partner Grid */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Available Partners"
            title={`${partners.length} ${category.title} Partners`}
            description="Review the available options and click Apply Now to begin the application process."
          />
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.08}>
            {partners.map((partner) => (
              <StaggerItem key={partner.id}>
                <PartnerCard partner={partner} unlocked={unlocked} onApply={handleApply} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked" highlight="Questions" />
          <Reveal direction="up" className="mt-10">
            <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
              <Accordion type="single" collapsible>
                {INSTANT_LOAN_FAQS.map((f, i) => (
                  <AccordionItem key={i} value={`q-${i}`} className="overflow-hidden rounded-2xl border-b border-primary/10 px-4 last:border-b-0 data-[state=open]:bg-primary/[0.03]">
                    <AccordionTrigger className="py-5 text-left font-display text-sm font-semibold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 pl-2 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-royal" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-navy">Important Information: </span>
              {INSTANT_LOAN_DISCLAIMER}
            </p>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <LoanApplicationModal
        open={modalOpen}
        onClose={handleClose}
        partner={selectedPartner}
        category={categorySlug}
      />
    </div>
  );
}
