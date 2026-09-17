"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Pause,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/tnl/section-heading";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/tnl/reveal";
import { AnimatedCounter } from "@/components/tnl/animated-counter";
import { BrandButton } from "@/components/tnl/brand-button";
import { LoanApplyModal, type LoanApplyConfig } from "@/components/tnl/loan-apply-modal";
import type {
  LoanBenefit,
  LoanProcessStep,
  LoanWhyBetter,
  LoanTestimonial,
  TrustCounter as TrustCounterType,
  LoanTypeCard,
} from "@/lib/loan-page-data";
import { cn } from "@/lib/utils";

/* ─────────────── Benefits ─────────────── */
export function LoanBenefits({
  eyebrow,
  title,
  highlight,
  description,
  benefits,
  accent,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  benefits: LoanBenefit[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
        />
        <StaggerGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                    accent
                  )}
                >
                  <b.icon className="size-7" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── What Makes Us Better (4 cards) ─────────────── */
export function WhatMakesUsBetter({
  items,
  accent,
}: {
  items: LoanWhyBetter[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why TNL Fincorp"
          title="What Makes Us"
          highlight="Better?"
          description="Transparent, customer-focused loan assistance designed around your needs."
        />
        <StaggerGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-primary/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                    accent
                  )}
                >
                  <item.icon className="size-7" />
                </div>
                <h3 className="relative mt-5 font-display text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div className="relative mt-5 h-0.5 w-12 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className={cn(
                      "h-full w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
                      accent
                    )}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Application Process timeline ─────────────── */
export function LoanProcess({
  steps,
  accent,
}: {
  steps: LoanProcessStep[];
  accent: string;
}) {
  // Dynamic column count so the timeline stays perfectly centered for 4 or 5 steps.
  const cols = steps.length;
  const gridCls =
    cols <= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-5";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f6f9ff] py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple Process"
          title="Apply in"
          highlight="Simple Steps"
          description="A clear, guided journey from application to disbursal."
        />
        <div className="relative mt-16">
          {/* connecting line — aligned exactly with the center of the step circles.
              The line sits behind the circles; each circle has a solid bg to mask it. */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden lg:block">
            <div
              className="relative mx-auto h-0.5 bg-primary/15"
              style={{ maxWidth: `${Math.min(cols, 5) * 13}rem` }}
            >
              <motion.div
                className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-royal via-sky to-teal-brand"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </div>
          <StaggerGroup
            className={cn("grid gap-8", gridCls)}
            stagger={0.18}
          >
            {steps.map((step) => (
              <StaggerItem key={step.step} className="relative">
                <div className="group relative flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 240,
                      damping: 18,
                      delay: 0.15,
                    }}
                    whileHover={{ scale: 1.06 }}
                    className="relative grid size-[6.5rem] place-items-center rounded-full border border-primary/15 bg-white shadow-soft"
                  >
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
                    <span
                      className={cn(
                        "absolute -top-2 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br text-xs font-extrabold text-white shadow-glow",
                        accent
                      )}
                    >
                      {step.step}
                    </span>
                    <step.icon className="size-7 text-royal" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-base font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Eligibility ─────────────── */
export function EligibilitySection({
  items,
  accent,
}: {
  items: { icon: React.ElementType; label: string; value: string }[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Eligibility"
          title="Are You"
          highlight="Eligible?"
          description="Typical eligibility guidance — final criteria are subject to the respective lender's policies."
        />
        <StaggerGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {items.map((item) => (
            <StaggerItem key={item.label}>
              <div className="group flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                    accent
                  )}
                >
                  <item.icon className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-navy">
                    {item.value}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Eligibility criteria are indicative and subject to lender/product-specific requirements.
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Required Documents ─────────────── */
export function RequiredDocuments({
  items,
  accent,
}: {
  items: { icon: React.ElementType; title: string; desc: string }[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Documentation"
          title="Documents"
          highlight="Required"
          description="Typical documents needed — additional documents may be requested by the lender."
        />
        <StaggerGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <span className="pointer-events-none absolute -right-3 -top-3 text-primary/5">
                  <item.icon className="size-20" />
                </span>
                <div
                  className={cn(
                    "relative grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                    accent
                  )}
                >
                  <item.icon className="size-6" />
                </div>
                <h3 className="relative mt-4 font-display text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="relative mt-1.5 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─────────────── Loan Types (premium cards + Apply Now modal) ─────────────── */
export function LoanTypesSection({
  eyebrow,
  title,
  highlight,
  description,
  types,
  accent,
  /** Base loan name, e.g. "Home Loan" / "Auto Loan" / "Loan Against Property". */
  loanName,
  /** Optional category options for the modal's category select (auto: new/used). */
  categoryOptions,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  types: LoanTypeCard[];
  accent: string;
  loanName: string;
  categoryOptions?: string[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<LoanApplyConfig | null>(null);

  const openModal = (cardTitle: string) => {
    setSelected({
      title: cardTitle,
      category: cardTitle,
      accent,
      categoryLabel: `${loanName} Type`,
    });
    setModalOpen(true);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
        />
        <StaggerGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {types.map((t, i) => {
            // rotate accent gradients across cards for a colorful, premium look
            const cardAccents = [
              "from-royal to-sky",
              "from-teal-brand to-cyan-brand",
              "from-navy to-royal",
              "from-sky to-teal-brand",
            ];
            const cardAccent = cardAccents[i % cardAccents.length];
            return (
              <StaggerItem key={t.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover">
                  {/* top accent banner */}
                  <div
                    className={cn(
                      "relative h-20 overflow-hidden bg-gradient-to-r",
                      cardAccent
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                    <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/20 blur-xl" />
                    <div className="absolute -bottom-5 left-5">
                      <span
                        className={cn(
                          "grid size-12 place-items-center rounded-2xl bg-white text-navy shadow-glow ring-1 ring-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                        )}
                      >
                        <t.icon className="size-6" />
                      </span>
                    </div>
                  </div>

                  {/* body — flex-col so the button can stick to the bottom */}
                  <div className="flex flex-1 flex-col p-5 pt-7">
                    <h3 className="font-display text-base font-bold text-navy">
                      {t.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.desc}
                    </p>
                    {/* Apply Now button — consistently aligned at the bottom */}
                    <button
                      onClick={() => openModal(t.title)}
                      className={cn(
                        "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow active:scale-95",
                        cardAccent
                      )}
                    >
                      <Sparkles className="size-4" />
                      Apply Now
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      {selected && (
        <LoanApplyModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          config={selected}
        />
      )}
    </section>
  );
}

/* ─────────────── Customer Reviews — endless infinite carousel ─────────────── */
export function CustomerReviews({
  testimonials,
  accent,
}: {
  testimonials: LoanTestimonial[];
  accent: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });

  const onSelect = (api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  };

  useEffect(() => {
    if (!api) return;
    const handle = () => onSelect(api);
    api.on("select", handle);
    api.on("reInit", handle);
    queueMicrotask(handle);
    return () => {
      api.off("select", handle);
      api.off("reInit", handle);
    };
  }, [api]);

  // Endless auto-slide — only when section is in view and not paused by the user.
  useEffect(() => {
    if (!api || paused || !inView) return;
    const id = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [api, paused, inView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Voices"
          title="What Our Customers"
          highlight="Say"
          description="Placeholder testimonials shown for design demonstration. Replace with verified reviews before launch."
        />
        <Reveal direction="scale" className="mt-12">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Carousel
              opts={{ align: "start", loop: true, dragFree: false }}
              setApi={setApi}
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((t) => (
                  <CarouselItem
                    key={t.name + t.quote.slice(0, 10)}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                      <div className="flex items-center justify-between">
                        <Quote className="size-9 text-primary/15" />
                        <span className="rounded-full bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-royal">
                          {t.loanType}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
                        <span
                          className={cn(
                            "grid size-12 place-items-center rounded-full bg-gradient-to-br font-display text-base font-bold text-white shadow-soft",
                            t.accent
                          )}
                        >
                          {t.initials}
                        </span>
                        <div>
                          <div className="font-display text-sm font-bold text-navy">
                            {t.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.role} · {t.location}
                          </div>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </Reveal>

        <div className="mt-7 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="size-10 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
            aria-label="Previous review"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === current
                    ? "w-7 bg-gradient-to-r from-royal to-teal-brand"
                    : "w-2 bg-primary/20 hover:bg-primary/40"
                )}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            className="size-10 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
            aria-label="Next review"
          >
            <ArrowRight className="size-5" />
          </Button>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume auto-slide" : "Pause auto-slide"}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-royal hover:bg-primary/5"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            <span className="hidden sm:inline">{paused ? "Play" : "Pause"}</span>
          </button>
        </div>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          * Demo testimonials for design demonstration — replace with verified
          customer reviews.
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Trust Banner with animated counters ─────────────── */
export function TrustBanner({ counters }: { counters: TrustCounterType[] }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center text-white shadow-glow sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
            <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <ShieldCheck className="mx-auto size-10 text-white/90" />
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Trusted by Millions of People
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Join thousands who trust TNL Fincorp for loan guidance and
                application support.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
                {counters.map((c) => (
                  <div key={c.label} className="text-center">
                    <div className="font-display text-3xl font-extrabold sm:text-4xl">
                      <AnimatedCounter value={c.value} suffix={c.suffix} />
                    </div>
                    <div className="mt-1.5 text-xs font-medium text-white/70 sm:text-sm">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[11px] text-white/50">
                * Placeholder figures for design demonstration — replace with
                verified business statistics before launch.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Loan FAQ ─────────────── */
export function LoanFaq({
  faqs,
  title,
  highlight,
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  highlight?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={title ?? "Frequently Asked"}
          highlight={highlight ?? "Questions"}
          description="Quick answers about the product, process and TNL Fincorp's role."
        />
        <Reveal direction="up" className="mt-10">
          <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`q-${i}`}
                  className="overflow-hidden rounded-2xl border-b border-primary/10 px-4 last:border-b-0 data-[state=open]:bg-primary/[0.03]"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-sm font-semibold text-navy hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-2 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Partner Carousel (home loan) ─────────────── */
export function PartnerCarousel({ partners }: { partners: string[] }) {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Lending Partners"
          title="Trusted"
          highlight="Partner Network"
          description="We work with a network of lending institutions. Partner brands shown are editable placeholders — replace with verified partners before launch."
        />
        <Reveal direction="up" className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p, i) => (
              <div
                key={p}
                className="group flex h-24 items-center justify-center rounded-2xl border border-primary/10 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover"
              >
                <span className="font-display text-base font-bold text-navy/70 transition-all group-hover:text-royal sm:text-lg">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          * Partner names shown are generic placeholders. Replace with actual
          verified lending partners before launch.
        </p>
      </div>
    </section>
  );
}
