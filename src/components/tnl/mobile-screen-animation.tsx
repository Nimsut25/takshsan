"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BadgeIndianRupee,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  FileCheck2,
  PartyPopper,
  ShieldCheck,
  Smartphone,
  Star,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: ClipboardCheck, label: "Check Eligibility" },
  { icon: BadgeIndianRupee, label: "Select Amount & Tenure" },
  { icon: FileCheck2, label: "Verify Documents" },
  { icon: Wallet, label: "Amount Disbursed" },
];

/**
 * Cinematic 3D animated mobile-screen experience for the Personal Loan page.
 *
 * Sequence (loops):
 *  1. Sequentially display 4 steps on a phone mockup
 *  2. Show the TNL Fincorp logo with premium 3D animation
 *  3. Animate coins dropping from behind the logo → traveling to a wallet
 *  4. Bring logo + wallet together
 *  5. Trigger a tasteful celebration (ribbons/confetti + stars)
 *
 * Respects prefers-reduced-motion (renders a static phone with the final step).
 */
export function MobileScreenAnimation({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  // 0..3 = steps, 4 = logo reveal + coin drop, 5 = celebration, then loop
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const seq = [
      { at: 0, phase: 0, step: 0 },
      { at: 1400, phase: 0, step: 1 },
      { at: 2800, phase: 0, step: 2 },
      { at: 4200, phase: 0, step: 3 },
      { at: 5600, phase: 4, step: 4 },
      { at: 7200, phase: 5, step: 5 },
      { at: 9200, phase: 0, step: 0 }, // loop
    ];
    const timers = seq.map((s) =>
      setTimeout(() => {
        setPhase(s.phase);
        setStep(s.step);
      }, s.at)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const showLogo = phase >= 4;
  const showCelebration = phase === 5;

  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
      {/* Phone mockup */}
      <motion.div
        initial={reduce ? {} : { rotateY: -12, rotateX: 4 }}
        animate={{ rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[16rem]"
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
      >
        <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[2rem] border-[6px] border-navy/90 bg-gradient-to-b from-[#0b1c44] to-[#13316d] p-3 shadow-glow">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-30 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/50" />

          {/* screen content */}
          <div className="relative flex h-full flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#f4f7ff] to-white p-4">
            <AnimatePresence mode="wait">
              {!showLogo && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  {(() => {
                    const StepIcon = STEPS[step]?.icon;
                    return (
                      <div
                        className={cn(
                          "grid size-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
                          accent
                        )}
                      >
                        {StepIcon && <StepIcon className="size-8" />}
                      </div>
                    );
                  })()}
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-teal-brand" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal">
                      Step {step + 1} / 4
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-sm font-bold text-navy">
                    {STEPS[step]?.label}
                  </p>
                  {/* progress dots */}
                  <div className="mt-4 flex gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i <= step
                            ? "w-5 bg-gradient-to-r from-royal to-teal-brand"
                            : "w-1.5 bg-primary/20"
                        )}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showLogo && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.7, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  {/* TNL Fincorp logo mark */}
                  <div className="relative grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                    <span className="font-display text-2xl font-extrabold">
                      TNL
                    </span>
                    {/* coin drop from behind logo */}
                    {!reduce && phase === 4 && (
                      <>
                        {[0, 1, 2, 3].map((i) => (
                          <motion.span
                            key={i}
                            initial={{ y: -40, opacity: 0, scale: 0.5 }}
                            animate={{ y: [0, 60, 60], opacity: [1, 1, 0] }}
                            transition={{
                              duration: 1.2,
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                            className="absolute -top-2 grid size-5 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[9px] font-bold text-white shadow-soft"
                            style={{ left: `${30 + i * 12}%`, zIndex: 5 }}
                          >
                            ₹
                          </motion.span>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Wallet icon receiving coins */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex flex-col items-center"
                  >
                    <motion.div
                      animate={
                        reduce
                          ? {}
                          : { y: [0, -6, 0], rotate: [0, -3, 0] }
                      }
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-soft"
                    >
                      <Wallet className="size-6" />
                    </motion.div>
                    <span className="mt-1.5 text-[10px] font-bold text-teal-brand">
                      Disbursed
                    </span>
                  </motion.div>

                  {/* bringing logo + wallet together indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-2 h-0.5 w-12 origin-center bg-gradient-to-r from-royal to-teal-brand"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* celebration overlay */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <PartyPopper className="size-8 text-amber-500" />
                  {/* confetti ribbons */}
                  {!reduce &&
                    Array.from({ length: 14 }).map((_, i) => {
                      const colors = [
                        "#3866f3",
                        "#22d3ee",
                        "#14b8a6",
                        "#fbbf24",
                        "#f472b6",
                      ];
                      return (
                        <motion.span
                          key={i}
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            rotate: 0,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 220,
                            y: (Math.random() - 0.5) * 220,
                            opacity: 0,
                            rotate: Math.random() * 360,
                          }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                          className="absolute h-2 w-1 rounded-full"
                          style={{
                            backgroundColor: colors[i % colors.length],
                          }}
                        />
                      );
                    })}
                  {/* stars */}
                  {!reduce &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <motion.span
                        key={`star-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: 2,
                        }}
                        className="absolute"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                      >
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                      </motion.span>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* phone shadow */}
        <div className="mx-auto mt-3 h-3 w-3/4 rounded-full bg-navy/20 blur-md" />
      </motion.div>

      {/* step indicators below */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all",
              step >= i && phase < 4
                ? "bg-primary/10 text-royal"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <s.icon className="size-3" />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
