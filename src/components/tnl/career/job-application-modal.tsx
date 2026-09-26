"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
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

export type JobForApplication = {
  id: string;
  title: string;
  location?: string;
  experience?: string;
};

type Errors = Record<string, string[]>;

const EMPTY = {
  fullName: "",
  email: "",
  mobile: "",
  dateOfBirth: "",
  gender: "",
  currentCity: "",
  state: "",
  highestQualification: "",
  currentCompany: "",
  totalExperience: "",
  expectedSalary: "",
  noticePeriod: "",
  coverLetter: "",
  linkedinProfile: "",
  consent: false,
};

export function JobApplicationModal({
  job,
  open,
  onOpenChange,
}: {
  job: JobForApplication | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [form, setForm] = useState(EMPTY);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setCv(null);
      setCvError(null);
      setErrors({});
      setSuccess(false);
    }
  }, [open, job?.id]);

  const set = (k: keyof typeof EMPTY, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setCvError(null);
    if (!f) {
      setCv(null);
      return;
    }
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
      setCvError("Only PDF, DOC and DOCX files are allowed.");
      setCv(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setCvError("File is too large. Maximum size is 5 MB.");
      setCv(null);
      return;
    }
    if (f.size === 0) {
      setCvError("The selected file is empty.");
      setCv(null);
      return;
    }
    setCv(f);
  };

  const removeFile = () => {
    setCv(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!cv) {
      setCvError("Please upload your CV / resume.");
      return;
    }
    setSubmitting(true);
    setErrors({});

    try {
      const fd = new FormData();
      fd.append("jobId", job?.id ?? "");
      fd.append("jobTitle", job?.title ?? "");
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (cv) fd.append("cv", cv);

      const res = await fetch("/api/career/apply", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
        toast({ title: "Application submitted", description: data.message });
      } else {
        if (data.errors) setErrors(data.errors);
        if (data.errors?.cv) setCvError(data.errors.cv[0]);
        toast({
          title: "Please check the form",
          description: data.message ?? "Some fields need your attention.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at care@tnlfincorp.in.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (submitting ? null : onOpenChange(v))}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[94vh] w-full max-w-2xl overflow-hidden border-primary/15 p-0 sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">Apply For This Position</DialogTitle>
        <DialogDescription className="sr-only">
          Submit your application for the {job?.title} position at TNL Fincorp.
        </DialogDescription>

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky px-6 pb-6 pt-7 text-white">
          <button
            type="button"
            onClick={() => !submitting && onOpenChange(false)}
            aria-label="Close application form"
            className="absolute right-3 top-3 z-[60] grid size-10 place-items-center rounded-full bg-white/15 text-white transition-all duration-200 hover:rotate-90 hover:bg-white/30"
          >
            <X className="size-4" />
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Briefcase className="size-3.5" />
            Job Application
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight">
            Apply For This Position
          </h2>
          {job && (
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
              <span className="font-semibold">{job.title}</span>
              {job.location && <span>· {job.location}</span>}
              {job.experience && <span>· {job.experience}</span>}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="tnl-scrollbar max-h-[calc(94vh-9rem)] overflow-y-auto px-6 py-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-brand text-white shadow-glow msme-success-pop">
                <CheckCircle2 className="size-9" />
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold text-navy">
                Application Submitted Successfully
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Thank you for your interest in TNL Fincorp. Our recruitment team
                will review your application and contact you when appropriate.
              </p>
              <BrandButton onClick={() => onOpenChange(false)} size="md" className="mt-6">
                Close
              </BrandButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC PROFILE */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  Basic Profile Details
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required error={errors.fullName}>
                    <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="As per your ID" className="h-11" />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className="h-11" />
                  </Field>
                  <Field label="Mobile Number" required error={errors.mobile}>
                    <Input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} className="h-11" />
                  </Field>
                  <Field label="Date of Birth">
                    <Input type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Gender">
                    <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Current City">
                    <Input value={form.currentCity} onChange={(e) => set("currentCity", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="State">
                    <Input value={form.state} onChange={(e) => set("state", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Highest Qualification">
                    <Input value={form.highestQualification} onChange={(e) => set("highestQualification", e.target.value)} placeholder="e.g. B.Com, MBA" className="h-11" />
                  </Field>
                  <Field label="Current/Previous Company">
                    <Input value={form.currentCompany} onChange={(e) => set("currentCompany", e.target.value)} className="h-11" />
                  </Field>
                  <Field label="Total Experience">
                    <Input value={form.totalExperience} onChange={(e) => set("totalExperience", e.target.value)} placeholder="e.g. 3 years" className="h-11" />
                  </Field>
                  <Field label="Expected Salary">
                    <Input value={form.expectedSalary} onChange={(e) => set("expectedSalary", e.target.value)} placeholder="e.g. ₹5,00,000 p.a." className="h-11" />
                  </Field>
                  <Field label="Notice Period">
                    <Input value={form.noticePeriod} onChange={(e) => set("noticePeriod", e.target.value)} placeholder="e.g. 30 days / Immediate" className="h-11" />
                  </Field>
                </div>
              </fieldset>

              {/* CV UPLOAD */}
              <fieldset className="space-y-3">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  CV / Resume
                </legend>
                <Field label="Upload CV / Resume" required error={cvError ? [cvError] : undefined}>
                  {!cv ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/25 bg-primary/5 px-4 py-8 text-center transition-colors hover:border-primary/45 hover:bg-primary/10"
                    >
                      <Upload className="size-6 text-royal" />
                      <span className="text-sm font-semibold text-navy">Click to upload your CV</span>
                      <span className="text-xs text-muted-foreground">PDF, DOC or DOCX · Max 5 MB</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-white p-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky text-white">
                          <FileText className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-navy">{cv.name}</p>
                          <p className="text-xs text-muted-foreground">{formatBytes(cv.size)} · {cv.name.split(".").pop()?.toUpperCase()}</p>
                        </div>
                      </div>
                      <button type="button" onClick={removeFile} className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label="Remove file">
                        <X className="size-4" />
                      </button>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="hidden" />
                </Field>
              </fieldset>

              {/* ADDITIONAL */}
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  Additional Information
                </legend>
                <Field label="Cover Letter / Message">
                  <textarea value={form.coverLetter} onChange={(e) => set("coverLetter", e.target.value)} rows={3} placeholder="Tell us briefly why you're a good fit." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
                </Field>
                <Field label="LinkedIn Profile (optional)">
                  <Input value={form.linkedinProfile} onChange={(e) => set("linkedinProfile", e.target.value)} placeholder="https://linkedin.com/in/..." className="h-11" />
                </Field>
              </fieldset>

              {/* CONSENT */}
              <fieldset className="space-y-2">
                <label className="flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary/40 p-3.5 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-royal" />
                  <span className="text-xs leading-relaxed text-foreground/80">
                    I confirm that the information provided by me is accurate and I agree to the processing of my application for recruitment purposes.
                  </span>
                </label>
                {errors.consent && <p className="text-xs font-medium text-destructive">{errors.consent[0]}</p>}
              </fieldset>

              {/* SUBMIT */}
              <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
                <button type="button" onClick={() => !submitting && onOpenChange(false)} disabled={submitting} className="inline-flex h-11 items-center justify-center rounded-full border border-primary/20 bg-white px-6 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5 disabled:opacity-60">
                  Cancel
                </button>
                <BrandButton type="submit" size="md" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </BrandButton>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
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
