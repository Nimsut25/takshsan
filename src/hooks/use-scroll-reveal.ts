"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook.
 *
 * Returns a ref + a boolean indicating whether the element has entered the
 * viewport. Respects prefers-reduced-motion (reveals immediately).
 *
 * Robust initial-viewport detection: checks synchronously on mount and uses
 * a setTimeout fallback to ensure above-the-fold content always reveals.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options ?? {};
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? true
      : false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion — already revealed via initial state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Initial viewport check — reveal elements already visible on mount.
    const checkInViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const vw = window.innerWidth || 0;
      return (
        rect.top < vh &&
        rect.bottom > 0 &&
        rect.left < vw &&
        rect.right > 0
      );
    };

    if (checkInViewport()) {
      const t = setTimeout(() => setVisible(true), 50);
      if (once) return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Safety net: if for any reason the observer hasn't fired after 2s,
    // reveal the content so it's never permanently invisible.
    const safety = setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [threshold, rootMargin, once]);

  return { ref, visible } as const;
}
