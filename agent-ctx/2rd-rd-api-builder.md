# Task 2rd — RD API Routes Builder

## Summary
Created 4 Recurring Deposit (RD) API routes following the existing Fixed Deposit (FD) pattern. All routes use `db.rD` (Prisma model `RD`), zod validation with union transforms for numeric inputs, Razorpay for payment, and never leak raw DB errors.

## Files Created
1. `src/app/api/rd/apply/route.ts` — POST. Validates full application body, generates `RD-APP-2026-XXXXXX` application number, computes maturity via the standard RD formula `monthlyDeposit × (((1+i)^n - 1) / i) × (1+i)` (with `i=rate/12/100`, `n=tenureYears*12+tenureMonths`; divide-by-zero guarded), computes Indian-numbering amount-in-words from the monthly deposit, persists with `paymentStatus="pending"`, `status="submitted"`.
2. `src/app/api/rd/payment/create/route.ts` — POST `{ applicationNo }`. Looks up db.rD; idempotent `alreadyPaid` response with `rdAccountNo` + `certificateNo` if already paid. Otherwise creates real Razorpay order (amount server-side from `depositAmount`, in paise), persists `paymentOrderId`/`paymentAmount`, returns order details + `razorpayKeyId`.
3. `src/app/api/rd/payment/verify/route.ts` — POST `{ applicationNo, orderId, razorpayPaymentId, razorpaySignature }`. Verifies HMAC-SHA256 signature (timing-safe) with Razorpay API-fetch fallback. On success generates `rdAccountNo = "RD-2026-XXXXXX"` and `certificateNo = "RDC-2026-XXXXXXXX"` (both collision-checked), sets `certificateGenerated = true`, `paymentStatus = "paid"`, `status = "certificate_generated"`.
4. `src/app/api/rd/certificate/route.ts` — GET `?applicationNo=RD-APP-2026-XXXXXX`. Returns full certificate JSON only when `certificateGenerated === true`. Masks PAN (`ABCDE****4X`), Aadhaar (`XXXX-XXXX-1234`), bank account (`XXXX1234`). Returns RD-specific `rdAccountNo` and `rdReceiptNo`.

## Verification
- `bun run lint`: 0 errors (only a pre-existing, unrelated warning in `enquiry-form.tsx`).
- `dev.log`: clean; no compile/runtime errors from the new routes.

## Notes for downstream agents
- All routes follow the same response envelope as FD: `{ ok: boolean, message: string, ... }`.
- Error responses are generic and never expose Prisma internals.
- The RD routes are independent of the FD routes and do NOT modify any existing files.
- Reuses the existing Razorpay env vars (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`).
- Ready to wire into the RD application UI on `/investment/rd`.
