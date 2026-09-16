"use client";

import {
  Award,
  CheckCircle2,
  Compass,
  FileText,
  Headphones,
  Quote,
  Users,
} from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import Image from "next/image";

const FEATURES = [
  {
    icon: Compass,
    title: "Customer-Focused Approach",
    desc: "We listen to your requirements before suggesting suitable options.",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    desc: "Clear guidance through required documents and application steps.",
  },
  {
    icon: Headphones,
    title: "End-to-End Assistance",
    desc: "Support throughout the loan journey from enquiry to submission.",
  },
  {
    icon: Users,
    title: "Personalized Guidance",
    desc: "Loan options explained based on your individual financial goals.",
  },
];

export function About() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* LEFT: image */}
        <Reveal direction="right" className="relative">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
              <div className="aspect-[4/4.5] w-full relative">
                <Image
                  src="/images/about.jpg"
                  alt="TNL Fincorp financial advisor guiding a customer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>

            {/* floating experience card */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6">
              <div className="glass rounded-2xl p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                    <Award className="size-6" />
                  </span>
                  <div>
                    <div className="font-display text-lg font-bold text-navy">
                      6+ Loan Solutions
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Across personal & business needs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* quote bubble */}
            <div className="absolute -right-2 top-8 hidden max-w-[12rem] rounded-2xl glass p-3.5 shadow-soft sm:block animate-float-medium">
              <Quote className="size-4 text-royal" />
              <p className="mt-1 text-[11px] font-medium leading-snug text-navy">
                Guidance built around your goals, not a one-size-fits-all pitch.
              </p>
            </div>

            {/* dashed ring */}
            <div className="pointer-events-none absolute -right-6 bottom-10 size-16 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
          </div>
        </Reveal>

        {/* RIGHT: content */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About TNL Fincorp"
            title="Financial Guidance Built"
            highlight="Around Your Needs"
          />

          <Reveal direction="up" delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COMPANY.description}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We help customers explore suitable loan options and support them
              through documentation, application processing and the overall
              loan journey through our financial services network.
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {FEATURES.map((f) => (
              <StaggerItem
                key={f.title}
                className="group flex gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal/10 to-sky/10 text-royal transition-colors group-hover:from-royal group-hover:to-sky group-hover:text-white">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-navy">
                    {f.title}
                  </div>
                  <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {f.desc}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BrandButton onClick={() => openEnquiry()} size="lg">
                Talk to Our Team
              </BrandButton>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-teal-brand" />
                Personalized, no-pressure guidance
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
