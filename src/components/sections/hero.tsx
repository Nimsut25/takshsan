"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Coins,
  FileCheck2,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { BrandButton } from "@/components/tnl/brand-button";
import { AnimatedCounter } from "@/components/tnl/animated-counter";

const scrollTo = (id: string) =>
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export function Hero() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mesh pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24"
    >
      {/* Decorative grid + blobs */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-royal/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 size-96 rounded-full bg-teal-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-sky/20 blur-[110px]" />

      {/* Floating 3D-ish shapes */}
      <FloatingShapes />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* LEFT: copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-royal shadow-soft"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-teal-brand" />
            </span>
            Trusted Loan Assistance in Surat, Gujarat
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Smart Loan Solutions
            <br className="hidden sm:block" /> for Your{" "}
            <span className="relative inline-block">
              <span className="text-gradient-brand">Financial Goals</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M2 9C70 3 230 3 298 6"
                  stroke="url(#under)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <defs>
                  <linearGradient id="under" x1="0" x2="300" y1="0" y2="0">
                    <stop stopColor="var(--royal)" />
                    <stop offset="1" stopColor="var(--teal-brand)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
          >
            Explore flexible loan solutions with personalized guidance,
            documentation assistance and end-to-end application support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <BrandButton onClick={() => openEnquiry()} size="lg">
              <Sparkles className="size-4" />
              Apply for a Loan
            </BrandButton>
            <BrandButton
              variant="outline"
              size="lg"
              onClick={() => scrollTo("#services")}
            >
              Explore Loan Services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </BrandButton>
          </motion.div>

          <motion.a
            href={COMPANY.phoneHref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline"
          >
            <span className="grid size-8 place-items-center rounded-full bg-primary/10">
              <Phone className="size-4" />
            </span>
            Call Us: {COMPANY.phone}
          </motion.a>

          {/* mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 grid grid-cols-3 gap-3 border-t border-primary/10 pt-6 lg:max-w-md"
          >
            {[
              { value: 6, suffix: "+", label: "Loan Products" },
              { value: 100, suffix: "%", label: "Assistance Focus" },
              { value: 1, suffix: "-1", label: "Guided Support" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="relative mx-auto mt-14 max-w-7xl px-6 lg:mt-20 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-muted-foreground sm:text-sm">
          {[
            { icon: ShieldCheck, label: "Trusted Guidance" },
            { icon: FileCheck2, label: "Documentation Support" },
            { icon: Wallet, label: "Multiple Loan Solutions" },
            { icon: TrendingUp, label: "End-to-End Assistance" },
          ].map((t) => (
            <span key={t.label} className="inline-flex items-center gap-2">
              <t.icon className="size-4 text-royal" />
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* main image card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
        <div className="aspect-[4/5] w-full sm:aspect-[5/5] lg:aspect-[4/4.4] relative">
          <Image
            src="/images/hero.jpg"
            alt="TNL Finance consultant advising a customer on loan solutions"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />

        {/* gradient ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
      </div>

      {/* Floating glass card: EMI */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute -left-3 top-10 w-44 rounded-2xl glass p-3.5 shadow-soft sm:-left-8 sm:w-52 animate-float-slow"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
            <Calculator className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Est. EMI
            </div>
            <div className="font-display text-base font-bold text-navy">
              ₹ 8,990/mo*
            </div>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-royal to-teal-brand" />
        </div>
      </motion.div>

      {/* Floating glass card: approval assistance */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="absolute -right-3 top-1/3 w-44 rounded-2xl glass p-3.5 shadow-soft sm:-right-8 sm:w-52 animate-float-medium"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white">
            <FileCheck2 className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Documentation
            </div>
            <div className="font-display text-sm font-bold text-navy">
              Guided Support
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating coins / pct badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft animate-float-slow"
      >
        <Coins className="size-5 text-amber-500" />
        <span className="text-xs font-semibold text-navy">
          Smart Loan Solutions
        </span>
      </motion.div>

      {/* rotating ring decoration */}
      <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 3D coin top-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute left-[6%] top-[28%] hidden lg:block animate-float-slow"
      >
        <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-2xl font-bold text-white shadow-glow">
          ₹
        </div>
      </motion.div>
      {/* pct symbol */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-[8%] top-[20%] hidden lg:block animate-float-medium"
      >
        <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-sky to-cyan-brand text-xl font-extrabold text-white shadow-soft">
          %
        </div>
      </motion.div>
      {/* wallet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-[12%] left-[10%] hidden lg:block animate-float-medium"
      >
        <div className="grid size-14 place-items-center rounded-2xl glass shadow-soft">
          <Wallet className="size-6 text-royal" />
        </div>
      </motion.div>
    </div>
  );
}
