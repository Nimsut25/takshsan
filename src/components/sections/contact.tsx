"use client";

import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { CONTACT_CARDS, COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { EnquiryForm } from "@/components/tnl/enquiry-form";

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export function ContactSection() {
  // Google Maps embed for Dindoli, Surat
  const mapSrc =
    "https://www.google.com/maps?q=Dindoli,Surat,Gujarat,India&output=embed";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's Talk About Your"
          highlight="Financial Requirement"
          description="Reach out for personalized loan guidance, documentation support and end-to-end application assistance."
        />

        {/* Contact cards */}
        <StaggerGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {CONTACT_CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-opacity group-hover:opacity-80" />
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                  <c.icon className="size-6" />
                </span>
                <h3 className="relative mt-4 font-display text-base font-bold text-navy">
                  {c.title}
                </h3>
                <div className="relative mt-2 space-y-0.5">
                  {c.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {c.action && (
                  <a
                    href={c.action.href}
                    className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:gap-2.5"
                  >
                    {c.action.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Form + Map */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                  <MessageSquare className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    Send us a message
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <EnquiryForm />
            </div>
          </Reveal>

          {/* Map + quick info */}
          <Reveal direction="left">
            <div className="flex h-full flex-col gap-5">
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-primary/10 shadow-soft">
                <iframe
                  title="TNL Fincorp location map"
                  src={mapSrc}
                  className="h-full min-h-[18rem] w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
                  <div className="flex items-center gap-2 text-royal">
                    <Phone className="size-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Call
                    </span>
                  </div>
                  <a
                    href={COMPANY.phoneHref}
                    className="mt-2 block font-display text-base font-bold text-navy hover:text-royal"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
                  <div className="flex items-center gap-2 text-royal">
                    <Clock className="size-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Hours
                    </span>
                  </div>
                  <p className="mt-2 font-display text-sm font-bold text-navy">
                    Mon – Sat
                  </p>
                  <p className="text-xs text-muted-foreground">10 AM – 7 PM</p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-navy">
                      Our Office
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-primary/10 pt-4">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="rounded-full bg-primary/5 px-3 py-1.5 text-[11px] font-semibold text-royal transition-colors hover:bg-primary/10"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
