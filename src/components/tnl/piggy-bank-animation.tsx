"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Banknote, Coins, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type TokenKind = "note" | "coin";

type Token = {
  kind: TokenKind;
  /** starting offset from centre, in px */
  start: { x: number; y: number };
  delay: number;
  duration: number;
  /** rotation along the path, in deg */
  rotate: number;
  /** visual size variant */
  size: "sm" | "md" | "lg";
  /** accent gradient class */
  accent: string;
};

const TOKENS: Token[] = [
  {
    kind: "note",
    start: { x: -130, y: -100 },
    delay: 0,
    duration: 3.6,
    rotate: -12,
    size: "md",
    accent: "from-teal-brand to-cyan-brand",
  },
  {
    kind: "coin",
    start: { x: 140, y: -90 },
    delay: 0.6,
    duration: 3.8,
    rotate: 18,
    size: "sm",
    accent: "from-amber-400 to-amber-500",
  },
  {
    kind: "note",
    start: { x: -150, y: 30 },
    delay: 1.2,
    duration: 4.0,
    rotate: 8,
    size: "lg",
    accent: "from-royal to-sky",
  },
  {
    kind: "coin",
    start: { x: 150, y: 50 },
    delay: 1.8,
    duration: 3.6,
    rotate: -22,
    size: "md",
    accent: "from-amber-400 to-amber-500",
  },
  {
    kind: "coin",
    start: { x: -95, y: 110 },
    delay: 2.4,
    duration: 3.8,
    rotate: 14,
    size: "sm",
    accent: "from-amber-400 to-amber-500",
  },
  {
    kind: "note",
    start: { x: 100, y: 120 },
    delay: 3.0,
    duration: 4.0,
    rotate: -8,
    size: "md",
    accent: "from-teal-brand to-cyan-brand",
  },
];

const SIZE_CLASS: Record<Token["size"], string> = {
  sm: "size-7",
  md: "size-9",
  lg: "size-11",
};

/* ---------- hydration-safe "is client" detection (no setState-in-effect) ---------- */
function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

/**
 * Premium animated piggy-bank visual.
 *
 * Renders a soft glow + centered piggy image with a gentle float. Small
 * currency tokens (notes & coins) appear from outside and animate toward
 * the piggy in a staggered infinite loop. Falls back to a static piggy
 * when prefers-reduced-motion is set, and uses an is-client gate so SSR
 * and the first client render match (no hydration mismatch).
 */
export function PiggyBankAnimation({
  image = "/images/piggy-bank.jpg",
  className,
}: {
  image?: string;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );

  const animateEnabled = isClient && !prefersReduced;

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-visible",
        className
      )}
      aria-hidden
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(56,102,243,0.18) 0%, rgba(20,184,166,0.10) 38%, transparent 70%)",
        }}
      />
      {/* Soft pulsing ring */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 sm:size-64"
        animate={
          animateEnabled
            ? { scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }
            : undefined
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Piggy image */}
      <motion.div
        className="relative z-10 size-40 sm:size-48"
        animate={animateEnabled ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative size-full overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/90 to-primary/5 shadow-soft">
          <img
            src={image}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            onError={(e) => {
              // If the asset is missing, hide the img so the gradient + icon fallback shows.
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Decorative fallback overlay so the visual is never empty */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-royal/8 to-teal-brand/8">
            <span className="font-display text-4xl font-extrabold text-gradient-brand">
              ₹
            </span>
          </div>
          <Sparkles className="absolute right-3 top-3 size-4 text-amber-400/80" />
        </div>
      </motion.div>

      {/* Animated currency tokens */}
      {animateEnabled &&
        TOKENS.map((t, idx) => (
          <div
            key={idx}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              initial={{ x: t.start.x, y: t.start.y, opacity: 0, scale: 0.5 }}
              animate={{
                x: [t.start.x, 0],
                y: [t.start.y, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 0.9, 0.35],
                rotate: [t.rotate, 0],
              }}
              transition={{
                duration: t.duration,
                delay: t.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.15, 0.85, 1],
              }}
            >
              <TokenGlyph token={t} />
            </motion.div>
          </div>
        ))}

      {/* Static decoration tokens (visible when motion is reduced / before mount) */}
      {!animateEnabled && (
        <>
          <div className="pointer-events-none absolute left-[18%] top-[26%] z-20">
            <TokenGlyph
              token={{
                kind: "note",
                start: { x: 0, y: 0 },
                delay: 0,
                duration: 0,
                rotate: -12,
                size: "md",
                accent: "from-teal-brand to-cyan-brand",
              }}
            />
          </div>
          <div className="pointer-events-none absolute right-[16%] top-[22%] z-20">
            <TokenGlyph
              token={{
                kind: "coin",
                start: { x: 0, y: 0 },
                delay: 0,
                duration: 0,
                rotate: 18,
                size: "sm",
                accent: "from-amber-400 to-amber-500",
              }}
            />
          </div>
          <div className="pointer-events-none absolute right-[20%] bottom-[24%] z-20">
            <TokenGlyph
              token={{
                kind: "note",
                start: { x: 0, y: 0 },
                delay: 0,
                duration: 0,
                rotate: 8,
                size: "md",
                accent: "from-royal to-sky",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function TokenGlyph({ token }: { token: Token }) {
  if (token.kind === "note") {
    return (
      <span
        className={cn(
          "inline-grid place-items-center rounded-lg bg-gradient-to-br text-white shadow-glow",
          token.accent,
          SIZE_CLASS[token.size]
        )}
        style={{ transform: `rotate(${token.rotate}deg)` }}
      >
        <Banknote className="size-4" strokeWidth={2.4} />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-full bg-gradient-to-br text-white shadow-soft ring-2 ring-white/70",
        token.accent,
        SIZE_CLASS[token.size]
      )}
      style={{ transform: `rotate(${token.rotate}deg)` }}
    >
      <Coins className="size-3.5" strokeWidth={2.4} />
    </span>
  );
}
