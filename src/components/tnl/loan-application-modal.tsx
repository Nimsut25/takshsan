"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, CreditCard,
  IndianRupee, Loader2, Lock, ShieldCheck, Sparkles, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandButton } from "@/components/tnl/brand-button";
import { ModalCloseButton } from "@/components/tnl/modal-close-button";
import type { InstantLoanPartner } from "@/lib/instant-loan-data";
import { VERIFICATION_FEE } from "@/lib/instant-loan-data";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | "success" | "error" | "pending";

type FormData = {
  fullName: string; mobileNumber: string; email: string; dateOfBirth: string;
  employmentType: string; monthlyIncome: string; city: string; state: string;
  requestedAmount: string;
};

const EMPTY: FormData = {
  fullName: "", mobileNumber: "", email: "", dateOfBirth: "",
  employmentType: "", monthlyIncome: "", city: "", state: "", requestedAmount: "",
};

const EMPLOYMENT = ["Salaried", "Self-Employed", "Business", "Student", "Other"];

export function LoanApplicationModal({
  open, onClose, partner, category,
}: {
  open: boolean;
  onClose: () => void;
  partner: InstantLoanPartner | null;
  category: string;
}) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [appRef, setAppRef] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const isCreditCard = category === "credit-cards";

  // reset on open
  useEffect(() => {
    if (open) {
      setStep(1); setForm(EMPTY); setErrors({}); setConsent(false);
      setProcessing(false); setAppRef(""); setErrorMsg("");
    }
  }, [open]);

  // body scroll lock + ESC
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (k: keyof FormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.mobileNumber.trim())) e.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.employmentType) e.employmentType = "Required";
    if (!form.monthlyIncome || Number(form.monthlyIncome) <= 0) e.monthlyIncome = "Enter valid income";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!isCreditCard && (!form.requestedAmount || Number(form.requestedAmount) <= 0))
      e.requestedAmount = "Enter valid amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    if (!consent) return;
    setStep(2);
  };

  const handlePayment = async () => {
    setProcessing(true);
    setErrorMsg("");
    try {
      // 1. Create application
      const applyRes = await fetch("/api/instant-loan/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          category,
          partnerId: partner?.id,
          partnerName: partner?.name,
        }),
      });
      const applyData = await applyRes.json();
      if (!applyRes.ok || !applyData.ok) throw new Error(applyData.message || "Failed to create application");
      setAppRef(applyData.applicationReference);

      if (applyData.alreadyVerified) {
        // already paid — skip to success
        localStorage.setItem("tnl_il_unlocked", "true");
        localStorage.setItem("tnl_il_mobile", form.mobileNumber);
        setStep("success");
        return;
      }

      // 2. Create payment order
      setStep("pending");
      const createRes = await fetch("/api/instant-loan/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationReference: applyData.applicationReference }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.ok) throw new Error(createData.message || "Payment creation failed");

      if (createData.alreadyPaid) {
        localStorage.setItem("tnl_il_unlocked", "true");
        localStorage.setItem("tnl_il_mobile", form.mobileNumber);
        setStep("success");
        return;
      }

      // 3. Open Razorpay checkout with the real order
      const razorpayKeyId = createData.razorpayKeyId;
      if (!razorpayKeyId) {
        throw new Error("Payment gateway key not configured. Please contact support.");
      }

      // Load Razorpay checkout script if not already loaded
      await new Promise<void>((resolve, reject) => {
        if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load payment gateway. Please check your connection."));
        document.head.appendChild(script);
      });

      // Open Razorpay checkout and wait for the payment response
      const paymentResult = await new Promise<{
        razorpayPaymentId: string;
        razorpaySignature: string;
      }>((resolve, reject) => {
        const rzp = new (window as unknown as { Razorpay: new (opts: Record<string, unknown>) => { open: () => void } }).Razorpay({
          key: razorpayKeyId,
          amount: createData.amount * 100, // paise
          currency: createData.currency || "INR",
          name: "TNL Fincorp",
          description: "Instant Loan Verification Fee",
          order_id: createData.orderId,
          prefill: {
            name: form.fullName,
            contact: form.mobileNumber,
            email: form.email,
          },
          theme: { color: "#3866f3" },
          handler: (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
            resolve({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
          },
          modal: {
            ondismiss: () => {
              reject(new Error("Payment was cancelled. Please complete the payment to unlock partner access."));
            },
          },
        });
        rzp.open();
      });

      // 4. Verify payment server-side with the real Razorpay signature
      setStep("pending");
      const verifyRes = await fetch("/api/instant-loan/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationReference: applyData.applicationReference,
          orderId: createData.orderId,
          razorpayPaymentId: paymentResult.razorpayPaymentId,
          razorpaySignature: paymentResult.razorpaySignature,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.ok || !verifyData.verified) {
        throw new Error(verifyData.message || "Payment verification failed");
      }

      // Success
      localStorage.setItem("tnl_il_unlocked", "true");
      localStorage.setItem("tnl_il_mobile", form.mobileNumber);
      setStep("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    } finally {
      setProcessing(false);
    }
  };

  const continueToPartner = () => {
    if (partner) window.open(partner.applyLink, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && partner && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-glow"
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${partner.name}`}
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky p-6 text-white">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <ModalCloseButton onClick={onClose} variant="light" aria-label="Close application modal" />
              <div className="relative flex items-center gap-3 pr-12">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    {partner.name}
                  </p>
                  <h2 className="font-display text-xl font-bold leading-tight">
                    {step === "success" ? "Verification Completed" : "Apply Now"}
                  </h2>
                </div>
              </div>
              {/* Progress indicator */}
              {typeof step === "number" && (
                <div className="relative mt-4 flex items-center gap-2 text-xs">
                  <span className={cn("rounded-full px-3 py-1", step >= 1 ? "bg-white/20 text-white" : "bg-white/10 text-white/50")}>
                    {step === 1 ? "● " : "✓ "}Step 1 — Your Information
                  </span>
                  <span className={cn("rounded-full px-3 py-1", step >= 2 ? "bg-white/20 text-white" : "bg-white/10 text-white/50")}>
                    {step === 2 ? "● " : ""}Step 2 — Verification Payment
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="tnl-scrollbar max-h-[calc(92vh-8rem)] overflow-y-auto p-6">
              {/* STEP 1 — User Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">Complete Your Details</h3>
                    <p className="text-xs text-muted-foreground">Provide your information to continue with the application process.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" error={errors.fullName} required>
                      <Input placeholder="e.g. Rohit Sharma" className="h-11 rounded-xl border-primary/15" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                    </Field>
                    <Field label="Mobile Number" error={errors.mobileNumber} required>
                      <Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className="h-11 rounded-xl border-primary/15" value={form.mobileNumber} onChange={(e) => set("mobileNumber", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email Address" error={errors.email} required>
                      <Input type="email" placeholder="you@example.com" className="h-11 rounded-xl border-primary/15" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </Field>
                    <Field label="Date of Birth" error={errors.dateOfBirth} required>
                      <Input type="date" className="h-11 rounded-xl border-primary/15" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Employment Type" error={errors.employmentType} required>
                      <Select value={form.employmentType} onValueChange={(v) => set("employmentType", v)}>
                        <SelectTrigger className="h-11 w-full rounded-xl border-primary/15"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{EMPLOYMENT.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                    </Field>
                    <Field label="Monthly Income" error={errors.monthlyIncome} required>
                      <Input inputMode="numeric" placeholder="e.g. 50000" className="h-11 rounded-xl border-primary/15" value={form.monthlyIncome} onChange={(e) => set("monthlyIncome", e.target.value.replace(/[^\d]/g, ""))} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="City" error={errors.city} required>
                      <Input placeholder="e.g. Surat" className="h-11 rounded-xl border-primary/15" value={form.city} onChange={(e) => set("city", e.target.value)} />
                    </Field>
                    <Field label="State" error={errors.state} required>
                      <Input placeholder="e.g. Gujarat" className="h-11 rounded-xl border-primary/15" value={form.state} onChange={(e) => set("state", e.target.value)} />
                    </Field>
                  </div>
                  {!isCreditCard && (
                    <Field label="Required Loan Amount" error={errors.requestedAmount} required>
                      <Input inputMode="numeric" placeholder="e.g. 500000" className="h-11 rounded-xl border-primary/15" value={form.requestedAmount} onChange={(e) => set("requestedAmount", e.target.value.replace(/[^\d]/g, ""))} />
                    </Field>
                  )}

                  {/* Consent */}
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-primary/10 bg-secondary/40 p-3 text-xs text-muted-foreground">
                    <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5 data-[state=checked]:bg-royal data-[state=checked]:border-royal" />
                    <span className="leading-relaxed">I confirm that the information provided by me is accurate and I agree to the applicable <a href="/terms" className="font-semibold text-royal hover:underline">Terms &amp; Conditions</a> and <a href="/privacy" className="font-semibold text-royal hover:underline">Privacy Policy</a>.</span>
                  </label>

                  <BrandButton onClick={handleContinue} size="lg" className="w-full" disabled={!consent}>
                    Continue to Payment <ArrowRight className="size-4" />
                  </BrandButton>
                </div>
              )}

              {/* STEP 2 — Payment */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">Complete Basic Verification</h3>
                    <p className="text-xs text-muted-foreground">A one-time ₹49 payment is required to complete the basic verification/application process for partner access.</p>
                  </div>
                  <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-4">
                    <div className="space-y-2 text-sm">
                      <Row label="Selected Partner" value={partner.name} />
                      <Row label="Product Category" value={partner.productType} />
                      <Row label="Applicant Name" value={form.fullName} />
                      <Row label="Mobile Number" value={`+91 ${form.mobileNumber}`} />
                      <div className="border-t border-primary/10 pt-2">
                        <Row label="Verification Fee" value={`₹${VERIFICATION_FEE}`} highlight />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-700">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                    Payment completion unlocks the applicable partner application links. Final approval remains subject to the respective partner's eligibility and assessment criteria.
                  </div>
                  <BrandButton onClick={handlePayment} size="lg" className="w-full" disabled={processing}>
                    {processing ? <><Loader2 className="size-4 animate-spin" /> Processing...</> : <><CreditCard className="size-4" /> Pay ₹{VERIFICATION_FEE} &amp; Continue</>}
                  </BrandButton>
                  <button onClick={() => setStep(1)} className="flex w-full items-center justify-center gap-1 text-xs font-semibold text-muted-foreground hover:text-royal">
                    <ArrowLeft className="size-3.5" /> Back to Step 1
                  </button>
                </div>
              )}

              {/* PENDING */}
              {step === "pending" && (
                <div className="flex flex-col items-center py-12 text-center">
                  <Loader2 className="size-12 animate-spin text-royal" />
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">Payment Verification in Progress</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We are verifying your payment. Please do not close the page.</p>
                </div>
              )}

              {/* SUCCESS */}
              {step === "success" && (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">Verification Completed Successfully</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Your application details have been recorded successfully. You can now continue to the selected partner application.</p>
                  {appRef && (
                    <div className="mt-4 rounded-xl border border-primary/10 bg-secondary/40 px-4 py-2 text-sm">
                      <span className="text-muted-foreground">Application Reference: </span>
                      <span className="font-bold text-navy">{appRef}</span>
                    </div>
                  )}
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Payment: </span>
                    <span className="font-bold text-teal-brand">₹{VERIFICATION_FEE} Paid</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="font-bold text-teal-brand">Verified</span>
                  </div>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <BrandButton onClick={continueToPartner} size="md">
                      <Sparkles className="size-4" /> Continue to Partner
                    </BrandButton>
                    <button onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-royal hover:bg-primary/5">
                      Back to Partner List
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR */}
              {step === "error" && (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-glow">
                    <X className="size-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">Payment Unsuccessful</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{errorMsg || "Your payment could not be verified. Please try again."}</p>
                  <div className="mt-6 flex gap-2">
                    <BrandButton onClick={() => setStep(2)} size="md">Retry Payment</BrandButton>
                    <button onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-royal hover:bg-primary/5">Back</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-navy">{label} {required && <span className="text-destructive">*</span>}</Label>
      {children}
      {error && <p className="flex items-center gap-1 text-xs text-destructive"><AlertCircle className="size-3" />{error}</p>}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold", highlight ? "text-royal" : "text-navy")}>{value}</span>
    </div>
  );
}
