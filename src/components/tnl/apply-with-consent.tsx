"use client";

import { useCallback, useState } from "react";
import {
  CheckCircle2,
  FileCheck2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BrandButton } from "@/components/tnl/brand-button";
import { OtpVerification } from "@/components/tnl/otp-verification";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  /** Display name of the product (e.g. "Fixed Deposit"). */
  productName: string;
  /** Slug used for analytics / labelling (e.g. "fd" / "rd"). */
  productSlug: string;
  /** Optional className for the outer wrapper. */
  className?: string;
};

export function ApplyWithConsent({
  productName,
  productSlug,
  className,
}: Props) {
  const [consent, setConsent] = useState(true); // selected by default
  const [verifiedMobile, setVerifiedMobile] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const { toast } = useToast();

  const isVerified = Boolean(verifiedMobile);
  const canApply = consent && isVerified && !applying;

  const handleVerified = useCallback((mobile: string) => {
    setVerifiedMobile(mobile);
  }, []);

  const handleApply = useCallback(async () => {
    if (!canApply) return;
    setApplying(true);
    try {
      // Simulate a brief submission to make the CTA feel responsive.
      await new Promise((r) => setTimeout(r, 350));

      toast({
        title: "Application received",
        description: `Your ${productName} application request has been received. Our team will contact you shortly.`,
      });

      // Analytics hook: tag the click with the product slug.
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          dataLayer?: Record<string, unknown>[];
        };
        w.dataLayer?.push({
          event: "apply_now",
          product: productSlug,
          mobile: verifiedMobile,
        });
      }
    } finally {
      setApplying(false);
    }
  }, [canApply, productName, productSlug, toast, verifiedMobile]);

  const consentBlocked = !consent;

  return (
    <div
      className={cn("w-full", className)}
      data-product={productSlug}
      data-verified={isVerified ? "true" : "false"}
      data-consent={consent ? "true" : "false"}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-royal to-sky text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Apply for {productName}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verify your mobile number and confirm your consent to begin.
            </p>
          </div>
        </div>

        {/* OTP verification block */}
        <OtpVerification
          productName={productName}
          onVerified={handleVerified}
        />

        {/* Consent checkbox — selected by default */}
        <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-white/60 px-3.5 py-3">
          <Checkbox
            id={`consent-${productSlug}`}
            checked={consent}
            onCheckedChange={(v) => setConsent(Boolean(v))}
            className="mt-0.5 data-[state=checked]:bg-royal data-[state=checked]:border-royal"
          />
          <Label
            htmlFor={`consent-${productSlug}`}
            className="text-xs leading-relaxed font-normal text-muted-foreground cursor-pointer"
          >
            I agree to the{" "}
            <a
              href="/terms"
              className="font-medium text-royal hover:text-sky underline-offset-2 hover:underline"
            >
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-royal hover:text-sky underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </Label>
        </div>

        {/* Apply Now CTA */}
        <div className="space-y-2">
          <BrandButton
            type="button"
            variant="primary"
            size="lg"
            onClick={handleApply}
            disabled={!canApply}
            className={cn(
              "w-full",
              !canApply && "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-glow"
            )}
          >
            {applying ? (
              <>
                <ShieldCheck className="h-4 w-4 animate-pulse" />
                Submitting…
              </>
            ) : isVerified ? (
              <>
                <FileCheck2 className="h-4 w-4" />
                Apply Now for {productName}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Verify mobile to continue
              </>
            )}
          </BrandButton>

          {/* Helper / blocker hints */}
          <div className="flex flex-col gap-1 text-[11px]">
            {!isVerified && (
              <p className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Lock className="h-3 w-3" />
                Verify your mobile number to enable Apply Now.
              </p>
            )}
            {isVerified && consentBlocked && (
              <p className="inline-flex items-center gap-1.5 text-amber-600">
                <Lock className="h-3 w-3" />
                Please accept the Terms &amp; Conditions to continue.
              </p>
            )}
            {isVerified && consent && !applying && (
              <p className="inline-flex items-center gap-1.5 text-teal-brand">
                <CheckCircle2 className="h-3 w-3" />
                Mobile verified — you&apos;re ready to apply.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyWithConsent;
