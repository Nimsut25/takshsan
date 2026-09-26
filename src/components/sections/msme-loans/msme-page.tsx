"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarClock,
  Calculator as CalcIcon,
  CheckCircle2,
  Factory,
  HelpCircle,
  RefreshCw,
  Rocket,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Carousel } from "@/components/tnl/carousel";
import { BrandButton } from "@/components/tnl/brand-button";
import { Reveal } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";
import {
  MSME_ABOUT,
  MSME_BENEFITS,
  MSME_CALCULATOR,
  MSME_CTA,
  MSME_FAQ,
  MSME_HERO,
  MSME_LOAN_PURPOSE,
  MSME_LOAN_TYPES,
} from "./msme-content";
import { MsmeApplicationModal } from "@/components/tnl/msme-loans/msme-application-modal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  TrendingUp,
  Banknote,
  Building2,
  Sparkles,
  CalendarClock,
  Rocket,
  Factory,
  RefreshCw,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? Sparkles;
  return <C className={className} />;
}

/* =================================================================== */
/* MSME PAGE (with internal modal state)                               */
/* =================================================================== */
export function MsmePage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const openApply = () => setApplyOpen(true);

  return (
    <>
      <MsmeHero onApply={openApply} />
      <MsmeAbout />
      <MsmeBenefits />
      <MsmeLoanTypes onApply={openApply} />
      <MsmeCalculator onApply={openApply} />
      <MsmeLoanAvailable />
      <MsmeCtaBanner onApply={openApply} />
      <MsmeFaq />
      <MsmeApplicationModal open={applyOpen} onOpenChange={setApplyOpen} />
    </>
  );
}

/* =================================================================== */
/* 1. HERO                                                              */
/* =================================================================== */
function MsmeHero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* Background image with overlay */}
      <Image
        src="/images/msme-loans/hero.png"
        alt="Indian MSME business owner"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      {/* Decorative grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/25 backdrop-blur">
              <span className="size-1.5 rounded-full bg-gradient-to-r from-sky to-teal-brand animate-pulse" />
              {MSME_HERO.eyebrow}
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
              {MSME_HERO.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-4 font-display text-lg font-bold text-sky/90 drop-shadow-sm sm:text-xl">
              {MSME_HERO.subtitle}
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {MSME_HERO.description}
            </p>
          </Reveal>
          <Reveal direction="up" delay={400}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <BrandButton onClick={onApply} size="lg" data-cursor-magnetic>
                <Sparkles className="size-4" />
                {MSME_HERO.primaryCta}
              </BrandButton>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                {MSME_HERO.secondaryCta}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 2. ABOUT MSME LOANS                                                  */
/* =================================================================== */
function MsmeAbout() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-[#f6f9ff] via-white to-[#eef3ff] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <Reveal direction="scale">
            <div className="group relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-primary/10">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/msme-loans/about.png"
                  alt="Small business manufacturing workspace"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl" />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal direction="up" delay={120}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
              <Building2 className="size-3.5" />
              {MSME_ABOUT.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {MSME_ABOUT.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {MSME_ABOUT.description1}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {MSME_ABOUT.description2}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {MSME_ABOUT.cards.map((c, i) => (
                <Reveal key={c.title} direction="up" delay={i * 80}>
                  <div className="group h-full rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-glow">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <h3 className="mt-3.5 font-display text-base font-bold text-navy">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 3. FEATURES & BENEFITS — GRID                                       */
/* =================================================================== */
function MsmeBenefits() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <Sparkles className="size-3.5" />
            {MSME_BENEFITS.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {MSME_BENEFITS.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {MSME_BENEFITS.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MSME_BENEFITS.cards.map((b, i) => (
            <Reveal key={b.title} direction="up" delay={(i % 3) * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-glow">
                <div className={cn("pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20", b.accent)} />
                <span className={cn("grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow", b.accent)}>
                  <Icon name={b.icon} className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 4. TYPES OF MSME LOANS                                              */
/* =================================================================== */
function MsmeLoanTypes({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <Building2 className="size-3.5" />
            {MSME_LOAN_TYPES.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {MSME_LOAN_TYPES.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {MSME_LOAN_TYPES.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MSME_LOAN_TYPES.cards.map((t, i) => (
            <Reveal key={t.title} direction="up" delay={(i % 3) * 80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-glow">
                <div className={cn("pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20", t.accent)} />
                <span className={cn("grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow", t.accent)}>
                  <Icon name={t.icon} className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                <button
                  type="button"
                  onClick={onApply}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-navy"
                >
                  Apply Now
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-8">
          <p className="text-center text-xs text-muted-foreground">
            {MSME_LOAN_TYPES.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 5. MSME CALCULATOR                                                  */
/* =================================================================== */
function MsmeCalculator({ onApply }: { onApply: () => void }) {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  const [tenureUnit, setTenureUnit] = useState<"months" | "years">("months");
  const [calculated, setCalculated] = useState(true);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const months = tenureUnit === "years" ? tenure * 12 : tenure;
    const r = rate / 12 / 100;
    if (months <= 0) return { emi: 0, totalInterest: 0, totalPayment: amount };
    if (r <= 0) {
      const e = amount / months;
      return { emi: e, totalInterest: 0, totalPayment: amount };
    }
    const x = Math.pow(1 + r, months);
    const e = (amount * r * x) / (x - 1);
    const total = e * months;
    return { emi: e, totalInterest: total - amount, totalPayment: total };
  }, [amount, rate, tenure, tenureUnit]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.max(0, isFinite(n) ? n : 0));

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1f4d] via-[#1431a4] to-royal py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-sky/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/20">
            <CalcIcon className="size-3.5" />
            {MSME_CALCULATOR.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{MSME_CALCULATOR.title}</h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">{MSME_CALCULATOR.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <Reveal direction="up">
            <div className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-md sm:p-7">
              {/* Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/90">{MSME_CALCULATOR.labels.amount}</label>
                  <span className="font-display text-lg font-extrabold text-white">{fmt(amount)}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={50000000}
                  step={100000}
                  value={amount}
                  onChange={(e) => { setAmount(Number(e.target.value)); setCalculated(false); }}
                  className="w-full accent-sky"
                />
                <div className="flex justify-between text-[11px] text-white/60">
                  <span>₹1 Lakh</span>
                  <span>₹5 Crore</span>
                </div>
              </div>

              {/* Rate */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/90">{MSME_CALCULATOR.labels.rate}</label>
                  <span className="font-display text-lg font-extrabold text-white">{rate}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={24}
                  step={0.5}
                  value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); setCalculated(false); }}
                  className="w-full accent-sky"
                />
                <div className="flex justify-between text-[11px] text-white/60">
                  <span>0%</span>
                  <span>24%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/90">{MSME_CALCULATOR.labels.tenure}</label>
                  <div className="inline-flex overflow-hidden rounded-full border border-white/25">
                    <button
                      type="button"
                      onClick={() => { setTenureUnit("months"); setCalculated(false); }}
                      className={cn("px-3 py-1 text-xs font-semibold transition-colors", tenureUnit === "months" ? "bg-white text-navy" : "text-white/80 hover:bg-white/10")}
                    >
                      Months
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTenureUnit("years"); setCalculated(false); }}
                      className={cn("px-3 py-1 text-xs font-semibold transition-colors", tenureUnit === "years" ? "bg-white text-navy" : "text-white/80 hover:bg-white/10")}
                    >
                      Years
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={tenureUnit === "years" ? 1 : 6}
                    max={tenureUnit === "years" ? 15 : 180}
                    step={tenureUnit === "years" ? 1 : 6}
                    value={tenure}
                    onChange={(e) => { setTenure(Number(e.target.value)); setCalculated(false); }}
                    className="w-full accent-sky"
                  />
                  <span className="w-16 shrink-0 text-right font-display text-lg font-extrabold text-white">
                    {tenure} {tenureUnit === "years" ? "yr" : "mo"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCalculated(true)}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
              >
                <CalcIcon className="size-4" />
                {MSME_CALCULATOR.calculateBtn}
              </button>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal direction="up" delay={120}>
            <div className="flex h-full flex-col gap-4">
              <div className={cn("rounded-3xl bg-gradient-to-br from-white to-[#f6f9ff] p-6 text-navy shadow-glow transition-all duration-500 sm:p-7", calculated && "msme-result-pop")}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{MSME_CALCULATOR.labels.emi}</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-royal sm:text-4xl">{fmt(emi)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{MSME_CALCULATOR.labels.principal}</p>
                  <p className="mt-1 font-display text-lg font-extrabold text-white">{fmt(amount)}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{MSME_CALCULATOR.labels.totalInterest}</p>
                  <p className="mt-1 font-display text-lg font-extrabold text-white">{fmt(totalInterest)}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{MSME_CALCULATOR.labels.totalPayment}</p>
                <p className="mt-1 font-display text-lg font-extrabold text-white">{fmt(totalPayment)}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60">{MSME_CALCULATOR.disclaimer}</p>
              <button
                type="button"
                onClick={onApply}
                className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
              >
                <Sparkles className="size-4" />
                Apply Now
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 6. LOAN CAN BE AVAILABLE FOR — IMAGE CAROUSEL                       */
/* =================================================================== */
function MsmeLoanAvailable() {
  const slides = MSME_LOAN_PURPOSE.slides.map((s) => (
    <div key={s.title} className="relative h-full w-full">
      <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/20" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h3 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{s.title}</h3>
            <p className="mt-3 text-sm text-white/90 sm:text-base">{s.description}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="relative">
      <div className="bg-gradient-to-b from-white to-[#f6f9ff] pt-20 pb-10 sm:pt-24 sm:pb-12">
        <Reveal direction="up" className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <Building2 className="size-3.5" />
            {MSME_LOAN_PURPOSE.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {MSME_LOAN_PURPOSE.title}
          </h2>
        </Reveal>
      </div>
      <div className="relative h-[60vh] min-h-[440px] w-full sm:h-[68vh]">
        <Carousel slides={slides} interval={6000} className="h-full w-full" />
      </div>
    </section>
  );
}

/* =================================================================== */
/* 7. CTA BANNER                                                       */
/* =================================================================== */
function MsmeCtaBanner({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-royal via-[#3b6df0] to-sky py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-teal-brand/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-inset ring-white/25 backdrop-blur">
            <Sparkles className="size-3.5" />
            {MSME_CTA.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {MSME_CTA.title}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-white/90 sm:text-lg">
            {MSME_CTA.description}
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={onApply}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              {MSME_CTA.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 8. FAQ                                                              */
/* =================================================================== */
function MsmeFaq() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal direction="up" className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <HelpCircle className="size-3.5" />
            {MSME_FAQ.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {MSME_FAQ.title}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={120} className="mt-10">
          <Accordion type="single" collapsible className="space-y-3">
            {MSME_FAQ.items.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-primary/10 bg-white px-5 shadow-soft"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-navy hover:no-underline">
                  <span className="pr-3">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
