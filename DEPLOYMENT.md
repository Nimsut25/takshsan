# TNL Fincorp — Deployment Guide

## Quick Deploy (Local Production Test)

```bash
# 1. Install dependencies
bun install

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema to Supabase (creates tables)
npx prisma db push

# 4. Build the production bundle
unset DATABASE_URL DIRECT_URL
bun run build

# 5. Start production server
unset DATABASE_URL DIRECT_URL
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
- **Database**: The app uses Prisma → Supabase PostgreSQL (Session pooler).
- **No @supabase/supabase-js**: The app uses Prisma only.
- **Standalone output**: `next.config.ts` has `output: "standalone"` which
  creates a self-contained server in `.next/standalone/`.
- **Static files**: After `next build`, copy `.next/static` and `public/`
  into `.next/standalone/` (the build script does this automatically).

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `P1000: Authentication failed` | Verify DB password in Supabase dashboard |
| `the URL must start with postgresql://` | Run `unset DATABASE_URL` before starting |
| `Can't reach database server` | Check Supabase project is not paused |
| `Module not found` | Run `npx prisma generate` after install |
