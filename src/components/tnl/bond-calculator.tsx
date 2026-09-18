"use client";

import { useMemo, useState } from "react";
import { Calculator, Info, IndianRupee, Percent, RotateCcw } from "lucide-react";
import { SectionHeading } from "@/components/tnl/section-heading";
import { Reveal } from "@/components/tnl/reveal";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { BONDS_CALCULATOR } from "@/lib/bonds-data";

function formatINR(n: number) {
  if (!isFinite(n) || isNaN(n)) return "0";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function BondCalculator() {
  const cfg = BONDS_CALCULATOR.defaults;
  const [amount, setAmount] = useState(cfg.investmentAmount);
  const [purchasePrice, setPurchasePrice] = useState(cfg.purchasePrice);
  const [couponRate, setCouponRate] = useState(cfg.couponRate);
  const [faceValue, setFaceValue] = useState(cfg.faceValue);
  const [years, setYears] = useState(cfg.yearsToMaturity);

  const calc = useMemo(() => {
    const units = purchasePrice > 0 ? amount / purchasePrice : 0;
    const totalFaceValue = units * faceValue;
    const annualCoupon = (totalFaceValue * couponRate) / 100;
    const totalCoupon = annualCoupon * years;
    const faceValueRepayment = totalFaceValue;
    const maturityGainLoss = faceValueRepayment - amount;
    return { units, totalFaceValue, annualCoupon, totalCoupon, faceValueRepayment, maturityGainLoss };
  }, [amount, purchasePrice, couponRate, faceValue, years]);

  const reset = () => {
    setAmount(cfg.investmentAmount); setPurchasePrice(cfg.purchasePrice);
    setCouponRate(cfg.couponRate); setFaceValue(cfg.faceValue); setYears(cfg.yearsToMaturity);
  };

  return (
    <section id="calculator" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f6f9ff] to-white" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-sky/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-teal-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Educational Tool" title={BONDS_CALCULATOR.title} description={BONDS_CALCULATOR.description} />
        <Reveal direction="up" className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft lg:grid-cols-2">
            <div className="border-b border-primary/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-glow"><Calculator className="size-5" /></span>
                <div><h3 className="font-display text-lg font-bold text-navy">Bond Details</h3><p className="text-xs text-muted-foreground">Adjust values to see illustrative coupon cash flows</p></div>
              </div>
              <Field label="Investment Amount" icon={IndianRupee} value={`₹${formatINR(amount)}`} sub="Amount you invest">
                <Slider value={[amount]} min={10000} max={2000000} step={10000} onValueChange={(v) => setAmount(v[0])} className="[&_[role=slider]]:bg-royal [&_[role=slider]]:border-royal" />
              </Field>
              <Field label="Purchase Price (per ₹100 face)" icon={Percent} value={`₹${purchasePrice}`} sub="Price you pay per ₹100 of face value">
                <Slider value={[purchasePrice]} min={80} max={120} step={1} onValueChange={(v) => setPurchasePrice(v[0])} className="[&_[role=slider]]:bg-teal-brand [&_[role=slider]]:border-teal-brand" />
              </Field>
              <Field label="Coupon Rate (p.a.)" icon={Percent} value={`${couponRate.toFixed(1)}%`} sub="Illustrative — not a current rate">
                <Slider value={[couponRate]} min={1} max={12} step={0.1} onValueChange={(v) => setCouponRate(v[0])} className="[&_[role=slider]]:bg-sky [&_[role=slider]]:border-sky" />
              </Field>
              <Field label="Years to Maturity" icon={RotateCcw} value={`${years} ${years === 1 ? "Year" : "Years"}`} sub="Holding period until maturity">
                <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0])} className="[&_[role=slider]]:bg-navy [&_[role=slider]]:border-navy" />
              </Field>
              <button onClick={reset} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-royal hover:underline"><RotateCcw className="size-3.5" />Reset to defaults</button>
            </div>
            <div className="relative bg-gradient-to-br from-navy via-[#13316d] to-royal p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-sky/20 blur-2xl" />
              <div className="relative space-y-4">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/70">Approximate Annual Coupon</span>
                    <span className="font-display text-xl font-bold text-amber-300">₹{formatINR(calc.annualCoupon)}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-white/55">({couponRate.toFixed(1)}% of ₹{formatINR(calc.totalFaceValue)} face value)</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Units (per ₹100)" value={calc.units.toFixed(2)} />
                  <Stat label="Total Face Value" value={`₹${formatINR(calc.totalFaceValue)}`} />
                  <Stat label={`Total Coupon (${years}y)`} value={`₹${formatINR(calc.totalCoupon)}`} />
                  <Stat label="Face-Value Repayment" value={`₹${formatINR(calc.faceValueRepayment)}`} />
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/70">Illustrative Gain / Loss at Maturity</span>
                    <span className={cn("font-display text-lg font-bold", calc.maturityGainLoss >= 0 ? "text-teal-brand" : "text-rose-300")}>{calc.maturityGainLoss >= 0 ? "+" : "−"}₹{formatINR(Math.abs(calc.maturityGainLoss))}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-white/55">(Face-value repayment minus investment amount — ignores coupon income. If purchase price ≠ face value, this shows the premium/discount effect.)</div>
                </div>
                <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-white/60"><Info className="mt-0.5 size-3.5 shrink-0" />{BONDS_CALCULATOR.note}</p>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wider text-white/70">{label}</div>
      <div className="mt-1.5 font-display text-base font-bold">{value}</div>
    </div>
  );
}
