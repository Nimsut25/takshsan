"use client";

import { Reveal } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary",
              align === "center" ? "mx-auto" : ""
            )}
          >
            <span className="size-1.5 rounded-full bg-gradient-to-r from-primary to-teal-brand animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.05}>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.7rem] md:leading-[1.1]">
          {title}{" "}
          {highlight && <span className="text-gradient-brand">{highlight}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              "mt-4 text-base text-muted-foreground sm:text-lg",
              align === "center" ? "mx-auto" : ""
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
