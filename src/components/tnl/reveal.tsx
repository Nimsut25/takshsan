"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offset = 28;

const hiddenStyles: Record<Direction, React.CSSProperties> = {
  fade: { opacity: 0 },
  up: { opacity: 0, transform: `translateY(${offset}px)` },
  down: { opacity: 0, transform: `translateY(-${offset}px)` },
  left: { opacity: 0, transform: `translateX(${offset}px)` },
  right: { opacity: 0, transform: `translateX(-${offset}px)` },
  scale: { opacity: 0, transform: "scale(0.92)" },
};

const visibleStyles: React.CSSProperties = {
  opacity: 1,
  transform: "none",
};

/**
 * Reveal — scroll-triggered entrance animation.
 *
 * Uses a CSS-transition + IntersectionObserver approach (via useScrollReveal)
 * instead of framer-motion's whileInView, which was unreliable in this
 * environment (animations not triggering, leaving content at opacity:0).
 *
 * Respects prefers-reduced-motion (content shows immediately).
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({
    threshold: amount,
    once,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}s`,
        ...(visible ? visibleStyles : hiddenStyles[direction]),
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerGroup — container that reveals as a group.
 */
export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({
    threshold: amount,
    once,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerItem — child of StaggerGroup. Uses CSS transition with a delay.
 */
export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.6,
  stagger = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  stagger?: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${stagger}s`,
        ...(visible ? visibleStyles : hiddenStyles[direction]),
      }}
    >
      {children}
    </div>
  );
}
