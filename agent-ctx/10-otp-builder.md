# Task 10 — otp-builder

Built an OTP-based mobile verification flow for the FD/RD investment application
pages. The OTP is generated server-side, persisted (in-memory + DB audit row),
and NEVER exposed to the frontend.

## Files created
- `src/lib/otp-store.ts` — in-memory OTP store (createOtp / verifyOtp /
  hasActiveOtp / canResend / isRateLimited / resendCooldownSeconds). 5-min TTL,
  30-sec resend cooldown, 5 attempts / 5-min verify rate limit. Uses
  `crypto.getRandomValues` for the 6-digit OTP.
- `src/app/api/otp/send/route.ts` — POST, validates `/^[6-9]\d{9}$/`, enforces
  30-sec cooldown (HTTP 429), generates OTP, persists a hash to the OtpRequest
  DB row (best-effort), logs OTP to server console ONLY in dev. Never returns
  the OTP to the client.
- `src/app/api/otp/verify/route.ts` — POST, validates mobile + 6-digit OTP,
  verifies via otp-store, marks the most recent OtpRequest row `verified=true`
  on success, responds 429 when per-mobile rate limit (5 / 5 min) is hit.
- `src/components/tnl/otp-verification.tsx` — `"use client"` self-contained
  3-stage component (mobile entry → OTP entry → verified). Uses shadcn Input,
  InputOTP, Label + BrandButton. 30-sec resend countdown, change-number link,
  glass card + soft shadows matching the premium fintech theme. No OTP secrets
  in the DOM or console.
- `src/components/tnl/apply-with-consent.tsx` — `"use client"` wrapper that
  composes the consent checkbox (selected by default) + OtpVerification + an
  Apply Now BrandButton that is enabled only when consent=true AND
  mobile verified. Fires a toast on success and pushes an analytics event.

## Files modified
- `prisma/schema.prisma` — appended the `OtpRequest` model. Ran
  `bun run db:push` successfully (Prisma Client regenerated).

## Verification (live API tests against running dev server)
- Send OTP: `{"ok":true,"message":"OTP sent successfully"}` HTTP 200; OTP
  printed to server log only (`[OTP][dev] mobile=+91… otp=…`).
- Verify with correct OTP (extracted from server log):
  `{"ok":true,"verified":true}`.
- Verify with wrong OTP: `{"ok":false,"message":"Invalid or expired OTP"}`.
- Immediate resend: HTTP 429 with cooldown message.
- Invalid mobile (`12345`): HTTP 400 with validation message.
- Malformed OTP (`abc`): HTTP 400.
- Verify with no OTP ever issued: HTTP 400 "expired or was never requested".

## Lint
`bun run lint` — 0 errors in any of the OTP files (the single remaining
pre-existing error in `piggy-bank-animation.tsx` is from a parallel agent's
work and outside this task's scope; the react-hook-form warning in
enquiry-form.tsx is the documented benign warning).
