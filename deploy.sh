#!/bin/bash
# ─────────────────────────────────────────────────────────────
# TNL Fincorp — One-Command Production Deploy Script
# ─────────────────────────────────────────────────────────────
# Usage: ./deploy.sh
# This script:
#   1. Unsets stale shell env vars
#   2. Generates Prisma client
#   3. Pushes schema to Supabase
#   4. Builds the Next.js production bundle
#   5. Copies static assets to standalone
#   6. Starts the production server
# ─────────────────────────────────────────────────────────────

set -e
cd /home/z/my-project

echo "▸ Step 1: Unset stale shell env vars..."
unset DATABASE_URL DIRECT_URL

echo "▸ Step 2: Generate Prisma Client..."
npx prisma generate

echo "▸ Step 3: Push schema to Supabase..."
npx prisma db push

echo "▸ Step 4: Build Next.js production bundle..."
# Export env vars explicitly so next build uses Supabase, not the stale shell SQLite
export DATABASE_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true"
export DIRECT_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
export RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
export RAZORPAY_KEY_SECRET="VKtplvQBjAXGKD6827pAKzQE"
export NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
npx next build

echo "▸ Step 5: Copy static assets to standalone..."
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

echo "▸ Step 6: Kill old server + start production server..."
pkill -f "server.js" 2>/dev/null || true
sleep 2

# Start production server with all env vars
setsid bash -c 'cd /home/z/my-project
export DATABASE_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true"
export DIRECT_URL="postgresql://postgres.qxpmwnoinjzqhkjhhokz:TNLFincorp%40%231986@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
export RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
export RAZORPAY_KEY_SECRET="VKtplvQBjAXGKD6827pAKzQE"
export NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_TdZb8psAOKXqs6"
NODE_ENV=production bun .next/standalone/server.js' > /tmp/tnl-prod-server.log 2>&1 < /dev/null &
disown

echo "▸ Waiting for server to start..."
for i in $(seq 1 15); do
  sleep 2
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then
    echo ""
    echo "✅ Deployment successful! Server running at http://localhost:3000"
    echo ""
    echo "▸ Quick route check:"
    for url in "/" "/personal-loan" "/life-insurance" "/instant-loan" "/government-bonds"; do
      code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$url" 2>/dev/null)
      echo "  $url → $code"
    done
    exit 0
  fi
done

echo "❌ Server failed to start. Check /tmp/tnl-prod-server.log"
exit 1
