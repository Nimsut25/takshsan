# TNL Fincorp — Deployment Guide

## Quick Deploy (Local Production Test)

```bash
# 1. Install dependencies
bun install

# 2. Ensure .env has correct Supabase + Razorpay credentials
#    (see .env.example for template)

# 3. Generate Prisma Client
npx prisma generate

# 4. Push schema to Supabase (creates/syncs tables)
npx prisma db push

# 5. Build the production bundle
unset DATABASE_URL DIRECT_URL
bun run build

# 6. Copy static assets to standalone
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

# 7. Start production server
unset DATABASE_URL DIRECT_URL
export DATABASE_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true"
export DIRECT_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
export RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
export RAZORPAY_KEY_SECRET="VKtplvQBjAXGKD6827pAKzQE"
export NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
NODE_ENV=production bun .next/standalone/server.js
```

## Dev Server

```bash
# Use the startup script (handles env var cleanup)
./start-dev.sh

# OR manually:
unset DATABASE_URL DIRECT_URL
bun run dev
```

> **Why unset?** The shell has a stale `DATABASE_URL` pointing to the old
> SQLite file. Next.js prioritizes shell env over `.env`, so it must be
> unset for the Supabase PostgreSQL URL to be used.

## Hostinger / Production Deployment

### Environment Variables (set in hosting panel)

```
DATABASE_URL=postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
RAZORPAY_KEY_ID=rzp_test_TdZb8psAOKXqs6
RAZORPAY_KEY_SECRET=VKtplvQBjAXGKD6827pAKzQE
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_TdZb8psAOKXqs6
NEXT_PUBLIC_SUPABASE_URL=https://qxpmwnoinjzqhkjhhokz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_uc7FEbSFfDNZN2fKcM7Agw_F2y9lJ-_
```

### Build Commands (Hostinger)

```
npm install
npx prisma generate
npx prisma db push
npm run build
```

### Start Command (Hostinger)

```
NODE_ENV=production node .next/standalone/server.js
```

### Important Notes

- **Port**: The standalone server listens on port 3000 by default.
  Set `PORT=YOUR_PORT` if your host requires a different port.
- **Database**: Supabase PostgreSQL (Session pooler with pgbouncer).
- **Payment**: Razorpay test mode (switch to live keys for production).
- **Standalone output**: `next.config.ts` has `output: "standalone"`.
- **Static files**: After `next build`, copy `.next/static` and `public/`
  into `.next/standalone/` (the build script does this automatically).

## Database Tables (Supabase PostgreSQL)

- `User` — scaffold model
- `Post` — scaffold model
- `Enquiry` — loan enquiry form submissions
- `OtpRequest` — OTP verification records
- `InstantLoanApplication` — instant loan marketplace applications + ₹49 payment
- `Bonds` — government bond applications + payment + certificate

## API Routes

- `POST /api/enquiry` — loan enquiry form
- `POST /api/otp/send` — send OTP
- `POST /api/otp/verify` — verify OTP
- `POST /api/instant-loan/apply` — create instant loan application
- `POST /api/instant-loan/payment/create` — create Razorpay ₹49 order
- `POST /api/instant-loan/payment/verify` — verify payment + unlock partners
- `GET /api/instant-loan/status` — check unlock status
- `POST /api/bonds/apply` — create bond application
- `POST /api/bonds/payment/create` — create Razorpay bond payment order
- `POST /api/bonds/payment/verify` — verify payment + generate certificate
- `GET /api/bonds/certificate` — get certificate data

## All Routes

```
/                                    — homepage
/personal-loan                       — 6 loan pages
/business-loan
/home-loan
/auto-loan
/education-loan
/loan-against-property
/investment                          — investment pages
/investment/fd
/investment/rd
/government-bonds                    — government bonds
/government-bonds/apply/[bondId]     — bond application (5 types)
/government-bonds/success            — bond certificate
/instant-loan                        — instant loan marketplace
/instant-loan/personal-loan          — 3 category pages
/instant-loan/business-loan
/instant-loan/credit-cards
/life-insurance                      — 3 insurance pages
/general-insurance
/motor-insurance
/sitemap.xml
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `P1000: Authentication failed` | Verify DB password in Supabase dashboard |
| `the URL must start with postgresql://` | Run `unset DATABASE_URL` before starting |
| `Can't reach database server` | Check Supabase project is not paused |
| `Module not found` | Run `npx prisma generate` after install |
| Payment fails | Verify Razorpay keys are correct in .env |
| `Functions cannot be passed` | Pass slug strings, not data objects with icons |
