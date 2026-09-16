"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import { FD_PRODUCT, RD_PRODUCT } from "@/lib/investment-data";
import { cn } from "@/lib/utils";

type Product = typeof FD_PRODUCT;

export function InvestSection() {
  const products: Product[] = [FD_PRODUCT, RD_PRODUCT];

  return (
    <section
      id="investment"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#f6f9ff] to-white" />
      <div className="pointer-events-none absolute -right-24 top-1/4 size-80 rounded-full bg-teal-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 size-80 rounded-full bg-royal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Investment Solutions"
          title="Grow Your Savings with"
          highlight="FD & RD"
          description="Disciplined saving made simple. Explore Fixed Deposit and Recurring Deposit options with banks — book directly and earn indicative interest over a tenure you choose."
        />

        <StaggerGroup
          className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8"
          stagger={0.14}
        >
          {products.map((product) => (
            <StaggerItem key={product.slug} direction="up">
              <ProductCard product={product} href={`/investment/${product.slug}`} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Footnote */}
        <Reveal direction="up" className="mt-8">
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            FD &amp; RD products are booked directly with the respective
            bank/institution. Interest rates are indicative and may change.
            TNL Fincorp provides guidance and application support only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product, href }: { product: Product; href: string }) {
  const highlights = product.whyChoose.slice(0, 4);
  const BadgeIcon = product.whyChoose[3]?.icon ?? product.benefits[0].icon;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-card-hover",
        "glass"
      )}
    >
      {/* Hover gradient wash */}
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25",
          product.accent
        )}
      />

      {/* Image (with graceful gradient fallback if the asset is missing) */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        {!imgFailed ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
              product.accent
            )}
          >
            <BadgeIcon className="size-16 text-white/80" />
          </div>
        )}
        {/* Gradient overlay for legibility */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent"
        />
        {/* Floating icon badge */}
        <div className="absolute -bottom-6 left-6">
          <div
            className={cn(
              "grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
              product.accent
            )}
          >
            <BadgeIcon className="size-7" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-9 sm:p-8 sm:pt-10">
        <h3 className="font-display text-2xl font-bold text-navy">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {product.heroDescription}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2.5">
          {highlights.map((h) => (
            <li key={h.title} className="flex items-start gap-2.5">
              <CheckCircle2
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  product.slug === "fd" ? "text-royal" : "text-teal-brand"
                )}
              />
              <span className="text-sm leading-snug text-foreground/90">
                <span className="font-semibold text-navy">{h.title}</span>
                <span className="text-muted-foreground"> — {h.desc}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6 pt-2">
          <BrandButton
            href={href}
            variant={product.slug === "fd" ? "primary" : "dark"}
            size="md"
            className="w-full sm:w-auto"
          >
            Learn More
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </BrandButton>
        </div>
      </div>
    </article>
  );
}
