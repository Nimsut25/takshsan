"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Premium gold Rupee coin custom cursor.
 *
 * - Desktop / fine-pointer devices only (`@media (hover: hover) and (pointer: fine)`).
 * - Tracks the pointer via `translate3d` (GPU-friendly, no reflow).
 * - Continuously and slowly spins on its Y axis (3D coin feel).
 * - Enlarges smoothly (~1.55x) when hovering interactive elements.
 * - The native cursor is hidden only on capable devices (via globals.css).
 *
 * Implemented with three layers so transforms never conflict:
 *   outer (JS translate) → middle (CSS scale on hover) → inner (CSS rotateY spin)
 *
 * Capability detection uses `useSyncExternalStore` (the React-recommended way to
 * read matchMedia) which avoids setState-in-effect cascades and stays stable
 * across SSR/hydration.
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

export function CoinCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const enabled = useSyncExternalStore(
    subscribeFine,
    getFineSnapshot,
    getServerSnapshot
  );

  // Pointer tracking + hover detection (only when enabled).
  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let active = true;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      raf = 0;
      if (!active) return;
      curX += (targetX - curX) * 0.35;
      curY += (targetY - curY) * 0.35;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      }
      if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
        raf = requestAnimationFrame(loop);
      }
    };

    const interactiveSelector =
      'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [role="tab"], [data-cursor="hover"], [tabindex]:not([tabindex="-1"])';

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest(interactiveSelector)) setHovering(false);
    };
    const onLeave = () => {
      if (middleRef.current) middleRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (middleRef.current) middleRef.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={outerRef}
      aria-hidden
      className="tnl-coin-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ transform: "translate3d(50vw, 50vh, 0)" }}
    >
      <div
        ref={middleRef}
        className="tnl-coin-scale will-change-transform"
        style={{
          transform: hovering ? "scale(1.55)" : "scale(1)",
          transition:
            "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
        }}
      >
        <div className="tnl-coin-spin">
          <img
            src="/coin-cursor.png"
            alt=""
            draggable={false}
            width={34}
            height={34}
            className="select-none"
            style={{
              width: 34,
              height: 34,
              filter: hovering
                ? "drop-shadow(0 4px 10px rgba(56,102,243,0.35)) brightness(1.08)"
                : "drop-shadow(0 3px 6px rgba(0,0,0,0.18))",
              transition: "filter 0.2s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
