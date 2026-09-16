"use client";

import Image from "next/image";
import {
  CheckCircle2,
  ChevronRight,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import { ApplyWithConsent } from "@/components/tnl/apply-with-consent";
import {
  FD_PRODUCT,
  RD_PRODUCT,
  type InvestmentProduct,
  INVESTMENT_DISCLAIMER,
} from "@/lib/investment-data";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type CalcSlot = React.ComponentType;

/**
 * Shared investment page (FD or RD). Renders the full premium page layout:
 * 1. Hero + apply panel (consent checkbox + OTP + Apply Now)
 * 2. "What makes X most popular" — piggy animation (left) + benefit cards (right)
 * 3. "Why Choose X from TNL Fincorp" — 4 feature cards
 * 4. Return calculator (FD or RD)
 * 5. "It's Super Safe & Secure" — security section
 * 6. FAQ accordion
 *
 * Accepts `slug` ("fd" | "rd") and the Calculator component so the product
 * object (which contains Lucide icon functions) is resolved inside this client
 * component — avoiding server→client function serialization.
 */
export function InvestmentPage({
  slug,
  Calculator,
}: {
  slug: "fd" | "rd";
  Calculator: CalcSlot;
}) {
  const product: InvestmentProduct =
    slug === "fd" ? FD_PRODUCT : RD_PRODUCT;
  return (
    <div className="overflow-hidden">
      {/* ───────────── HERO ───────────── */}
      <section
        id="home"
        className="relative overflow-hidden bg-mesh pt-28 pb-16 sm:pt-32 lg:pb-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />
        <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-royal/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 size-96 rounded-full bg-teal-brand/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-royal shadow-soft">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-teal-brand" />
                </span>
                Investment Solutions
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
                {product.heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-gradient-brand">
                  {product.heroTitle.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
                {product.heroDescription}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2.5 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"
                >
                  <Phone className="size-4" />
                  {COMPANY.phone}
                </a>
                <a
                  href="#benefits"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-primary/5"
                >
                  Learn More
                  <ChevronRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: image + floating accents */}
          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
                <div className="relative aspect-[4/3.2] w-full">
                  <Image
                    src={product.image}
                    alt={`${product.title} investment with TNL Fincorp`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft animate-float-slow">
                <Sparkles className="size-4 text-royal" />
                <span className="text-xs font-semibold text-navy">
                  Indicative returns
                </span>
              </div>
              <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
            </div>
          </Reveal>
        </div>

        {/* ───── APPLY PANEL (consent + OTP + Apply Now) ───── */}
        <div id="apply" className="relative mx-auto mt-14 max-w-4xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft">
              <div className="border-b border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy">
                      Apply for {product.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Verify your mobile number with OTP to continue.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <ApplyWithConsent
                  productName={product.title}
                  productSlug={product.slug}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── SECTION 2: benefits + piggy ───────────── */}
      <section id="benefits" className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why it's popular"
            title={`What makes ${product.slug.toUpperCase()}s most popular`}
            highlight="investment mode?"
            description={`A structured deposit product that helps you build savings with discipline and clarity.`}
          />

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            {/* Left: piggy animation */}
            <Reveal direction="right">
              <PiggyAnimation piggyImage={product.piggyImage} />
            </Reveal>

            {/* Right: benefit cards */}
            <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
              {product.benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="group flex h-full gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-sky/10 text-royal transition-colors group-hover:from-royal group-hover:to-sky group-hover:text-white">
                      <b.icon className="size-5" />
                    </span>
                    <div>
                      <div className="font-display text-sm font-bold text-navy">
                        {b.title}
                      </div>
                      <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ───────────── SECTION 3: why choose ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why TNL Fincorp"
            title={`Why Choose ${product.slug.toUpperCase()} from`}
            highlight="TNL Fincorp?"
            description="Guidance and application support for your deposit booking journey."
          />
          <StaggerGroup
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {product.whyChoose.map((w, i) => (
              <StaggerItem key={w.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-primary/5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                      product.accent
                    )}
                  >
                    <w.icon className="size-7" />
                  </span>
                  <h3 className="relative mt-5 font-display text-base font-bold text-navy">
                    {w.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {w.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ───────────── SECTION 4: calculator ───────────── */}
      <Calculator />

      {/* ───────────── SECTION 5: safety ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Safety & Security"
            title="It's Super Safe"
            highlight="& Secure"
            description="Deposit safety depends on the respective bank/institution and applicable regulations."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Institution-governed",
                desc: product.safetyPoints[0],
              },
              {
                icon: Lock,
                title: "Indicative rates",
                desc: product.safetyPoints[1],
              },
              {
                icon: Phone,
                title: "Guided by TNL Fincorp",
                desc: "We provide guidance and application support only — we are not the deposit-taking institution.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-teal-brand text-white shadow-glow">
                    <s.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" className="mt-6">
            <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-royal" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {INVESTMENT_DISCLAIMER}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── SECTION 6: FAQ ───────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={`${product.title} Questions`}
            highlight="Answered"
            description="Quick answers about the product, process and TNL Fincorp's role."
          />
          <Reveal direction="up" className="mt-10">
            <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
              <Accordion type="single" collapsible>
                {product.faqs.map((f, i) => (
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
    </div>
  );
}

/** Piggy bank with looping notes/coins animation. */
function PiggyAnimation({ piggyImage }: { piggyImage: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-royal/15 to-teal-brand/15 blur-3xl" />
      {/* piggy image */}
      <div className="relative grid h-full place-items-center">
        <img
          src={piggyImage}
          alt="Piggy bank saving illustration"
          className="relative z-10 size-56 rounded-full object-cover shadow-glow sm:size-64"
        />
        {/* floating notes/coins */}
        {[
          { left: "8%", top: "18%", delay: 0, icon: "₹" },
          { left: "78%", top: "22%", delay: 0.6, icon: "₹" },
          { left: "12%", top: "68%", delay: 1.2, icon: "₹" },
          { left: "70%", top: "72%", delay: 1.8, icon: "₹" },
          { left: "44%", top: "8%", delay: 2.4, icon: "₹" },
        ].map((n, i) => (
          <span
            key={i}
            className="pointer-events-none absolute z-20 grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-bold text-white shadow-soft animate-float-medium"
            style={{
              left: n.left,
              top: n.top,
              animationDelay: `${n.delay}s`,
            }}
          >
            {n.icon}
          </span>
        ))}
        {/* dashed orbit */}
        <div className="pointer-events-none absolute inset-6 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
      </div>
    </div>
  );
}
