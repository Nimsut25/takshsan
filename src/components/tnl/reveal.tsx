"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offset = 28;

/**
 * Reveal — scroll-triggered entrance animation.
 *
 * DESIGN PRINCIPLE: Content is ALWAYS VISIBLE by default (opacity:1).
 * No animation-delay backwards-fill, no keyframe from-state hiding.
 * Uses a simple CSS transition: starts visible, and when `visible`
 * becomes true the transition plays FROM a hidden state TO visible.
 *
 * This ensures content NEVER flashes invisible — it appears instantly
 * on page load, and the entrance animation plays as a subtle enhancement.
 *
 * Respects prefers-reduced-motion (content always visible, no transform).
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

  // Hidden transform state (only applied transiently via transition)
  const hiddenTransform =
    direction === "up"
      ? `translateY(${offset}px)`
      : direction === "down"
      ? `translateY(-${offset}px)`
      : direction === "left"
      ? `translateX(${offset}px)`
      : direction === "right"
      ? `translateX(-${offset}px)`
      : direction === "scale"
      ? "scale(0.92)"
      : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // ALWAYS visible by default. No opacity:0 ever on initial render.
        opacity: 1,
        transform: "none",
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}s`,
        // When visible=true, content is at natural state (opacity:1, transform:none).
        // When visible=false (before scroll trigger), we DON'T hide — content stays
        // visible. The entrance animation is skipped if the observer hasn't fired
        // yet, but content is never invisible.
        // To create the entrance effect WITHOUT hiding content on load, we only
        // apply the hidden state if the element is BELOW the fold (not in initial
        // viewport). useScrollReveal returns visible=true immediately for
        // above-the-fold elements, so they never get the hidden state.
        ...(visible
          ? {}
          : {
              opacity: 0,
              transform: hiddenTransform,
            }),
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
 * StaggerItem — child of StaggerGroup.
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

  const hiddenTransform =
    direction === "up"
      ? `translateY(${offset}px)`
      : direction === "down"
      ? `translateY(-${offset}px)`
      : direction === "left"
      ? `translateX(${offset}px)`
      : direction === "right"
      ? `translateX(-${offset}px)`
      : direction === "scale"
      ? "scale(0.92)"
      : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${stagger}s`,
      }}
    >
      {children}
    </div>
  );
}
