"use client";

import { useMemo, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Calculator, IndianRupee, Percent, RotateCcw, Info, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { BrandButton } from "@/components/tnl/brand-button";
import { useModalStore } from "@/lib/modal-store";
import { Slider } from "@/components/ui/slider";
import { SIP_CALCULATOR } from "@/lib/sip-data";
import { cn } from "@/lib/utils";

function formatINR(n: number) {
  if (!isFinite(n) || isNaN(n)) return "0";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function SipCalculator() {
  const cfg = SIP_CALCULATOR.defaults;
  const [amount, setAmount] = useState(cfg.monthlyAmount);
  const [rate, setRate] = useState(cfg.expectedReturn);
  const [years, setYears] = useState(cfg.duration);
  const openEnquiry = useModalStore((s) => s.openEnquiry);

  // SIP future value = P × [((1+i)^n - 1) / i] × (1+i)
  // where i = monthly rate, n = total months
  const { totalInvested, estimatedReturns, futureValue, investedPct } = useMemo(() => {
    const i = rate / 12 / 100;
    const n = years * 12;
    let fv: number;
    if (i === 0) {
      fv = amount * n;
    } else {
      fv = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }
    if (!isFinite(fv) || isNaN(fv)) fv = 0;
    const invested = amount * n;
    const returns = Math.max(0, fv - invested);
    const pct = fv > 0 ? (invested / fv) * 100 : 0;
    return { totalInvested: invested, estimatedReturns: returns, futureValue: fv, investedPct: pct };
  }, [amount, rate, years]);

  const chartData = [
    { name: "Invested", value: totalInvested, color: "var(--royal)" },
    { name: "Returns", value: estimatedReturns, color: "var(--teal-brand)" },
  ];

  return (
    <section id="calculator" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f6f9ff] to-white" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-sky/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-teal-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="SIP Calculator"
          title={SIP_CALCULATOR.title}
          description={SIP_CALCULATOR.description}
        />

        <Reveal direction="up" className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft lg:grid-cols-2">
            {/* INPUTS */}
            <div className="border-b border-primary/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
                  <Calculator className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">SIP Details</h3>
                  <p className="text-xs text-muted-foreground">Adjust values to see estimated future value</p>
                </div>
              </div>

              <Field label="Monthly SIP Amount" icon={IndianRupee} value={`₹${formatINR(amount)}`} sub="Amount you invest every month">
                <Slider value={[amount]} min={500} max={100000} step={500} onValueChange={(v) => setAmount(v[0])} className="[&_[role=slider]]:bg-royal [&_[role=slider]]:border-royal" />
                <div className="mt-2 flex gap-2">
                  {[5000, 10000, 25000, 50000].map((preset) => (
                    <button key={preset} onClick={() => setAmount(preset)} className={cn("rounded-full px-3 py-1 text-xs font-semibold transition-colors", amount === preset ? "bg-royal text-white" : "bg-secondary text-muted-foreground hover:bg-primary/10")}>
                      ₹{formatINR(preset)}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Expected Annual Return" icon={Percent} value={`${rate.toFixed(1)}%`} sub="Illustrative — actual returns are market-linked">
                <Slider value={[rate]} min={1} max={20} step={0.5} onValueChange={(v) => setRate(v[0])} className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand" />
              </Field>

              <Field label="Investment Duration" icon={RotateCcw} value={`${years} ${years === 1 ? "Year" : "Years"}`} sub="How long you plan to invest">
                <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0])} className="[&_[role=slider]]:bg-sky [&_[role=slider]]:border-sky" />
              </Field>

              <button onClick={() => { setAmount(cfg.monthlyAmount); setRate(cfg.expectedReturn); setYears(cfg.duration); }} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-royal hover:underline">
                <RotateCcw className="size-3.5" /> Reset to defaults
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
                      <Pie data={chartData} dataKey="value" innerRadius={62} outerRadius={90} paddingAngle={3} startAngle={90} endAngle={-270} stroke="none">
                        {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/60">Estimated Future Value</span>
                    <span className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">₹{formatINR(futureValue)}</span>
                  </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  <Stat label="Total Invested" value={`₹${formatINR(totalInvested)}`} color="from-royal to-sky" />
                  <Stat label="Estimated Returns" value={`₹${formatINR(estimatedReturns)}`} color="from-teal-brand to-cyan-brand" />
                  <div className="col-span-2 rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-white/70">Invested vs Returns</span>
                      <span className="font-display text-sm font-bold text-amber-300">{investedPct.toFixed(0)}% / {(100 - investedPct).toFixed(0)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-royal to-teal-brand" style={{ width: `${investedPct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-5 w-full">
                  <BrandButton onClick={() => openEnquiry("SIP & Mutual Funds")} variant="white" size="lg" className="w-full">
                    <TrendingUp className="size-4" /> Get Investment Assistance
                  </BrandButton>
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/60">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  {SIP_CALCULATOR.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, icon: Icon, value, sub, children }: { label: string; icon: React.ElementType; value: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><Icon className="size-4 text-royal" />{label}</span>
        <span className="rounded-lg bg-primary/5 px-2.5 py-1 font-display text-sm font-bold text-royal">{value}</span>
      </div>
      <div className="mt-3">{children}</div>
      {sub && <p className="mt-1.5 text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <span className={cn("size-2.5 rounded-full bg-gradient-to-r", color)} />
        <span className="text-xs uppercase tracking-wider text-white/70">{label}</span>
      </div>
      <div className="mt-1.5 font-display text-lg font-bold">{value}</div>
    </div>
  );
}
