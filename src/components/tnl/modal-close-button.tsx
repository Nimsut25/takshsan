"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable premium close button used inside modal headers / panels.
 *
 * - Circular glass surface, semi-transparent on light headers, white on dark
 *   headers (use `variant="light"` for use on coloured gradient headers).
 * - Smooth hover: rotation + scale + bg opacity bump.
 * - Fully accessible: `aria-label` + keyboard focusable.
 */
export function ModalCloseButton({
  onClick,
  className,
  ariaLabel = "Close",
  variant = "light",
}: {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  /** "light" = sits on a coloured/gradient header (white circle), "dark" = sits on a light bg (royal text). */
  variant?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2",
        variant === "light"
          ? "bg-white/15 text-white backdrop-blur hover:rotate-90 hover:bg-white/30"
          : "border border-primary/15 bg-white text-royal hover:rotate-90 hover:bg-primary/5",
        className
      )}
    >
      <X className="size-4" />
    </button>
  );
}
