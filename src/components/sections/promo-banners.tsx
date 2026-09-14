"use client";

import { ArrowUpRight, Phone, Sparkles } from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { Reveal } from "@/components/tnl/reveal";

const MARQUEE_PHRASES = [
  "Turn Your Plans Into Possibilities",
  "The Right Loan Can Move You Forward",
  "Finance Your Next Big Goal",
  "Solutions for Personal, Business & Life Goals",
  "Smart Loan Solutions. Simple Financial Journey.",
];

export function PromoBanners() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  return (
    <section className="relative py-10 sm:py-12">
      {/* Marquee strip */}
      <div className="relative overflow-hidden border-y border-primary/10 bg-white py-4">
        <div className="tnl-marquee flex w-max gap-8 whitespace-nowrap">
          {[...MARQUEE_PHRASES, ...MARQUEE_PHRASES].map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 font-display text-lg font-bold text-navy/80 sm:text-xl"
            >
              <span className="size-1.5 rounded-full bg-gradient-to-r from-royal to-teal-brand" />
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
        {/* Banner 1 */}
        <Reveal direction="up">
          <div className="group relative h-full overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/banner-1.jpg"
              alt="Need financial support - find the right loan solution"
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/20" />
            <div className="relative flex h-full min-h-[15rem] flex-col justify-center p-7 sm:min-h-[18rem] sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Sparkles className="size-3.5" />
                Loan Assistance
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Need Financial Support?
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/80 sm:text-base">
                Find the Right Loan Solution for Your Needs.
              </p>
              <div className="mt-5">
                <button
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  Get Loan Assistance
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Banner 2 */}
        <Reveal direction="up" delay={0.1}>
          <div className="group relative h-full overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/banner-2.jpg"
              alt="Your goals, your plans, our loan support"
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-royal/85 via-royal/50 to-transparent" />
            <div className="relative flex h-full min-h-[15rem] flex-col justify-center p-7 sm:min-h-[18rem] sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Sparkles className="size-3.5" />
                Talk to Our Team
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Your Goals. Your Plans.
                <br /> Our Loan Support.
              </h3>
              <div className="mt-5">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-royal shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="size-4" />
                  Talk to Our Team
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
