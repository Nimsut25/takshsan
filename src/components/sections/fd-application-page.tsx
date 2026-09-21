"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Download, Eye,
  Loader2, ShieldCheck, Sparkles, AlertCircle, FileText, IndianRupee,
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
import { cn } from "@/lib/utils";

const STEPS = ["Applicant", "Occupation", "FD Details", "Maturity", "Nominee", "Joint Applicant", "Documents", "Declaration", "Review", "Payment"];

const INDIAN_STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli and Daman & Diu","Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"];

type FormData = {
  applicantName: string; fatherHusbandName: string; dateOfBirth: string;
  gender: string; panNo: string; aadhaarIdNo: string; mobile: string; email: string;
  residentialAddress: string; city: string; state: string; pin: string;
  occupation: string; employerBusinessName: string; annualIncome: string;
  depositAmount: string; tenureYears: string; tenureMonths: string;
  interestRate: string; interestPaymentOption: string; depositType: string;
  maturityInstruction: string; bankAccountNo: string; bankName: string; branch: string; ifscCode: string;
  nomineeName: string; nomineeRelationship: string; nomineeDateOfBirth: string; nomineeAddress: string; nomineeMobile: string;
  jointApplicantEnabled: boolean; jointApplicantName: string; jointApplicantRelationship: string;
  jointApplicantPan: string; jointApplicantMobile: string; modeOfOperation: string;
  panDocument: boolean; aadhaarDocument: boolean; addressProofDocument: boolean;
  photographDocument: boolean; bankAccountProofDocument: boolean; kycDocuments: boolean; otherDocuments: string;
  declarationAccepted: boolean;
};

const EMPTY: FormData = {
  applicantName: "", fatherHusbandName: "", dateOfBirth: "", gender: "", panNo: "",
  aadhaarIdNo: "", mobile: "", email: "", residentialAddress: "", city: "", state: "", pin: "",
  occupation: "", employerBusinessName: "", annualIncome: "",
  depositAmount: "", tenureYears: "1", tenureMonths: "0", interestRate: "7", interestPaymentOption: "On Maturity", depositType: "Cumulative",
  maturityInstruction: "Credit Principal & Interest to Bank Account", bankAccountNo: "", bankName: "", branch: "", ifscCode: "",
  nomineeName: "", nomineeRelationship: "", nomineeDateOfBirth: "", nomineeAddress: "", nomineeMobile: "",
  jointApplicantEnabled: false, jointApplicantName: "", jointApplicantRelationship: "", jointApplicantPan: "", jointApplicantMobile: "", modeOfOperation: "",
  panDocument: false, aadhaarDocument: false, addressProofDocument: false, photographDocument: false, bankAccountProofDocument: false, kycDocuments: false, otherDocuments: "",
  declarationAccepted: false,
};

export function FdApplicationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<{ appNo: string; fdAccountNo: string; certNo: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const applicationNo = useMemo(() => `FD-APP-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, []);
  const applicationDate = new Date().toLocaleDateString("en-IN");

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (form.applicantName.trim().length < 2) e.applicantName = "Required";
      if (form.fatherHusbandName.trim().length < 2) e.fatherHusbandName = "Required";
      if (!form.dateOfBirth) e.dateOfBirth = "Required";
      if (!form.gender) e.gender = "Required";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNo.toUpperCase().trim())) e.panNo = "Invalid PAN";
      if (!/^\d{12}$/.test(form.aadhaarIdNo.replace(/\s/g, ""))) e.aadhaarIdNo = "12-digit Aadhaar";
      if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = "10-digit mobile";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Invalid email";
      if (form.residentialAddress.trim().length < 5) e.residentialAddress = "Required";
      if (form.city.trim().length < 2) e.city = "Required";
      if (!form.state) e.state = "Required";
      if (!/^\d{6}$/.test(form.pin.trim())) e.pin = "6-digit PIN";
    }
    if (s === 1) {
      if (!form.occupation) e.occupation = "Required";
    }
    if (s === 2) {
      if (!form.depositAmount || Number(form.depositAmount) <= 0) e.depositAmount = "Valid amount";
      if (!form.interestRate || Number(form.interestRate) <= 0) e.interestRate = "Valid rate";
      if (!form.depositType) e.depositType = "Required";
      if (!form.interestPaymentOption) e.interestPaymentOption = "Required";
    }
    if (s === 3) {
      if (!form.maturityInstruction) e.maturityInstruction = "Required";
      if (form.bankAccountNo.trim().length < 8) e.bankAccountNo = "Required";
      if (form.bankName.trim().length < 2) e.bankName = "Required";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase().trim())) e.ifscCode = "Invalid IFSC";
    }
    if (s === 7) {
      if (!form.declarationAccepted) e.declarationAccepted = "Please accept the declaration";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const totalTenureMonths = (Number(form.tenureYears || 0) * 12) + Number(form.tenureMonths || 0);
  const depositAmount = Number(form.depositAmount || 0);
  const rate = Number(form.interestRate || 0);
  const maturityAmount = useMemo(() => {
    if (depositAmount <= 0 || rate <= 0 || totalTenureMonths <= 0) return 0;
    if (form.depositType === "Cumulative") {
      const r = rate / 400; const n = totalTenureMonths / 3;
      return depositAmount * Math.pow(1 + r, n);
    }
    return depositAmount + (depositAmount * rate * totalTenureMonths) / (12 * 100);
  }, [depositAmount, rate, totalTenureMonths, form.depositType]);

  const maturityDate = useMemo(() => {
    const d = new Date(); d.setMonth(d.getMonth() + totalTenureMonths); return d.toLocaleDateString("en-IN");
  }, [totalTenureMonths]);

  const handlePayment = async () => {
    setProcessing(true); setErrorMsg("");
    try {
      const applyRes = await fetch("/api/fd/apply", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, panNo: form.panNo.toUpperCase().trim(), ifscCode: form.ifscCode.toUpperCase().trim() }),
      });
      const applyData = await applyRes.json();
      if (!applyRes.ok || !applyData.ok) throw new Error(applyData.message || "Application failed");

      const createRes = await fetch("/api/fd/payment/create", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationNo: applyData.applicationNo }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.ok) throw new Error(createData.message || "Payment order failed");
      if (createData.alreadyPaid) { setSuccess({ appNo: applyData.applicationNo, fdAccountNo: createData.fdAccountNo, certNo: createData.certificateNo }); return; }

      await new Promise<void>((resolve, reject) => {
        if ((window as unknown as { Razorpay?: unknown }).Razorpay) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(); script.onerror = () => reject(new Error("Failed to load payment gateway"));
        document.head.appendChild(script);
      });

      const paymentResult = await new Promise<{ razorpayPaymentId: string; razorpaySignature: string }>((resolve, reject) => {
        const rzpOpts: Record<string, unknown> = {
          key: createData.razorpayKeyId, amount: createData.amount * 100, currency: "INR",
          name: "TNL Fincorp", description: "Fixed Deposit Application",
          order_id: createData.orderId,
          prefill: { name: form.applicantName, contact: form.mobile, email: form.email },
          theme: { color: "#3866f3" },
          handler: (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
            resolve({ razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature });
          },
          modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
        };
        new (window as unknown as { Razorpay: new (o: Record<string, unknown>) => { open: () => void } }).Razorpay(rzpOpts).open();
      });

      const verifyRes = await fetch("/api/fd/payment/verify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationNo: applyData.applicationNo, orderId: createData.orderId, razorpayPaymentId: paymentResult.razorpayPaymentId, razorpaySignature: paymentResult.razorpaySignature }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.ok || !verifyData.verified) throw new Error(verifyData.message || "Payment verification failed");
      setSuccess({ appNo: applyData.applicationNo, fdAccountNo: verifyData.fdAccountNo, certNo: verifyData.certificateNo });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally { setProcessing(false); }
  };

  if (success) {
    return (
      <div className="relative overflow-hidden bg-mesh py-20 sm:py-24">
        <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
          <Reveal direction="up">
            <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-glow sm:p-12">
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow"><CheckCircle2 className="size-10" /></span>
              <h1 className="mt-6 font-display text-2xl font-extrabold text-navy sm:text-3xl">FD Application Submitted Successfully</h1>
              <div className="mt-8 space-y-3 rounded-2xl border border-primary/10 bg-secondary/40 p-6 text-left">
                <Row label="Application Number" value={success.appNo} />
                <Row label="FD Account Number" value={success.fdAccountNo} />
                <Row label="Certificate Number" value={success.certNo} />
                <Row label="Deposit Amount" value={`₹${depositAmount.toLocaleString("en-IN")}`} />
                <Row label="Interest Rate" value={`${rate}% p.a.`} />
                <Row label="Maturity Date" value={maturityDate} />
                <Row label="Maturity Amount" value={`₹${maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`} />
                <Row label="Payment Status" value="Paid" highlight />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={`/fd/success?app=${success.appNo}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"><Eye className="size-4" /> View Certificate</Link>
                <a href={`/api/fd/certificate?applicationNo=${success.appNo}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-royal hover:bg-primary/5"><Download className="size-4" /> Download FD Certificate (PDF)</a>
              </div>
              <Link href="/investment/fd" className="mt-4 inline-block text-xs font-semibold text-muted-foreground hover:text-royal">← Back to FD Page</Link>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden bg-mesh pt-28 pb-8 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal direction="up"><Link href="/investment/fd" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:gap-2 transition-all"><ArrowLeft className="size-4" /> Back to FD Page</Link></Reveal>
          <Reveal direction="up" delay={0.05}><h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">FIXED DEPOSIT APPLICATION FORM</h1></Reveal>
          <Reveal direction="up" delay={0.1}><p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">Apply for a Fixed Deposit securely and conveniently. Please provide accurate details for KYC and processing.</p></Reveal>
          <Reveal direction="up" delay={0.15}><div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground"><span>Application No: <span className="font-bold text-royal">{applicationNo}</span></span><span>Date: <span className="font-bold text-navy">{applicationDate}</span></span></div></Reveal>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-primary/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-6 py-3 lg:px-8 no-scrollbar">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 whitespace-nowrap">
              <span className={cn("flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-all", i === step ? "bg-gradient-to-br from-royal to-sky text-white shadow-glow" : i < step ? "bg-teal-brand text-white" : "bg-secondary text-muted-foreground")}>{i < step ? "✓" : i + 1}</span>
              <span className={cn("text-xs font-semibold", i === step ? "text-navy" : "text-muted-foreground")}>{s}</span>
              {i < STEPS.length - 1 && <span className="mx-1 h-0.5 w-4 bg-primary/15" />}
            </div>
          ))}
        </div>
      </div>

      <section className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

              {step === 0 && (<div className="space-y-4"><SectionTitle title="Applicant Details" desc="Personal information and residential address." />
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Name of Applicant" error={errors.applicantName} required><Input placeholder="e.g. Rohit Sharma" className="h-11 rounded-xl border-primary/15" value={form.applicantName} onChange={(e) => set("applicantName", e.target.value)} /></FF><FF label="Father's / Husband's Name" error={errors.fatherHusbandName} required><Input placeholder="e.g. Rajesh Sharma" className="h-11 rounded-xl border-primary/15" value={form.fatherHusbandName} onChange={(e) => set("fatherHusbandName", e.target.value)} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Date of Birth" error={errors.dateOfBirth} required><Input type="date" className="h-11 rounded-xl border-primary/15" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} /></FF><FF label="Gender" error={errors.gender} required><Select value={form.gender} onValueChange={(v) => set("gender", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="PAN No." error={errors.panNo} required><Input placeholder="ABCDE1234F" maxLength={10} className="h-11 rounded-xl border-primary/15 uppercase" value={form.panNo} onChange={(e) => set("panNo", e.target.value.toUpperCase())} /></FF><FF label="Aadhaar / ID No." error={errors.aadhaarIdNo} required><Input inputMode="numeric" maxLength={12} placeholder="12-digit Aadhaar" className="h-11 rounded-xl border-primary/15" value={form.aadhaarIdNo} onChange={(e) => set("aadhaarIdNo", e.target.value.replace(/\D/g, "").slice(0, 12))} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Mobile No." error={errors.mobile} required><Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className="h-11 rounded-xl border-primary/15" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} /></FF><FF label="Email ID" error={errors.email} required><Input type="email" placeholder="you@example.com" className="h-11 rounded-xl border-primary/15" value={form.email} onChange={(e) => set("email", e.target.value)} /></FF></div>
                <FF label="Residential Address" error={errors.residentialAddress} required><Textarea rows={2} placeholder="Full address" className="rounded-xl border-primary/15" value={form.residentialAddress} onChange={(e) => set("residentialAddress", e.target.value)} /></FF>
                <div className="grid gap-4 sm:grid-cols-3"><FF label="City" error={errors.city} required><Input placeholder="e.g. Surat" className="h-11 rounded-xl border-primary/15" value={form.city} onChange={(e) => set("city", e.target.value)} /></FF><FF label="State" error={errors.state} required><Select value={form.state} onValueChange={(v) => set("state", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300] max-h-[200px]" sideOffset={6}>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></FF><FF label="PIN" error={errors.pin} required><Input inputMode="numeric" maxLength={6} placeholder="6-digit PIN" className="h-11 rounded-xl border-primary/15" value={form.pin} onChange={(e) => set("pin", e.target.value.replace(/\D/g, "").slice(0, 6))} /></FF></div>
              </div>)}

              {step === 1 && (<div className="space-y-4"><SectionTitle title="Occupation Details" desc="Your employment and income information." />
                <FF label="Occupation" error={errors.occupation} required><Select value={form.occupation} onValueChange={(v) => set("occupation", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Salaried">Salaried</SelectItem><SelectItem value="Business">Business</SelectItem><SelectItem value="Self-Employed">Self-Employed</SelectItem><SelectItem value="Professional">Professional</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></FF>
                <FF label="Employer / Business Name"><Input placeholder="e.g. ABC Corp" className="h-11 rounded-xl border-primary/15" value={form.employerBusinessName} onChange={(e) => set("employerBusinessName", e.target.value)} /></FF>
                <FF label="Annual Income (₹)"><Input inputMode="numeric" placeholder="e.g. 500000" className="h-11 rounded-xl border-primary/15" value={form.annualIncome} onChange={(e) => set("annualIncome", e.target.value.replace(/[^\d]/g, ""))} /></FF>
              </div>)}

              {step === 2 && (<div className="space-y-4"><SectionTitle title="Fixed Deposit Details" desc="Your deposit amount and tenure." />
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Deposit Amount (₹)" error={errors.depositAmount} required><Input inputMode="numeric" placeholder="e.g. 100000" className="h-11 rounded-xl border-primary/15" value={form.depositAmount} onChange={(e) => set("depositAmount", e.target.value.replace(/[^\d]/g, ""))} /></FF><FF label="Interest Rate (% p.a.)" error={errors.interestRate} required><Input inputMode="decimal" placeholder="e.g. 7" className="h-11 rounded-xl border-primary/15" value={form.interestRate} onChange={(e) => set("interestRate", e.target.value)} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Tenure (Years)"><Input inputMode="numeric" placeholder="e.g. 1" className="h-11 rounded-xl border-primary/15" value={form.tenureYears} onChange={(e) => set("tenureYears", e.target.value.replace(/[^\d]/g, ""))} /></FF><FF label="Tenure (Months)"><Input inputMode="numeric" placeholder="e.g. 0" className="h-11 rounded-xl border-primary/15" value={form.tenureMonths} onChange={(e) => set("tenureMonths", e.target.value.replace(/[^\d]/g, ""))} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Interest Payment Option" error={errors.interestPaymentOption} required><Select value={form.interestPaymentOption} onValueChange={(v) => set("interestPaymentOption", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Quarterly">Quarterly</SelectItem><SelectItem value="Half-Yearly">Half-Yearly</SelectItem><SelectItem value="Yearly">Yearly</SelectItem><SelectItem value="On Maturity">On Maturity</SelectItem></SelectContent></Select></FF><FF label="Deposit Type" error={errors.depositType} required><Select value={form.depositType} onValueChange={(v) => set("depositType", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Cumulative">Cumulative</SelectItem><SelectItem value="Non-Cumulative">Non-Cumulative</SelectItem></SelectContent></Select></FF></div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-700">Maturity Date: <span className="font-bold">{maturityDate}</span> | Estimated Maturity Amount: <span className="font-bold">₹{maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></div>
              </div>)}

              {step === 3 && (<div className="space-y-4"><SectionTitle title="Maturity Instruction" desc="What should happen when the FD matures." />
                <FF label="On maturity, please:" error={errors.maturityInstruction} required><Select value={form.maturityInstruction} onValueChange={(v) => set("maturityInstruction", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Renew Principal & Interest">Renew Principal & Interest</SelectItem><SelectItem value="Renew Principal Only">Renew Principal Only</SelectItem><SelectItem value="Credit Principal & Interest to Bank Account">Credit Principal & Interest to Bank Account</SelectItem></SelectContent></Select></FF>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Bank Account No." error={errors.bankAccountNo} required><Input placeholder="Account number" className="h-11 rounded-xl border-primary/15" value={form.bankAccountNo} onChange={(e) => set("bankAccountNo", e.target.value)} /></FF><FF label="IFSC Code" error={errors.ifscCode} required><Input placeholder="SBIN0001234" maxLength={11} className="h-11 rounded-xl border-primary/15 uppercase" value={form.ifscCode} onChange={(e) => set("ifscCode", e.target.value.toUpperCase())} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Bank Name" error={errors.bankName} required><Input placeholder="e.g. State Bank of India" className="h-11 rounded-xl border-primary/15" value={form.bankName} onChange={(e) => set("bankName", e.target.value)} /></FF><FF label="Branch"><Input placeholder="e.g. Surat Main" className="h-11 rounded-xl border-primary/15" value={form.branch} onChange={(e) => set("branch", e.target.value)} /></FF></div>
              </div>)}

              {step === 4 && (<div className="space-y-4"><SectionTitle title="Nominee Details" desc="Nominee information for this FD." />
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Nominee Name"><Input placeholder="e.g. Sunita Sharma" className="h-11 rounded-xl border-primary/15" value={form.nomineeName} onChange={(e) => set("nomineeName", e.target.value)} /></FF><FF label="Relationship with Applicant"><Input placeholder="e.g. Spouse" className="h-11 rounded-xl border-primary/15" value={form.nomineeRelationship} onChange={(e) => set("nomineeRelationship", e.target.value)} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="Nominee Date of Birth"><Input type="date" className="h-11 rounded-xl border-primary/15" value={form.nomineeDateOfBirth} onChange={(e) => set("nomineeDateOfBirth", e.target.value)} /></FF><FF label="Nominee Mobile No."><Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className="h-11 rounded-xl border-primary/15" value={form.nomineeMobile} onChange={(e) => set("nomineeMobile", e.target.value.replace(/\D/g, "").slice(0, 10))} /></FF></div>
                <FF label="Nominee Address"><Textarea rows={2} placeholder="Nominee address" className="rounded-xl border-primary/15" value={form.nomineeAddress} onChange={(e) => set("nomineeAddress", e.target.value)} /></FF>
              </div>)}

              {step === 5 && (<div className="space-y-4"><SectionTitle title="Joint Applicant Details" desc="If applicable, provide joint applicant information." />
                <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-primary/10 bg-secondary/40 p-3 text-sm"><Checkbox checked={form.jointApplicantEnabled} onCheckedChange={(v) => set("jointApplicantEnabled", v === true)} className="data-[state=checked]:bg-royal data-[state=checked]:border-royal" /><span className="font-semibold text-navy">No Joint Applicant</span></label>
                {form.jointApplicantEnabled && (<><div className="grid gap-4 sm:grid-cols-2"><FF label="Joint Applicant Name"><Input placeholder="e.g. Sunita Sharma" className="h-11 rounded-xl border-primary/15" value={form.jointApplicantName} onChange={(e) => set("jointApplicantName", e.target.value)} /></FF><FF label="Relationship"><Input placeholder="e.g. Spouse" className="h-11 rounded-xl border-primary/15" value={form.jointApplicantRelationship} onChange={(e) => set("jointApplicantRelationship", e.target.value)} /></FF></div>
                <div className="grid gap-4 sm:grid-cols-2"><FF label="PAN No."><Input placeholder="ABCDE1234F" maxLength={10} className="h-11 rounded-xl border-primary/15 uppercase" value={form.jointApplicantPan} onChange={(e) => set("jointApplicantPan", e.target.value.toUpperCase())} /></FF><FF label="Mobile No."><Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile" className="h-11 rounded-xl border-primary/15" value={form.jointApplicantMobile} onChange={(e) => set("jointApplicantMobile", e.target.value.replace(/\D/g, "").slice(0, 10))} /></FF></div>
                <FF label="Mode of Operation"><Select value={form.modeOfOperation} onValueChange={(v) => set("modeOfOperation", v)}><SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent position="popper" className="z-[300]"><SelectItem value="Either or Survivor">Either or Survivor</SelectItem><SelectItem value="Jointly">Jointly</SelectItem><SelectItem value="Former or Survivor">Former or Survivor</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></FF></>)}
              </div>)}

              {step === 6 && (<div className="space-y-4"><SectionTitle title="Documents Checklist" desc="Select the documents you will provide." />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[{k:"panDocument",l:"PAN Card"},{k:"aadhaarDocument",l:"Aadhaar Card / Valid ID Proof"},{k:"addressProofDocument",l:"Address Proof"},{k:"photographDocument",l:"Passport Size Photograph"},{k:"bankAccountProofDocument",l:"Bank Account Proof"},{k:"kycDocuments",l:"KYC Documents"}].map((d) => (
                    <label key={d.k} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-primary/10 bg-white p-3 text-sm"><Checkbox checked={form[d.k as keyof FormData] as boolean} onCheckedChange={(v) => set(d.k as keyof FormData, v === true)} className="data-[state=checked]:bg-royal data-[state=checked]:border-royal" /><span className="text-navy">{d.l}</span></label>
                  ))}
                </div>
                <FF label="Other (describe)"><Input placeholder="e.g. Additional KYC document" className="h-11 rounded-xl border-primary/15" value={form.otherDocuments} onChange={(e) => set("otherDocuments", e.target.value)} /></FF>
              </div>)}

              {step === 7 && (<div className="space-y-4"><SectionTitle title="Declaration & Signature" desc="Please read and accept the declaration." />
                <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">"I/We hereby declare that the information provided in this application form is true and correct to the best of my/our knowledge and belief. I/We agree to abide by the terms and conditions applicable to the Fixed Deposit scheme. I/We authorize the institution to process this application and carry out the necessary KYC and verification procedures as applicable."</div>
                <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-primary/10 bg-white p-3 text-xs text-muted-foreground"><Checkbox checked={form.declarationAccepted} onCheckedChange={(v) => set("declarationAccepted", v === true)} className="mt-0.5 data-[state=checked]:bg-royal data-[state=checked]:border-royal" /><span className="leading-relaxed">I/We agree to the declaration and authorize processing of this FD application.</span></label>
                {errors.declarationAccepted && <p className="flex items-center gap-1 text-xs text-destructive"><AlertCircle className="size-3" />{errors.declarationAccepted}</p>}
              </div>)}

              {step === 8 && (<div className="space-y-4"><SectionTitle title="Review Application" desc="Please review all details before proceeding to payment." />
                <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-5">
                  <div className="space-y-2 text-sm">
                    <Row label="Applicant Name" value={form.applicantName} />
                    <Row label="PAN" value={form.panNo} />
                    <Row label="Mobile" value={form.mobile} />
                    <Row label="Email" value={form.email} />
                    <Row label="Deposit Amount" value={`₹${depositAmount.toLocaleString("en-IN")}`} />
                    <Row label="Interest Rate" value={`${rate}% p.a.`} />
                    <Row label="Tenure" value={`${form.tenureYears}y ${form.tenureMonths}m`} />
                    <Row label="Deposit Type" value={form.depositType} />
                    <Row label="Maturity Date" value={maturityDate} />
                    <Row label="Est. Maturity Amount" value={`₹${maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`} />
                    <Row label="Nominee" value={form.nomineeName || "—"} />
                    <div className="border-t border-primary/10 pt-2"><Row label="Total Payable" value={`₹${depositAmount.toLocaleString("en-IN")}`} highlight /></div>
                  </div>
                </div>
              </div>)}

              {step === 9 && (<div className="space-y-4"><SectionTitle title="Payment" desc="Complete your FD application payment." />
                <div className="rounded-2xl border border-primary/10 bg-secondary/40 p-5">
                  <div className="space-y-2 text-sm">
                    <Row label="Applicant" value={form.applicantName} />
                    <Row label="Deposit Amount" value={`₹${depositAmount.toLocaleString("en-IN")}`} />
                    <Row label="Interest Rate" value={`${rate}% p.a.`} />
                    <div className="border-t border-primary/10 pt-2"><Row label="Total Payable" value={`₹${depositAmount.toLocaleString("en-IN")}`} highlight /></div>
                  </div>
                </div>
                {errorMsg && <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="size-4" />{errorMsg}</div>}
                <BrandButton onClick={handlePayment} size="lg" className="w-full" disabled={processing}>{processing ? <><Loader2 className="size-4 animate-spin" /> Processing...</> : <><CreditCard className="size-4" /> Pay ₹{depositAmount.toLocaleString("en-IN")} & Submit</>}</BrandButton>
              </div>)}

            </motion.div>
          </AnimatePresence>

          {step < 9 && (<div className="mt-8 flex items-center justify-between">
            <button onClick={handleBack} disabled={step === 0} className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all", step === 0 ? "cursor-not-allowed text-muted-foreground/40" : "text-royal hover:bg-primary/5")}><ArrowLeft className="size-4" /> Back</button>
            <BrandButton onClick={handleNext} size="md">Next <ArrowRight className="size-4" /></BrandButton>
          </div>)}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return <div><h2 className="font-display text-xl font-bold text-navy">{title}</h2><p className="mt-1 text-xs text-muted-foreground">{desc}</p></div>;
}

function FF({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-sm font-semibold text-navy">{label} {required && <span className="text-destructive">*</span>}</Label>{children}{error && <p className="flex items-center gap-1 text-xs text-destructive"><AlertCircle className="size-3" />{error}</p>}</div>;
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className={cn("font-semibold", highlight ? "text-royal" : "text-navy")}>{value}</span></div>;
}
