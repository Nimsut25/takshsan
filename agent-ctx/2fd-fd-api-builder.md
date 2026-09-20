# Task 2fd — fd-api-builder

Built 4 Fixed Deposit (FD) API routes for the TNL Fincorp website, matching the existing `bonds/*` pattern.

## Files created
- `src/app/api/fd/apply/route.ts` — POST: validates all form fields with zod (PAN, 10-digit mobile, email, 6-digit PIN, IFSC regex, 12-digit Aadhaar). Generates unique `applicationNo` in format `FD-APP-2026-XXXXXX` (6-char unambiguous alphabet, retry loop). Computes `maturityDate` from `depositDate + tenureMonths + tenureYears`. Computes `amountInWords` using Indian numbering (Thousand, Lakh, Crore). Computes `maturityAmount` — quarterly compound interest (n=4) for cumulative FDs, simple interest for non-cumulative. Sets `paymentStatus = "pending"`, `status = "submitted"`. Returns `{ ok, applicationNo, id }` (201).
- `src/app/api/fd/payment/create/route.ts` — POST: body `{ applicationNo }`. Looks up the FD record. If already paid + certificate generated, returns `{ alreadyPaid: true, fdAccountNo, certificateNo }`. Creates a REAL Razorpay order with `amount = depositAmount * 100` paise. Stores `paymentOrderId`, sets `paymentStatus = "processing"`, `paymentProviderReference = orderId`. Returns `{ ok, orderId, amount, razorpayKeyId: NEXT_PUBLIC_RAZORPAY_KEY_ID }`.
- `src/app/api/fd/payment/verify/route.ts` — POST: body `{ applicationNo, orderId, razorpayPaymentId, razorpaySignature }`. Verifies HMAC-SHA256 of `order_id|payment_id` using `RAZORPAY_KEY_SECRET` (with timing-safe compare). Fallback: fetches payment from Razorpay server API and confirms `captured` + matching `order_id`. On success: sets `paymentStatus = "paid"`, `paymentDate = now`, `paymentTransactionId`. Generates unique `fdAccountNo` (`FD-2026-XXXXXX`) and `certificateNo` (`FDC-2026-XXXXXXXX`). Sets `certificateGenerated = true`, `certificateIssueDate = now`, `status = "certificate_generated"`. Returns `{ ok, verified, fdAccountNo, certificateNo }`. Idempotent for already-verified applications.
- `src/app/api/fd/certificate/route.ts` — GET: `?applicationNo=FD-APP-2026-XXXXXX`. Only returns the record when `certificateGenerated === true` (otherwise 404 with current payment status). Masks PAN as `ABCDE****4X`, Aadhaar as `XXXX-XXXX-1234`, bank account as `XXXX1234`, joint-applicant PAN as `ABCDE****4X`. Serialises all Decimal fields to plain strings for JSON. Returns all fields needed for certificate display.

## Key design decisions
- **Server-computed derived fields** — maturityDate, maturityAmount, amountInWords are all computed server-side; client values for these are never trusted (the apply route doesn't even accept them as input).
- **Indian-numbering amountInWords** — bespoke `indianNumberToWords()` that splits on Crore / Lakh / Thousand boundaries and handles Paise. Returns e.g. "Rupees Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven Only".
- **Compound vs simple interest** — detected by checking if `interestPaymentOption` or `depositType` contains "cumulative". Compound uses n=4 (quarterly, the Indian FD standard). Both rounded to 2 dp.
- **Timing-safe signature compare** — used `crypto.timingSafeEqual` on the HMAC-SHA256 hex digest, with a Buffer-length guard and a final plain-string fallback to avoid throwing on malformed client input.
- **Unambiguous token alphabet** — `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no I/O/0/1) for applicationNo, fdAccountNo, certificateNo, so users can read them aloud to support staff without ambiguity.
- **Retry loop on unique-constraint collisions** — both the apply-side applicationNo and verify-side fdAccountNo/certificateNo generators retry 8 times before falling back to a longer token.
- **Idempotency** — `payment/create` returns `alreadyPaid: true` and `payment/verify` returns `alreadyVerified: true` when the application is already in `paid` + `certificate_generated` state, so the frontend can safely re-submit.
- **No raw DB errors leak** — every route wraps the Prisma call in try/catch and returns a friendly user-facing message; the actual error is logged server-side via `console.error`.
- **Lint passes** — 0 errors. (The single warning in `enquiry-form.tsx` is pre-existing and unrelated to this task.)

## Patterns reused
- Same route handler shape, zod error response shape, and Razorpay-instance helper as the existing `bonds/*` routes — so the frontend's existing fetch wrappers (with `XTransformPort` not needed since same port 3000) can be trivially forked for FDs.
- The masking helpers for Aadhaar and bank account are identical to the bonds certificate route; the FD route adds a NEW PAN mask `ABCDE****4X` per the task spec.
