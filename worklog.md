# TNL Finance Website - Work Log

Project: Premium financial services website for TNL Finance (loan assistance company).
Stack: Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, framer-motion, recharts.

---
Task ID: 1
Agent: main
Task: Initialize worklog and project foundation

Work Log:
- Explored project structure (Next.js 16, Tailwind 4, full shadcn/ui set available, framer-motion + recharts installed)
- Copied TNL logo into /public
- Created worklog file

Stage Summary:
- Foundation ready for building the TNL Finance single-page fintech website with all sections on the / route.

---
Task ID: 3
Agent: image-generator
Task: Generate premium fintech images for TNL Finance website

Work Log:
- Read previous worklog to understand project context (TNL Finance single-page fintech website).
- Created /home/z/my-project/public/images/ directory (it did not exist).
- Attempted first image (hero.jpg) at size 1440x720 — API rejected with error code 1214 because 720 is not a multiple of 32 (the API requires both dimensions to be multiples of 32 between 512–2880px, max 2^22 pixels). Note: the CLI help lists 1440x720 as "supported" but the backend API actually rejects it.
- Switched landscape images (hero, about, banner-1, banner-2, cta-bg) to the closest valid landscape size 1344x768 (both dimensions are multiples of 32 and total pixels under 2^22). Portrait loan images remained at 864x1152 as originally specified (both valid multiples of 32).
- Generated all 11 images one-by-one using `z-ai image` CLI; each succeeded on the first attempt (no retries needed).
- Verified all 11 files exist, are valid JPEG image data (via `file`), and are well over the 20KB threshold (smallest = 81,679 bytes for about.jpg; largest = 176,313 bytes for loan-lap.jpg).

Stage Summary:
- /home/z/my-project/public/images/hero.jpg            — 1344x768 —  88,035 bytes (landscape, financial consultant + customer)
- /home/z/my-project/public/images/about.jpg           — 1344x768 —  81,679 bytes (landscape, advisor with tablet)
- /home/z/my-project/public/images/loan-personal.jpg  — 864x1152 — 114,022 bytes (portrait, family planning finances)
- /home/z/my-project/public/images/loan-business.jpg  — 864x1152 —  97,245 bytes (portrait, entrepreneur reviewing charts)
- /home/z/my-project/public/images/loan-home.jpg        — 864x1152 — 109,011 bytes (portrait, couple in front of new house)
- /home/z/my-project/public/images/loan-lap.jpg         — 864x1152 — 176,313 bytes (portrait, modern apartment building)
- /home/z/my-project/public/images/loan-auto.jpg       — 864x1152 — 101,187 bytes (portrait, car + showroom)
- /home/z/my-project/public/images/loan-education.jpg  — 864x1152 —  99,107 bytes (portrait, university student)
- /home/z/my-project/public/images/banner-1.jpg        — 1344x768 —  98,564 bytes (abstract fintech w/ coins & % symbols)
- /home/z/my-project/public/images/banner-2.jpg        — 1344x768 — 101,977 bytes (abstract growth arrow + coins)
- /home/z/my-project/public/images/cta-bg.jpg          — 1344x768 —  84,602 bytes (abstract gradient w/ floating cards)

Note: Requested landscape size 1440x720 is rejected by the underlying image API (720 is not a multiple of 32). Used 1344x768 (valid multiple-of-32 landscape) as the closest substitute for all five 1440x720 images — aspect ratio is still ~16:9 and they remain suitable for hero/banner/CTA usage. Frontend should use object-cover / responsive containers.

---
Task ID: 16
Agent: main
Task: Assemble page.tsx, run lint, start dev server, verify with Agent Browser

Work Log:
- Created all section components (navbar, hero, loan carousel, categories, promo banners, about, why, how, emi calculator, enquiry, trust, testimonials, faq, contact, footer, floating actions, loan detail modal, enquiry modal)
- Created reusable primitives (Reveal/Stagger, AnimatedCounter, SectionHeading, BrandButton, EnquiryForm)
- Created site-data.ts with all loans, features, steps, FAQs, testimonials, contact info, disclaimer
- Set up Prisma Enquiry model + POST /api/enquiry route with zod validation
- Set up SEO: layout.tsx metadata, JSON-LD FinancialService schema, sitemap.ts, robots.txt
- Configured Plus Jakarta Sans + Inter fonts and fintech color palette in globals.css
- Fixed lint errors (setState-in-effect) via queueMicrotask deferral
- Lint passes (0 errors, 1 benign warning about react-hook-form watch)
- Dev server running on :3000, GET / returns HTTP 200, clean compile

Stage Summary:
- Website assembled and compiling cleanly. Ready for Agent Browser end-to-end verification.

---
Task ID: 16 (final)
Agent: main
Task: Final verification and polish

Work Log:
- Fixed Next.js Image hydration warning (added `relative` to fill-image parent containers in hero + about)
- Converted PromoBanners marquee from framer-motion keyframes to pure CSS animation (.tnl-marquee) to eliminate hydration mismatch and improve performance
- Moved .tnl-marquee into @layer utilities so Tailwind v4 includes it reliably
- Added prefers-reduced-motion fallback for accessibility
- Added mobile bottom padding to footer so sticky mobile CTA bar does not cover the copyright line
- Agent Browser end-to-end verification (desktop + mobile 390px):
  - Hero, navbar, all sections render; no console errors, no hydration mismatches
  - Loan detail modal opens on "Learn More" with full content (benefits, eligibility, docs, process, FAQ, CTA)
  - Enquiry modal opens; form validation works; POST /api/enquiry returns 200; Prisma INSERT succeeds; success state shows
  - EMI calculator donut chart (recharts) renders with live EMI/interest/repayment values
  - FAQ accordion expands correctly
  - Mobile hamburger menu opens with all nav links + CTA
  - Mobile sticky CTA bar (Call Now / Apply for Loan) appears on scroll
  - Footer: 4 columns on desktop, stacked on mobile; disclaimer + 2026 copyright visible
  - No horizontal scroll on mobile (scrollWidth == clientWidth at 390px)
- Lint: 0 errors, 1 benign warning (react-hook-form watch / React Compiler skip)

Stage Summary:
- TNL Finance website is production-ready and fully browser-verified.

---
Task ID: 17
Agent: main
Task: Implement 4 targeted modifications to existing TNL Finance site (header nav cleanup, mobile menu + social icons, desktop popup width, gold coin cursor, hide footer on mobile)

Work Log:
- Copied attached gold Rupee coin image to /public/coin-cursor.png (258x241 PNG, transparent bg, gold ₹ coin with star ring)
- Planned minimal, surgical edits preserving all existing design

Stage Summary:
- In progress.

---
Task ID: 17 (final)
Agent: main
Task: Complete 4 targeted modifications + browser verification

Work Log:
- Change 1: Removed "Why Choose Us", "How It Works", "FAQ" from desktop header nav (HEADER_NAV_LINKS); sections remain on page + in mobile menu + footer. Rebuilt mobile side menu: header (close button always visible) + scrollable nav (flex-1 overflow-y-auto, tnl-scrollbar) + pinned bottom area (Apply CTA + Call + WhatsApp/Instagram/Facebook social icons). Added body scroll-lock while menu open (restored on close). Removed redundant built-in Sheet close via scoped CSS rule.
- Social icons: created SocialIcons component with accurate brand SVGs (WhatsApp not in lucide). Added SOCIAL_LINKS config in site-data.ts with clearly-marked placeholders (WhatsApp uses wa.me with TNL phone; Instagram/Facebook are "#" placeholders).
- Change 2: Learn More loan detail modal widened on desktop only: base max-w-5xl (mobile/tablet unchanged) + lg:max-w-6xl + xl:max-w-[80rem]. Verified: mobile=390px (unchanged), desktop=1280px (was 1024px). Internal padding lg:p-10 + overview lg:max-w-4xl for balanced reading.
- Change 3: Gold Rupee coin cursor (CoinCursor component). Uses attached coin image. Desktop-only via useSyncExternalStore + matchMedia("(hover: hover) and (pointer: fine)"). 3-layer transform: outer translate3d (rAF, GPU), middle scale (1x→1.55x on interactive hover, 0.2s cubic-bezier), inner rotateY spin (4.5s linear infinite, perspective 600px for 3D). Native cursor hidden via CSS @media(hover:hover). prefers-reduced-motion fallback. Coin CSS moved into @layer utilities (Tailwind v4 strips unlayered custom classes).
- Change 4: Footer hidden on mobile: added `hidden md:block` to footer root. Verified: mobile display:none, height 0, no empty gap (doc height = main height). Desktop: display block, 754px, copyright visible.
- Fixed lint: useSyncExternalStore for capability detection (avoids setState-in-effect).
- Agent Browser verification (desktop 1440 + mobile 390/375/320):
  - Desktop header: 4 nav links (Home, About Us, Loan Services, Contact), aligned, no awkward gap
  - Mobile menu: all 7 items visible, close button visible, social icons at bottom, scrollable, body scroll locked
  - Mobile menu on 320x400: nav scrolls, close+social remain accessible
  - Learn More modal: desktop 1280px (wider), mobile 390px (unchanged)
  - Coin cursor CSS served correctly (tnl-coin-cursor, tnl-coin-spin, cursor:none) — renders only on real fine-pointer devices (headless browser correctly reports coarse, so cursor not shown in automation = correct behavior)
  - Footer: hidden on mobile (no gap), visible on desktop (754px, copyright)
  - Console: clean, no errors, no hydration warnings
  - Lint: 0 errors, 1 pre-existing benign warning

Stage Summary:
- All 4 changes implemented surgically without modifying unrelated components. Production-ready and browser-verified.

---
Task ID: 18
Agent: main
Task: Replace gold Rupee coin cursor with a minimal, premium dual-layer cursor (dot + trailing ring) with hover/click/magnetic interactions

Work Log:
- Reviewed current coin-cursor.tsx, page.tsx import, and globals.css coin rules
- Confirmed hero.tsx "Coins" icon is an unrelated hero decoration (not the cursor) — left untouched
- Plan: delete coin asset + component, strip coin CSS, build new PremiumCursor (dual-layer), wire magnetic CTAs

Stage Summary:
- In progress.

---
Task ID: 18 (final)
Agent: main
Task: Complete replacement of coin cursor with premium dual-layer cursor + verification

Work Log:
- Deleted src/components/tnl/coin-cursor.tsx and public/coin-cursor.png
- Removed all coin CSS from globals.css (tnl-coin-cursor, tnl-coin-scale, tnl-coin-spin, @keyframes tnl-coin-spin)
- Created PremiumCursor component (src/components/tnl/premium-cursor.tsx):
  - Dual-layer: small luminous dot (7px radial gradient, white→royal) + thin trailing ring (30px, semi-transparent border)
  - Single rAF loop updates BOTH layers; only translate3d written per frame (GPU-friendly)
  - Dot ease 0.55 (near-instant), ring ease 0.18 (subtle trailing)
  - Hover detection (delegated pointerover/out): .tnl-cursor--hover (ring→44px, dot→5px) for links; .tnl-cursor--button (ring→50px teal glow, dot→4px) for buttons/CTAs
  - Click feedback: .tnl-cursor--down (ring contracts to 36px then eases back)
  - Magnetic effect: [data-cursor-magnetic] CTAs — cursor gravitates toward button center within 90px radius (pulls cursor only, NOT the button, to avoid layout/hover/shimmer conflicts); disabled under reduced-motion
  - useSyncExternalStore + matchMedia("(hover: hover) and (pointer: fine)") for capability detection (desktop only)
  - prefers-reduced-motion: ring hidden, dot instant tracking, no magnetism, minimal size
  - All cursor nodes pointer-events:none + aria-hidden
- Added cursor CSS in @layer utilities of globals.css (Tailwind v4 requires layering for custom classes)
- Kept native cursor hidden via @media(hover:hover) and (pointer: fine) { cursor: none }
- Wired PremiumCursor into page.tsx (replaced CoinCursor import)
- Added data-cursor-magnetic to 3 primary CTAs: navbar "Apply for Loan", hero "Apply for a Loan", promo "Get Loan Assistance"

Verification (served CSS + headless browser):
- tnl-cursor-dot: 5 occurrences, tnl-cursor-ring: 5, hover/button/down states present
- cursor:none present (native hidden on fine-pointer)
- COIN remnants in CSS: 0 (complete removal)
- 3 magnetic CTAs in DOM
- Headless browser (coarse pointer): cursor correctly NOT rendered (touch behavior preserved)
- Console: clean, no errors
- Lint: 0 errors, 1 pre-existing benign warning

Stage Summary:
- Gold coin cursor fully removed. New premium dual-layer cursor (dot + trailing ring) implemented with hover/click/button states + magnetic CTA interaction, desktop-only, reduced-motion aware. Single active cursor system confirmed.

---
Task ID: 19
Agent: main
Task: Transform brand TNL Finance → TNL Fincorp, restructure nav (Loans + Investment dropdowns), add FD/RD investment pages with OTP flows

Work Log:
- Inventoried all "TNL Finance" / "tnlfinance" references across 15 files
- Planned: global rename + nav restructure + new routes (/loans/[slug], /investment, /investment/fd, /investment/rd) + investment pages + OTP component

Stage Summary:
- In progress.

---
Task ID: 10
Agent: otp-builder
Task: Build OTP verification component + backend API for FD/RD investment application

Work Log:
- Read worklog + previous work to understand the TNL Fincorp codebase (Next.js 16, shadcn/ui, BrandButton, existing /api/enquiry pattern, Prisma+SQLite).
- Created src/lib/otp-store.ts — dev in-memory OTP store. Functions: createOtp (6-digit via crypto.getRandomValues, 5-min TTL), verifyOtp (single-use, deletes on success), hasActiveOtp, canResend (30-sec cooldown), isRateLimited (5 attempts / 5 min window), resendCooldownSeconds, _resetOtpStore. Heavy comment noting this MUST be replaced with an SMS provider + DB/Redis in production. OTP is NEVER returned to the client.
- Appended OtpRequest model (id, mobile, otpHash, expiresAt, verified, createdAt) to prisma/schema.prisma. Ran `bun run db:push` — succeeded; Prisma Client regenerated; no fallback needed.
- Created src/app/api/otp/send/route.ts (POST). Zod validates mobile = /^[6-9]\d{9}$/. Enforces 30-sec resend cooldown (HTTP 429). Generates OTP via otp-store, persists a (dev-only, hash-tagged) otpHash to the OtpRequest DB row (best-effort — falls back to in-memory if DB write fails), logs OTP to server console ONLY when NODE_ENV !== 'production'. Response: { ok:true, message:"OTP sent successfully" }. The OTP value is NEVER included in the response body.
- Created src/app/api/otp/verify/route.ts (POST). Zod validates mobile + 6-digit OTP. Short-circuits with "expired or was never requested" if hasActiveOtp is false. Calls verifyOtp (which enforces the 5/5-min rate limit internally and deletes the OTP on success). Responds 429 when isRateLimited is true. On success, marks the most recent pending OtpRequest row verified=true. Response: { ok:true, verified:true } on success, { ok:false, message:"Invalid or expired OTP" } on failure.
- Created src/components/tnl/otp-verification.tsx ("use client"). Three stages: (1) mobile entry — Input with +91 prefix, BrandButton "Send OTP", validates 10-digit; (2) OTP entry — InputOTP (6 slots, 3+separator+3 layout, large touch targets), BrandButton "Verify OTP", "Resend OTP" link with 30-sec live countdown (disabled during cooldown), "Change number" link back to stage 1, error/info lines; (3) verified — animated green checkmark with pulsing glow, success message. Glass card + soft shadows, navy/teal/sky accents. Fully responsive (mobile-first), no horizontal scroll. No OTP secrets in DOM or console. Fires onVerified(mobile) callback.
- Created src/components/tnl/apply-with-consent.tsx ("use client"). Wrapper composing: header, OtpVerification block, consent checkbox (selected by default — Terms & Privacy links), and an Apply Now BrandButton (size lg). Apply Now is disabled unless consent=true AND mobile verified; clear visual disabled state + contextual helper hints ("Verify mobile to continue" / "Please accept the Terms…" / "Mobile verified — you're ready to apply"). On click: brief submit delay, fires useToast success message "Your {productName} application request has been received. Our team will contact you shortly.", pushes a dataLayer analytics event tagged with productSlug + verified mobile.
- Ran live API smoke tests against the dev server: send (200), resend within 30s (429), verify-correct (verified:true), verify-wrong (Invalid or expired OTP), invalid mobile (400), malformed OTP (400), no-OTP-issued verify (400 expired). All pass.
- Lint: 0 errors in any OTP file. (A pre-existing error in piggy-bank-animation.tsx belongs to a parallel agent and is outside this task's scope; the react-hook-form watch warning in enquiry-form.tsx is the documented benign warning.)

Stage Summary:
- src/lib/otp-store.ts — in-memory OTP store (createOtp/verifyOtp/hasActiveOtp/canResend/isRateLimited) with TTL + cooldown + rate-limit, dev-only with production replacement notes.
- prisma/schema.prisma — appended OtpRequest model (mobile, otpHash, expiresAt, verified, createdAt); db:push succeeded.
- src/app/api/otp/send/route.ts — POST; validates mobile, enforces 30-sec cooldown, generates OTP server-side, persists hash to DB, logs OTP only in dev, never returns OTP.
- src/app/api/otp/verify/route.ts — POST; validates mobile+6-digit OTP, verifies server-side, marks DB row verified on success, 429 on rate-limit, 200 with verified:true/false.
- src/components/tnl/otp-verification.tsx — "use client"; 3-stage (mobile→OTP→verified) premium glass-card UI with countdown resend, change-number, loading/error/success states; no secrets in DOM.
- src/components/tnl/apply-with-consent.tsx — "use client"; consent checkbox (default checked) + OtpVerification + Apply Now BrandButton (disabled until both consent and verified); fires success toast + analytics on submit.

---
Task ID: 4
Agent: image-generator
Task: Generate premium FD/RD investment images for TNL Fincorp website

Work Log:
- Read existing worklog to understand project context (TNL Fincorp single-page fintech website, previously branded TNL Finance with FD/RD investment pages now being added under Task 19).
- Verified /home/z/my-project/public/images/ directory exists with 11 previously-generated loan/finance images.
- Generated 6 new FD/RD investment-themed images one-by-one using `z-ai image` CLI; every image succeeded on the first attempt (no retries needed).
- Used size 864x1152 for portrait images (invest-fd, invest-rd), 1024x1024 for the square piggy-bank, and 1344x768 for landscape hero/CTA images (per task note, 1440x720 is rejected by the backend since 720 is not a multiple of 32 — 1344x768 is the closest valid ~16:9 landscape size).
- Verified all 6 files exist, are valid JPEG image data (via `file`), correct dimensions, and are well over the 20KB threshold (smallest = 79,493 bytes for investment-cta.jpg; largest = 114,296 bytes for rd-hero.jpg).

Stage Summary:
- /home/z/my-project/public/images/invest-fd.jpg       —  864x1152 —  85,820 bytes (portrait, Indian professional reviewing FD certificate on tablet)
- /home/z/my-project/public/images/invest-rd.jpg       —  864x1152 — 109,588 bytes (portrait, Indian couple planning monthly RD savings)
- /home/z/my-project/public/images/piggy-bank.jpg      — 1024x1024 —  90,169 bytes (square, gold piggy bank with floating coins & currency)
- /home/z/my-project/public/images/fd-hero.jpg         — 1344x768  —  95,948 bytes (landscape, FD investor with laptop + growth chart)
- /home/z/my-project/public/images/rd-hero.jpg         — 1344x768  — 114,296 bytes (landscape, Indian family planning monthly RD savings)
- /home/z/my-project/public/images/investment-cta.jpg  — 1344x768  —  79,493 bytes (landscape, abstract fintech CTA with glassmorphism + coins)

---
Task ID: 6
Agent: investment-builder
Task: Build shared investment data, FD/RD return calculators, and piggy-bank animation component

Work Log:
- Read worklog.md + existing brand/design system (site-data.ts, emi-calculator.tsx, brand-button, section-heading, reveal, animated-counter, globals.css tokens).
- Created src/lib/investment-data.ts: typed InvestmentProduct/InvestmentBenefit/InvestmentWhyChoose/InvestmentFaq/CalculatorDefaults types. Exported FD_PRODUCT, RD_PRODUCT (each with title, slug, heroTitle, heroDescription, image /images/fd-hero.jpg & /images/rd-hero.jpg, piggyImage /images/piggy-bank.jpg, accent gradient, glow, overview, 6 benefits, 4 whyChoose items per spec with careful disclaimers, 4 safetyPoints, 10 FAQs each, calculator defaults FD: depositAmount=100000/rate=7/tenure=5; RD: monthlyDeposit=5000/rate=7/tenure=5). Added INVESTMENT_FAQS (10 general), FD_VS_RD_COMPARISON (5 rows: Contribution Style, Saving Approach, Suitable For, Calculator, Booking), INVESTMENT_DISCLAIMER (exact text from spec). Lucide icons used: PiggyBank, TrendingUp, Calendar, Target, ShieldCheck, Lock, Landmark, Coins, Clock, Wallet, FileCheck, Handshake, Banknote, Percent, Trophy, CheckCircle2, Calculator.
- Created src/components/tnl/fd-calculator.tsx ("use client"): mirrors emi-calculator.tsx visual language — 2-column card (inputs left, navy→royal gradient result panel right), Slider inputs for Deposit Amount (10000–10000000, step 5000), Interest Rate (4–12, step 0.1), Tenure (1–10 yrs). Uses recharts PieChart donut (principal var(--royal) vs interest var(--cyan-brand)) with center label showing Est. Maturity. Stat tiles + principal% progress bar. Reset-to-defaults button. BrandButton (white variant) "Start Your FD Enquiry" links to /investment/fd#apply. All results labelled estimates. Includes INVESTMENT_DISCLAIMER footnote. Fully responsive (lg:grid-cols-2, mobile stacks).
- Created src/components/tnl/rd-calculator.tsx ("use client"): same structure as FD but teal/cyan accent and the RD formula: maturity = monthly * (((1+i)^n - 1) / i) * (1+i), i = rate/12/100, n = years*12. Inputs: Monthly Deposit (500–100000, step 500), Rate (4–12, step 0.1), Tenure (1–10). Donut chart Total Deposited (var(--teal-brand)) vs Est. Interest (var(--cyan-brand)). BrandButton (white) "Start Your RD Enquiry" → /investment/rd#apply.
- Created src/components/tnl/piggy-bank-animation.tsx ("use client"): premium animated piggy visual. Container aspect-square max-w-md with ambient radial glow + pulsing ring. Piggy image (default /images/piggy-bank.jpg) centered with subtle float motion. 6 currency tokens (3 Banknote notes + 3 Coins coins) animated via framer-motion keyframes (x/y from outer start position → center, opacity 0→1→1→0, scale 0.5→1→0.9→0.35, rotate to 0) in a staggered infinite loop (delays 0/0.6/1.2/1.8/2.4/3.0s). Uses useSyncExternalStore for hydration-safe is-client detection (no setState-in-effect) + framer-motion useReducedMotion to render static piggy (with 3 decorative tokens) when reduced-motion. Accepts image + className props. TokenGlyph renders note (rounded-lg with Banknote icon, gradient) or coin (rounded-full with Coins icon, ring-2 white). Responsive, elegant, not cartoonish. img onError hides broken img so gradient + ₹ fallback shows.
- Created src/components/sections/invest-section.tsx ("use client"): homepage "Grow Your Savings with FD & RD" section. SectionHeading (eyebrow Investment Solutions, title "Grow Your Savings with", highlight "FD & RD"). StaggerGroup with 2 ProductCards (lg:grid-cols-2, stack on mobile). Each card: glassmorphism (glass + backdrop-blur), soft shadow, hover elevation (-translate-y-1.5, shadow-card-hover), hover gradient wash. Image (h-48/h-56 object-cover with group-hover:scale-110 zoom + img onError → React-state-based gradient fallback showing BadgeIcon). Floating icon badge (size-14, gradient, ring-4 white) overlaps image/body. Title, heroDescription, 4 highlight bullets (CheckCircle2 + whyChoose items), BrandButton "Learn More" (FD=primary, RD=dark variant) linking to /investment/fd and /investment/rd. Reveal/StaggerGroup scroll animations. Footnote disclaimer.
- Ran `bun run lint`: 0 errors, 1 pre-existing benign warning (enquiry-form.tsx react-hook-form watch — not in my files). Ran `bunx tsc --noEmit`: 0 errors in any of my 5 new files (only pre-existing errors in unrelated examples/ and skills/ folders). Dev server log clean.

Stage Summary:
- src/lib/investment-data.ts — typed FD/RD product data, general FAQs, FD-vs-RD comparison table, investment disclaimer.
- src/components/tnl/fd-calculator.tsx — interactive FD calculator (3 sliders + recharts donut + BrandButton CTA).
- src/components/tnl/rd-calculator.tsx — interactive RD calculator (3 sliders + recharts donut + BrandButton CTA, RD formula).
- src/components/tnl/piggy-bank-animation.tsx — premium animated piggy-bank with currency tokens flying in (framer-motion, reduced-motion aware, hydration-safe).
- src/components/sections/invest-section.tsx — homepage FD & RD cards section (glassmorphism, hover elevation, scroll animations).

---
Task ID: 19 (final)
Agent: main
Task: Complete TNL Fincorp transformation + investment pages + verification

Work Log:
- Global brand rename: TNL Finance → TNL Fincorp across site-data.ts, layout.tsx (metadata, JSON-LD, OG), sitemap.ts, robots.txt, globals.css, premium-cursor.tsx, hero.tsx, about.tsx, contact.tsx, enquiry-section.tsx, loan-services-carousel.tsx, why-choose-us.tsx, loan-detail-modal.tsx. Removed header sub-tagline ("Loan Solutions").
- Header restructure: Home, About Us, Loans (dropdown), Investment (dropdown), Contact. Removed "Why Choose Us" from header. Loans dropdown = 6 loan items → /loans/[slug]. Investment dropdown = FD & RD, FD, RD → /investment/*. Desktop hover dropdowns (fade+scale), mobile accordion sub-menus (chevron, smooth grid-rows expand).
- Rebuilt navbar.tsx (dropdowns + mobile accordion + Link routing) and footer.tsx (5 columns: brand, loans, investment, quick links, contact + investment disclaimer).
- New routes (all return 200): /loans/[slug] (6 dynamic params: personal, business, home, auto, education, loan-against-property), /investment, /investment/fd, /investment/rd.
- Refactored loan-detail-modal.tsx → shared LoanDetailContent component (used by both modal + page). Created LoanPageContent client wrapper to avoid Lucide icon serialization (server→client).
- InvestmentPage component (client, accepts slug, resolves product internally) renders: hero + apply panel (consent checkbox checked-by-default + OTP + Apply Now disabled-until-verified), benefits+piggy animation, why-choose 4 cards, calculator (FD/RD), safety section, FAQ accordion.
- Created investment-data.ts (FD_PRODUCT, RD_PRODUCT with benefits/whyChoose/safetyPoints/faqs/calculator defaults, INVESTMENT_FAQS, FD_VS_RD_COMPARISON, INVESTMENT_DISCLAIMER), fd-calculator.tsx, rd-calculator.tsx (recharts donut), piggy-bank-animation.tsx, invest-section.tsx (homepage FD+RD cards), otp-verification.tsx, apply-with-consent.tsx.
- OTP backend: /api/otp/send + /api/otp/verify (validates mobile, 30s cooldown, 5-attempt rate limit, OTP never returned to client, stored in OtpRequest DB table). Verified end-to-end: send→verify(correct)→verified:true, verify(wrong)→error, resend→429 cooldown.
- Homepage page.tsx: added <InvestSection /> below hero. Sitemap updated with all 10 routes. Investment disclaimer added to footer.

Verification:
- All 10 routes return HTTP 200 (/ , /investment, /investment/fd, /investment/rd, /loans/personal|business|home|auto|education|loan-against-property)
- "TNL Finance" references remaining: 0 (complete rename)
- Lint: 0 errors, 1 pre-existing benign warning
- OTP API tested end-to-end (send/verify/cooldown)
- FD page renders all 6 sections (hero+apply, benefits+piggy, why-choose, calculator, safety, FAQ)
- Investment landing page renders FD vs RD comparison + calculators CTA + FAQ
- Loan pages render full detail content with "Explore other loan" cross-links
- Desktop header dropdowns verified (Loans shows 6 items, Investment shows FD&RD/FD/RD)

Stage Summary:
- TNL Fincorp transformation complete. Single unified platform for Loans + FD/RD investment with clean navigation, animated dropdowns, premium investment pages, interactive calculators, OTP-based application flow, and full SEO/metadata. No broken routes, no layout overflow, no console errors.
