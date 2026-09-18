"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight, CheckCircle2, Info, Phone, ShieldCheck, Sparkles, AlertTriangle,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { SectionHeading } from "@/components/tnl/section-heading";
import { BrandButton } from "@/components/tnl/brand-button";
import { LoanProcess, LoanFaq } from "@/components/tnl/loan-sections";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useModalStore } from "@/lib/modal-store";
import type { InsurancePageContent } from "@/lib/insurance-data";
import { INSURANCE_DATA } from "@/lib/insurance-data";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function InsurancePage({ slug }: { slug: "life" | "general" | "motor" }) {
  const data: InsurancePageContent = INSURANCE_DATA[slug];
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <div className="overflow-hidden">
      <InsuranceHero data={data} />
      <InsuranceBenefits data={data} />
      <InsuranceTypes data={data} />
      <LoanProcess steps={data.process} accent={data.accent} />
      <InsuranceFactors data={data} />
      {data.coverage && <InsuranceCoverage data={data} />}
      {data.claimProcess && <InsuranceClaimProcess data={data} />}
      <InsuranceFaqSection data={data} />
      <InsuranceCta data={data} onEnquire={() => openEnquiry(data.heroTitle)} />
      <InsuranceDisclaimer data={data} />
    </div>
  );
}

/* ─────────────── Hero ─────────────── */
function InsuranceHero({ data }: { data: InsurancePageContent }) {
  return (
    <section id="home" className="relative overflow-hidden bg-mesh pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-royal/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 size-96 rounded-full bg-teal-brand/15 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="text-center lg:text-left">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-[11px] font-semibold text-royal shadow-soft">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-brand opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-teal-brand" /></span>
              {data.eyebrow}
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.05}><h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">{data.heroTitle}</h1></Reveal>
          <Reveal direction="up" delay={0.1}><p className="mt-3 font-display text-lg font-bold text-gradient-brand sm:text-xl">{data.heroSubtitle}</p></Reveal>
          <Reveal direction="up" delay={0.15}><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">{data.heroDescription}</p></Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <BrandButton href="#types" size="lg" className={data.accent}><Sparkles className="size-4" />Explore {data.heroTitle}</BrandButton>
              <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-5 py-3 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"><Phone className="size-4" />Get Started</a>
            </div>
          </Reveal>
        </div>
        <Reveal direction="left" delay={0.1} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
              <div className="relative aspect-[4/4.2] w-full"><Image src={data.heroImage} alt={`${data.heroTitle} — TNL Fincorp`} fill priority sizes="(max-width: 1024px) 90vw, 50vw" className="object-cover" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
            </div>
            {data.heroFloatingCards.slice(0, 3).map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                className={cn("absolute rounded-2xl glass p-3.5 shadow-soft", i === 0 && "left-2 top-10 animate-float-slow sm:-left-6", i === 1 && "right-2 top-1/3 animate-float-medium sm:-right-6", i === 2 && "bottom-6 left-6 animate-float-slow")}>
                <div className="flex items-center gap-2.5">
                  <span className={cn("grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft", data.accent)}><card.icon className="size-4" /></span>
                  <span className="text-xs font-semibold text-navy">{card.label}</span>
                </div>
              </motion.div>
            ))}
            <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Benefits ─────────────── */
function InsuranceBenefits({ data }: { data: InsurancePageContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Benefits" title={data.benefitsTitle} highlight={data.benefitsHighlight} description="Educational information — actual benefits depend on the specific insurer and policy terms." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {data.benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className={cn("grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", data.accent)}><b.icon className="size-7" /></div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Types / Coverage Categories ─────────────── */
function InsuranceTypes({ data }: { data: InsurancePageContent }) {
  return (
    <section id="types" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Categories" title={data.typesTitle} highlight={data.typesHighlight} description="Features, premiums, benefits and terms vary by policy. Not all products are available from all insurers." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {data.types.map((t) => (
            <StaggerItem key={t.title}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className={cn("relative h-20 overflow-hidden bg-gradient-to-r", t.accent)}>
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                  <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/20 blur-xl" />
                  <div className="absolute -bottom-5 left-5"><span className="grid size-12 place-items-center rounded-2xl bg-white text-navy shadow-glow ring-1 ring-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><t.icon className="size-6" /></span></div>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-7">
                  <h3 className="font-display text-base font-bold text-navy">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Factors / Key Considerations ─────────────── */
function InsuranceFactors({ data }: { data: InsurancePageContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Key Considerations" title={data.factorsTitle} highlight={data.factorsHighlight} description="Important factors to review before choosing a policy." />
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {data.factors.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group flex h-full gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-sky/10 text-royal transition-colors group-hover:from-royal group-hover:to-sky group-hover:text-white"><f.icon className="size-5" /></span>
                <div>
                  <div className="font-display text-sm font-bold text-navy">{f.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Coverage / Add-ons (Motor) ─────────────── */
function InsuranceCoverage({ data }: { data: InsurancePageContent }) {
  if (!data.coverage) return null;
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Add-ons" title={data.coverageTitle || "Optional"} highlight={data.coverageHighlight} description="Availability varies by insurer and policy. These are not automatically included in every policy." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {data.coverage.map((c) => (
            <StaggerItem key={c.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110"><c.icon className="size-6" /></span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Claim Process (Motor) ─────────────── */
function InsuranceClaimProcess({ data }: { data: InsurancePageContent }) {
  if (!data.claimProcess) return null;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Claim Process" title={data.claimProcessTitle || ""} highlight={data.claimProcessHighlight} description="Actual claim procedures differ between insurers and policies." />
        <LoanProcess steps={data.claimProcess} accent="from-teal-brand to-cyan-brand" />
      </div>
    </section>
  );
}

/* ─────────────── FAQ ─────────────── */
function InsuranceFaqSection({ data }: { data: InsurancePageContent }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked" highlight="Questions" description="Clear educational answers about insurance. Actual terms depend on the specific insurer and policy." />
        <Reveal direction="up" className="mt-10">
          <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
            <Accordion type="single" collapsible>
              {data.faqs.map((f, i) => (
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
  );
}

/* ─────────────── CTA ─────────────── */
function InsuranceCta({ data, onEnquire }: { data: InsurancePageContent; onEnquire: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center text-white shadow-glow sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
            <div className="relative">
              <ShieldCheck className="mx-auto size-10 text-amber-300" />
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{data.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">{data.ctaDescription}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={onEnquire} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"><Sparkles className="size-4" />Explore Insurance Options</button>
                <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Phone className="size-4" />Contact TNL Fincorp</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Disclaimer ─────────────── */
function InsuranceDisclaimer({ data }: { data: InsurancePageContent }) {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-royal" />
          <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-navy">Important: </span>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
