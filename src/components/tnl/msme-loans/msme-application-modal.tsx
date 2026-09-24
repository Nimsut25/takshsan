"use client";

import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Loader2,
  PartyPopper,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandButton } from "@/components/tnl/brand-button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  MSME_BUSINESS_TYPES,
  MSME_GENDER_OPTIONS,
  MSME_LOAN_TYPE_OPTIONS,
} from "@/components/sections/msme-loans/msme-content";

type Errors = Record<string, string[]>;

const EMPTY = {
  // Applicant
  fullName: "",
  fatherHusbandName: "",
  dateOfBirth: "",
  gender: "",
  panNumber: "",
  aadhaarId: "",
  mobileNumber: "",
  email: "",
  residentialAddress: "",
  city: "",
  state: "",
  pinCode: "",
  // Business
  businessName: "",
  businessType: "",
  businessRegistrationNumber: "",
  natureOfBusiness: "",
  businessAddress: "",
  businessCity: "",
  businessState: "",
  businessPinCode: "",
  yearsInBusiness: "",
  annualTurnover: "",
  // Loan
  loanType: "",
  requiredLoanAmount: "",
  preferredLoanTenure: "",
  loanPurpose: "",
  existingLoan: "",
  existingMonthlyEmi: "",
  preferredContactTime: "",
  // Additional
  additionalRemarks: "",
  consent: false,
};

export function MsmeApplicationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null); // application number
  const { toast } = useToast();

  const set = (k: keyof typeof EMPTY, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.consent) {
      setErrors({ consent: ["Please provide your consent to proceed"] });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/msme-loans/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.ok) {
        setSuccess(data.applicationNumber);
        toast({
          title: "Application submitted",
          description: "Our team will review your application and contact you soon.",
        });
      } else {
        if (data.errors) setErrors(data.errors);
        toast({
          title: "Please check the form",
          description: data.message ?? "Some fields need your attention.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us at +91 94279 79991.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    if (success) {
      setForm(EMPTY);
      setErrors({});
      setSuccess(null);
    }
    onOpenChange(false);
  };

  return (
    <>
      {/* Application form modal */}
      <Dialog
        open={open && !success}
        onOpenChange={(v) => (submitting ? null : onOpenChange(v))}
      >
        <DialogContent
          showCloseButton={false}
          className="max-h-[94vh] w-full max-w-3xl overflow-hidden border-primary/15 p-0 sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">MSME Loan Application</DialogTitle>
          <DialogDescription className="sr-only">
            Submit your MSME loan application to TNL Fincorp.
          </DialogDescription>

          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky px-6 pb-6 pt-7 text-white">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close application form"
              className="absolute right-3 top-3 z-[60] grid size-10 place-items-center rounded-full bg-white/15 text-white transition-all duration-200 hover:rotate-90 hover:bg-white/30"
            >
              <X className="size-4" />
            </button>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <Briefcase className="size-3.5" />
              MSME Loan Application
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight">
              MSME Loan Application
            </h2>
            <p className="mt-1.5 text-sm text-white/80">
              Please provide your details and our team will review your application.
            </p>
          </div>

          {/* Body */}
          <div className="tnl-scrollbar max-h-[calc(94vh-9rem)] overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 1. APPLICANT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  1. Applicant Details
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required error={errors.fullName}>
                    <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="As per your ID" className="h-11" />
                  </Field>
                  <Field label="Father's / Husband's Name">
                    <Input value={form.fatherHusbandName} onChange={(e) => set("fatherHusbandName", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Date of Birth">
                    <Input type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Gender">
                    <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Select gender</option>
                      {MSME_GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </Field>
                  <Field label="PAN Number" error={errors.panNumber}>
                    <Input value={form.panNumber} onChange={(e) => set("panNumber", e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} className="h-11" />
                  </Field>
                  <Field label="Aadhaar / ID Number">
                    <Input value={form.aadhaarId} onChange={(e) => set("aadhaarId", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Mobile Number" required error={errors.mobileNumber}>
                    <Input value={form.mobileNumber} onChange={(e) => set("mobileNumber", e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} className="h-11" />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className="h-11" />
                  </Field>
                  <Field label="Residential Address" className="sm:col-span-2">
                    <Input value={form.residentialAddress} onChange={(e) => set("residentialAddress", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="City">
                    <Input value={form.city} onChange={(e) => set("city", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="State">
                    <Input value={form.state} onChange={(e) => set("state", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="PIN Code" error={errors.pinCode}>
                    <Input value={form.pinCode} onChange={(e) => set("pinCode", e.target.value)} placeholder="6-digit PIN" inputMode="numeric" maxLength={6} className="h-11" />
                  </Field>
                </div>
              </fieldset>

              {/* 2. BUSINESS DETAILS */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  2. Business Details
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business Name" required error={errors.businessName}>
                    <Input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Business Type">
                    <select value={form.businessType} onChange={(e) => set("businessType", e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Select business type</option>
                      {MSME_BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Business Registration Number">
                    <Input value={form.businessRegistrationNumber} onChange={(e) => set("businessRegistrationNumber", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Nature of Business">
                    <Input value={form.natureOfBusiness} onChange={(e) => set("natureOfBusiness", e.target.value)} placeholder="e.g. Manufacturing, Retail" className="h-11" />
                  </Field>
                  <Field label="Business Address" className="sm:col-span-2">
                    <Input value={form.businessAddress} onChange={(e) => set("businessAddress", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="City">
                    <Input value={form.businessCity} onChange={(e) => set("businessCity", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="State">
                    <Input value={form.businessState} onChange={(e) => set("businessState", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="PIN Code" error={errors.businessPinCode}>
                    <Input value={form.businessPinCode} onChange={(e) => set("businessPinCode", e.target.value)} placeholder="6-digit PIN" inputMode="numeric" maxLength={6} className="h-11" />
                  </Field>
                  <Field label="Years in Business">
                    <Input value={form.yearsInBusiness} onChange={(e) => set("yearsInBusiness", e.target.value)} placeholder="e.g. 5 years" className="h-11" />
                  </Field>
                  <Field label="Annual Turnover">
                    <Input value={form.annualTurnover} onChange={(e) => set("annualTurnover", e.target.value)} placeholder="e.g. ₹50,00,000" className="h-11" />
                  </Field>
                </div>
              </fieldset>

              {/* 3. MSME LOAN REQUIREMENTS */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  3. MSME Loan Requirements
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Loan Type">
                    <select value={form.loanType} onChange={(e) => set("loanType", e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Select loan type</option>
                      {MSME_LOAN_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Required Loan Amount" required error={errors.requiredLoanAmount}>
                    <Input value={form.requiredLoanAmount} onChange={(e) => set("requiredLoanAmount", e.target.value)} placeholder="e.g. ₹10,00,000" inputMode="numeric" className="h-11" />
                  </Field>
                  <Field label="Preferred Loan Tenure">
                    <Input value={form.preferredLoanTenure} onChange={(e) => set("preferredLoanTenure", e.target.value)} placeholder="e.g. 36 months" className="h-11" />
                  </Field>
                  <Field label="Purpose of Loan">
                    <Input value={form.loanPurpose} onChange={(e) => set("loanPurpose", e.target.value)} placeholder="e.g. Working capital" className="h-11" />
                  </Field>
                  <Field label="Existing Loan / Liability">
                    <Input value={form.existingLoan} onChange={(e) => set("existingLoan", e.target.value)} placeholder="e.g. None / ₹5,00,000" className="h-11" />
                  </Field>
                  <Field label="Existing Monthly EMI">
                    <Input value={form.existingMonthlyEmi} onChange={(e) => set("existingMonthlyEmi", e.target.value)} placeholder="e.g. ₹15,000" className="h-11" />
                  </Field>
                  <Field label="Preferred Contact Time" className="sm:col-span-2">
                    <Input value={form.preferredContactTime} onChange={(e) => set("preferredContactTime", e.target.value)} placeholder="e.g. Morning / Afternoon / Evening" className="h-11" />
                  </Field>
                </div>
              </fieldset>

              {/* 4. ADDITIONAL INFORMATION */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  4. Additional Information
                </legend>
                <Field label="Additional Remarks / Requirements">
                  <textarea value={form.additionalRemarks} onChange={(e) => set("additionalRemarks", e.target.value)} rows={3} placeholder="Any additional details you'd like to share." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
                </Field>
              </fieldset>

              {/* CONSENT */}
              <fieldset className="space-y-2">
                <label className="flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary/40 p-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-royal"
                  />
                  <span className="text-xs leading-relaxed text-foreground/80">
                    I confirm that the information provided by me is accurate and I agree to be contacted by TNL Fincorp regarding my MSME loan application.{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-royal underline hover:text-navy">Privacy Policy</a>
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs font-medium text-destructive">{errors.consent[0]}</p>
                )}
              </fieldset>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5 disabled:opacity-60"
                >
                  Cancel
                </button>
                <BrandButton type="submit" size="md" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </BrandButton>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success popup */}
      <Dialog
        open={!!success}
        onOpenChange={(v) => (!v ? handleClose() : undefined)}
      >
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-md overflow-hidden border-primary/15 p-0"
        >
          <DialogTitle className="sr-only">Application Submitted</DialogTitle>
          <DialogDescription className="sr-only">
            Your MSME loan application has been submitted successfully.
          </DialogDescription>

          <div className="relative overflow-hidden bg-gradient-to-br from-navy via-royal to-sky px-6 pb-8 pt-10 text-center text-white">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-[60] grid size-10 place-items-center rounded-full bg-white/15 text-white transition-all duration-200 hover:rotate-90 hover:bg-white/30"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto grid size-20 place-items-center rounded-full bg-white/15 ring-4 ring-white/20 msme-success-pop">
              <PartyPopper className="size-10 text-white" />
            </div>

            <h2 className="mt-5 font-display text-2xl font-extrabold">
              Congratulations!
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Your MSME loan application has been submitted successfully. Our team will review your application and contact you soon.
            </p>

            <div className="mt-5 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-inset ring-white/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Application Reference
              </p>
              <p className="mt-1 font-display text-lg font-extrabold tracking-wide">
                {success}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && error.length > 0 && (
        <p className="text-xs font-medium text-destructive">{error[0]}</p>
      )}
    </div>
  );
}
