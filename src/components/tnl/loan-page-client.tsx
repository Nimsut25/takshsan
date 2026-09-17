"use client";

import { LoanHero } from "@/components/tnl/loan-hero";
import { MobileScreenAnimation } from "@/components/tnl/mobile-screen-animation";
import {
  LoanBenefits,
  WhatMakesUsBetter,
  LoanProcess,
  EligibilitySection,
  RequiredDocuments,
  LoanTypesSection,
  CustomerReviews,
  TrustBanner,
  LoanFaq,
  PartnerCarousel,
} from "@/components/tnl/loan-sections";
import { LoanEmiCalculator } from "@/components/tnl/loan-emi-calculator";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { LOAN_PAGE_DATA } from "@/lib/loan-page-data";
import type { LoanSlug } from "@/lib/site-data";
import { DISCLAIMER } from "@/lib/site-data";
import { ShieldCheck } from "lucide-react";

/**
 * Client wrapper that renders a complete loan page from the data in
 * loan-page-data.ts. Resolving the data on the client avoids serializing
 * Lucide icon functions from a server component to a client component.
 *
 * `variant` controls the section composition so each loan page has a
 * distinct layout while sharing the same design system.
 */
export function LoanPageClient({
  slug,
  variant,
}: {
  slug: LoanSlug;
  variant:
    | "personal"
    | "business"
    | "home"
    | "auto"
    | "education"
    | "lap";
}) {
  const loan = LOAN_PAGE_DATA[slug];

  return (
    <>
      <LoanHero loan={loan} />

      {variant === "personal" && (
        <>
          {/* Why Choose: 3D mobile animation + benefit cards */}
          <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
            <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Why TNL Fincorp"
                title="The TNL Fincorp"
                highlight="Personal Loan Experience"
                description="A simple, digital, guided journey from eligibility to disbursal."
              />
              <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
                <Reveal direction="right">
                  <MobileScreenAnimation accent={loan.accent} />
                </Reveal>
                <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
                  {loan.benefits.map((b) => (
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

          <LoanProcess steps={loan.process} accent={loan.accent} />
          {loan.whyBetter && (
            <WhatMakesUsBetter items={loan.whyBetter} accent={loan.accent} />
          )}
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="Personal Loan EMI Calculator"
            title="Estimate Your"
            highlight="Monthly EMI"
            description="A quick indicative estimate to help you plan your personal loan."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq faqs={loan.faqs} title="Personal Loan" highlight="FAQs" />
        </>
      )}

      {variant === "business" && (
        <>
          <LoanBenefits
            eyebrow="Why TNL Fincorp"
            title="Why Choose"
            highlight="Us?"
            description="Business finance support designed for growth, working capital and expansion."
            benefits={loan.benefits}
            accent={loan.accent}
          />
          {loan.whyBetter && (
            <WhatMakesUsBetter items={loan.whyBetter} accent={loan.accent} />
          )}
          <LoanProcess steps={loan.process} accent={loan.accent} />
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="Business Loan EMI Calculator"
            title="Estimate Your"
            highlight="Monthly EMI"
            description="Plan your business loan repayments with an indicative EMI estimate."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq faqs={loan.faqs} title="Business Loan" highlight="FAQs" />
        </>
      )}

      {variant === "home" && (
        <>
          {loan.partners && <PartnerCarousel partners={loan.partners} />}
          <LoanBenefits
            eyebrow="Benefits Through TNL Fincorp"
            title="Benefits Through"
            highlight="TNL Fincorp"
            description="Guidance and support across your home loan journey."
            benefits={loan.benefits}
            accent={loan.accent}
          />
          <EligibilitySection items={loan.eligibility} accent={loan.accent} />
          <RequiredDocuments items={loan.documents} accent={loan.accent} />
          <LoanProcess steps={loan.process} accent={loan.accent} />
          {loan.loanTypes && (
            <LoanTypesSection
              eyebrow="Loan Types"
              title="Types of"
              highlight="Home Loans"
              description="Choose the home loan option that fits your requirement."
              types={loan.loanTypes}
              accent={loan.accent}
            />
          )}
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="Home Loan EMI Calculator"
            title="Estimate Your"
            highlight="Home Loan EMI"
            description="Plan your home loan repayments with an indicative EMI estimate."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq faqs={loan.faqs} title="Home Loan" highlight="FAQs" />
        </>
      )}

      {variant === "auto" && (
        <>
          <LoanBenefits
            eyebrow="Why TNL Fincorp"
            title="Why Choose TNL Fincorp for"
            highlight="Auto Finance?"
            description="Vehicle finance guidance for new and used cars, two-wheelers and commercial vehicles."
            benefits={loan.benefits}
            accent={loan.accent}
          />
          {loan.loanTypes && (
            <LoanTypesSection
              eyebrow="Vehicle Categories"
              title="New & Used Vehicle"
              highlight="Financing"
              description="Explore financing options across vehicle categories."
              types={loan.loanTypes}
              accent={loan.accent}
            />
          )}
          <LoanProcess steps={loan.process} accent={loan.accent} />
          <EligibilitySection items={loan.eligibility} accent={loan.accent} />
          <RequiredDocuments items={loan.documents} accent={loan.accent} />
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="Auto Loan EMI Calculator"
            title="Estimate Your"
            highlight="Auto Loan EMI"
            description="Plan your vehicle loan with an indicative EMI estimate including down payment."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq faqs={loan.faqs} title="Auto Loan" highlight="FAQs" />
        </>
      )}

      {variant === "education" && (
        <>
          <LoanBenefits
            eyebrow="Why TNL Fincorp"
            title="Why Choose"
            highlight="TNL Fincorp?"
            description="Education funding guidance for higher studies in India and abroad."
            benefits={loan.benefits}
            accent={loan.accent}
          />
          {loan.loanTypes && (
            <LoanTypesSection
              eyebrow="Courses & Categories"
              title="Study in India /"
              highlight="Study Abroad"
              description="Explore education loan options across courses and study destinations."
              types={loan.loanTypes}
              accent={loan.accent}
            />
          )}
          <LoanProcess steps={loan.process} accent={loan.accent} />
          <EligibilitySection items={loan.eligibility} accent={loan.accent} />
          <RequiredDocuments items={loan.documents} accent={loan.accent} />
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="Education Loan EMI Calculator"
            title="Estimate Your"
            highlight="Education Loan EMI"
            description="Plan your education loan repayments with an indicative EMI estimate."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq faqs={loan.faqs} title="Education Loan" highlight="FAQs" />
        </>
      )}

      {variant === "lap" && (
        <>
          <LoanBenefits
            eyebrow="Why Choose"
            title="Why Choose Loan Against"
            highlight="Property?"
            description="Unlock the value of your eligible property for personal or business financial needs."
            benefits={loan.benefits}
            accent={loan.accent}
          />
          {loan.loanTypes && (
            <LoanTypesSection
              eyebrow="Property Types"
              title="Property Types"
              highlight="Accepted"
              description="Residential, commercial and industrial property may be considered — subject to lender eligibility and valuation."
              types={loan.loanTypes}
              accent={loan.accent}
            />
          )}
          <LoanProcess steps={loan.process} accent={loan.accent} />
          <EligibilitySection items={loan.eligibility} accent={loan.accent} />
          <RequiredDocuments items={loan.documents} accent={loan.accent} />
          <LoanEmiCalculator
            config={loan.calculator}
            accent={loan.accent}
            eyebrow="LAP EMI Calculator"
            title="Estimate Your"
            highlight="LAP EMI"
            description="Plan your loan against property repayments with an indicative EMI estimate."
          />
          <CustomerReviews testimonials={loan.testimonials} accent={loan.accent} />
          <TrustBanner counters={loan.trustCounters} />
          <LoanFaq
            faqs={loan.faqs}
            title="Loan Against Property"
            highlight="FAQs"
          />
        </>
      )}

      {/* Disclaimer */}
      <section className="relative py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-royal" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {DISCLAIMER}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
