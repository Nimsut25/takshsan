"use client";

import { ArrowUpRight, Building2, CheckCircle2, Sparkles } from "lucide-react";
import type { InstantLoanPartner } from "@/lib/instant-loan-data";
import { cn } from "@/lib/utils";

/**
 * Premium partner card for the Instant Loan marketplace.
 *
 * - Before payment (unlocked=false): shows "Apply Now" → opens application modal
 * - After payment (unlocked=true): shows "Apply Instantly" → opens partner.applyLink
 */
export function PartnerCard({
  partner,
  unlocked,
  onApply,
}: {
  partner: InstantLoanPartner;
  unlocked: boolean;
  onApply: (partner: InstantLoanPartner) => void;
}) {
  const handleInstantApply = () => {
    window.open(partner.applyLink, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover">
      {/* Partner logo placeholder — equal size, premium */}
      <div className="relative flex h-24 items-center justify-center overflow-hidden bg-gradient-to-br from-navy/5 to-sky/5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
        <span className="font-display text-lg font-extrabold text-navy/70 transition-colors group-hover:text-royal sm:text-xl">
          {partner.name}
        </span>
        {unlocked && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal-brand/10 px-2 py-0.5 text-[10px] font-bold text-teal-brand">
            <CheckCircle2 className="size-3" /> Unlocked
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-royal/10 to-sky/10 text-royal">
            <Building2 className="size-4" />
          </span>
          <span className="rounded-full bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-royal">
            {partner.productType}
          </span>
        </div>
        <h3 className="mt-3 font-display text-base font-bold text-navy">
          {partner.name}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {partner.description}
        </p>

        {/* Button — consistently aligned at bottom */}
        {unlocked ? (
          <button
            onClick={handleInstantApply}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-brand to-cyan-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow active:scale-95"
          >
            <Sparkles className="size-4" />
            Apply Instantly
            <ArrowUpRight className="size-4" />
          </button>
        ) : (
          <button
            onClick={() => onApply(partner)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow active:scale-95"
          >
            Apply Now
            <ArrowUpRight className="size-4" />
          </button>
        )}
      </div>
    </article>
  );
}
