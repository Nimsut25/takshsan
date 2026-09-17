"use client";

import { useMemo, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Calculator,
  IndianRupee,
  Info,
  Percent,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import { Slider } from "@/components/ui/slider";
import type { CalculatorConfig } from "@/lib/loan-page-data";
import { cn } from "@/lib/utils";

function formatINR(n: number) {
  if (!isFinite(n) || isNaN(n)) return "0";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

type Props = {
  config: CalculatorConfig;
  accent?: string;
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Reusable, configurable loan EMI calculator.
 *
 * EMI = P × r × (1+r)^n / ((1+r)^n - 1)
 *   P = principal, r = monthly rate, n = months
 *
 * Handles zero/decimal rates, invalid inputs, min/max ranges, NaN/Infinity.
 * Optional down-payment support (auto loan).
 */
export function LoanEmiCalculator({
  config,
  accent = "from-royal to-sky",
  eyebrow = "EMI Calculator",
  title = "Estimate Your",
  highlight = "Monthly EMI",
  description = "A quick indicative estimate to help you plan. Final EMI depends on lender-approved rate, tenure and terms.",
  ctaLabel = "Start Your Loan Enquiry",
  ctaHref = "#apply",
}: Props) {
  const [amount, setAmount] = useState(config.defaultAmount);
  const [downPayment, setDownPayment] = useState(
    config.hasDownPayment ? Math.round(config.defaultAmount * 0.2) : 0
  );
  const [rate, setRate] = useState(config.defaultRate);
  const [years, setYears] = useState(config.defaultYears);

  const principal = config.hasDownPayment
    ? Math.max(0, amount - downPayment)
    : amount;

  const { emi, totalInterest, totalPayment, principalPct } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    let e: number;
    if (principal <= 0 || n <= 0) {
      e = 0;
    } else if (r === 0) {
      e = principal / n;
    } else {
      const factor = Math.pow(1 + r, n);
      e = (principal * r * factor) / (factor - 1);
    }
    if (!isFinite(e) || isNaN(e)) e = 0;
    const tp = e * n;
    const ti = Math.max(0, tp - principal);
    const pp = tp > 0 ? (principal / tp) * 100 : 0;
    return { emi: e, totalInterest: ti, totalPayment: tp, principalPct: pp };
  }, [principal, rate, years]);

  const chartData = [
    { name: "Principal", value: principal, color: "var(--royal)" },
    { name: "Interest", value: totalInterest, color: "var(--cyan-brand)" },
  ];

  const reset = () => {
    setAmount(config.defaultAmount);
    setDownPayment(
      config.hasDownPayment ? Math.round(config.defaultAmount * 0.2) : 0
    );
    setRate(config.defaultRate);
    setYears(config.defaultYears);
  };

  return (
    <section id="calculator" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f6f9ff] to-white" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-sky/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
        />

        <Reveal direction="up" className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft lg:grid-cols-2">
            {/* INPUTS */}
            <div className="border-b border-primary/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
                    accent
                  )}
                >
                  <Calculator className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    Loan Details
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Adjust values to update estimate instantly
                  </p>
                </div>
              </div>

              <Field
                label="Loan Amount"
                icon={IndianRupee}
                value={`₹${formatINR(amount)}`}
                sub={`₹${formatINR(config.minAmount)} – ₹${formatINR(config.maxAmount)}`}
              >
                <Slider
                  value={[amount]}
                  min={config.minAmount}
                  max={config.maxAmount}
                  step={config.maxAmount > 1000000 ? 100000 : 10000}
                  onValueChange={(v) => setAmount(v[0])}
                  className="[&_[role=slider]]:bg-royal [&_[role=slider]]:border-royal"
                />
              </Field>

              {config.hasDownPayment && (
                <Field
                  label="Down Payment"
                  icon={Wallet}
                  value={`₹${formatINR(downPayment)}`}
                  sub={`₹0 – ₹${formatINR(amount)}`}
                >
                  <Slider
                    value={[downPayment]}
                    min={0}
                    max={amount}
                    step={config.maxAmount > 1000000 ? 100000 : 10000}
                    onValueChange={(v) => setDownPayment(v[0])}
                    className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand"
                  />
                </Field>
              )}

              <Field
                label="Interest Rate (p.a.)"
                icon={Percent}
                value={`${rate.toFixed(1)}%`}
                sub={`${config.minRate}% – ${config.maxRate}% indicative`}
              >
                <Slider
                  value={[rate]}
                  min={config.minRate}
                  max={config.maxRate}
                  step={0.1}
                  onValueChange={(v) => setRate(v[0])}
                  className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand"
                />
              </Field>

              <Field
                label="Loan Tenure"
                icon={RotateCcw}
                value={`${years} ${years === 1 ? "Year" : "Years"}`}
                sub={`${config.minYears} – ${config.maxYears} years`}
              >
                <Slider
                  value={[years]}
                  min={config.minYears}
                  max={config.maxYears}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="[&_[role=slider]]:bg-sky [&_[role=slider]]:border-sky"
                />
              </Field>

              <button
                onClick={reset}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-royal hover:underline"
              >
                <RotateCcw className="size-3.5" />
                Reset to defaults
              </button>
            </div>

            {/* RESULT */}
            <div className="relative bg-gradient-to-br from-navy via-[#13316d] to-royal p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-sky/20 blur-2xl" />

              <div className="relative flex flex-col items-center">
                <div className="relative h-52 w-52 sm:h-56 sm:w-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        innerRadius={62}
                        outerRadius={90}
                        paddingAngle={3}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                      >
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/60">
                      Estimated EMI
                    </span>
                    <span className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                      ₹{formatINR(emi)}
                    </span>
                    <span className="text-[10px] text-white/60">per month</span>
                  </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  <Stat
                    label="Principal"
                    value={`₹${formatINR(principal)}`}
                    color="from-royal to-sky"
                  />
                  <Stat
                    label="Total Interest"
                    value={`₹${formatINR(totalInterest)}`}
                    color="from-cyan-brand to-teal-brand"
                  />
                  <div className="col-span-2 rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-white/70">
                        Total Repayment
                      </span>
                      <span className="font-display text-xl font-bold">
                        ₹{formatINR(totalPayment)}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-royal to-teal-brand"
                        style={{ width: `${principalPct}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-white/60">
                      <span>Principal {principalPct.toFixed(0)}%</span>
                      <span>Interest {(100 - principalPct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 w-full">
                  <BrandButton href={ctaHref} variant="white" size="lg" className="w-full">
                    {ctaLabel}
                  </BrandButton>
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/60">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  This is an indicative estimate for planning only. Actual EMI,
                  rate and tenure depend on the lender&apos;s policies, verification
                  and approval. Loan approval is not guaranteed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  value,
  sub,
  children,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
          <Icon className="size-4 text-royal" />
          {label}
        </span>
        <span className="rounded-lg bg-primary/5 px-2.5 py-1 font-display text-sm font-bold text-royal">
          {value}
        </span>
      </div>
      <div className="mt-3">{children}</div>
      {sub && <p className="mt-1.5 text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <span className={cn("size-2.5 rounded-full bg-gradient-to-r", color)} />
        <span className="text-xs uppercase tracking-wider text-white/70">
          {label}
        </span>
      </div>
      <div className="mt-1.5 font-display text-lg font-bold">{value}</div>
    </div>
  );
}
