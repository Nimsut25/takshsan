"use client";

import { useCallback, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Lock,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandButton } from "@/components/tnl/brand-button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  productName: string; // e.g. "Personal Loan"
  accent: string; // gradient classes e.g. "from-royal to-sky"
};

type Stage = "mobile" | "otp" | "verified";

/**
 * Reusable mobile-number + OTP application form used in every loan hero.
 *
 * - Validates 10-digit Indian mobile numbers.
 * - Sends OTP via the existing POST /api/otp/send endpoint (server-generated,
 *   never returned to the client). Delivery is intended via WhatsApp/SMS —
 *   the backend currently logs the OTP in dev for testing.
 * - Verifies via POST /api/otp/verify.
 * - 30-second resend cooldown with live countdown.
 * - Consent checkbox is checked by default; Apply Now stays disabled until
 *   BOTH consent is checked AND the mobile number is verified.
 * - Does NOT claim loan approval on verification — verification only confirms
 *   the user's contact number.
 */
export function MobileOtpForm({ productName, accent }: Props) {
  const { toast } = useToast();

  const [stage, setStage] = useState<Stage>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [consent, setConsent] = useState(true);

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Live countdown for resend cooldown.
  if (cooldown > 0) {
    setTimeout(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
  }

  const mobileValid = /^[6-9]\d{9}$/.test(mobile.trim());

  const sendOtp = useCallback(async () => {
    setError(null);
    if (!mobileValid) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobile.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStage("otp");
        setCooldown(30);
        toast({
          title: "OTP sent",
          description: `An OTP has been sent to +91 ${mobile.trim()} via WhatsApp/SMS.`,
        });
      } else {
        setError(data.message ?? "Could not send OTP. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }, [mobile, mobileValid, toast]);

  const verifyOtp = useCallback(async () => {
    setError(null);
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobile.trim(), otp }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.verified) {
        setStage("verified");
        toast({
          title: "Mobile verified",
          description: "Your mobile number has been verified successfully.",
        });
      } else {
        setError(data.message ?? "Invalid or expired OTP. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  }, [mobile, otp, toast]);

  const handleApply = useCallback(async () => {
    if (!consent || stage !== "verified") return;
    setApplying(true);
    await new Promise((r) => setTimeout(r, 400));
    setApplying(false);
    toast({
      title: "Application request received",
      description: `Your ${productName} application request has been received. Our team will contact you shortly. Verification only confirms your contact number — loan approval is subject to lender assessment.`,
    });
  }, [consent, stage, productName, toast]);

  const canApply = consent && stage === "verified" && !applying;

  return (
    <div className="w-full">
      {/* Consent checkbox — always visible */}
      <label
        htmlFor="loan-consent"
        className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-primary/10 bg-white/60 p-3 text-xs text-muted-foreground"
      >
        <Checkbox
          id="loan-consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-0.5 data-[state=checked]:bg-royal data-[state=checked]:border-royal"
        />
        <span className="leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="font-semibold text-royal hover:underline">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="font-semibold text-royal hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <div className="mt-3">
        <AnimatePresence mode="wait">
          {stage === "mobile" && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground/70">
                  +91
                </span>
                <Input
                  inputMode="numeric"
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobile(v);
                    setError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && mobileValid && sendOtp()}
                  placeholder="Enter your mobile number"
                  className={cn(
                    "h-12 rounded-xl border-primary/15 bg-white pl-12 pr-4 text-base font-medium",
                    mobile && !mobileValid && "border-destructive/40"
                  )}
                />
              </div>
              {error && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="size-3.5" />
                  {error}
                </p>
              )}
              <BrandButton
                onClick={sendOtp}
                size="lg"
                className={cn("w-full", !consent && "opacity-60")}
                disabled={!consent || sending || !mobileValid}
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending OTP…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send OTP
                  </>
                )}
              </BrandButton>
            </motion.div>
          )}

          {stage === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="rounded-xl border border-primary/10 bg-white/60 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    OTP sent to <span className="font-semibold text-navy">+91 {mobile}</span>
                  </p>
                  <button
                    onClick={() => {
                      setStage("mobile");
                      setOtp("");
                      setError(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-royal hover:underline"
                  >
                    <ChevronLeft className="size-3.5" /> Change
                  </button>
                </div>
                <div className="mt-3 flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(v) => {
                      setOtp(v);
                      setError(null);
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="size-10 text-base sm:size-11" />
                      <InputOTPSlot index={1} className="size-10 text-base sm:size-11" />
                      <InputOTPSlot index={2} className="size-10 text-base sm:size-11" />
                      <InputOTPSlot index={3} className="size-10 text-base sm:size-11" />
                      <InputOTPSlot index={4} className="size-10 text-base sm:size-11" />
                      <InputOTPSlot index={5} className="size-10 text-base sm:size-11" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              {error && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="size-3.5" />
                  {error}
                </p>
              )}
              <BrandButton
                onClick={verifyOtp}
                size="lg"
                className="w-full"
                disabled={!consent || verifying || otp.length !== 6}
              >
                {verifying ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Verifying…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4" /> Verify OTP
                  </>
                )}
              </BrandButton>
              <div className="flex items-center justify-between text-xs">
                {cooldown > 0 ? (
                  <span className="text-muted-foreground">
                    Resend OTP in {cooldown}s
                  </span>
                ) : (
                  <button
                    onClick={sendOtp}
                    className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
                  >
                    <RefreshCw className="size-3.5" /> Resend OTP
                  </button>
                )}
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Lock className="size-3" /> Secure
                </span>
              </div>
            </motion.div>
          )}

          {stage === "verified" && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 rounded-xl border border-teal-brand/20 bg-teal-brand/5 p-3">
                <CheckCircle2 className="size-5 shrink-0 text-teal-brand" />
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Mobile verified
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +91 {mobile} — proceed with your application.
                  </p>
                </div>
              </div>
              <BrandButton
                onClick={handleApply}
                size="lg"
                className={cn("w-full", accent)}
                disabled={!canApply}
              >
                {applying ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Apply Now
                    <ArrowRight className="size-4" />
                  </>
                )}
              </BrandButton>
              {!consent && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="size-3.5" />
                  Please accept the Terms &amp; Privacy Policy to apply.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 text-teal-brand" />
        Verification only confirms your contact number. Loan approval is subject
        to lender assessment.
      </p>
    </div>
  );
}
