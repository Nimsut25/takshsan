"use client";

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import {
  COMPANY,
  DISCLAIMER,
  INVEST_DROPDOWN,
  LOAN_DROPDOWN,
  NAV_LINKS,
} from "@/lib/site-data";
import { INVESTMENT_DISCLAIMER } from "@/lib/investment-data";
import { useModalStore } from "@/lib/modal-store";
import { Reveal } from "@/components/tnl/reveal";
import Image from "next/image";

export function Footer() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  const socials = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <footer className="relative mt-24 hidden overflow-hidden bg-navy text-white md:block">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-royal/40 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 right-10 size-72 rounded-full bg-sky/30 blur-[110px]" />

      {/* Top CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row lg:px-8">
          <Reveal direction="up" className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to explore loans or investment options?
            </h3>
            <p className="mt-2 text-sm text-white/70 sm:text-base">
              Talk to our team for personalized guidance across loans, FD & RD.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Phone className="size-4" />
                Call {COMPANY.phone}
              </a>
              <button
                onClick={() => openEnquiry()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky to-teal-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Get Assistance
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        {/* Col 1: Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="relative grid size-12 place-items-center overflow-hidden rounded-xl bg-white shadow-glow">
              <Image
                src="/tnl-logo.jpeg"
                alt="TNL Fincorp logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-extrabold">
                TNL<span className="text-gradient-brand"> Fincorp</span>
              </span>
              <span className="text-xs text-white/60">{COMPANY.tagline}</span>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            {COMPANY.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Loans */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
            Loans
          </h4>
          <ul className="mt-5 space-y-3">
            {LOAN_DROPDOWN.map((loan) => (
              <li key={loan.href}>
                <Link
                  href={loan.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="size-1.5 rounded-full bg-gradient-to-r from-sky to-teal-brand transition-transform group-hover:scale-150" />
                  {loan.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Investment */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
            Investment
          </h4>
          <ul className="mt-5 space-y-3">
            {INVEST_DROPDOWN.map((inv) => (
              <li key={inv.href}>
                <Link
                  href={inv.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="size-1.5 rounded-full bg-gradient-to-r from-sky to-teal-brand transition-transform group-hover:scale-150" />
                  {inv.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.filter(
              (l) => !l.label.includes("Loans") && !l.label.includes("Investment")
            ).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Contact */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sky" />
              <span>{COMPANY.address}</span>
            </li>
            <li>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-sky" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.emailHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-sky" />
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-3 px-6 py-6 lg:px-8">
          <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sky" />
            <p className="text-xs leading-relaxed text-white/65">
              <span className="font-semibold text-white/85">
                Disclaimer:{" "}
              </span>
              {DISCLAIMER}
            </p>
          </div>
          <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sky/80" />
            <p className="text-[11px] leading-relaxed text-white/55">
              <span className="font-semibold text-white/75">
                Investment Disclaimer:{" "}
              </span>
              {INVESTMENT_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 pb-24 text-xs text-white/55 sm:flex-row sm:pb-5 lg:px-8">
          <p>© {COMPANY.year} TNL Fincorp. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <a href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </a>
            <a href="/refund-policy" className="transition-colors hover:text-white">
              Refund Policy
            </a>
            <a href="/return-policy" className="transition-colors hover:text-white">
              Return Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
