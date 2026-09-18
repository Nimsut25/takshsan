"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, Sparkles, X } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BrandButton } from "@/components/tnl/brand-button";
import { SocialIcons } from "@/components/tnl/social-icons";
import {
  COMPANY,
  HEADER_NAV_LINKS,
  LOAN_DROPDOWN,
  INVEST_DROPDOWN,
  NAV_LINKS,
} from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background page scroll while the mobile side menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setLoansOpen(false);
    setInvestOpen(false);
    // internal anchor on homepage
    if (href.startsWith("/#")) {
      requestAnimationFrame(() => {
        const el = document.querySelector(href.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    // route pages handled by next/link
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/40 shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        {/* Brand — name only, no sub-tagline */}
        <Link
          href="/"
          onClick={() => go("/#home")}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-royal to-sky shadow-glow sm:size-11">
            <Image
              src="/tnl-logo.jpeg"
              alt="TNL Fincorp logo"
              fill
              sizes="44px"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-navy sm:text-xl">
            TNL<span className="text-gradient-brand"> Fincorp</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {HEADER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => go(link.href)}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-royal after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-royal after:to-sky after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}

          {/* Loans dropdown */}
          <Dropdown
            label="Loans"
            open={loansOpen}
            onOpenChange={setLoansOpen}
            items={LOAN_DROPDOWN}
            onNavigate={go}
          />

          {/* Investment dropdown */}
          <Dropdown
            label="Investment"
            open={investOpen}
            onOpenChange={setInvestOpen}
            items={INVEST_DROPDOWN}
            onNavigate={go}
          />

          <Link
            href="/instant-loan"
            onClick={() => go("/instant-loan")}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-royal after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-royal after:to-sky after:transition-transform hover:after:scale-x-100"
          >
            Instant Loan
          </Link>

          <Link
            href="/#contact"
            onClick={() => go("/#contact")}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-royal after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-royal after:to-sky after:transition-transform hover:after:scale-x-100"
          >
            Contact
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-2 text-sm font-semibold text-royal transition-colors hover:bg-primary/5"
          >
            <Phone className="size-4" />
            <span className="hidden lg:inline">{COMPANY.phone}</span>
            <span className="lg:hidden">Call</span>
          </a>
          <BrandButton
            onClick={() => openEnquiry()}
            size="md"
            className="hidden sm:inline-flex"
            data-cursor-magnetic
          >
            <Sparkles className="size-4" />
            Apply for Loan
          </BrandButton>
        </div>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-10 rounded-full border border-primary/15 bg-white/70"
              aria-label="Open menu"
            >
              <Menu className="size-5 text-navy" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="tnl-nav-sheet flex w-[88%] max-w-[24rem] flex-col border-l-primary/15 bg-gradient-to-b from-white to-[#f4f7ff] p-0"
          >
            <SheetTitle className="sr-only">TNL Fincorp Navigation</SheetTitle>

            {/* Header (sticky, close always visible) */}
            <div className="flex shrink-0 items-center justify-between border-b border-primary/10 px-5 py-4">
              <span className="flex items-center gap-2.5">
                <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-royal to-sky">
                  <Image
                    src="/tnl-logo.jpeg"
                    alt="TNL Fincorp"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="font-display font-extrabold text-navy">
                  TNL<span className="text-gradient-brand"> Fincorp</span>
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary/10 hover:text-royal"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable navigation list — scrolls only when needed */}
            <nav
              className="tnl-scrollbar flex-1 overflow-y-auto px-4 py-4"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1.5">
                {/* Home + About Us */}
                <li>
                  <MobileLink
                    label="Home"
                    href="/#home"
                    index="01"
                    onClick={() => go("/#home")}
                  />
                </li>
                <li>
                  <MobileLink
                    label="About Us"
                    href="/#about"
                    index="02"
                    onClick={() => go("/#about")}
                  />
                </li>

                {/* Loans accordion */}
                <MobileAccordion
                  label="Loans"
                  index="03"
                  items={LOAN_DROPDOWN}
                  onNavigate={go}
                />

                {/* Investment accordion */}
                <MobileAccordion
                  label="Investment"
                  index="04"
                  items={INVEST_DROPDOWN}
                  onNavigate={go}
                />

                {/* Instant Loan */}
                <li>
                  <MobileLink
                    label="Instant Loan"
                    href="/instant-loan"
                    index="05"
                    onClick={() => go("/instant-loan")}
                  />
                </li>

                {/* Remaining quick links */}
                <li>
                  <MobileLink
                    label="Why Choose Us"
                    href="/#why"
                    index="06"
                    onClick={() => go("/#why")}
                  />
                </li>
                <li>
                  <MobileLink
                    label="How It Works"
                    href="/#how"
                    index="07"
                    onClick={() => go("/#how")}
                  />
                </li>
                <li>
                  <MobileLink
                    label="FAQ"
                    href="/#faq"
                    index="08"
                    onClick={() => go("/#faq")}
                  />
                </li>
                <li>
                  <MobileLink
                    label="Contact"
                    href="/#contact"
                    index="09"
                    onClick={() => go("/#contact")}
                  />
                </li>
              </ul>
            </nav>

            {/* Bottom area — CTAs + social (pinned, never scrolls away) */}
            <div className="mt-auto shrink-0 space-y-4 border-t border-primary/10 bg-white/60 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <BrandButton
                onClick={() => {
                  setOpen(false);
                  openEnquiry();
                }}
                size="lg"
                className="w-full"
              >
                <Sparkles className="size-4" />
                Apply for Loan
              </BrandButton>
              <a
                href={COMPANY.phoneHref}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-white py-3 text-sm font-semibold text-royal"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>

              {/* Social */}
              <div className="space-y-2.5 pt-1 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Follow / Connect With Us
                </p>
                <SocialIcons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

/* ---------- Desktop hover dropdown ---------- */
function Dropdown({
  label,
  open,
  onOpenChange,
  items,
  onNavigate,
}: {
  label: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: { label: string; href: string }[];
  onNavigate: (href: string) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-royal after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-royal after:to-sky after:transition-transform hover:after:scale-x-100"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300",
            open && "rotate-180 text-royal"
          )}
        />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="min-w-[15rem] origin-top scale-95 overflow-hidden rounded-2xl border border-primary/10 bg-white/95 p-1.5 shadow-glow backdrop-blur-xl transition-transform duration-300 [.tnl-cursor--hover_&]:scale-100 data-[state=open]:scale-100"
          style={{ transform: open ? "scale(1)" : "scale(0.95)" }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onNavigate(item.href)}
              className="group flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-royal"
            >
              <span>{item.label}</span>
              <ChevronDown className="size-3 -rotate-90 text-primary/40 transition-transform group-hover:translate-x-0.5 group-hover:text-royal" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile accordion sub-menu ---------- */
function MobileAccordion({
  label,
  index,
  items,
  onNavigate,
}: {
  label: string;
  index: string;
  items: { label: string; href: string }[];
  onNavigate: (href: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-foreground/85 transition-colors hover:bg-primary/5 hover:text-royal"
      >
        <span className="flex items-center gap-3">
          <span className="text-[11px] font-bold tabular-nums text-primary/40">
            {index}
          </span>
          {label}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-primary/50 transition-transform duration-300",
            expanded && "rotate-180 text-royal"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-6 flex flex-col gap-0.5 border-l border-primary/15 pl-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onNavigate(item.href)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-primary/5 hover:text-royal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function MobileLink({
  label,
  href,
  index,
  onClick,
}: {
  label: string;
  href: string;
  index: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-foreground/85 transition-colors hover:bg-primary/5 hover:text-royal active:bg-primary/10"
    >
      <span>{label}</span>
      <span className="text-[11px] font-bold tabular-nums text-primary/40">
        {index}
      </span>
    </Link>
  );
}
