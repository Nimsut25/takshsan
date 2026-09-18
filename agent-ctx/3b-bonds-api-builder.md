# Task 3b — bonds-api-builder

## Task
Create four Next.js API route files for the TNL Fincorp Bonds application flow:
1. `src/app/api/bonds/apply/route.ts` (POST) — create a Bonds application record
2. `src/app/api/bonds/payment/create/route.ts` (POST) — create a Razorpay order
3. `src/app/api/bonds/payment/verify/route.ts` (POST) — verify Razorpay payment & issue certificate
4. `src/app/api/bonds/certificate/route.ts` (GET) — return certificate data for display

## Files Created (4)

1. **`src/app/api/bonds/apply/route.ts`** (POST)
   - Zod schema validates: fullName (required), mobileNumber (`/^[6-9]\d{9}$/`), email, panNumber (`/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/`), aadhaarNumber (`/^\d{12}$/`), pinCode (`/^\d{6}$/`), ifscCode (`/^[A-Z]{4}0[A-Z0-9]{6}$/`, optional), investmentAmount (>0), quantity (positive int), declarationAccepted (literal `true` — uses Zod v4 `message` option, NOT the legacy `errorMap`).
   - Also accepts bondId, fatherHusbandName, dateOfBirth, residentialAddress, city, state, bank details, nominee details, place, signatureDate, applicant/joint signatures, and 5 document URLs (panDocumentUrl, addressDocumentUrl, bankDocumentUrl, photographUrl, otherDocumentUrl + otherDocumentDescription).
   - **Server-authoritative bond data**: looks up `bond.id` in `BOND_TYPES` from `@/lib/bonds-data`. Returns 400 if bond not found. Persists `bondType`, `bondName`, `tenure`, `couponRate`, `faceValue` from the server data — never from the client.
   - Generates a unique `applicationNumber` in format `BND-2026-XXXXXXXX` (8 chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` — no I/O/0/1 for legibility). Retries up to 8 times on collision, with a 10-char fallback.
   - Sets `status = "submitted"`, `paymentStatus = "pending"`, `paymentCurrency = "INR"`, `declarationAcceptedAt = now`, `applicationDate = now`, `dateReceived = now`.
   - Returns `{ ok: true, applicationNumber, id }` with status 201.

2. **`src/app/api/bonds/payment/create/route.ts`** (POST)
   - Body: `{ applicationNumber }`. Validates with zod.
   - Looks up Bonds record by applicationNumber. Returns 404 if not found.
   - Idempotent: if `paymentStatus === "paid" && certificateIssued === true`, returns `{ ok: true, alreadyPaid: true, certificateNumber }`.
   - **Server-side amount computation**: `paymentAmount = investmentAmount * quantity` (Decimal → Number, `.toFixed(2)`). Returns 400 if amount ≤ 0.
   - Creates a real Razorpay order via `new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })` → `rzp.orders.create({ amount: paymentAmount * 100, currency: "INR", receipt: applicationNumber, notes: {...} })`. Catches Razorpay errors separately (returns 502) so gateway failures are not surfaced as 500s.
   - Persists `paymentOrderId = order.id`, `paymentAmount`, `paymentStatus = "processing"`.
   - Returns `{ ok: true, orderId, amount, currency: "INR", razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, applicationNumber, message }`.

3. **`src/app/api/bonds/payment/verify/route.ts`** (POST)
   - Body: `{ applicationNumber, orderId, razorpayPaymentId, razorpaySignature }` (also accepts `paymentId`/`signature` as aliases for parity with the instant-loan pattern).
   - Looks up Bonds record; 404 if not found. Idempotent if already paid + certificate issued.
   - Validates that `application.paymentOrderId === orderId`. 400 if mismatch.
   - **Primary verification**: `verifyRazorpaySignature()` — HMAC-SHA256 of `"order_id|payment_id"` using `RAZORPAY_KEY_SECRET`, hex digest, constant-time string compare (matches existing instant-loan verify pattern).
   - **Fallback**: if signature fails, calls `rzp.payments.fetch(paymentId)` and verifies `status === "captured"` AND `order_id === orderId`. This handles key rotation / signature edge cases.
   - On success: generates a unique `certificateNumber` (`BOND-CERT-2026-XXXXXXXX`, same charset as app number, 8 retries on collision). Sets `paymentStatus = "paid"`, `paymentVerifiedAt = now`, `paymentTransactionId = paymentId`, `status = "paid"`, `certificateNumber`, `certificateIssued = true`, `certificateIssueDate = now`, `certificateGeneratedAt = now`. Then a second write flips `status = "certificate_generated"` (matches the spec's status sequence).
   - Returns `{ ok: true, verified: true, applicationNumber, certificateNumber, transactionId, message }`.

4. **`src/app/api/bonds/certificate/route.ts`** (GET)
   - Query: `?applicationNumber=BND-2026-XXXXXXXX`. Reads via `req.nextUrl.searchParams`.
   - Looks up Bonds record; 404 if not found OR if `certificateIssued !== true`. The 404-not-issued payload also returns `paymentStatus` and `status` so the frontend can route the user to payment.
   - **Masking** (per spec):
     - PAN: returned as-is (`ABCDE1234X` format — spec example).
     - Aadhaar: `123412341234` → `XXXX-XXXX-1234` (last 4 digits).
     - Bank account: any string → `XXXX` + last 4 digits of the digit-only form.
   - Re-fetches `BOND_TYPES` to include a `bondDetails` object (`id`, `title`, `issuer`, `tenure`, `couponRate`, `faceValue`) — server-authoritative.
   - Serialises Prisma `Decimal` fields (`faceValue`, `investmentAmount`, `paymentAmount`) to strings to avoid client-side precision issues.
   - Returns the full certificate payload under `{ ok: true, certificate: {...} }`.

## Common Patterns Across All 4 Files
- `import { NextRequest, NextResponse } from "next/server"` (per spec).
- `import { db } from "@/lib/db"` — uses the Prisma singleton.
- `import { z } from "zod"` for validation — returns 400 with `errors` (fieldErrors) on validation failure.
- Top-level `try/catch` with friendly messages; raw DB / Razorpay errors are logged to `console.error` and never leaked to the client.
- `crypto` (Node built-in) for HMAC-SHA256 signature verification.
- `Razorpay` from `"razorpay"` — lazily instantiated server-side; returns 503 if env vars are missing.
- No test files. No modifications to existing files.

## Verification
- `bunx tsc --noEmit`: 0 errors in any of the 4 new files. (Only pre-existing errors in unrelated `examples/` and `skills/` reference folders, plus pre-existing errors in `instant-loan/apply/route.ts` and `instant-loan-page.tsx` that are not part of this task.)
- `bun run lint`: 0 errors, 0 warnings in any of the 4 new files. (Only 1 pre-existing benign warning in `enquiry-form.tsx`.)
- Dev server log: clean — no compile errors.

## Notes for Downstream Agents (Frontend Builder)
- All four routes are mounted under `/api/bonds/...`.
- Apply request body field names match the `Bonds` Prisma model exactly (camelCase). The frontend should send `bondId` (the `id` field from `BOND_TYPES`), NOT `bondType`/`bondName` etc. — those are filled server-side.
- Payment flow: (1) POST `/api/bonds/apply` → get `applicationNumber`. (2) POST `/api/bonds/payment/create` with `{ applicationNumber }` → get `orderId`, `amount`, `razorpayKeyId`. (3) Open Razorpay checkout with that key + order id. (4) On checkout success, POST `/api/bonds/payment/verify` with `{ applicationNumber, orderId, razorpayPaymentId, razorpaySignature }` → get `certificateNumber`. (5) GET `/api/bonds/certificate?applicationNumber=...` to render the certificate.
- The `payment/create` response includes `razorpayKeyId` (the public key) so the frontend does not need to read `NEXT_PUBLIC_RAZORPAY_KEY_ID` directly — but it can also use the env var.
- Certificate payload masks PAN/Aadhaar/account — the frontend must NOT store or attempt to unmask these.
- The certificate GET returns 404 if `certificateIssued !== true`; the 404 body for that case includes `paymentStatus` and `status` so the UI can route the user back to payment.
- Decimal fields in the certificate payload are serialised as strings (Prisma `Decimal` is not JSON-safe).
