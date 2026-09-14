"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offset = 28;

const variants: Record<Direction, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  up: {
    hidden: { opacity: 0, y: offset },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -offset },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: offset },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -offset },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
};

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
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
