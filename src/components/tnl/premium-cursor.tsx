"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Premium dual-layer custom cursor for TNL Finance.
 *
 *   • Small luminous solid core dot — tracks the pointer almost instantly
 *   • Thin semi-transparent ring — follows with a subtle easing delay
 *   • Hover state: ring expands, dot shrinks, subtle brand glow
 *   • Button / primary CTA state: stronger teal glow + larger ring
 *   • Click feedback: ring briefly contracts then eases back
 *   • Subtle magnetic attraction toward [data-cursor-magnetic] CTAs
 *
 * Desktop / fine-pointer devices only (via matchMedia).
 * Respects prefers-reduced-motion (ring hidden, no magnetic, instant tracking).
 *
 * Implementation notes:
 *   - A single rAF loop updates BOTH layers (no per-event DOM writes).
 *   - Only `transform: translate3d(...)` is written each frame (GPU-friendly).
 *   - Size changes happen via CSS class swaps (no width/height writes per frame).
 *   - All cursor DOM nodes are `pointer-events: none` + `aria-hidden`.
 */

const FINE_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFine(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(FINE_QUERY);
  if (mql.addEventListener) {
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }
  mql.addListener(callback);
  return () => mql.removeListener(callback);
}

function getFineSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(FINE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [role="tab"], [data-cursor="hover"], [tabindex]:not([tabindex="-1"])';

const BUTTON_SELECTOR =
  'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], [data-cursor="button"]';

const MAGNETIC_SELECTOR = "[data-cursor-magnetic]";

export function PremiumCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const enabled = useSyncExternalStore(
    subscribeFine,
    getFineSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!root || !dotEl || !ringEl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Pointer target position (where the OS pointer actually is).
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    // Dot position (follows fast).
    let dx = tx;
    let dy = ty;
    // Ring position (follows with easing → trailing effect).
    let rx = tx;
    let ry = ty;

    let raf = 0;
    let active = true;

    // Magnetic target element + its center.
    let magnetEl: HTMLElement | null = null;
    let magnetCx = 0;
    let magnetCy = 0;
    let magnetStrength = 0; // 0..1 eased value

    const DOT_EASE = reducedMotion ? 1 : 0.55;
    const RING_EASE = reducedMotion ? 1 : 0.18;
    const MAGNET_RADIUS = 90; // px within which magnetism engages
    const MAGNET_PULL = 0.28; // how much the cursor gravitates toward the CTA
    const MAGNET_EASE = 0.16;

    const loop = () => {
      raf = 0;
      if (!active) return;

      dx += (tx - dx) * DOT_EASE;
      dy += (ty - dy) * DOT_EASE;
      rx += (tx - rx) * RING_EASE;
      ry += (ty - ry) * RING_EASE;

      // Magnetic pull: when near a magnetic CTA, ease the *cursor* toward the
      // CTA center. (We do not transform the button itself to avoid conflicts
      // with its hover / shimmer transforms and to prevent layout disturbance.)
      let drawX = dx;
      let drawY = dy;
      let ringX = rx;
      let ringY = ry;

      if (!reducedMotion && magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        magnetCx = rect.left + rect.width / 2;
        magnetCy = rect.top + rect.height / 2;
        const dist = Math.hypot(tx - magnetCx, ty - magnetCy);
        const within = Math.max(0, 1 - dist / MAGNET_RADIUS);
        magnetStrength += (within - magnetStrength) * MAGNET_EASE;
        if (magnetStrength > 0.001) {
          const pull = magnetStrength * MAGNET_PULL;
          drawX = dx + (magnetCx - dx) * pull;
          drawY = dy + (magnetCy - dy) * pull;
          ringX = rx + (magnetCx - rx) * pull * 0.5;
          ringY = ry + (magnetCy - ry) * pull * 0.5;
        }
      } else {
        magnetStrength += (0 - magnetStrength) * MAGNET_EASE;
      }

      dotEl.style.transform = `translate3d(${drawX}px, ${drawY}px, 0)`;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Keep animating while there's meaningful motion or active magnetism.
      const moving =
        Math.abs(tx - dx) > 0.05 ||
        Math.abs(ty - dy) > 0.05 ||
        Math.abs(tx - rx) > 0.05 ||
        Math.abs(ty - ry) > 0.05 ||
        magnetStrength > 0.002;
      if (moving) raf = requestAnimationFrame(loop);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      schedule();
    };

    // --- Hover state management (delegated, cheap) ---
    const setHover = (state: "none" | "hover" | "button") => {
      root.classList.remove("tnl-cursor--hover", "tnl-cursor--button");
      if (state === "button") root.classList.add("tnl-cursor--button");
      else if (state === "hover") root.classList.add("tnl-cursor--hover");
    };

    const computeHover = (target: Element | null) => {
      if (!target) {
        setHover("none");
        return;
      }
      const closestInteractive = target.closest(INTERACTIVE_SELECTOR);
      if (!closestInteractive) {
        setHover("none");
        return;
      }
      if (closestInteractive.closest(BUTTON_SELECTOR)) {
        setHover("button");
      } else {
        setHover("hover");
      }
    };

    // Magnetic target tracking.
    const updateMagnet = (target: Element | null) => {
      const next = (target && target.closest(MAGNETIC_SELECTOR)) as HTMLElement | null;
      if (next !== magnetEl) {
        magnetEl = next;
        magnetStrength = 0;
      }
      schedule();
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      computeHover(t);
      updateMagnet(t);
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest(INTERACTIVE_SELECTOR)) {
        // Re-evaluate in case the new target under the pointer isn't interactive.
        const related = (e as PointerEvent).relatedTarget as Element | null;
        computeHover(related);
        updateMagnet(related);
      }
    };

    const onDown = () => {
      root.classList.add("tnl-cursor--down");
    };
    const onUp = () => {
      root.classList.remove("tnl-cursor--down");
      schedule();
    };

    const onLeave = () => {
      root.style.opacity = "0";
    };
    const onEnter = () => {
      root.style.opacity = "1";
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    // Initial position sync.
    schedule();

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ transform: "translateZ(0)" }}
    >
      <div ref={ringRef} className="tnl-cursor-ring" />
      <div ref={dotRef} className="tnl-cursor-dot" />
    </div>
  );
}
