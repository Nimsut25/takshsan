"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandButton } from "@/components/tnl/brand-button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type LoanApplyField =
  | "fullName"
  | "mobile"
  | "email"
  | "loanAmount"
  | "city"
  | "employment"
  | "message";

export type LoanApplyConfig = {
  /** Loan / category title shown in the modal heading, e.g. "Home Purchase Loan". */
  title: string;
  /** Pre-selected category value passed into the "category" select (free-text label). */
  category?: string;
  /** Optional list of category options for a category select (e.g. vehicle types). */
  categoryOptions?: string[];
  /** Accent gradient classes for the header + button. */
  accent?: string;
  /** Fields to render. Defaults to all standard fields. */
  fields?: LoanApplyField[];
  /** Label overrides for the category field. */
  categoryLabel?: string;
  /** API endpoint to POST the submission (defaults to /api/enquiry). */
  endpoint?: string;
};

const ALL_FIELDS: LoanApplyField[] = [
  "fullName",
  "mobile",
  "email",
  "loanAmount",
  "city",
  "employment",
  "message",
];

const EMPLOYMENT_OPTIONS = ["Salaried", "Self-Employed", "Business", "Student", "Other"];

/**
 * Reusable loan application modal with a smooth 3D open/close animation.
 *
 * - Opens/closes with a scale + rotateY 3D transition.
 * - Dynamic title reflects the selected loan / category.
 * - Full validation (name, 10-digit IN mobile, email, numeric amount).
 * - Submits to /api/enquiry (or a custom endpoint) with the loan type tagged.
 * - Body scroll lock, ESC-to-close, click-outside-to-close, close button.
 * - Fully responsive + accessible (focus trap-friendly, aria labels).
 *
 * Does NOT claim loan approval on submission — the success message clearly
 * states the team will contact the user and approval is subject to assessment.
 */
export function LoanApplyModal({
  open,
  onClose,
  config,
}: {
  open: boolean;
  onClose: () => void;
  config: LoanApplyConfig;
}) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    loanAmount: "",
    city: "",
    employment: "",
    message: "",
  });

  const fields = config.fields ?? ALL_FIELDS;
  const accent = config.accent ?? "from-royal to-sky";

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Reset state when reopened with a new config
  useEffect(() => {
    if (open) {
      setDone(false);
      setErrors({});
      setSubmitting(false);
    }
  }, [open, config.title]);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (fields.includes("fullName") && form.fullName.trim().length < 2)
      e.fullName = "Please enter your full name";
    if (fields.includes("mobile") && !/^[6-9]\d{9}$/.test(form.mobile.trim()))
      e.mobile = "Enter a valid 10-digit Indian mobile number";
    if (fields.includes("email") && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Enter a valid email address";
    if (fields.includes("city") && form.city.trim().length < 2)
      e.city = "Please enter your city";
    if (fields.includes("employment") && !form.employment)
      e.employment = "Please select employment type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload: Record<string, string> = {
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim().toLowerCase(),
        loanType: config.title,
        loanAmount: form.loanAmount.trim(),
        employment: form.employment,
        city: form.city.trim(),
        message: form.message.trim(),
      };
      const res = await fetch(config.endpoint ?? "/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone(true);
        toast({
          title: "Application received",
          description: `Your ${config.title} application request has been received. Our team will contact you shortly.`,
        });
      } else {
        toast({
          title: "Submission failed",
          description: data.message ?? "Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* modal panel — 3D scale + rotateY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -18, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotateY: 12, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-glow"
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${config.title}`}
          >
            {/* Header — colorful gradient */}
            <div
              className={cn(
                "relative overflow-hidden bg-gradient-to-r p-6 text-white",
                accent
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/15 blur-2xl" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <X className="size-4" />
              </button>
              <div className="relative flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    Apply Now
                  </p>
                  <h2 className="font-display text-xl font-bold leading-tight">
                    Apply for {config.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="tnl-scrollbar max-h-[calc(92vh-7rem)] overflow-y-auto p-6">
              {done ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">
                    Application Received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you for your interest in {config.title}. Our team will
                    contact you shortly. Loan approval is subject to lender
                    assessment and eligibility.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <BrandButton variant="primary" onClick={onClose}>
                      Done
                    </BrandButton>
                    <a
                      href="tel:+919427979991"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-royal hover:bg-primary/5"
                    >
                      <Phone className="size-4" /> Call Us
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Category (pre-selected, read-only display) */}
                  {config.category && (
                    <div className="rounded-xl border border-primary/10 bg-secondary/40 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {config.categoryLabel ?? "Category"}
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-navy">
                        {config.category}
                      </p>
                    </div>
                  )}

                  {/* Category select (if options provided) */}
                  {config.categoryOptions && !config.category && (
                    <Field label={config.categoryLabel ?? "Category"} error={errors.category}>
                      <Select
                        value={form.message}
                        onValueChange={(v) => set("message", v)}
                      >
                        <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {config.categoryOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.includes("fullName") && (
                      <Field label="Full Name" error={errors.fullName} required icon={User}>
                        <Input
                          placeholder="e.g. Rohit Sharma"
                          className="h-11 rounded-xl border-primary/15 bg-white"
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                        />
                      </Field>
                    )}
                    {fields.includes("mobile") && (
                      <Field label="Mobile Number" error={errors.mobile} required icon={Phone}>
                        <Input
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile"
                          className="h-11 rounded-xl border-primary/15 bg-white"
                          value={form.mobile}
                          onChange={(e) =>
                            set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                        />
                      </Field>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.includes("email") && (
                      <Field label="Email Address" error={errors.email} required>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="h-11 rounded-xl border-primary/15 bg-white"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                        />
                      </Field>
                    )}
                    {fields.includes("loanAmount") && (
                      <Field label="Required Loan Amount" error={errors.loanAmount} icon={IndianRupee}>
                        <Input
                          inputMode="numeric"
                          placeholder="e.g. 500000"
                          className="h-11 rounded-xl border-primary/15 bg-white"
                          value={form.loanAmount}
                          onChange={(e) =>
                            set("loanAmount", e.target.value.replace(/[^\d]/g, ""))
                          }
                        />
                      </Field>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.includes("city") && (
                      <Field label="City / Location" error={errors.city} required icon={MapPin}>
                        <Input
                          placeholder="e.g. Surat"
                          className="h-11 rounded-xl border-primary/15 bg-white"
                          value={form.city}
                          onChange={(e) => set("city", e.target.value)}
                        />
                      </Field>
                    )}
                    {fields.includes("employment") && (
                      <Field label="Employment Type" error={errors.employment} required>
                        <Select
                          value={form.employment}
                          onValueChange={(v) => set("employment", v)}
                        >
                          <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {EMPLOYMENT_OPTIONS.map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  </div>

                  {fields.includes("message") && (
                    <Field label="Additional Details" error={errors.message}>
                      <Textarea
                        rows={3}
                        placeholder="Tell us briefly about your requirement..."
                        className="rounded-xl border-primary/15 bg-white"
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                      />
                    </Field>
                  )}

                  {Object.keys(errors).length > 0 && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
                      <AlertCircle className="size-4 shrink-0" />
                      Please correct the highlighted fields.
                    </div>
                  )}

                  <BrandButton
                    onClick={submit}
                    size="lg"
                    className={cn("w-full", accent)}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" /> Submit Application
                      </>
                    )}
                  </BrandButton>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-teal-brand" />
                    Your details are kept private. Loan approval is subject to
                    lender assessment and eligibility.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  icon: Icon,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-navy">
          {Icon && <Icon className="mr-1 inline size-3.5 text-royal" />}
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {hint && (
          <span className="text-[11px] font-medium text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}
