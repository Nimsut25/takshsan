# Task 6 — investment-builder

## Task
Build shared investment data, FD/RD return calculators, and piggy-bank animation component for the TNL Fincorp website.

## Files Created (5)

1. **`src/lib/investment-data.ts`** — Typed investment data module.
   - Types: `InvestmentBenefit`, `InvestmentWhyChoose`, `InvestmentFaq`, `CalculatorDefaults`, `InvestmentProduct`.
   - Exports: `FD_PRODUCT`, `RD_PRODUCT` (each with title, slug, heroTitle, heroDescription, image, piggyImage, accent gradient, glow, overview, 6 benefits, 4 whyChoose with disclaimers per spec, 4 safetyPoints, 10 FAQs, calculator defaults). FD defaults: depositAmount=100000, rate=7, tenureYears=5. RD defaults: monthlyDeposit=5000, rate=7, tenureYears=5.
   - `INVESTMENT_FAQS` (10 general investment FAQs).
   - `FD_VS_RD_COMPARISON` (5 rows: Contribution Style, Saving Approach, Suitable For, Calculator, Booking).
   - `INVESTMENT_DISCLAIMER` (exact text from spec).
   - `INVESTMENT_PRODUCTS` array + `INVESTMENT_ICONS` re-export for convenience.
   - Lucide icons: PiggyBank, TrendingUp, Calendar, Target, ShieldCheck, Lock, Landmark, Coins, Clock, Wallet, FileCheck, Handshake, Banknote, Percent, Trophy, CheckCircle2, Calculator.

2. **`src/components/tnl/fd-calculator.tsx`** ("use client") — Interactive FD return calculator.
   - Mirrors `emi-calculator.tsx` visual language (2-column card, inputs left + navy→royal gradient result panel right, recharts PieChart donut with center label, Stat tiles, principal% progress bar, reset-to-defaults button).
   - Sliders: Deposit Amount (10000–10000000, step 5000), Interest Rate (4–12, step 0.1), Tenure (1–10 yrs).
   - FD formula: maturity = principal * (1 + rate/100)^years; interest = maturity − principal.
   - Donut: Principal (var(--royal)) vs Est. Interest (var(--cyan-brand)).
   - CTA: BrandButton white variant → "Start Your FD Enquiry" → `/investment/fd#apply`.
   - All results labelled estimates; INVESTMENT_DISCLAIMER footnote.
   - Fully responsive (lg:grid-cols-2 stacks on mobile).

3. **`src/components/tnl/rd-calculator.tsx`** ("use client") — Interactive RD return calculator.
   - Same structure as FD calculator but teal/cyan accent.
   - Sliders: Monthly Deposit (500–100000, step 500), Rate (4–12, step 0.1), Tenure (1–10).
   - RD formula per spec: `maturity = monthly * (((1+i)^n - 1) / i) * (1+i)` where `i = rate/12/100`, `n = years*12`. Handles i=0 edge case.
   - Donut: Total Deposited (var(--teal-brand)) vs Est. Interest (var(--cyan-brand)).
   - CTA: BrandButton white variant → "Start Your RD Enquiry" → `/investment/rd#apply`.

4. **`src/components/tnl/piggy-bank-animation.tsx`** ("use client") — Premium animated piggy-bank visual.
   - Container: `aspect-square max-w-md` with ambient radial glow + pulsing border ring.
   - Piggy image (default `/images/piggy-bank.jpg`) centered with subtle float motion (y: [0, -8, 0]).
   - 6 currency tokens (3 Banknote notes + 3 Coins coins) animate from outer start positions toward center in staggered infinite loop (delays 0/0.6/1.2/1.8/2.4/3.0s). Each token: x/y from start→0, opacity [0,1,1,0], scale [0.5,1,0.9,0.35], rotate to 0.
   - `useSyncExternalStore` for hydration-safe is-client detection (no setState-in-effect lint error) + framer-motion `useReducedMotion` to render static piggy (3 decorative tokens) when reduced-motion is set.
   - TokenGlyph renders note (rounded-lg gradient with Banknote icon) or coin (rounded-full gradient ring-2 white with Coins icon).
   - Accepts optional `image` and `className` props. Responsive. Image onError hides broken img so gradient + ₹ fallback shows.
   - Subtle pulsing ring + sparkles accent.

5. **`src/components/sections/invest-section.tsx`** ("use client") — Homepage FD & RD investment section.
   - SectionHeading: eyebrow "Investment Solutions", title "Grow Your Savings with", highlight "FD & RD".
   - `StaggerGroup` (stagger 0.14) with 2 `ProductCard`s in `lg:grid-cols-2` (stack on mobile).
   - Each card: glassmorphism (`glass` + `backdrop-blur-sm`), soft shadow, hover elevation (`-translate-y-1.5` + `shadow-card-hover` + `border-primary/25`), hover gradient wash.
   - Image (h-48 sm:h-56, `object-cover`, `group-hover:scale-110` zoom over 700ms) with React-state-based gradient fallback (BadgeIcon at size-16) if asset missing.
   - Floating icon badge (size-14, gradient, `ring-4 ring-white`) overlaps image/body, scales + rotates on hover.
   - Title, heroDescription, 4 highlight bullets (CheckCircle2 + whyChoose items, FD bullets royal accent, RD bullets teal accent).
   - BrandButton "Learn More" (FD=primary variant, RD=dark variant) → `/investment/fd` and `/investment/rd`.
   - Footnote disclaimer.
   - `id="investment"` anchor for nav linking.

## Verification
- `bun run lint`: 0 errors, 1 pre-existing benign warning (enquiry-form.tsx react-hook-form watch — not in my files).
- `bunx tsc --noEmit`: 0 errors in any of my 5 new files (only pre-existing errors in unrelated `examples/` and `skills/` reference folders).
- Dev server log: clean, no compile errors.

## Notes for Downstream Agents
- Image assets referenced but NOT generated by this task: `/images/fd-hero.jpg`, `/images/rd-hero.jpg`, `/images/piggy-bank.jpg`. Components degrade gracefully (gradient + icon fallback) when these assets are missing. An image-generation agent should create them at the same aspect ratios used elsewhere (1344×768 landscape for heroes, square ~864×864 or 1024×1024 for piggy).
- All calculator results are labelled as estimates; INVESTMENT_DISCLAIMER text is included verbatim from the spec.
- `INVESTMENT_PRODUCTS` array and `INVESTMENT_ICONS` re-exported for convenience if other agents need them.
- The InvestSection uses `id="investment"` so nav links to `/#investment` work; the calculators use `id="calculator"` (same as emi-calculator) so they should only be mounted on their respective `/investment/fd` and `/investment/rd` routes (NOT on the homepage alongside the EMI calculator, to avoid duplicate-anchor conflicts).
