"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    queueMicrotask(handle);
    return () => {
      api.off("select", handle);
      api.off("reInit", handle);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-royal/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-10 size-72 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Voices"
          title="What Our"
          highlight="Customers Say"
          description="Placeholder testimonials shown for design demonstration. Replace with verified customer reviews before launch."
        />

        <Reveal direction="scale" className="mt-12">
          <Carousel opts={{ align: "center", loop: true }} setApi={setApi}>
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem
                  key={t.name}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                    <Quote className="size-9 text-primary/15" />
                    <div className="mt-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
                      <span
                        className={cn(
                          "grid size-12 place-items-center rounded-full bg-gradient-to-br font-display text-base font-bold text-white shadow-soft",
                          t.accent
                        )}
                      >
                        {t.initials}
                      </span>
                      <div>
                        <div className="font-display text-sm font-bold text-navy">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} · {t.location}
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Reveal>

        <div className="mt-7 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="size-10 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
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
            className="size-10 rounded-full border-primary/25 bg-white text-royal hover:bg-primary/5"
            aria-label="Next testimonial"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          * These are demo testimonials for design demonstration and will be
          replaced with verified customer reviews.
        </p>
      </div>
    </section>
  );
}
