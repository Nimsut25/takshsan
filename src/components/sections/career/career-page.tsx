"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Lightbulb,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { Carousel } from "@/components/tnl/carousel";
import { BrandButton } from "@/components/tnl/brand-button";
import { Reveal } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";
import {
  CAREER_BENEFITS,
  CAREER_HERO_SLIDES,
  CAREER_PROGRAMME,
  CUSTOMER_REVIEWS,
  JOIN_US,
  LIFE_AT_TNL,
  OPEN_POSITIONS_ROUTE,
  WHY_TNL,
} from "./career-content";
import { TESTIMONIALS } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, GraduationCap, Users, Target, Award, HeartPulse,
  Heart, Lightbulb, Sparkles, HeartHandshake, ShieldCheck, Rocket,
  UserCheck, Wrench,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? Sparkles;
  return <C className={className} />;
}

/* =================================================================== */
/* CAREER PAGE                                                         */
/* =================================================================== */
export function CareerPage() {
  return (
    <>
      <CareerHero />
      <LifeAtTNL />
      <FeaturesBenefits />
      <WhyTNL />
      <CareerProgramme />
      <JoinUsBanner />
      <CustomerReviews />
    </>
  );
}

/* =================================================================== */
/* 1. HERO CAROUSEL                                                    */
/* =================================================================== */
function CareerHero() {
  const slides = CAREER_HERO_SLIDES.map((s) => (
    <div key={s.title} className="relative h-full w-full">
      <Image src={s.image} alt={s.title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span key={`eyebrow-${s.title}`} className="career-hero-enter inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/25 backdrop-blur">
              <Sparkles className="size-3.5" />
              {s.eyebrow}
            </span>
            <h1 key={`title-${s.title}`} className="career-hero-enter mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
              {s.title}
            </h1>
            <p key={`sub-${s.title}`} className="career-hero-enter mt-4 max-w-xl text-base text-white/90 sm:text-lg">
              {s.subtitle}
            </p>
            <div key={`cta-${s.title}`} className="career-hero-enter mt-7">
              <Link href={OPEN_POSITIONS_ROUTE} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-royal via-[#3b6df0] to-sky px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-12px_rgba(56,102,243,0.6)]">
                Explore Opportunities
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section aria-label="Careers hero" className="relative h-[60vh] min-h-[420px] w-full sm:h-[68vh] lg:h-[78vh]">
      <Carousel slides={slides} interval={6000} className="h-full w-full" />
    </section>
  );
}

/* =================================================================== */
/* 2. LIFE AT TNL FINCORP                                              */
/* =================================================================== */
function LifeAtTNL() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f6f9ff] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <Users className="size-3.5" />
            {LIFE_AT_TNL.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{LIFE_AT_TNL.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{LIFE_AT_TNL.description}</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="scale">
            <div className="group relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-primary/10">
              <div className="relative aspect-[4/3] w-full">
                <Image src="/images/career/life-at.png" alt="TNL Fincorp team collaborating" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl" />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {LIFE_AT_TNL.highlights.map((h, i) => (
              <Reveal key={h.title} direction="up" delay={i * 70}>
                <div className="group h-full rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-glow">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                    <Icon name={h.icon} className="size-5" />
                  </span>
                  <h3 className="mt-3.5 font-display text-base font-bold text-navy">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 3. FEATURES & BENEFITS — CAROUSEL                                  */
/* =================================================================== */
function FeaturesBenefits() {
  const cards = CAREER_BENEFITS.cards;
  const chunks: typeof cards[] = [];
  const perSlide = 3;
  for (let i = 0; i < cards.length; i += perSlide) chunks.push(cards.slice(i, i + perSlide));

  const slides = chunks.map((group, gi) => (
    <div key={gi} className="h-full w-full">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {group.map((b) => (
          <div key={b.title} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
            <span className={cn("grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow", b.accent)}>
              <Icon name={b.icon} className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-navy">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
          </div>
        ))}
        {group.length < 3 && Array.from({ length: 3 - group.length }).map((_, i) => (
          <div key={`fill-${i}`} className="hidden rounded-2xl border border-dashed border-white/10 lg:block" aria-hidden />
        ))}
      </div>
    </div>
  ));

  return (
    <section className="relative overflow-hidden bg-[#0b1f4d] py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-sky/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-inset ring-white/20">
            <Award className="size-3.5" />
            {CAREER_BENEFITS.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{CAREER_BENEFITS.title}</h2>
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <Carousel slides={slides} interval={5500} className="h-[22rem] sm:h-[20rem]" />
      </Reveal>
    </section>
  );
}

/* =================================================================== */
/* 4. WHY TNL FINCORP                                                  */
/* =================================================================== */
function WhyTNL() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="scale">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-glow ring-1 ring-primary/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image src="/images/career/why.png" alt="Mentorship at TNL Fincorp" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-primary/10 bg-white p-4 shadow-glow sm:block">
                <p className="font-display text-sm font-bold text-navy">People First Culture</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Trust · Growth · Ownership</p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
              <ShieldCheck className="size-3.5" />
              {WHY_TNL.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{WHY_TNL.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{WHY_TNL.description}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {WHY_TNL.points.map((p, i) => (
                <Reveal key={p.title} direction="up" delay={i * 70}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-soft">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
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
/* 5. CAREER PROGRAMME — 2 COLUMNS                                     */
/* =================================================================== */
function CareerProgramme() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="scale" className="order-2 lg:order-1">
            <div className="group relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-primary/10">
              <div className="relative aspect-[4/3] w-full">
                <Image src="/images/career/grow.png" alt="Professional growth at TNL Fincorp" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl" />
            </div>
          </Reveal>
          <Reveal direction="up" delay={120} className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
              <Rocket className="size-3.5" />
              {CAREER_PROGRAMME.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{CAREER_PROGRAMME.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{CAREER_PROGRAMME.description}</p>
            <div className="mt-7 space-y-3">
              {CAREER_PROGRAMME.points.map((p, i) => (
                <Reveal key={p.title} direction="up" delay={i * 70}>
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <BrandButton href={OPEN_POSITIONS_ROUTE} size="md">
                Explore Opportunities
                <ArrowRight className="size-4" />
              </BrandButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 6. JOIN US BANNER                                                   */
/* =================================================================== */
function JoinUsBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[320px] w-full sm:h-[380px]">
        <Image src="/images/career/new-career.jpg" alt="Join the TNL Fincorp team" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-royal/45" />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal direction="up" className="max-w-2xl text-white">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">{JOIN_US.title}</h2>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{JOIN_US.description}</p>
            <div className="mt-7">
              <Link href={OPEN_POSITIONS_ROUTE} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90">
                {JOIN_US.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/* 7. CUSTOMER REVIEWS — CAROUSEL                                     */
/* =================================================================== */
function CustomerReviews() {
  const slides = TESTIMONIALS.map((t) => (
    <div key={t.name} className="h-full w-full">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center lg:px-8">
        <Quote className="size-9 text-royal/40" />
        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">“{t.quote}”</p>
        <div className="mt-6 flex items-center gap-3">
          <span className={cn("grid size-11 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white", t.accent)}>{t.initials}</span>
          <div className="text-left">
            <p className="font-display text-sm font-bold text-navy">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f6f9ff] py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal direction="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-royal">
            <Star className="size-3.5" />
            {CUSTOMER_REVIEWS.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{CUSTOMER_REVIEWS.title}</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{CUSTOMER_REVIEWS.description}</p>
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <Carousel slides={slides} interval={5000} className="h-[20rem] sm:h-[18rem]" />
      </Reveal>
    </section>
  );
}
