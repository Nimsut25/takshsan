"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight, CheckCircle2, Info, Phone, ShieldCheck, Sparkles,
  AlertTriangle, TrendingUp, CalendarClock, Briefcase, ChevronRight,
  XCircle, Wallet, PiggyBank,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { SectionHeading } from "@/components/tnl/section-heading";
import { BrandButton } from "@/components/tnl/brand-button";
import { LoanProcess, LoanFaq } from "@/components/tnl/loan-sections";
import { SipCalculator } from "@/components/tnl/sip-calculator";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useModalStore } from "@/lib/modal-store";
import { COMPANY } from "@/lib/site-data";
import {
  SIP_HERO, SIP_INTRO, SIP_BENEFITS, SIP_PROCESS, FUND_CATEGORIES,
  FUND_CATEGORIES_NOTE, SIP_VS_LUMPSUM, INVESTMENT_GOALS, SIP_CONSIDERATIONS,
  RISK_DISCLOSURE, SIP_FAQS, SIP_CTA, SIP_DISCLAIMER,
} from "@/lib/sip-data";
import { cn } from "@/lib/utils";

const ACCENT = "from-royal to-sky";

export function SipMutualFundsPage() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-mesh pt-28 pb-16 sm:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />
        <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-royal/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 size-96 rounded-full bg-teal-brand/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
          <div className="text-center lg:text-left">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-[11px] font-semibold text-royal shadow-soft">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-brand opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-teal-brand" /></span>
                {SIP_HERO.eyebrow}
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.05}><h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">{SIP_HERO.title}</h1></Reveal>
            <Reveal direction="up" delay={0.1}><p className="mt-3 font-display text-lg font-bold text-gradient-brand sm:text-xl">{SIP_HERO.subtitle}</p></Reveal>
            <Reveal direction="up" delay={0.15}><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">{SIP_HERO.description}</p></Reveal>
            <Reveal direction="up" delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <BrandButton onClick={() => openEnquiry("SIP & Mutual Funds")} size="lg" className={ACCENT}><Sparkles className="size-4" />Start Your Investment Journey</BrandButton>
                <a href="#intro" onClick={(e) => { e.preventDefault(); document.querySelector("#intro")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-5 py-3 text-sm font-semibold text-royal transition-colors hover:bg-primary/5">Learn About SIP</a>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
                <div className="relative aspect-[4/4.2] w-full"><Image src={SIP_HERO.image} alt="SIP & Mutual Funds investment dashboard" fill priority sizes="(max-width: 1024px) 90vw, 50vw" className="object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
              </div>
              {SIP_HERO.floatingCards.map((card, i) => (
                <motion.div key={card.label} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                  className={cn("absolute rounded-2xl glass p-3.5 shadow-soft", i === 0 && "left-2 top-10 animate-float-slow sm:-left-6", i === 1 && "right-2 top-1/3 animate-float-medium sm:-right-6", i === 2 && "bottom-6 left-6 animate-float-slow")}>
                  <div className="flex items-center gap-2.5">
                    <span className={cn("grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft", ACCENT)}><card.icon className="size-4" /></span>
                    <span className="text-xs font-semibold text-navy">{card.label}</span>
                  </div>
                </motion.div>
              ))}
              <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Introduction" title={SIP_INTRO.title} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal direction="up">
              <div className="h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow"><CalendarClock className="size-7" /></span>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">{SIP_INTRO.sip.title}</h3>
                <ul className="mt-4 space-y-2.5">{SIP_INTRO.sip.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />{p}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <div className="h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow"><Briefcase className="size-7" /></span>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">{SIP_INTRO.mutualFunds.title}</h3>
                <ul className="mt-4 space-y-2.5">{SIP_INTRO.mutualFunds.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />{p}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CONSIDER SIP */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Benefits" title="Why Consider" highlight="a SIP?" description="Educational information — actual benefits depend on the specific scheme and market conditions." />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {SIP_BENEFITS.map((b) => (
              <StaggerItem key={b.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className={cn("grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", ACCENT)}><b.icon className="size-7" /></div>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <LoanProcess steps={SIP_PROCESS} accent={ACCENT} />

      {/* FUND CATEGORIES */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Categories" title="Explore Mutual Fund" highlight="Categories" description="Each category has different risk-return characteristics. No fund category is universally suitable." />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {FUND_CATEGORIES.map((t) => (
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
          <Reveal direction="up" className="mt-6">
            <p className="mx-auto max-w-3xl text-center text-xs font-semibold text-royal">{FUND_CATEGORIES_NOTE}</p>
          </Reveal>
        </div>
      </section>

      {/* SIP VS LUMPSUM */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading eyebrow="Comparison" title={SIP_VS_LUMPSUM.title} description="Neither method is universally better — suitability depends on your goals, capital and strategy." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal direction="up">
              <div className="h-full rounded-3xl border border-teal-brand/20 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow"><CalendarClock className="size-6" /></span><h3 className="font-display text-lg font-bold text-navy">{SIP_VS_LUMPSUM.sip.title}</h3></div>
                <ul className="mt-4 space-y-2.5">{SIP_VS_LUMPSUM.sip.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />{p}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <div className="h-full rounded-3xl border border-royal/20 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow"><Wallet className="size-6" /></span><h3 className="font-display text-lg font-bold text-navy">{SIP_VS_LUMPSUM.lumpsum.title}</h3></div>
                <ul className="mt-4 space-y-2.5">{SIP_VS_LUMPSUM.lumpsum.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-royal" />{p}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INVESTMENT GOALS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Goal Planning" title="Plan Your Investments" highlight="Around Your Goals" description="Align your SIP with specific financial goals." />
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {INVESTMENT_GOALS.map((g) => (
              <StaggerItem key={g.title}>
                <div className="group h-full rounded-3xl border border-primary/10 bg-white p-5 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-card-hover">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><g.icon className="size-7" /></span>
                  <h3 className="mt-4 font-display text-sm font-bold text-navy">{g.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{g.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* SIP CALCULATOR */}
      <SipCalculator />

      {/* CONSIDERATIONS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#13316d] to-royal py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
        <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-sky/20 blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">Before You Invest</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Before You Invest, Consider <span className="text-amber-300">These Factors</span></h2>
          </div>
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {SIP_CONSIDERATIONS.map((c) => (
              <StaggerItem key={c.title}>
                <div className="group h-full rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white transition-transform group-hover:scale-110"><c.icon className="size-5" /></span>
                  <h3 className="mt-4 font-display text-sm font-bold text-white">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">{c.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* RISK DISCLOSURE */}
      <section className="relative overflow-hidden py-16">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-glow"><AlertTriangle className="size-6" /></span>
                <h3 className="font-display text-lg font-bold text-navy">Understand Investment Risk</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-amber-700">{RISK_DISCLOSURE}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <LoanFaq faqs={SIP_FAQS} title="SIP & Mutual Funds" highlight="FAQs" />

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center text-white shadow-glow sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-amber-400/15 blur-2xl" />
              <div className="relative">
                <TrendingUp className="mx-auto size-10 text-amber-300" />
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{SIP_CTA.title}</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">{SIP_CTA.description}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button onClick={() => openEnquiry("SIP & Mutual Funds")} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"><Sparkles className="size-4" />Get Investment Assistance</button>
                  <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Phone className="size-4" />Contact TNL Fincorp</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="relative py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-royal" />
            <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-navy">Disclaimer: </span>{SIP_DISCLAIMER}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
