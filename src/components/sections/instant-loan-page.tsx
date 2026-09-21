"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, Info, Phone, ShieldCheck, Sparkles, Target, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { SectionHeading } from "@/components/tnl/section-heading";
import { BrandButton } from "@/components/tnl/brand-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { INSTANT_LOAN_CATEGORIES, INSTANT_LOAN_FAQS, INSTANT_LOAN_DISCLAIMER, COMPANY } from "@/lib/instant-loan-data";
import { COMPANY as SITE_COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function InstantLoanPage() {
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
                FAST • DIGITAL • PARTNER MARKETPLACE
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.05}><h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">Instant Loan</h1></Reveal>
            <Reveal direction="up" delay={0.1}><p className="mt-3 font-display text-lg font-bold text-gradient-brand sm:text-xl">Fast Access to Funds. Simple Digital Process.</p></Reveal>
            <Reveal direction="up" delay={0.15}><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">Explore loan options from multiple financial partners through a convenient digital application journey. Review applicable terms and complete the process online where supported.</p></Reveal>
            <Reveal direction="up" delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <BrandButton href="#categories" size="lg" className="from-navy to-royal"><Sparkles className="size-4" />Explore Loan Partners</BrandButton>
                <a href="#categories" onClick={(e) => { e.preventDefault(); document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-5 py-3 text-sm font-semibold text-royal transition-colors hover:bg-primary/5">Check Eligibility <ArrowRight className="size-4" /></a>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
                <div className="relative aspect-[4/4.2] w-full"><Image src="/images/hero-new.png" alt="Instant loan digital application" fill priority sizes="(max-width: 1024px) 90vw, 50vw" className="object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30" />
              </div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="absolute -left-3 top-10 w-44 rounded-2xl glass p-3.5 shadow-soft animate-float-slow sm:-left-6">
                <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white"><Target className="size-4" /></span><div className="leading-tight"><div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Fast</div><div className="font-display text-sm font-bold text-navy">Digital Process</div></div></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className="absolute -right-3 top-1/3 w-44 rounded-2xl glass p-3.5 shadow-soft animate-float-medium sm:-right-6">
                <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white"><Wallet className="size-4" /></span><div className="leading-tight"><div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Multiple</div><div className="font-display text-sm font-bold text-navy">Partner Network</div></div></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full glass px-4 py-2 shadow-soft animate-float-slow"><ShieldCheck className="size-4 text-royal" /><span className="text-xs font-semibold text-navy">Secure Application</span></motion.div>
              <div className="pointer-events-none absolute -right-5 -top-5 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Choose Your Product" title="Choose Your" highlight="Financial Product" description="Select a category to explore available partner options." />
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {INSTANT_LOAN_CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link href={cat.route} className="group relative block h-full overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-card-hover">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image src={cat.image} alt={cat.title} fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                    <div className={cn("absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow", cat.accent)}><Sparkles className="size-5" /></div>
                    <h3 className="absolute bottom-3 left-4 font-display text-xl font-bold text-white">{cat.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">Explore {cat.title} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Simple Process" title="How It" highlight="Works" description="A clear 4-step journey from category selection to partner application." />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {[
              { icon: Target, title: "Choose Category", desc: "Select Personal Loan, Business Loan or Credit Cards." },
              { icon: Wallet, title: "Select Partner", desc: "Browse partners and click Apply Now on your preferred card." },
              { icon: ShieldCheck, title: "Enter Info & Pay ₹49", desc: "Complete your details and the one-time verification payment." },
              { icon: Sparkles, title: "Apply Instantly", desc: "Access partner application links directly from unlocked cards." },
            ].map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="group relative h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-primary/5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"><s.icon className="size-7" /></span>
                  <h3 className="relative mt-5 font-display text-base font-bold text-navy">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked" highlight="Questions" />
          <Reveal direction="up" className="mt-10">
            <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
              <Accordion type="single" collapsible>
                {INSTANT_LOAN_FAQS.map((f, i) => (
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

      {/* DISCLAIMER */}
      <section className="relative py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-royal" />
            <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-navy">Important Information: </span>{INSTANT_LOAN_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-royal to-sky p-8 text-center text-white shadow-glow sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="relative">
                <Sparkles className="mx-auto size-10 text-amber-300" />
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Explore Smarter Loan Options</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">Explore available financial products and partner application options through TNL Fincorp's digital marketplace.</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a href="#categories" onClick={(e) => { e.preventDefault(); document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"><Sparkles className="size-4" />Explore Loan Partners</a>
                  <a href={SITE_COMPANY.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Phone className="size-4" />Contact TNL Fincorp</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
