"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Star } from "lucide-react";
import { TRUST_POINTS, COMPANY } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { AnimatedCounter } from "@/components/tnl/animated-counter";

export function TrustSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Commitment"
          title="Built on"
          highlight="Trust & Guidance"
          description="Professional financial assistance focused on clear communication and suitable solutions."
        />

        {/* Stat band */}
        <StaggerGroup
          className="mt-12 grid gap-4 rounded-3xl border border-primary/10 bg-white/70 p-6 shadow-soft backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4 lg:p-8"
          stagger={0.1}
        >
          {[
            { value: 6, suffix: "+", label: "Loan Products Supported" },
            { value: 4, suffix: "-Step", label: "Guided Process" },
            { value: 100, suffix: "%", label: "Assistance Focus" },
            { value: 1, suffix: "-1", label: "Personalized Support" },
          ].map((s) => (
            <StaggerItem
              key={s.label}
              className="flex flex-col items-center text-center"
            >
              <div className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Trust cards */}
        <StaggerGroup
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {TRUST_POINTS.map((t) => (
            <StaggerItem key={t.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 shadow-soft"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-sky/10 text-royal transition-all group-hover:from-royal group-hover:to-sky group-hover:text-white">
                  <t.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}

          {/* Highlight card */}
          <StaggerItem>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-royal to-sky p-6 text-white shadow-glow">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="relative">
                <Sparkles className="size-6" />
                <h3 className="mt-3 font-display text-lg font-bold">
                  Professional Financial Assistance
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Guidance through documentation, application processing and
                  end-to-end support.
                </p>
              </div>
              <div className="relative mt-5 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-300 text-amber-300"
                    />
                  ))}
                </div>
                <span className="text-xs text-white/70">Customer-focused</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>

        {/* compliance note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"
        >
          <ShieldCheck className="size-4 text-teal-brand" />
          {COMPANY.name} provides loan assistance and financial solution
          guidance. Loan approval is subject to lender policies and is not
          guaranteed.
        </motion.div>
      </div>
    </section>
  );
}
