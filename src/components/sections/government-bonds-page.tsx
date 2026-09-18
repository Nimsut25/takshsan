"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronRight,
  Info, Landmark, Phone, ShieldCheck, Sparkles, TrendingUp, XCircle,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { SectionHeading } from "@/components/tnl/section-heading";
import { BrandButton } from "@/components/tnl/brand-button";
import { LoanProcess, LoanFaq } from "@/components/tnl/loan-sections";
import { BondCalculator } from "@/components/tnl/bond-calculator";
import { COMPANY } from "@/lib/site-data";
import {
  BONDS_HERO, BONDS_INTRO, BONDS_BENEFITS, BONDS_PROCESS, BOND_TYPES,
  BONDS_COMPARISON, BONDS_PRICE_RATE, BONDS_HOLD_VS_SELL, BONDS_PROFILES,
  BONDS_PROFILES_NOTE, BONDS_BENEFITS_RISKS, BONDS_EXAMPLE, BONDS_INVEST_PROCESS,
  BONDS_TRUST, BONDS_FAQS, BONDS_DISCLAIMER,
} from "@/lib/bonds-data";
import { cn } from "@/lib/utils";

const ACCENT = "from-navy to-royal";

export function GovernmentBondsPage() {
  return (
    <div className="overflow-hidden">
      <BondsHero />
      <BondsIntro />
      <BondsWhyConsider />
      <LoanProcess steps={BONDS_PROCESS} accent={ACCENT} />
      <BondsTypes />
      <BondsComparison />
      <BondsPriceRate />
      <BondsHoldVsSell />
      <BondsProfiles />
      <BondsBenefitsRisks />
      <BondsExample />
      <LoanProcess steps={BONDS_INVEST_PROCESS} accent="from-royal to-sky" />
      <BondCalculator />
      <BondsTrust />
      <LoanFaq faqs={BONDS_FAQS} title="Government Bonds" highlight="FAQs" />
      <BondsFinalCta />
      <BondsDisclaimerSection />
    </div>
  );
}

function BondsHero() {
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
              {BONDS_HERO.eyebrow}
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.05}><h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">{BONDS_HERO.title}</h1></Reveal>
          <Reveal direction="up" delay={0.1}><p className="mt-3 font-display text-lg font-bold text-gradient-brand sm:text-xl">{BONDS_HERO.subtitle}</p></Reveal>
          <Reveal direction="up" delay={0.15}><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">{BONDS_HERO.description}</p></Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 lg:mx-0 lg:justify-start">
              <Info className="size-4 shrink-0 text-amber-600" />
              <p className="text-left text-[11px] leading-relaxed text-amber-700">{BONDS_HERO.riskNote}</p>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.25}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <BrandButton href="#types" size="lg" className={ACCENT}><Sparkles className="size-4" />Explore Government Bonds</BrandButton>
              <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-5 py-3 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"><Phone className="size-4" />Talk to an Investment Expert</a>
            </div>
          </Reveal>
        </div>
        <Reveal direction="left" delay={0.1} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
              <div className="relative aspect-[4/4.2] w-full"><Image src={BONDS_HERO.image} alt="Government bonds investment dashboard" fill priority sizes="(max-width: 1024px) 90vw, 50vw" className="object-cover" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
            </div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="absolute -left-3 top-10 w-44 rounded-2xl glass p-3.5 shadow-soft animate-float-slow sm:-left-6">
              <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white"><ShieldCheck className="size-4" /></span><div className="leading-tight"><div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Sovereign</div><div className="font-display text-sm font-bold text-navy">Government Issuer</div></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className="absolute -right-3 top-1/3 w-44 rounded-2xl glass p-3.5 shadow-soft animate-float-medium sm:-right-6">
              <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white"><TrendingUp className="size-4" /></span><div className="leading-tight"><div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Illustrative</div><div className="font-display text-sm font-bold text-navy">Coupon Income</div></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft animate-float-slow"><Landmark className="size-4 text-royal" /><span className="text-xs font-semibold text-navy">Stable • Long-term</span></motion.div>
            <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-amber-500/40 animate-spin-slow" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BondsIntro() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Introduction" title={BONDS_INTRO.title} />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
                <div className="relative aspect-square w-full"><Image src={BONDS_INTRO.image} alt="Government bond certificate illustration" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" /></div>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
              </div>
              <div className="pointer-events-none absolute -left-5 -top-5 size-16 rounded-full border-2 border-dashed border-amber-500/40 animate-spin-slow" />
            </div>
          </Reveal>
          <div>
            <Reveal direction="up"><div className="space-y-4">{BONDS_INTRO.paragraphs.map((p, i) => <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p}</p>)}</div></Reveal>
            <Reveal direction="up" delay={0.1}>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {BONDS_INTRO.keyTerms.map((kt) => (
                  <div key={kt.term} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-soft"><div className="font-display text-sm font-bold text-navy">{kt.term}</div><div className="mt-1 text-xs leading-relaxed text-muted-foreground">{kt.desc}</div></div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-navy sm:text-sm">
                  {BONDS_INTRO.flow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2"><span className="rounded-full bg-white px-3 py-1.5 shadow-soft">{step}</span>{i < BONDS_INTRO.flow.length - 1 && <ChevronRight className="size-4 text-royal" />}</span>
                  ))}
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-amber-700"><AlertTriangle className="mt-0.5 size-3.5 shrink-0" />{BONDS_INTRO.sellNote}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function BondsWhyConsider() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Why Consider" title="Why Consider" highlight="Government Bonds?" description="Educational reasons investors may consider government securities — not a recommendation." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {BONDS_BENEFITS.map((b) => (
            <StaggerItem key={b.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><b.icon className="size-7" /></div>
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

function BondsTypes() {
  return (
    <section id="types" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Securities" title="Types of" highlight="Government Securities" description="Availability, issue dates, coupon rates, maturity and terms can change. Not every security is continuously available." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {BOND_TYPES.map((t) => (
            <StaggerItem key={t.id}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className={cn("relative h-20 overflow-hidden bg-gradient-to-r", t.accent)}>
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                  <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/20 blur-xl" />
                  <div className="absolute -bottom-5 left-5"><span className="grid size-12 place-items-center rounded-2xl bg-white text-navy shadow-glow ring-1 ring-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><t.icon className="size-6" /></span></div>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-7">
                  <h3 className="font-display text-base font-bold text-navy">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                  {t.examples && <div className="mt-4 flex flex-wrap gap-1.5">{t.examples.map((ex) => <span key={ex} className="rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-royal">{ex}</span>)}</div>}
                  <Link
                    href={`/government-bonds/apply/${t.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow active:scale-95"
                  >
                    <Sparkles className="size-4" />
                    Apply Now
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function BondsComparison() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Comparison" title={BONDS_COMPARISON.title} description={BONDS_COMPARISON.description} />
        <Reveal direction="up" className="mt-12">
          <div className="hidden overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft md:block">
            <div className="grid grid-cols-5 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5">
              {BONDS_COMPARISON.headers.map((h, i) => (
                <div key={h} className={cn("px-4 py-4 text-xs font-bold uppercase tracking-wider", i === 0 ? "text-muted-foreground" : "text-royal", i > 0 && "border-l border-primary/10")}>{h}</div>
              ))}
            </div>
            {BONDS_COMPARISON.rows.map((row, i) => (
              <div key={row.feature} className={cn("grid grid-cols-5", i % 2 === 0 ? "bg-white" : "bg-secondary/30")}>
                <div className="px-4 py-4 text-xs font-semibold text-navy sm:text-sm">{row.feature}</div>
                <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:text-sm">{row.govtBonds}</div>
                <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:text-sm">{row.bankFd}</div>
                <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:text-sm">{row.equityMf}</div>
                <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:text-sm">{row.corpBonds}</div>
              </div>
            ))}
          </div>
          <div className="space-y-4 md:hidden">
            {BONDS_COMPARISON.rows.map((row) => (
              <div key={row.feature} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-soft">
                <div className="font-display text-sm font-bold text-navy">{row.feature}</div>
                <div className="mt-3 space-y-2 text-xs">
                  <CompRow label="Govt Bonds" value={row.govtBonds} highlight />
                  <CompRow label="Bank FDs" value={row.bankFd} />
                  <CompRow label="Equity MFs" value={row.equityMf} />
                  <CompRow label="Corporate Bonds" value={row.corpBonds} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 border-t border-primary/5 pt-2">
      <span className={cn("shrink-0 font-semibold", highlight ? "text-royal" : "text-muted-foreground")}>{label}</span>
      <span className="text-right text-foreground/80">{value}</span>
    </div>
  );
}

function BondsPriceRate() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-sky/15 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading eyebrow="Education" title={BONDS_PRICE_RATE.title} description={BONDS_PRICE_RATE.description} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-soft"><ArrowUpRight className="size-6" /></span><span className="font-display text-base font-bold text-navy">{BONDS_PRICE_RATE.ruleUp.label}</span></div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-rose-600"><ArrowDownRight className="size-5" />{BONDS_PRICE_RATE.ruleUp.effect}</div>
              <svg viewBox="0 0 200 60" className="mt-4 w-full" aria-hidden><motion.path d="M5 15 Q 60 20, 100 35 T 195 55" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" initial={reduce ? {} : { pathLength: 0 }} whileInView={reduce ? {} : { pathLength: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.5, ease: "easeInOut" }} /></svg>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-soft"><ArrowDownRight className="size-6" /></span><span className="font-display text-base font-bold text-navy">{BONDS_PRICE_RATE.ruleDown.label}</span></div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-teal-brand"><ArrowUpRight className="size-5" />{BONDS_PRICE_RATE.ruleDown.effect}</div>
              <svg viewBox="0 0 200 60" className="mt-4 w-full" aria-hidden><motion.path d="M5 55 Q 60 50, 100 35 T 195 15" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" initial={reduce ? {} : { pathLength: 0 }} whileInView={reduce ? {} : { pathLength: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.5, ease: "easeInOut" }} /></svg>
            </div>
          </Reveal>
        </div>
        <Reveal direction="up" className="mt-6"><p className="flex items-start gap-1.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-amber-700"><Info className="mt-0.5 size-4 shrink-0" />{BONDS_PRICE_RATE.note}</p></Reveal>
      </div>
    </section>
  );
}

function BondsHoldVsSell() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Strategy" title={BONDS_HOLD_VS_SELL.title} description="Two different approaches with different implications." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal direction="up">
            <div className="relative h-full overflow-hidden rounded-3xl border border-teal-brand/20 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow"><ShieldCheck className="size-6" /></span><h3 className="font-display text-lg font-bold text-navy">{BONDS_HOLD_VS_SELL.hold.title}</h3></div>
              <ul className="mt-4 space-y-2.5">{BONDS_HOLD_VS_SELL.hold.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />{p}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-amber-500/20 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-glow"><TrendingUp className="size-6" /></span><h3 className="font-display text-lg font-bold text-navy">{BONDS_HOLD_VS_SELL.sell.title}</h3></div>
              <ul className="mt-4 space-y-2.5">{BONDS_HOLD_VS_SELL.sell.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />{p}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BondsProfiles() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Suitability" title="Who May Consider" highlight="Government Bonds?" description="Educational profiles — not a recommendation for any specific investor." />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {BONDS_PROFILES.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><p.icon className="size-7" /></span>
                <h3 className="mt-5 font-display text-base font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal direction="up" className="mt-8"><p className="mx-auto max-w-3xl text-center text-sm font-semibold text-royal">{BONDS_PROFILES_NOTE}</p></Reveal>
      </div>
    </section>
  );
}

function BondsBenefitsRisks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading eyebrow="Balanced View" title={BONDS_BENEFITS_RISKS.title} description="A balanced understanding of both potential benefits and risks." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal direction="up">
            <div className="h-full rounded-3xl border border-teal-brand/20 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow"><CheckCircle2 className="size-5" /></span><h3 className="font-display text-lg font-bold text-navy">Potential Benefits</h3></div>
              <ul className="mt-4 space-y-2.5">{BONDS_BENEFITS_RISKS.benefits.map((b) => <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />{b}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="h-full rounded-3xl border border-amber-500/20 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-glow"><AlertTriangle className="size-5" /></span><h3 className="font-display text-lg font-bold text-navy">Risks to Understand</h3></div>
              <ul className="mt-4 space-y-2.5">{BONDS_BENEFITS_RISKS.risks.map((r) => <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground"><XCircle className="mt-0.5 size-4 shrink-0 text-amber-500" />{r}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BondsExample() {
  const annualCoupon = (BONDS_EXAMPLE.faceValue * BONDS_EXAMPLE.couponRate) / 100;
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading eyebrow="Illustrative Example" title={BONDS_EXAMPLE.title} />
        <Reveal direction="up" className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-navy via-[#13316d] to-royal p-6 text-white shadow-glow sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
            <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-amber-400/20 blur-2xl" />
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4"><div className="text-[11px] uppercase tracking-wider text-white/60">Investment / Face Value</div><div className="mt-1 font-display text-2xl font-bold">₹{BONDS_EXAMPLE.faceValue.toLocaleString("en-IN")}</div></div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4"><div className="text-[11px] uppercase tracking-wider text-white/60">Illustrative Coupon</div><div className="mt-1 font-display text-2xl font-bold text-amber-300">{BONDS_EXAMPLE.couponRate}% / year</div></div>
              </div>
              <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4 text-center">
                <div className="text-[11px] uppercase tracking-wider text-amber-200/80">Illustrative Annual Coupon</div>
                <div className="mt-1 font-display text-3xl font-extrabold text-amber-300">₹{annualCoupon.toLocaleString("en-IN")}</div>
              </div>
              <ul className="mt-5 space-y-2">{BONDS_EXAMPLE.points.map((p) => <li key={p} className="flex items-start gap-2 text-xs text-white/80"><Info className="mt-0.5 size-3.5 shrink-0 text-amber-300" />{p}</li>)}</ul>
              <p className="mt-5 flex items-start gap-1.5 rounded-xl bg-amber-500/15 p-3 text-[11px] leading-relaxed text-amber-100"><AlertTriangle className="mt-0.5 size-3.5 shrink-0" />{BONDS_EXAMPLE.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BondsTrust() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading eyebrow="TNL Fincorp" title={BONDS_TRUST.title} description={BONDS_TRUST.description} />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3" stagger={0.1}>
          {BONDS_TRUST.cards.map((c) => (
            <StaggerItem key={c.title}>
              <div className="group h-full rounded-3xl border border-primary/10 bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110"><c.icon className="size-7" /></span>
                <h3 className="mt-5 font-display text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal direction="up" className="mt-10 text-center"><BrandButton href={COMPANY.phoneHref} size="lg" className={ACCENT}><Phone className="size-4" />Talk to TNL Fincorp</BrandButton></Reveal>
      </div>
    </section>
  );
}

function BondsFinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center text-white shadow-glow sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
            <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-amber-400/15 blur-2xl" />
            <div className="relative">
              <Sparkles className="mx-auto size-10 text-amber-300" />
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Explore Smarter Investment Opportunities</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">Understand government securities, compare your options, and make investment decisions based on your own financial goals.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#types" onClick={(e) => { e.preventDefault(); document.querySelector("#types")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"><Sparkles className="size-4" />Explore Government Bonds</a>
                <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Phone className="size-4" />Contact TNL Fincorp</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BondsDisclaimerSection() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-royal" />
          <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-navy">Disclaimer: </span>{BONDS_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}
