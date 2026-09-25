"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook.
 *
 * Returns a ref + a boolean indicating whether the element should be visible.
 *
 * Design principle: CONTENT IS ALWAYS VISIBLE BY DEFAULT.
 *  - `visible` starts as `true` (content shows instantly on page load).
 *  - For below-the-fold elements, `visible` is set to `false` after mount
 *    (so the entrance animation can play when scrolled into view).
 *  - A safety-net timeout ensures `visible` is always `true` after 1.5s,
 *    so content is NEVER permanently invisible.
 *
 * This ensures:
 *  - No flash of invisible content on page load (above-the-fold content
 *    starts visible and stays visible).
 *  - Below-the-fold content reveals with animation on scroll.
 *  - If anything fails, content is visible within 1.5s.
 *
 * Respects prefers-reduced-motion (always visible, no animation).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options ?? {};
  const ref = useRef<T>(null);
  // Start visible=true so content shows instantly on page load.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion — content always visible, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // visible already true via initial state
    }

    // Check if element is in viewport on mount.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const vw = window.innerWidth || 0;
    const inViewport =
      rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;

    if (inViewport) {
      // Above the fold — already visible via initial state. No action needed.
      return;
    }

    // Below the fold — set to hidden so animation can play on scroll.
    // Use rAF to avoid synchronous setState in effect (lint rule).
    const hideT = requestAnimationFrame(() => setVisible(false));

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

    // Safety net: ensure content is never permanently invisible.
    const safety = setTimeout(() => setVisible(true), 1500);

    return () => {
      cancelAnimationFrame(hideT);
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [threshold, rootMargin, once]);

  return { ref, visible } as const;
}
