"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { LOAN_PRODUCTS, LOAN_ROUTE } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LoanServicesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;
    const handle = () => onSelect(api);
    api.on("select", handle);
    api.on("reInit", handle);
    // defer initial sync so we don't call setState synchronously inside the effect
    queueMicrotask(handle);
    return () => {
      api.off("select", handle);
      api.off("reInit", handle);
    };
  }, [api, onSelect]);

  // autoplay
  useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => api.scrollNext(), 4200);
    return () => clearInterval(id);
  }, [api, paused]);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loan Services"
          title="Loan Solutions for"
          highlight="Every Need"
          description="Explore our range of loan assistance solutions designed for personal, business and life goals."
        />

        <Reveal direction="scale" className="mt-12">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Carousel
              opts={{ align: "start", loop: true }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-5">
                {LOAN_PRODUCTS.map((loan, i) => (
                  <CarouselItem
                    key={loan.slug}
                    className="pl-4 sm:pl-5 md:basis-1/2 lg:basis-1/3"
                  >
                    <article
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={loan.image}
                          alt={`${loan.title} assistance by TNL Fincorp`}
                          fill
                          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent" />
                        <div
                          className={cn(
                            "absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
                            loan.accent
                          )}
                        >
                          <loan.icon className="size-6" />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="font-display text-xl font-bold text-white drop-shadow">
                            {loan.title}
                          </h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {loan.short}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {loan.useCases.slice(0, 2).map((u) => (
                            <span
                              key={u}
                              className="rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-royal"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={LOAN_ROUTE[loan.slug]}
                          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-royal transition-all hover:gap-2.5 hover:bg-primary/5"
                        >
                          Learn More
                          <ChevronRight className="size-4" />
                        </Link>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="size-11 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
                aria-label="Previous"
              >
                <ArrowLeft className="size-5" />
              </Button>

              {/* dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === current
                        ? "w-7 bg-gradient-to-r from-royal to-teal-brand"
                        : "w-2 bg-primary/20 hover:bg-primary/40"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollNext()}
                className="size-11 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
                aria-label="Next"
              >
                <ArrowRight className="size-5" />
              </Button>

              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play autoplay" : "Pause autoplay"}
                className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-royal hover:bg-primary/5"
              >
                {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                <span className="hidden sm:inline">{paused ? "Play" : "Pause"}</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
