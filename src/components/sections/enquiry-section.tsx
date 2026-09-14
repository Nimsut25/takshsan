"use client";

import {
  CheckCircle2,
  ClipboardList,
  Headphones,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { EnquiryForm } from "@/components/tnl/enquiry-form";

const PERKS = [
  { icon: Headphones, label: "Personalized guidance" },
  { icon: ClipboardList, label: "Documentation support" },
  { icon: ShieldCheck, label: "End-to-end assistance" },
];

export function EnquirySection() {
  return (
    <section
      id="enquiry"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-royal/12 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 size-80 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loan Enquiry"
          title="Let's Find the Right"
          highlight="Loan for You"
          description="Share your requirement and our team will guide you on suitable loan options, documentation and the application process."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* LEFT: visual + perks */}
          <Reveal direction="right" className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/60 shadow-glow">
              <Image
                src="/images/cta-bg.jpg"
                alt="Get loan assistance from TNL Finance"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20" />
              <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Sparkles className="size-3.5" />
                  TNL Finance
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  Talk to a loan guidance expert
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  We help you explore suitable options across Personal, Business,
                  Home, LAP, Auto and Education Loans.
                </p>

                <div className="mt-6 space-y-3">
                  {PERKS.map((p) => (
                    <div key={p.label} className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-full bg-white/15">
                        <p.icon className="size-4" />
                      </span>
                      <span className="text-sm text-white/85">{p.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-5">
                  <a
                    href={COMPANY.phoneHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  >
                    <Phone className="size-4 text-sky" />
                    {COMPANY.phone}
                  </a>
                  <a
                    href={COMPANY.emailHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  >
                    <Mail className="size-4 text-sky" />
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: form */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="relative h-full rounded-3xl border border-primary/10 bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    Loan Enquiry Form
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fields marked <span className="text-destructive">*</span> are required
                  </p>
                </div>
                <span className="hidden size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow sm:grid">
                  <ClipboardList className="size-6" />
                </span>
              </div>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
