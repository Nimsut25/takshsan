"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { id: string; heading: string; body: React.ReactNode }[];
}) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-primary/10 pb-6">
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
        </div>

        {/* Table of Contents */}
        <nav className="mt-8 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Table of Contents</h2>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="text-sm text-royal hover:underline"
                >
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-xl font-bold text-navy">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-40 grid size-12 place-items-center rounded-full border border-primary/20 bg-white text-royal shadow-glow transition-transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}

// Shared content helpers
export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="ml-5 list-disc space-y-1.5">{children}</ul>;
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-navy">{children}</strong>;
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-xs text-amber-700">{children}</span>;
}
