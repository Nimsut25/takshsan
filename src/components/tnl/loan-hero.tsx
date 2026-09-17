"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/tnl/reveal";
import { MobileOtpForm } from "@/components/tnl/mobile-otp-form";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import type { LoanPageContent } from "@/lib/loan-page-data";

/**
 * Premium loan hero section.
 * Left: eyebrow, headline, description, CTA, mobile OTP application form.
 * Right: loan image + floating glass info cards + decorative 3D shapes.
 */
export function LoanHero({ loan }: { loan: LoanPageContent }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mesh pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-royal/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 size-96 rounded-full bg-teal-brand/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* LEFT: copy + OTP form */}
        <div className="text-center lg:text-left">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-royal shadow-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-brand" />
              </span>
              {loan.eyebrow}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              {loan.heroHeadline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-brand">
                {loan.heroHeadline.split(" ").slice(-1)}
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
              {loan.heroDescription}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2.5 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                Subject to eligibility · Terms apply
              </span>
            </div>
          </Reveal>

          {/* OTP application form */}
          <Reveal direction="up" delay={0.2}>
            <div className="mx-auto mt-7 max-w-md rounded-3xl border border-primary/10 bg-white/80 p-5 shadow-soft backdrop-blur-md lg:mx-0">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-navy">
                    Apply for {loan.heroHeadline}
                  </h2>
                  <p className="text-[11px] text-muted-foreground">
                    Verify your mobile with OTP to continue
                  </p>
                </div>
              </div>
              <MobileOtpForm
                productName={loan.heroHeadline}
                accent={loan.accent}
              />
            </div>
          </Reveal>
        </div>

        {/* RIGHT: visual + floating cards */}
        <Reveal direction="left" delay={0.1} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
              <div className="relative aspect-[4/4.2] w-full">
                <Image
                  src={loan.heroImage}
                  alt={`${loan.heroHeadline} with TNL Fincorp`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
            </div>

            {/* Floating glass cards */}
            {loan.heroFloatingCards.slice(0, 3).map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                className={cn(
                  "absolute rounded-2xl glass p-3 shadow-soft",
                  i === 0 && "left-2 top-10 animate-float-slow sm:-left-6",
                  i === 1 && "right-2 top-1/3 animate-float-medium sm:-right-6",
                  i === 2 && "bottom-6 left-6 animate-float-slow"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                      loan.accent
                    )}
                  >
                    <card.icon className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-navy">
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* decorative dashed ring */}
            <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
