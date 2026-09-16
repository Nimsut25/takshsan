/**
 * In-memory OTP store for development.
 *
 * NOTE: This is a development-only in-memory store. In production it MUST be
 * replaced with:
 *   1. A real SMS / OTP provider (e.g. Twilio, MSG91, TextLocal, AWS SNS) to
 *      actually deliver the OTP to the user's mobile number.
 *   2. A persistent store (Redis or a database table — see OtpRequest model
 *      in prisma/schema.prisma) so OTPs survive serverless function restarts
 *      and work across multiple instances.
 *
 * The OTP value itself is NEVER sent back to the client. Only the server knows
 * it; the client only sends the mobile number (to request) and the OTP the user
 * typed in (to verify).
 *
 * The store keeps three things per mobile number:
 *   - the current OTP + its expiry time (5 minutes)
 *   - the next-allowed resend time (30 second cooldown)
 *   - the failed-verify attempt counter (rate limited: max 5 / 5 min)
 */

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
const MAX_VERIFY_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

type OtpRecord = {
  otp: string;
  expiresAt: number;
  attempts: number[];
};

/** Map of mobile -> active OTP record. */
const otpStore = new Map<string, OtpRecord>();

/** Map of mobile -> next-allowed-resend timestamp. */
const cooldownStore = new Map<string, number>();

/** Strip any whitespace / dashes / country code so "91 98765 43210" -> "9876543210". */
function normalize(mobile: string): string {
  return mobile.replace(/\D/g, "").replace(/^91/, "");
}

/** Generate a cryptographically-random 6-digit OTP. */
function generateOtp(): string {
  // Avoid Math.random() for security-sensitive tokens.
  const buf = new Uint32Array(1);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(buf);
    const n = buf[0] % 1_000_000;
    return n.toString().padStart(6, "0");
  }
  // Fallback (should never hit in Node 18+).
  return Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0");
}

/** Remove a record if it has expired (housekeeping). */
function prune(mobile: string) {
  const rec = otpStore.get(mobile);
  if (rec && rec.expiresAt < Date.now()) {
    otpStore.delete(mobile);
  }
}

/**
 * Create (or refresh) an OTP for the given mobile number.
 * Returns the OTP string so the caller (server only!) can:
 *   - log it in dev for testing, and
 *   - forward it to the SMS provider in production.
 * The OTP is NEVER returned to the frontend.
 */
export function createOtp(mobile: string): string {
  const key = normalize(mobile);
  const otp = generateOtp();
  otpStore.set(key, {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: [],
  });
  cooldownStore.set(key, Date.now() + RESEND_COOLDOWN_MS);
  return otp;
}

/**
 * Verify the user-entered OTP against the stored one.
 * Returns true on success. On success the OTP is deleted (single-use).
 * On failure, the attempt is recorded for rate-limiting.
 */
export function verifyOtp(mobile: string, otp: string): boolean {
  const key = normalize(mobile);
  prune(key);

  const rec = otpStore.get(key);
  if (!rec) return false;

  // Enforce max attempts within the rolling window.
  const now = Date.now();
  rec.attempts = rec.attempts.filter((t) => now - t < ATTEMPT_WINDOW_MS);
  if (rec.attempts.length >= MAX_VERIFY_ATTEMPTS) {
    return false;
  }

  if (rec.otp === otp.trim() && rec.expiresAt > now) {
    otpStore.delete(key);
    cooldownStore.delete(key);
    return true;
  }

  // Record the failed attempt.
  rec.attempts.push(now);
  otpStore.set(key, rec);
  return false;
}

/** Whether an OTP is currently active (not expired) for the given mobile. */
export function hasActiveOtp(mobile: string): boolean {
  const key = normalize(mobile);
  prune(key);
  return otpStore.has(key);
}

/**
 * Whether the verify rate-limit is currently hit for the given mobile
 * (i.e. >= MAX_VERIFY_ATTEMPTS failed attempts in the last 5 minutes).
 */
export function isRateLimited(mobile: string): boolean {
  const key = normalize(mobile);
  const rec = otpStore.get(key);
  if (!rec) return false;
  const now = Date.now();
  const recent = rec.attempts.filter((t) => now - t < ATTEMPT_WINDOW_MS);
  return recent.length >= MAX_VERIFY_ATTEMPTS;
}

/** Whether the user is allowed to request a new OTP right now (cooldown check). */
export function canResend(mobile: string): boolean {
  const key = normalize(mobile);
  const next = cooldownStore.get(key);
  if (!next) return true;
  return Date.now() >= next;
}

/** Seconds remaining until the next resend is allowed (0 if allowed now). */
export function resendCooldownSeconds(mobile: string): number {
  const key = normalize(mobile);
  const next = cooldownStore.get(key);
  if (!next) return 0;
  const remaining = Math.ceil((next - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
}

/** Test helper — clears all state. Exported for completeness, not used by UI. */
export function _resetOtpStore() {
  otpStore.clear();
  cooldownStore.clear();
}
