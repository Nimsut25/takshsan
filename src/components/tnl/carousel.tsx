"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Premium reusable carousel.
 *
 * Features:
 *  - Auto-slide with configurable interval
 *  - Pause on hover (desktop) / focus
 *  - Navigation arrows + pagination dots
 *  - Touch / swipe support (mobile)
 *  - Respects prefers-reduced-motion (disables auto-slide + eases transitions)
 *  - Smooth slide transition
 *  - Accessible (aria labels)
 */
export function Carousel({
  slides,
  autoPlay = true,
  interval = 6000,
  className,
  showArrows = true,
  showDots = true,
  slideClassName,
  onSlideChange,
}: {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  slideClassName?: string;
  onSlideChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? true
      : false
  );
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex((prev) => {
        const n = (next + count) % count;
        onSlideChange?.(n);
        return n;
      });
    },
    [count, onSlideChange]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (!autoPlay || paused || reducedMotion || count <= 1) return;
    const t = setInterval(() => {
      setIndex((prev) => {
        const n = (prev + 1) % count;
        onSlideChange?.(n);
        return n;
      });
    }, interval);
    return () => clearInterval(t);
  }, [autoPlay, paused, reducedMotion, interval, count, onSlideChange]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  if (count === 0) return null;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionDuration: reducedMotion ? "0ms" : undefined,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn("relative h-full w-full shrink-0", slideClassName)}
            aria-hidden={i !== index}
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur-md transition-all duration-200 hover:bg-white/30 hover:-translate-y-[calc(50%-2px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-5 sm:size-12"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur-md transition-all duration-200 hover:bg-white/30 hover:-translate-y-[calc(50%-2px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-5 sm:size-12"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
