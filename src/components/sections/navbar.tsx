"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BrandButton } from "@/components/tnl/brand-button";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#home");
          }}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-royal to-sky shadow-glow sm:size-11">
            <Image
              src="/tnl-logo.jpeg"
              alt="TNL Finance logo"
              fill
              sizes="44px"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-navy sm:text-xl">
              TNL<span className="text-gradient-brand"> Finance</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Loan Solutions
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-royal after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-royal after:to-sky after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
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
            className="w-[86%] max-w-sm border-l-primary/15 bg-gradient-to-b from-white to-[#f4f7ff] p-0"
          >
            <SheetTitle className="sr-only">TNL Finance Navigation</SheetTitle>
            <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
              <span className="flex items-center gap-2">
                <span className="grid size-9 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-royal to-sky">
                  <Image
                    src="/tnl-logo.jpeg"
                    alt="TNL Finance"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="font-display font-extrabold text-navy">
                  TNL<span className="text-gradient-brand"> Finance</span>
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full bg-secondary text-foreground"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-4 py-5">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-foreground/85 transition-colors hover:bg-primary/5 hover:text-royal"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {link.label}
                  <span className="text-xs font-bold text-primary/40">
                    0{i + 1}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-auto space-y-3 border-t border-primary/10 p-5">
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
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
