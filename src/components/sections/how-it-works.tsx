"use client";

import { motion } from "framer-motion";
import { HOW_STEPS } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/tnl/reveal";
import { useModalStore } from "@/lib/modal-store";
import { BrandButton } from "@/components/tnl/brand-button";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section
      id="how"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#f6f9ff] py-20 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It"
          highlight="Works"
          description="A clear 4-step journey from sharing your requirement to end-to-end support."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden lg:block">
            <div className="relative mx-auto h-0.5 max-w-5xl bg-gradient-to-r from-transparent via-primary/20 to-transparent">
              <motion.div
                className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-royal via-sky to-teal-brand"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </div>

          <StaggerGroup
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.15}
          >
            {HOW_STEPS.map((step) => (
              <StaggerItem key={step.step} className="relative">
                <div className="group relative flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative grid size-[6.5rem] place-items-center rounded-full border border-primary/15 bg-white shadow-soft"
                  >
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
                    <span className="absolute -top-2 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-royal to-sky text-xs font-extrabold text-white shadow-glow">
                      {step.step}
                    </span>
                    <step.icon className="size-7 text-royal" />
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-primary/10 transition-transform group-hover:scale-105" />
                  </motion.div>

                  <h3 className="mt-5 font-display text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[14rem] text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal direction="up" className="mt-14 text-center">
          <BrandButton onClick={() => openEnquiry()} size="lg">
            Start Your Loan Enquiry
          </BrandButton>
        </Reveal>
      </div>
    </section>
  );
}
