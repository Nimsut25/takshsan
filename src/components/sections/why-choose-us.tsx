"use client";

import { motion } from "framer-motion";
import { WHY_FEATURES } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";

export function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-mesh py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -left-20 top-0 size-80 rounded-full bg-royal/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-teal-brand/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why TNL Finance"
          title="Why Choose"
          highlight="TNL Finance?"
          description="We focus on clear communication, suitable options and consistent support through your loan journey."
        />

        <StaggerGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {WHY_FEATURES.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur-md transition-shadow hover:shadow-card-hover"
              >
                {/* number watermark */}
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-primary/5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={cn(
                    "relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                    feature.accent
                  )}
                >
                  <feature.icon className="size-7" />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
                </div>

                <h3 className="relative mt-5 font-display text-lg font-bold text-navy">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>

                <div className="relative mt-5 h-0.5 w-12 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className={cn(
                      "h-full w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
                      feature.accent
                    )}
                  />
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
