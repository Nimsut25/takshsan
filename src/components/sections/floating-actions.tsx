"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Phone, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating stack */}
      <div className="fixed bottom-6 right-5 z-40 hidden flex-col items-end gap-3 sm:flex">
        <AnimatePresence>
          {show && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Scroll to top"
              className="grid size-12 place-items-center rounded-full border border-primary/20 bg-white text-royal shadow-glow transition-transform hover:-translate-y-1"
            >
              <ArrowUp className="size-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={COMPANY.phoneHref}
          aria-label={`Call ${COMPANY.phone}`}
          className="group relative grid size-13 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow transition-transform hover:-translate-y-1 animate-pulse-ring"
        >
          <Phone className="size-5" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 lg:block">
            Call {COMPANY.phone}
          </span>
        </a>

        <button
          onClick={() => openEnquiry()}
          className="group grid size-13 place-items-center rounded-full bg-gradient-to-br from-royal to-sky text-white shadow-glow transition-transform hover:-translate-y-1"
          aria-label="Apply for loan"
        >
          <Sparkles className="size-5" />
        </button>
      </div>

      {/* Mobile sticky bottom CTA bar */}
      <MobileCtaBar />
    </>
  );
}

function MobileCtaBar() {
  const openEnquiry = useModalStore((s) => s.openEnquiry);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-white/85 px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-lg sm:hidden"
        >
          <div className="flex gap-2.5">
            <a
              href={COMPANY.phoneHref}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/25 bg-white py-3 text-sm font-bold text-royal shadow-soft active:scale-95"
              )}
            >
              <Phone className="size-4" />
              Call Now
            </a>
            <button
              onClick={() => openEnquiry()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky py-3 text-sm font-bold text-white shadow-glow active:scale-95"
            >
              <Sparkles className="size-4" />
              Apply for Loan
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
