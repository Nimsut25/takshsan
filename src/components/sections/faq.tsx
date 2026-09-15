"use client";

import { HelpCircle, MessageCircleQuestion, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { useModalStore } from "@/lib/modal-store";
import { BrandButton } from "@/components/tnl/brand-button";

export function FaqSection() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white to-[#f6f9ff]" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          description="Quick answers about our loan assistance services. Still have a question? Reach out to our team."
        />

        <Reveal direction="up" className="mt-12">
          <div className="rounded-3xl border border-primary/10 bg-white p-2 shadow-soft sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border-b border-primary/10 px-4 last:border-b-0 data-[state=open]:bg-primary/[0.03]"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-navy hover:no-underline">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-royal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-10 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        {/* CTA strip */}
        <Reveal direction="up" className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                <MessageCircleQuestion className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-navy">
                  Still have questions?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our team is happy to help with your loan enquiry.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <BrandButton onClick={() => openEnquiry()} size="md">
                <HelpCircle className="size-4" />
                Ask a Question
              </BrandButton>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"
              >
                <Phone className="size-4" />
                Call Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
