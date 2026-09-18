#!/bin/bash
# ─────────────────────────────────────────────────────────────
# TNL Fincorp — Dev Server Startup Script
# ─────────────────────────────────────────────────────────────
# This script unsets the stale shell DATABASE_URL (which points
# to the old SQLite file) so that Next.js loads the correct
# Supabase PostgreSQL URL from .env
# ─────────────────────────────────────────────────────────────

# Unset any stale shell env vars that would override .env
unset DATABASE_URL
unset DIRECT_URL

echo "✓ Cleared stale shell env vars"
echo "✓ Starting dev server (reads Supabase credentials from .env)..."

# Start the dev server — Next.js will load .env automatically
exec bun run dev
