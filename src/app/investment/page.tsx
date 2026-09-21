import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FD_PRODUCT,
  RD_PRODUCT,
  INVESTMENT_FAQS,
  FD_VS_RD_COMPARISON,
  INVESTMENT_DISCLAIMER,
} from "@/lib/investment-data";

export const metadata: Metadata = {
  title: "Investment Solutions — FD & RD",
  description:
    "Explore Fixed Deposit (FD) and Recurring Deposit (RD) investment solutions with TNL Fincorp. Compare FD vs RD, use return calculators and get guided application support.",
  alternates: { canonical: "/investment" },
  openGraph: {
    title: "Investment Solutions — FD & RD | TNL Fincorp",
    description:
      "Compare FD and RD investment options with indicative calculators and guided booking support.",
    images: [
      { url: "/images/investment-cta.jpg", width: 1344, height: 768, alt: "FD & RD investment" },
    ],
  },
};

export default function InvestmentPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-[4.5rem]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-mesh py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
          <div className="pointer-events-none absolute -top-24 left-1/3 size-96 rounded-full bg-royal/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 size-80 rounded-full bg-teal-brand/15 blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
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
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                Grow Your Savings with{" "}
                <span className="text-gradient-brand">FD &amp; RD</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Explore fixed and recurring deposit options designed to help you
                build savings with structured investment choices. Compare both
                side by side and choose what suits your goals.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/investment/fd"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Explore FD
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/investment/rd"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-brand to-cyan-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Explore RD
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FD + RD overview cards */}
        <section className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Investment Products"
              title="Two simple ways to"
              highlight="grow your savings"
              description="Choose a lump-sum Fixed Deposit or a disciplined monthly Recurring Deposit — both guided end-to-end by TNL Fincorp."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                {
                  product: FD_PRODUCT,
                  href: "/investment/fd",
                  cta: "Explore FD",
                  accent: "from-royal to-sky",
                },
                {
                  product: RD_PRODUCT,
                  href: "/investment/rd",
                  cta: "Explore RD",
                  accent: "from-teal-brand to-cyan-brand",
                },
              ].map(({ product, href, cta, accent }) => (
                <Reveal key={product.slug} direction="up">
                  <Link
                    href={href}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.title} investment`}
                        fill
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                      <div
                        className={`absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow ${accent}`}
                      >
                        <ShieldCheck className="size-5" />
                      </div>
                      <h3 className="absolute bottom-3 left-4 font-display text-xl font-bold text-white">
                        {product.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {product.heroDescription}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {product.whyChoose.slice(0, 3).map((w) => (
                          <li
                            key={w.title}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />
                            <span className="font-medium">{w.title}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                        {cta}
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FD vs RD comparison */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Comparison"
              title="FD vs RD"
              highlight="at a glance"
              description="A neutral side-by-side view so you can choose what fits your savings approach."
            />
            <Reveal direction="up" className="mt-12">
              <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft">
                {/* header */}
                <div className="grid grid-cols-3 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5">
                  <div className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:px-6">
                    Feature
                  </div>
                  <div className="border-l border-primary/10 px-4 py-4 text-sm font-bold text-royal sm:px-6">
                    FD
                  </div>
                  <div className="border-l border-primary/10 px-4 py-4 text-sm font-bold text-teal-brand sm:px-6">
                    RD
                  </div>
                </div>
                {/* rows */}
                {FD_VS_RD_COMPARISON.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-secondary/30"}`}
                  >
                    <div className="px-4 py-4 text-xs font-semibold text-navy sm:px-6 sm:text-sm">
                      {row.feature}
                    </div>
                    <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:text-sm">
                      {row.fd}
                    </div>
                    <div className="border-l border-primary/10 px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:text-sm">
                      {row.rd}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="up" className="mt-6">
              <p className="text-center text-xs text-muted-foreground">
                Both products are booked through TNL Fincorp.
                TNL Fincorp provides guidance and application support only.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Calculators CTA */}
        <section className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Calculators"
              title="Estimate your"
              highlight="returns"
              description="Use our indicative calculators to plan your FD or RD investment."
            />
            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.1}>
              <StaggerItem>
                <Link
                  href="/investment/fd#calculator"
                  className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">
                      FD Return Calculator
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Estimate maturity on a lump-sum deposit.
                    </p>
                  </div>
                  <ChevronRight className="size-6 text-royal transition-transform group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link
                  href="/investment/rd#calculator"
                  className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">
                      RD Return Calculator
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Estimate maturity on monthly contributions.
                    </p>
                  </div>
                  <ChevronRight className="size-6 text-royal transition-transform group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Investment"
              highlight="Questions"
              description="Common questions about FD, RD and TNL Fincorp's role."
            />
            <Reveal direction="up" className="mt-10">
              <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
                <Accordion type="single" collapsible>
                  {INVESTMENT_FAQS.map((f, i) => (
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

        {/* Safety + disclaimer */}
        <section className="relative py-20 sm:py-24">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Safety & Disclaimer"
              title="Guided, transparent"
              highlight="& secure"
              description="Deposit safety depends on the applicable FD/RD scheme and prevailing regulations."
            />
            <Reveal direction="up" className="mt-10">
              <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-royal" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {INVESTMENT_DISCLAIMER}
                </p>
              </div>
            </Reveal>
            <Reveal direction="up" className="mt-8 text-center">
              <BrandButton href="/investment/fd" size="lg" data-cursor-magnetic>
                <Sparkles className="size-4" />
                Start Your Investment Enquiry
              </BrandButton>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
