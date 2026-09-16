"use client";

import { useMemo, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Calculator,
  Percent,
  RotateCcw,
  CalendarClock,
  Info,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import { Slider } from "@/components/ui/slider";
import { RD_PRODUCT, INVESTMENT_DISCLAIMER } from "@/lib/investment-data";
import { cn } from "@/lib/utils";

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

const MIN_MONTHLY = 500;
const MAX_MONTHLY = 100000;
const MIN_RATE = 4;
const MAX_RATE = 12;
const MIN_YEARS = 1;
const MAX_YEARS = 10;

const DEFAULTS = RD_PRODUCT.calculator;

export function RdCalculator() {
  const [monthly, setMonthly] = useState<number>(DEFAULTS.monthlyDeposit);
  const [rate, setRate] = useState<number>(DEFAULTS.rate);
  const [years, setYears] = useState<number>(DEFAULTS.tenureYears);

  /**
   * RD maturity estimate:
   *   maturity = monthly * (((1 + i)^n - 1) / i) * (1 + i)
   * where i = rate / 12 / 100 and n = years * 12.
   * This is the standard RD formula used for indicative planning; the actual
   * maturity depends on the institution's compounding rules.
   */
  const { totalDeposited, interest, maturity, principalPct } = useMemo(() => {
    const i = rate / 12 / 100;
    const n = years * 12;
    let maturityValue: number;
    if (i === 0) {
      maturityValue = monthly * n;
    } else {
      maturityValue =
        monthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    }
    const totalDepositedValue = monthly * n;
    const interestValue = maturityValue - totalDepositedValue;
    const principalPctValue = (totalDepositedValue / maturityValue) * 100;
    return {
      totalDeposited: totalDepositedValue,
      interest: interestValue,
      maturity: maturityValue,
      principalPct: principalPctValue,
    };
  }, [monthly, rate, years]);

  const chartData = [
    { name: "Total Deposited", value: totalDeposited, color: "var(--teal-brand)" },
    { name: "Interest", value: interest, color: "var(--cyan-brand)" },
  ];

  return (
    <section id="calculator" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f0fdfa] to-white" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-teal-brand/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-cyan-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="RD Return Calculator"
          title="Estimate Your"
          highlight="RD Maturity"
          description="A quick indicative estimate to help you plan. Final maturity depends on the bank-approved rate, tenure and compounding terms."
        />

        <Reveal direction="up" className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft lg:grid-cols-2">
            {/* INPUTS */}
            <div className="border-b border-primary/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-brand to-cyan-brand text-white shadow-glow">
                  <Calculator className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    RD Details
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Adjust values to update estimate instantly
                  </p>
                </div>
              </div>

              {/* Monthly Deposit */}
              <Field
                label="Monthly Deposit"
                icon={Wallet}
                value={`₹${formatINR(monthly)}`}
                sub={`₹${formatINR(MIN_MONTHLY)} – ₹${formatINR(MAX_MONTHLY)} per month`}
              >
                <Slider
                  value={[monthly]}
                  min={MIN_MONTHLY}
                  max={MAX_MONTHLY}
                  step={500}
                  onValueChange={(v) => setMonthly(v[0])}
                  className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand"
                />
              </Field>

              {/* Rate */}
              <Field
                label="Interest Rate (p.a.)"
                icon={Percent}
                value={`${rate.toFixed(1)}%`}
                sub={`${MIN_RATE}% – ${MAX_RATE}% indicative (configurable)`}
              >
                <Slider
                  value={[rate]}
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step={0.1}
                  onValueChange={(v) => setRate(v[0])}
                  className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand"
                />
              </Field>

              {/* Tenure */}
              <Field
                label="Tenure"
                icon={CalendarClock}
                value={`${years} ${years === 1 ? "Year" : "Years"}`}
                sub={`${MIN_YEARS} – ${MAX_YEARS} years`}
              >
                <Slider
                  value={[years]}
                  min={MIN_YEARS}
                  max={MAX_YEARS}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="[&_[role=slider]]:bg-sky [&_[role=slider]]:border-sky"
                />
              </Field>

              <button
                onClick={() => {
                  setMonthly(DEFAULTS.monthlyDeposit);
                  setRate(DEFAULTS.rate);
                  setYears(DEFAULTS.tenureYears);
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-royal hover:underline"
              >
                <RotateCcw className="size-3.5" />
                Reset to defaults
              </button>
            </div>

            {/* RESULT */}
            <div className="relative bg-gradient-to-br from-[#0c3a36] via-[#0e5751] to-teal-brand p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-cyan-brand/20 blur-2xl" />

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
                  {/* center label */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/60">
                      Est. Maturity
                    </span>
                    <span className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                      ₹{formatINR(maturity)}
                    </span>
                    <span className="text-[10px] text-white/60">
                      after {years} {years === 1 ? "year" : "years"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  <Stat
                    label="Total Deposited"
                    value={`₹${formatINR(totalDeposited)}`}
                    color="from-teal-brand to-cyan-brand"
                  />
                  <Stat
                    label="Est. Interest"
                    value={`₹${formatINR(interest)}`}
                    color="from-cyan-brand to-sky"
                  />
                  <div className="col-span-2 rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-white/70">
                        Est. Maturity Amount
                      </span>
                      <span className="font-display text-xl font-bold">
                        ₹{formatINR(maturity)}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-brand to-cyan-brand"
                        style={{ width: `${principalPct}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-white/60">
                      <span>Deposited {principalPct.toFixed(0)}%</span>
                      <span>
                        Interest {(100 - principalPct).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 w-full">
                  <BrandButton
                    href="/investment/rd#apply"
                    variant="white"
                    size="lg"
                    className="w-full"
                  >
                    Start Your RD Enquiry
                    <ArrowRight className="size-4" />
                  </BrandButton>
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/60">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  This is an indicative estimate for planning only. Actual
                  maturity, rate and tenure depend on the bank&apos;s/institution&apos;s
                  policies, compounding frequency and approval. RD booking is not
                  guaranteed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground">
          {INVESTMENT_DISCLAIMER}
        </p>
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
          <Icon className="size-4 text-teal-brand" />
          {label}
        </span>
        <span className="rounded-lg bg-primary/5 px-2.5 py-1 font-display text-sm font-bold text-teal-brand">
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
        <span
          className={cn(
            "size-2.5 rounded-full bg-gradient-to-r",
            color
          )}
        />
        <span className="text-xs uppercase tracking-wider text-white/70">
          {label}
        </span>
      </div>
      <div className="mt-1.5 font-display text-lg font-bold">{value}</div>
    </div>
  );
}
