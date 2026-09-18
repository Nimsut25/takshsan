# Task 2 — api-builder

Built 4 Instant Loan API routes for the TNL Fincorp website.

## Files created
- `src/app/api/instant-loan/apply/route.ts` — POST: create application, generate `TNL-IL-YYYYMMDD-XXXXXX` reference, short-circuit with `alreadyVerified: true` if mobile already unlocked.
- `src/app/api/instant-loan/payment/create/route.ts` — POST: create ₹49 order, persist `paymentOrderId`, returns `alreadyPaid: true` if already verified. Has clearly marked Razorpay/Cashfree integration seam (`createVerificationPayment()`).
- `src/app/api/instant-loan/payment/verify/route.ts` — POST: server-side verification seam (`verifyWithGateway()`), refuses to flip flags unless gateway verifies. For now simulates success. Idempotent for already-unlocked applications. Matches `orderId` against stored `paymentOrderId`.
- `src/app/api/instant-loan/status/route.ts` — GET: `?mobile=XXXXXXXXXX` → returns `{ ok, unlocked, applicationReference }` based on most recent verified app.

## Key design decisions
- Used the `VERIFICATION_FEE` constant (₹49) from `instant-loan-data.ts` rather than hard-coding.
- Reference / order-id / transaction-id generators use an unambiguous alphabet (no `0/O`, `1/I`) to avoid transcription errors when users call support.
- Retry loop on `applicationReference` and `paymentOrderId` to handle the rare Prisma `P2002` unique-constraint collision.
- All 4 routes catch errors and return friendly messages — internal DB errors never reach the user.
- `apply` route returns `id` along with `applicationReference` (frontend may need both).
- `payment/verify` is idempotent — re-verifying an already-unlocked application returns success without mutating data.
- Lint passes (0 errors). Pre-existing warning in `enquiry-form.tsx` is unrelated.
