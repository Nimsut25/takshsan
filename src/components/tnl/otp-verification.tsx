"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { BrandButton } from "@/components/tnl/brand-button";
import { cn } from "@/lib/utils";

type Stage = "mobile" | "otp" | "verified";

type Props = {
  /** Display name of the product the user is applying for (e.g. "Fixed Deposit"). */
  productName: string;
  /** Fired exactly once when the OTP for the supplied mobile is verified. */
  onVerified?: (mobile: string) => void;
  /** Optional className for the outer card wrapper. */
  className?: string;
};

const MOBILE_RE = /^[6-9]\d{9}$/;

export function OtpVerification({ productName, onVerified, className }: Props) {
  const [stage, setStage] = useState<Stage>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up the resend countdown timer on unmount.
  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    };
  }, []);

  const startCooldown = useCallback((seconds: number) => {
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    setCooldown(seconds);
    cooldownTimer.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimer.current) clearInterval(cooldownTimer.current);
          cooldownTimer.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const sendOtp = useCallback(
    async (currentMobile: string, isResend = false) => {
      setError("");
      setInfo("");
      setSending(true);
      try {
        const res = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: currentMobile }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.ok) {
          if (!isResend) setStage("otp");
          setOtp("");
          // 30s resend cooldown on the client (matches server-side rule).
          startCooldown(30);
          setInfo(
            isResend
              ? "A new OTP has been sent to your mobile number."
              : `OTP sent to +91 ${currentMobile}.`
          );
        } else if (res.status === 429) {
          // Cooldown still active — restart the visual countdown based on message.
          setError(
            data?.message ??
              "An OTP was sent recently. Please wait before resending."
          );
          startCooldown(30);
        } else {
          setError(data?.message ?? "Failed to send OTP. Please try again.");
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setSending(false);
      }
    },
    [startCooldown]
  );

  const handleSendOtp = useCallback(() => {
    const value = mobile.trim();
    if (!MOBILE_RE.test(value)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    void sendOtp(value, false);
  }, [mobile, sendOtp]);

  const handleResend = useCallback(() => {
    if (cooldown > 0) return;
    void sendOtp(mobile.trim(), true);
  }, [cooldown, mobile, sendOtp]);

  const handleChangeNumber = useCallback(() => {
    if (cooldownTimer.current) {
      clearInterval(cooldownTimer.current);
      cooldownTimer.current = null;
    }
    setStage("mobile");
    setOtp("");
    setError("");
    setInfo("");
    setCooldown(0);
  }, []);

  const handleVerify = useCallback(async () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setError("");
    setInfo("");
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobile.trim(), otp }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok && data?.verified) {
        setStage("verified");
        setError("");
        setInfo("");
        if (cooldownTimer.current) {
          clearInterval(cooldownTimer.current);
          cooldownTimer.current = null;
        }
        setCooldown(0);
        onVerified?.(mobile.trim());
      } else if (res.status === 429) {
        setError(
          data?.message ??
            "Too many incorrect attempts. Please request a new OTP."
        );
      } else {
        setError(data?.message ?? "Invalid or expired OTP");
        setOtp("");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setVerifying(false);
    }
  }, [otp, mobile, onVerified]);

  return (
    <div
      className={cn(
        "glass rounded-2xl shadow-soft p-5 sm:p-6 w-full",
        className
      )}
      role="group"
      aria-label={`${productName} mobile verification`}
    >
      {/* Stage 1: mobile entry */}
      {stage === "mobile" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-royal to-sky text-white shadow-glow">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Verify your mobile number
              </p>
              <p className="text-xs text-muted-foreground">
                Required before applying for {productName}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp-mobile" className="text-xs font-medium text-muted-foreground">
              Mobile number
            </Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground select-none">
                  +91
                </span>
                <Input
                  id="otp-mobile"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobile(v);
                    if (error) setError("");
                  }}
                  className="pl-12 h-11 text-base tracking-wide"
                  aria-invalid={!!error}
                />
              </div>
              <BrandButton
                type="button"
                variant="primary"
                size="md"
                onClick={handleSendOtp}
                disabled={sending || mobile.length !== 10}
                className="w-full sm:w-auto"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>Send OTP</>
                )}
              </BrandButton>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="text-xs font-medium text-destructive"
            >
              {error}
            </p>
          )}

          <div className="flex items-start gap-2 text-[11px] text-muted-foreground pt-1">
            <ShieldCheck className="h-3.5 w-3.5 mt-0.5 shrink-0 text-teal-brand" />
            <span>
              We use a one-time password to confirm your number. Your details
              are never shared with third parties.
            </span>
          </div>
        </div>
      )}

      {/* Stage 2: OTP entry */}
      {stage === "otp" && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-soft">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Enter the OTP
                </p>
                <p className="text-xs text-muted-foreground">
                  Sent to{" "}
                  <span className="font-medium text-foreground">
                    +91 {mobile}
                  </span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleChangeNumber}
              className="inline-flex items-center gap-1 text-xs font-medium text-royal hover:text-sky transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp-code" className="text-xs font-medium text-muted-foreground">
              6-digit OTP
            </Label>
            <div className="flex justify-center sm:justify-start">
              <InputOTP
                id="otp-code"
                maxLength={6}
                value={otp}
                onChange={(v) => {
                  setOtp(v);
                  if (error) setError("");
                }}
                containerClassName="gap-1.5 sm:gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                  <InputOTPSlot index={1} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                  <InputOTPSlot index={2} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                </InputOTPGroup>
                <InputOTPSeparator className="text-muted-foreground" />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                  <InputOTPSlot index={4} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                  <InputOTPSlot index={5} className="h-11 w-11 sm:h-12 sm:w-12 text-base font-semibold" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {error}
            </p>
          )}
          {info && !error && (
            <p className="text-xs font-medium text-teal-brand">{info}</p>
          )}

          <div className="flex flex-col gap-2.5">
            <BrandButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleVerify}
              disabled={verifying || otp.length !== 6}
              className="w-full"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Verify OTP
                </>
              )}
            </BrandButton>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || sending}
                className={cn(
                  "inline-flex items-center gap-1.5 font-medium transition-colors",
                  cooldown > 0 || sending
                    ? "text-muted-foreground cursor-not-allowed"
                    : "text-royal hover:text-sky"
                )}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {cooldown > 0
                  ? `Resend OTP in ${cooldown}s`
                  : sending
                  ? "Sending…"
                  : "Resend OTP"}
              </button>
              <span className="text-[11px] text-muted-foreground">
                OTP valid for 5 minutes
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: verified */}
      {stage === "verified" && (
        <div className="flex flex-col items-center text-center py-3">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-teal-brand/30 blur-xl animate-pulse" />
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-brand to-emerald-500 text-white shadow-glow">
              <CheckCircle2 className="h-7 w-7" />
            </span>
          </span>
          <p className="mt-4 text-base font-semibold text-foreground">
            Mobile number verified
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            +91 {mobile} has been successfully verified. You can now proceed
            with your {productName} application.
          </p>
        </div>
      )}
    </div>
  );
}

export default OtpVerification;
