"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
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
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  loanType: z.string().min(1, "Please select a loan type"),
  loanAmount: z.string().optional(),
  employment: z.string().min(1, "Please select employment type"),
  city: z.string().min(2, "Please enter your city"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const LOAN_OPTIONS = [
  "Personal Loan",
  "Business Loan",
  "Home Loan",
  "Loan Against Property",
  "Auto Loan",
  "Education Loan",
  "Other",
];

const EMPLOYMENT_OPTIONS = ["Salaried", "Self-Employed", "Business", "Student", "Other"];

export function EnquiryForm({
  defaultLoanType,
  compact = false,
  onDone,
}: {
  defaultLoanType?: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanType: defaultLoanType ?? "",
      fullName: "",
      mobile: "",
      email: "",
      loanAmount: "",
      employment: "",
      city: "",
      message: "",
    },
  });

  const loanType = watch("loanType");
  const employment = watch("employment");

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setServerMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setServerMessage(
          data.message ??
            "Thank you! Your loan enquiry has been received. Our team will contact you shortly."
        );
        reset();
        onDone?.();
      } else {
        setStatus("error");
        setServerMessage(
          data.message ??
            "Something went wrong. Please try again or call us directly."
        );
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error. Please try again or call us at " + COMPANY.phone + "."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-teal-brand/20 bg-gradient-to-br from-teal-brand/5 to-sky/5 p-8 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-navy">
          Enquiry Submitted!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {serverMessage}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          For urgent queries, call us at{" "}
          <a
            href={COMPANY.phoneHref}
            className="font-semibold text-royal hover:underline"
          >
            {COMPANY.phone}
          </a>
        </p>
        <div className="mt-5 flex gap-3">
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-royal hover:bg-primary/5"
          >
            <Phone className="size-4" />
            Call Now
          </a>
          <BrandButton
            variant="outline"
            onClick={() => {
              setStatus("idle");
              setServerMessage("");
            }}
          >
            Submit Another
          </BrandButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Full Name" error={errors.fullName?.message} required>
          <Input
            placeholder="e.g. Rohit Sharma"
            className="h-11 rounded-xl border-primary/15 bg-white"
            {...register("fullName")}
          />
        </Field>
        <Field label="Mobile Number" error={errors.mobile?.message} required>
          <Input
            inputMode="numeric"
            placeholder="10-digit mobile number"
            className="h-11 rounded-xl border-primary/15 bg-white"
            {...register("mobile")}
          />
        </Field>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Email Address" error={errors.email?.message} required>
          <Input
            type="email"
            placeholder="you@example.com"
            className="h-11 rounded-xl border-primary/15 bg-white"
            {...register("email")}
          />
        </Field>
        <Field label="Loan Type" error={errors.loanType?.message} required>
          <Select
            value={loanType}
            onValueChange={(v) => setValue("loanType", v, { shouldValidate: true })}
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white">
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              {LOAN_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          label="Required Loan Amount"
          error={errors.loanAmount?.message}
          hint="Optional"
        >
          <Input
            placeholder="e.g. ₹5,00,000"
            className="h-11 rounded-xl border-primary/15 bg-white"
            {...register("loanAmount")}
          />
        </Field>
        <Field label="Employment Type" error={errors.employment?.message} required>
          <Select
            value={employment}
            onValueChange={(v) =>
              setValue("employment", v, { shouldValidate: true })
            }
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-primary/15 bg-white">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="City" error={errors.city?.message} required>
        <Input
          placeholder="e.g. Surat"
          className="h-11 rounded-xl border-primary/15 bg-white"
          {...register("city")}
        />
      </Field>

      {!compact && (
        <Field label="Message" error={errors.message?.message} hint="Optional">
          <Textarea
            rows={3}
            placeholder="Tell us briefly about your requirement..."
            className="rounded-xl border-primary/15 bg-white"
            {...register("message")}
          />
        </Field>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{serverMessage}</span>
        </div>
      )}

      <div className="space-y-3">
        <BrandButton
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit Loan Enquiry
            </>
          )}
        </BrandButton>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-teal-brand" />
          Your details are kept private. Loan approval is not guaranteed and is
          subject to lender policies.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-navy">
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
