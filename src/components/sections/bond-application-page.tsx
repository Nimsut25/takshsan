"use client";

import { useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Download, Eye,
  IndianRupee, Loader2, ShieldCheck, Sparkles, AlertCircle, FileText,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BrandButton } from "@/components/tnl/brand-button";
import { Reveal } from "@/components/tnl/reveal";
import { BOND_TYPES, BONDS_DISCLAIMER } from "@/lib/bonds-data";
import { cn } from "@/lib/utils";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli and Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const STEPS = ["Applicant", "Bond Details", "Bank", "Nominee", "Declaration", "Payment"];

type FormData = {
  fullName: string; fatherHusbandName: string; dateOfBirth: string;
  panNumber: string; aadhaarNumber: string; mobileNumber: string; email: string;
  residentialAddress: string; city: string; state: string; pinCode: string;
  investmentAmount: string; quantity: string; place: string;
  bankName: string; branch: string; accountNumber: string; ifscCode: string; accountType: string;
  nomineeName: string; nomineeRelationship: string; nomineeDateOfBirth: string; nomineeAddress: string;
  declarationAccepted: boolean;
};

const EMPTY: FormData = {
  fullName: "", fatherHusbandName: "", dateOfBirth: "", panNumber: "",
  aadhaarNumber: "", mobileNumber: "", email: "", residentialAddress: "",
  city: "", state: "", pinCode: "", investmentAmount: "", quantity: "1", place: "",
  bankName: "", branch: "", accountNumber: "", ifscCode: "", accountType: "",
  nomineeName: "", nomineeRelationship: "", nomineeDateOfBirth: "", nomineeAddress: "",
  declarationAccepted: false,
};

export function BondApplicationPage({ bondId }: { bondId: string }) {
  const bond = BOND_TYPES.find((b) => b.id === bondId);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<{ appNum: string; certNum: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!bond) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto size-12 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-bold text-navy">Bond not found</p>
          <Link href="/government-bonds" className="mt-4 inline-block text-sm font-semibold text-royal hover:underline">← Back to Government Bonds</Link>
        </div>
      </div>
    );
  }

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (form.fullName.trim().length < 2) e.fullName = "Enter your full name";
      if (form.fatherHusbandName.trim().length < 2) e.fatherHusbandName = "Required";
      if (!form.dateOfBirth) e.dateOfBirth = "Required";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase().trim())) e.panNumber = "Invalid PAN (e.g. ABCDE1234F)";
      if (!/^\d{12}$/.test(form.aadhaarNumber.replace(/\s/g, ""))) e.aadhaarNumber = "12-digit Aadhaar required";
      if (!/^[6-9]\d{9}$/.test(form.mobileNumber.trim())) e.mobileNumber = "10-digit mobile";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Invalid email";
      if (form.residentialAddress.trim().length < 5) e.residentialAddress = "Required";
      if (form.city.trim().length < 2) e.city = "Required";
      if (!form.state) e.state = "Required";
      if (!/^\d{6}$/.test(form.pinCode.trim())) e.pinCode = "6-digit PIN";
    }
    if (s === 1) {
      if (!form.investmentAmount || Number(form.investmentAmount) <= 0) e.investmentAmount = "Valid amount required";
      if (!form.quantity || Number(form.quantity) < 1) e.quantity = "Min 1";
    }
    if (s === 2) {
      if (form.bankName.trim().length < 2) e.bankName = "Required";
      if (form.branch.trim().length < 2) e.branch = "Required";
      if (form.accountNumber.trim().length < 8) e.accountNumber = "Required";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase().trim())) e.ifscCode = "Invalid IFSC";
      if (!form.accountType) e.accountType = "Required";
    }
    if (s === 4) {
      if (!form.declarationAccepted) e.declarationAccepted = "Please accept the declaration";
      if (form.place.trim().length < 2) e.place = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const totalAmount = Number(form.investmentAmount || 0) * Number(form.quantity || 0);

  const handlePayment = async () => {
    setProcessing(true);
    setErrorMsg("");
    try {
      // 1. Create application
      const applyRes = await fetch("/api/bonds/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          panNumber: form.panNumber.toUpperCase().trim(),
          ifscCode: form.ifscCode.toUpperCase().trim(),
          bondId: bond.id,
        }),
      });
      const applyData = await applyRes.json();
      if (!applyRes.ok || !applyData.ok) throw new Error(applyData.message || "Application failed");

      // 2. Create Razorpay order
      const createRes = await fetch("/api/bonds/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationNumber: applyData.applicationNumber }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.ok) throw new Error(createData.message || "Payment order failed");

      if (createData.alreadyPaid) {
        setSuccess({ appNum: applyData.applicationNumber, certNum: createData.certificateNumber || "" });
        return;
      }

      // 3. Open Razorpay checkout
      await new Promise<void>((resolve, reject) => {
        if ((window as unknown as { Razorpay?: unknown }).Razorpay) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load payment gateway"));
        document.head.appendChild(script);
      });

      const paymentResult = await new Promise<{ razorpayPaymentId: string; razorpaySignature: string }>((resolve, reject) => {
        const rzpOpts: Record<string, unknown> = {
          key: createData.razorpayKeyId,
          amount: createData.amount * 100,
          currency: "INR",
          name: "TNL Fincorp",
          description: `Bond Application — ${bond.title}`,
          order_id: createData.orderId,
          prefill: { name: form.fullName, contact: form.mobileNumber, email: form.email },
          theme: { color: "#3866f3" },
          handler: (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
            resolve({ razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature });
          },
          modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
        };
        new (window as unknown as { Razorpay: new (o: Record<string, unknown>) => { open: () => void } }).Razorpay(rzpOpts).open();
      });

      // 4. Verify payment
      const verifyRes = await fetch("/api/bonds/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: applyData.applicationNumber,
          orderId: createData.orderId,
          razorpayPaymentId: paymentResult.razorpayPaymentId,
          razorpaySignature: paymentResult.razorpaySignature,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.ok || !verifyData.verified) {
        throw new Error(verifyData.message || "Payment verification failed");
      }

      setSuccess({ appNum: applyData.applicationNumber, certNum: verifyData.certificateNumber });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  // SUCCESS STATE
  if (success) {
    return (
      <div className="relative overflow-hidden bg-mesh py-20 sm:py-24">
        <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-glow sm:p-12">
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow">
                <CheckCircle2 className="size-10" />
              </span>
              <h1 className="mt-6 font-display text-2xl font-extrabold text-navy sm:text-3xl">Certificate Generated Successfully</h1>
              <p className="mt-2 text-sm text-muted-foreground">Your bond application has been submitted and payment verified.</p>

              <div className="mt-8 space-y-3 rounded-2xl border border-primary/10 bg-secondary/40 p-6 text-left">
                <Row label="Application Number" value={success.appNum} />
                <Row label="Certificate Number" value={success.certNum} />
                <Row label="Bond Name" value={bond.title} />
                <Row label="Investment Amount" value={`₹${totalAmount.toLocaleString("en-IN")}`} />
                <Row label="Payment Status" value="Paid" highlight />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={`/government-bonds/success?app=${success.appNum}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5">
                  <Eye className="size-4" /> View Certificate
                </Link>
                <a href={`/api/bonds/certificate?applicationNumber=${success.appNum}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-royal hover:bg-primary/5">
                  <Download className="size-4" /> Download Certificate PDF
                </a>
              </div>
              <Link href="/government-bonds" className="mt-4 inline-block text-xs font-semibold text-muted-foreground hover:text-royal">← Back to Government Bonds</Link>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // FORM
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh pt-28 pb-8 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal direction="up">
            <Link href="/government-bonds" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:gap-2 transition-all">
              <ArrowLeft className="size-4" /> Back to Government Bonds
            </Link>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Bond Application Form
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Applying for: <span className="font-bold text-royal">{bond.title}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Progress indicator */}
      <div className="sticky top-16 z-30 border-b border-primary/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-6 py-3 lg:px-8 no-scrollbar">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 whitespace-nowrap">
              <span className={cn("flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-all", i === step ? "bg-gradient-to-br from-royal to-sky text-white shadow-glow" : i < step ? "bg-teal-brand text-white" : "bg-secondary text-muted-foreground")}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className={cn("text-xs font-semibold", i === step ? "text-navy" : "text-muted-foreground")}>{s}</span>
              {i < STEPS.length - 1 && <span className="mx-1 h-0.5 w-4 bg-primary/15" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form body */}
      <section className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

              {/* STEP 0 — Applicant */}
              {step === 0 && (
                <div className="space-y-4">
                  <SectionTitle title="Applicant Details" desc="Personal information and residential address." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Full Name" error={errors.fullName} required><Input placeholder="e.g. Rohit Sharma" className="h-11 rounded-xl border-primary/15" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></FormField>
                    <FormField label="Father / Husband Name" error={errors.fatherHusbandName} required><Input placeholder="e.g. Rajesh Sharma" className="h-11 rounded-xl border-primary/15" value={form.fatherHusbandName} onChange={(e) => set("fatherHusbandName", e.target.value)} /></FormField>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Date of Birth" error={errors.dateOfBirth} required><Input type="date" className="h-11 rounded-xl border-primary/15" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} /></FormField>
                    <FormField label="PAN Number" error={errors.panNumber} required><Input placeholder="ABCDE1234F" maxLength={10} className="h-11 rounded-xl border-primary/15 uppercase" value={form.panNumber} onChange={(e) => set("panNumber", e.target.value.toUpperCase())} /></FormField>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Aadhaar Number" error={errors.aadhaarNumber} required><Input inputMode="numeric" maxLength={12} placeholder="12-digit Aadhaar" className="h-11 rounded-xl border-primary/15" value={form.aadhaarNumber} onChange={(e) => set("aadhaarNumber", e.target.value.replace(/\D/g, "").slice(0, 12))} /></FormField>
                    <FormField label="Mobile Number" error={errors.mobileNumber} required><Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className="h-11 rounded-xl border-primary/15" value={form.mobileNumber} onChange={(e) => set("mobileNumber", e.target.value.replace(/\D/g, "").slice(0, 10))} /></FormField>
                  </div>
                  <FormField label="Email ID" error={errors.email} required><Input type="email" placeholder="you@example.com" className="h-11 rounded-xl border-primary/15" value={form.email} onChange={(e) => set("email", e.target.value)} /></FormField>
                  <FormField label="Residential Address" error={errors.residentialAddress} required><Textarea rows={2} placeholder="Full address" className="rounded-xl border-primary/15" value={form.residentialAddress} onChange={(e) => set("residentialAddress", e.target.value)} /></FormField>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="City" error={errors.city} required><Input placeholder="e.g. Surat" className="h-11 rounded-xl border-primary/15" value={form.city} onChange={(e) => set("city", e.target.value)} /></FormField>
                    <FormField label="State" error={errors.state} required>
                      <Select value={form.state} onValueChange={(v) => set("state", v)}>
                        <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent position="popper" className="z-[300] max-h-[200px]" sideOffset={6}>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="PIN Code" error={errors.pinCode} required><Input inputMode="numeric" maxLength={6} placeholder="6-digit PIN" className="h-11 rounded-xl border-primary/15" value={form.pinCode} onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))} /></FormField>
                  </div>
                </div>
              )}

              {/* STEP 1 — Bond Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <SectionTitle title="Bond Details" desc="Investment details for your selected bond." />
                  <div className="rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 to-sky/5 p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ReadOnly label="Type of Bond" value={bond.title} />
                      <ReadOnly label="Issuer" value={bond.issuer || "Government of India"} />
                      <ReadOnly label="Tenure" value={bond.tenure || "As per issue"} />
                      <ReadOnly label="Coupon Rate" value={bond.couponRate || "As per issue"} />
                      <ReadOnly label="Face Value" value={`₹${(bond.faceValue || 100).toLocaleString("en-IN")}`} />
                      <ReadOnly label="Date of Application" value={new Date().toLocaleDateString("en-IN")} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Investment Amount (₹)" error={errors.investmentAmount} required>
                      <Input inputMode="numeric" placeholder="e.g. 100000" className="h-11 rounded-xl border-primary/15" value={form.investmentAmount} onChange={(e) => set("investmentAmount", e.target.value.replace(/[^\d]/g, ""))} />
                    </FormField>
                    <FormField label="Number of Bonds" error={errors.quantity} required>
                      <Input inputMode="numeric" placeholder="e.g. 1" className="h-11 rounded-xl border-primary/15" value={form.quantity} onChange={(e) => set("quantity", e.target.value.replace(/[^\d]/g, ""))} />
                    </FormField>
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-700">
                    <IndianRupee className="mr-1 inline size-3.5" />Total Payable: <span className="font-bold">₹{totalAmount.toLocaleString("en-IN")}</span> (Investment × Quantity)
                  </div>
                </div>
              )}

              {/* STEP 2 — Bank */}
              {step === 2 && (
                <div className="space-y-4">
                  <SectionTitle title="Bank Details" desc="Bank account for interest and maturity payments." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Bank Name" error={errors.bankName} required><Input placeholder="e.g. State Bank of India" className="h-11 rounded-xl border-primary/15" value={form.bankName} onChange={(e) => set("bankName", e.target.value)} /></FormField>
                    <FormField label="Branch" error={errors.branch} required><Input placeholder="e.g. Surat Main" className="h-11 rounded-xl border-primary/15" value={form.branch} onChange={(e) => set("branch", e.target.value)} /></FormField>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Account Number" error={errors.accountNumber} required><Input placeholder="Account number" className="h-11 rounded-xl border-primary/15" value={form.accountNumber} onChange={(e) => set("accountNumber", e.target.value)} /></FormField>
                    <FormField label="IFSC Code" error={errors.ifscCode} required><Input placeholder="SBIN0001234" maxLength={11} className="h-11 rounded-xl border-primary/15 uppercase" value={form.ifscCode} onChange={(e) => set("ifscCode", e.target.value.toUpperCase())} /></FormField>
                  </div>
                  <FormField label="Account Type" error={errors.accountType} required>
                    <Select value={form.accountType} onValueChange={(v) => set("accountType", v)}>
                      <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent position="popper" className="z-[300]"><SelectItem value="Savings">Savings</SelectItem><SelectItem value="Current">Current</SelectItem></SelectContent>
                    </Select>
                  </FormField>
                </div>
              )}

              {/* STEP 3 — Nominee */}
              {step === 3 && (
                <div className="space-y-4">
                  <SectionTitle title="Nominee Details" desc="Nominee information for the bond investment." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Nominee Name"><Input placeholder="e.g. Sunita Sharma" className="h-11 rounded-xl border-primary/15" value={form.nomineeName} onChange={(e) => set("nomineeName", e.target.value)} /></FormField>
                    <FormField label="Relationship with Applicant"><Input placeholder="e.g. Spouse" className="h-11 rounded-xl border-primary/15" value={form.nomineeRelationship} onChange={(e) => set("nomineeRelationship", e.target.value)} /></FormField>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Nominee Date of Birth"><Input type="date" className="h-11 rounded-xl border-primary/15" value={form.nomineeDateOfBirth} onChange={(e) => set("nomineeDateOfBirth", e.target.value)} /></FormField>
                  </div>
                  <FormField label="Nominee Address"><Textarea rows={2} placeholder="Nominee address" className="rounded-xl border-primary/15" value={form.nomineeAddress} onChange={(e) => set("nomineeAddress", e.target.value)} /></FormField>
                </div>
              )}

              {/* STEP 4 — Declaration */}
              {step === 4 && (
                <div className="space-y-4">
                  <SectionTitle title="Declaration" desc="Please read and accept the declaration." />
                  <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
                    "I/We hereby declare that the information provided in this application form is true and correct to the best of my/our knowledge. I/We agree to abide by the applicable terms and conditions of the Bond/Security and the rules and regulations prescribed by the Government of India/RBI and the concerned issuing authority."
                  </div>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-primary/10 bg-white p-3 text-xs text-muted-foreground">
                    <Checkbox checked={form.declarationAccepted} onCheckedChange={(v) => set("declarationAccepted", v === true)} className="mt-0.5 data-[state=checked]:bg-royal data-[state=checked]:border-royal" />
                    <span className="leading-relaxed">I/We confirm that the above information is true and correct and agree to the applicable terms and conditions.</span>
                  </label>
                  {errors.declarationAccepted && <p className="flex items-center gap-1 text-xs text-destructive"><AlertCircle className="size-3" />{errors.declarationAccepted}</p>}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Place" error={errors.place} required><Input placeholder="e.g. Surat" className="h-11 rounded-xl border-primary/15" value={form.place} onChange={(e) => set("place", e.target.value)} /></FormField>
                    <FormField label="Date"><Input readOnly value={new Date().toLocaleDateString("en-IN")} className="h-11 rounded-xl border-primary/15 bg-secondary/40" /></FormField>
                  </div>
                </div>
              )}

              {/* STEP 5 — Payment */}
              {step === 5 && (
                <div className="space-y-4">
                  <SectionTitle title="Payment" desc="Review and complete your bond application payment." />
                  <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-5">
                    <div className="space-y-2 text-sm">
                      <Row label="Bond Name" value={bond.title} />
                      <Row label="Bond Type" value={bond.title} />
                      <Row label="Quantity" value={form.quantity} />
                      <Row label="Investment Amount" value={`₹${Number(form.investmentAmount || 0).toLocaleString("en-IN")}`} />
                      <div className="border-t border-primary/10 pt-2">
                        <Row label="Total Payable" value={`₹${totalAmount.toLocaleString("en-IN")}`} highlight />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-700">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                    Payment completion unlocks certificate generation. Bond ownership is subject to the respective issuing authority's terms and processes.
                  </div>
                  {errorMsg && <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="size-4" />{errorMsg}</div>}
                  <BrandButton onClick={handlePayment} size="lg" className="w-full" disabled={processing}>
                    {processing ? <><Loader2 className="size-4 animate-spin" /> Processing...</> : <><CreditCard className="size-4" /> Pay ₹{totalAmount.toLocaleString("en-IN")} & Generate Certificate</>}
                  </BrandButton>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 5 && (
            <div className="mt-8 flex items-center justify-between">
              <button onClick={handleBack} disabled={step === 0} className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all", step === 0 ? "cursor-not-allowed text-muted-foreground/40" : "text-royal hover:bg-primary/5")}>
                <ArrowLeft className="size-4" /> Back
              </button>
              <BrandButton onClick={handleNext} size="md">
                Next <ArrowRight className="size-4" />
              </BrandButton>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 flex gap-3 rounded-2xl border border-primary/10 bg-secondary/40 p-4">
            <FileText className="mt-0.5 size-4 shrink-0 text-royal" />
            <p className="text-[11px] leading-relaxed text-muted-foreground">{BONDS_DISCLAIMER}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function FormField({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-navy">{label} {required && <span className="text-destructive">*</span>}</Label>
      {children}
      {error && <p className="flex items-center gap-1 text-xs text-destructive"><AlertCircle className="size-3" />{error}</p>}
    </div>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-bold text-navy">{value}</div>
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
