"use client";

import {
  Award,
  CheckCircle2,
  Compass,
  FileText,
  Headphones,
  Quote,
  Users,
  Building2,
  Calendar,
  Hash,
  UsersRound,
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

const COMPANY_FACTS = [
  { icon: Hash, label: "CIN", value: "U65929GJ2017PLC095007" },
  { icon: Calendar, label: "Incorporated", value: "5 Jan 2017" },
  { icon: Building2, label: "ROC", value: "RoC-Ahmedabad" },
  { icon: UsersRound, label: "Directors", value: "7" },
];

export function About() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 size-72 rounded-full bg-sky/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ===== TOP: 2-column (image + intro content) ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: image with floating accents */}
          <Reveal direction="right" className="relative">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
                <div className="aspect-[4/3.6] w-full relative">
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
              <div className="absolute -bottom-5 -left-2 sm:-left-5">
                <div className="glass rounded-2xl p-4 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                      <Award className="size-5" />
                    </span>
                    <div>
                      <div className="font-display text-base font-bold text-navy">
                        6+ Loan Solutions
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Across personal & business needs
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* quote bubble */}
              <div className="absolute -right-2 top-6 hidden max-w-[11rem] rounded-2xl glass p-3.5 shadow-soft sm:block animate-float-medium">
                <Quote className="size-4 text-royal" />
                <p className="mt-1 text-[11px] font-medium leading-snug text-navy">
                  Guidance built around your goals, not a one-size-fits-all pitch.
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: heading + intro + features + CTA */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About TNL Fincorp"
              title="Financial Guidance Built"
              highlight="Around Your Needs"
            />

            <Reveal direction="up" delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {COMPANY.description}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We help customers explore suitable loan options and support them
                through documentation, application processing and the overall
                loan journey through our financial services network.
              </p>
            </Reveal>

            <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.08}>
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
              <div className="mt-7 flex flex-wrap items-center gap-4">
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

        {/* ===== BOTTOM: Full-width Company Registration Details ===== */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] shadow-soft">
            {/* Header bar */}
            <div className="flex items-center gap-3 border-b border-primary/10 bg-gradient-to-r from-navy via-royal to-sky px-6 py-4 sm:px-8">
              <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25">
                <FileText className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-extrabold text-white sm:text-lg">
                  Company Registration Details
                </h3>
                <p className="text-[11px] text-white/70">
                  TAKSHSAN NIDHI LIMITED — MCA Registered Public Company
                </p>
              </div>
            </div>

            {/* Body: 2-column (description left, quick facts right) */}
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
              {/* Description */}
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-navy">TAKSHSAN NIDHI LIMITED</span> having CIN{" "}
                  <span className="font-semibold text-royal">U65929GJ2017PLC095007</span> is a{" "}
                  <span className="font-semibold text-navy">9 years, 8 months &amp; 20 days</span> old
                  Public company incorporated with MCA on{" "}
                  <span className="font-semibold text-navy">5th January, 2017</span>. The company is
                  listed in the class of Public company and classified as a Non-govt company,
                  registered at the Registrar of Companies (ROC), RoC-Ahmedabad with an Authorized
                  Share Capital of <span className="font-semibold text-navy">₹50,00,000</span> and a
                  paid-up capital of <span className="font-semibold text-navy">₹10,92,400</span>.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The company has{" "}
                  <span className="font-semibold text-navy">7 directors / key management personnel</span>:
                  Shubham Jay Shankarbhai Maurya, Lalbahadur Samarjit Mourya, Ramesh Kumar,
                  Kamalashankar Baliram Maurya, Saroj Kumar Pal, Manoj Kumar Pal and Kulbhushan S
                  Pandey. The company registration number is{" "}
                  <span className="font-semibold text-navy">095007</span> and its Corporate
                  Identification Number (CIN) provided by MCA is{" "}
                  <span className="font-semibold text-royal">U65929GJ2017PLC095007</span>.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  As per MCA records, TAKSHSAN NIDHI LIMITED is involved in activities such as other
                  credit activities including pawn shops n.e.c. (Un-incorporated financial
                  institutions in class 6599).
                </p>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-3 self-start lg:grid-cols-1">
                {COMPANY_FACTS.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-3.5 shadow-soft"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                      <f.icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </p>
                      <p className="mt-0.5 font-display text-xs font-bold text-navy break-all">
                        {f.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
