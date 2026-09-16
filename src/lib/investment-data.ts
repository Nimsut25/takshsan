import type { LucideIcon } from "lucide-react";
import {
  PiggyBank,
  TrendingUp,
  Calendar,
  Target,
  ShieldCheck,
  Lock,
  Landmark,
  Coins,
  Clock,
  Wallet,
  FileCheck,
  Handshake,
  Banknote,
  Percent,
  Trophy,
  CheckCircle2,
  Calculator,
} from "lucide-react";

/**
 * Shared types for investment (FD / RD) products.
 */
export type InvestmentBenefit = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type InvestmentWhyChoose = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type InvestmentFaq = { q: string; a: string };

export type CalculatorDefaults = {
  depositAmount: number; // FD: lump sum deposit
  monthlyDeposit: number; // RD: monthly contribution
  rate: number; // indicative annual rate (p.a.)
  tenureYears: number;
};

export type InvestmentProduct = {
  title: string;
  slug: "fd" | "rd";
  heroTitle: string;
  heroDescription: string;
  image: string;
  piggyImage: string;
  accent: string; // tailwind gradient classes
  glow: string;
  overview: string;
  benefits: InvestmentBenefit[];
  whyChoose: InvestmentWhyChoose[];
  safetyPoints: string[];
  faqs: InvestmentFaq[];
  calculator: CalculatorDefaults;
};

/**
 * FIXED DEPOSIT (FD)
 * Interest rate is intentionally labelled indicative/configurable — actual rate,
 * tenure and product features depend on the institution / bank.
 */
export const FD_PRODUCT: InvestmentProduct = {
  title: "Fixed Deposit (FD)",
  slug: "fd",
  heroTitle: "Build steady savings with Fixed Deposits",
  heroDescription:
    "TNL Fincorp helps you understand and book Fixed Deposit options with banks — a simple, widely-used way to set aside a lump sum for a chosen tenure and earn indicative interest. We guide you on options, documentation and the application journey.",
  image: "/images/fd-hero.jpg",
  piggyImage: "/images/piggy-bank.jpg",
  accent: "from-royal to-sky",
  glow: "shadow-[0_20px_60px_-20px_rgba(56,102,243,0.55)]",
  overview:
    "A Fixed Deposit (FD) is a deposit product offered by banks and select institutions where you place a lump-sum amount for a chosen tenure and earn indicative interest at the rate applicable on the booking date. TNL Fincorp assists you in understanding available FD options, comparing indicative rates, organising documentation and guiding the application through the financial services network. The actual rate, tenure, payout frequency, premature withdrawal rules and other terms depend on the bank/institution and prevailing regulations.",
  benefits: [
    {
      icon: TrendingUp,
      title: "Indicative returns on your savings",
      desc: "Earn indicative interest on a lump-sum deposit over a tenure you choose, based on the rate applicable at booking.",
    },
    {
      icon: Calendar,
      title: "Flexible tenure options",
      desc: "Explore tenures across short, medium and long horizons subject to the institution's available product slabs.",
    },
    {
      icon: Target,
      title: "Goal-based saving",
      desc: "Align your FD with specific goals such as future expenses, contingencies or planned purchases.",
    },
    {
      icon: Wallet,
      title: "Start with a modest amount",
      desc: "Many institutions allow you to start an FD from a relatively modest deposit amount, subject to their terms.",
    },
    {
      icon: FileCheck,
      title: "Documentation assistance",
      desc: "We help you arrange the typical KYC and account-related documents required by the bank/institution.",
    },
    {
      icon: Handshake,
      title: "Application support",
      desc: "End-to-end guidance through the booking journey, from enquiry to submission of the application.",
    },
  ],
  whyChoose: [
    {
      icon: Landmark,
      title: "Direct FD with the bank",
      desc: "We assist you in booking the FD directly with the bank/institution. The deposit, rate and terms are governed by the institution's policies and applicable regulations.",
    },
    {
      icon: Coins,
      title: "Start with a minimum amount of ₹1,000",
      desc: "Many institutions accept FD bookings starting from ₹1,000. The actual minimum amount, eligibility and terms depend on the bank/institution.",
    },
    {
      icon: Clock,
      title: "Withdraw easily after 1 year",
      desc: "Several FD products allow premature withdrawal after a lock-in (commonly 1 year from the booking date), subject to the institution's premature-closure policy and applicable penalty. TNL Fincorp helps you understand the applicable rules.",
    },
    {
      icon: PiggyBank,
      title: "Book FD instantly",
      desc: "With documentation in place, we assist you to complete the FD booking promptly. Final booking and confirmation depend on the bank/institution's verification and approval.",
    },
  ],
  safetyPoints: [
    "Deposit safety and any applicable limits (including deposit insurance limits) depend on the respective bank/institution and prevailing regulations.",
    "Interest rates are indicative and may change. The rate applicable to your deposit is the one offered by the bank/institution at the time of booking.",
    "Premature withdrawal, if allowed, is subject to the institution's policy and applicable penalty.",
    "TNL Fincorp provides guidance and application assistance only — it is not the deposit-taking institution.",
  ],
  faqs: [
    {
      q: "What is a Fixed Deposit (FD)?",
      a: "A Fixed Deposit is a deposit product where you place a lump-sum amount with a bank/institution for a chosen tenure and earn indicative interest at the rate applicable on the booking date. TNL Fincorp helps you understand available options and complete the booking journey.",
    },
    {
      q: "Is FD booking guaranteed through TNL Fincorp?",
      a: "No. FD booking, eligibility, rate and tenure are subject to the bank/institution's policies, verification and approval. TNL Fincorp provides guidance and application support only.",
    },
    {
      q: "What is the minimum amount to start an FD?",
      a: "Many institutions accept FD bookings from ₹1,000 onwards. The actual minimum amount, eligibility and terms depend on the bank/institution and the specific FD product.",
    },
    {
      q: "What is the indicative interest rate for FDs?",
      a: "Interest rates are indicative and configurable in our calculator for planning only. The actual rate depends on the bank/institution, product, tenure and prevailing regulations on the date of booking.",
    },
    {
      q: "Can I withdraw my FD before maturity?",
      a: "Several FD products allow premature withdrawal after a lock-in (commonly 1 year from booking), subject to the institution's premature-closure policy and applicable penalty. We help you understand the applicable rules before booking.",
    },
    {
      q: "How is FD interest paid out?",
      a: "Payout frequency (e.g., monthly, quarterly, at maturity, cumulative) depends on the FD product and the bank/institution's terms. We help you choose a suitable option during booking.",
    },
    {
      q: "Is my FD deposit safe?",
      a: "Deposit safety and applicable limits (including deposit-insurance limits) depend on the respective bank/institution and prevailing regulations. TNL Fincorp is not the deposit-taking institution; it assists with guidance and application support.",
    },
    {
      q: "What documents are typically required for an FD?",
      a: "Typically identity proof (Aadhaar / PAN), address proof and bank account details, along with any other documents specified by the institution. We guide you on the documents usually required.",
    },
    {
      q: "Can senior citizens book an FD through TNL Fincorp?",
      a: "Yes. We assist senior citizens with FD options, including indicative additional-rate products where offered by the bank/institution. Final eligibility and rate depend on the institution's policies.",
    },
    {
      q: "How do I start my FD enquiry with TNL Fincorp?",
      a: "Submit an enquiry through the website, call +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documents and the booking journey.",
    },
  ],
  calculator: {
    depositAmount: 100000,
    monthlyDeposit: 0,
    rate: 7,
    tenureYears: 5,
  },
};

/**
 * RECURRING DEPOSIT (RD)
 * Interest rate is intentionally labelled indicative/configurable.
 */
export const RD_PRODUCT: InvestmentProduct = {
  title: "Recurring Deposit (RD)",
  slug: "rd",
  heroTitle: "Build savings monthly with Recurring Deposits",
  heroDescription:
    "TNL Fincorp helps you understand and book Recurring Deposit options with banks — a disciplined way to save a fixed amount every month for a chosen tenure and earn indicative interest. We guide you on options, documentation and the application journey.",
  image: "/images/rd-hero.jpg",
  piggyImage: "/images/piggy-bank.jpg",
  accent: "from-teal-brand to-cyan-brand",
  glow: "shadow-[0_20px_60px_-20px_rgba(20,184,166,0.55)]",
  overview:
    "A Recurring Deposit (RD) is a deposit product offered by banks and select institutions where you save a fixed amount every month for a chosen tenure and earn indicative interest. It encourages regular, disciplined saving. TNL Fincorp assists you in understanding available RD options, comparing indicative rates, organising documentation and guiding the application through the financial services network. The actual rate, tenure, contribution amount, premature-closure rules and other terms depend on the bank/institution and prevailing regulations.",
  benefits: [
    {
      icon: Calendar,
      title: "Disciplined monthly saving",
      desc: "Save a fixed amount every month for a chosen tenure — building a saving habit without a large lump sum.",
    },
    {
      icon: TrendingUp,
      title: "Indicative returns on contributions",
      desc: "Earn indicative interest on your monthly contributions based on the rate applicable at booking.",
    },
    {
      icon: Target,
      title: "Goal-based monthly plan",
      desc: "Align RD contributions with planned future goals such as education, family events or contingencies.",
    },
    {
      icon: Wallet,
      title: "Start small, save steadily",
      desc: "Many institutions accept RD bookings from a modest monthly contribution, subject to their terms.",
    },
    {
      icon: FileCheck,
      title: "Documentation assistance",
      desc: "We help you arrange the typical KYC and account-related documents required by the bank/institution.",
    },
    {
      icon: Handshake,
      title: "Application support",
      desc: "End-to-end guidance through the booking journey, from enquiry to submission of the application.",
    },
  ],
  whyChoose: [
    {
      icon: Landmark,
      title: "Direct RD with the bank",
      desc: "We assist you in booking the RD directly with the bank/institution. The monthly contribution, rate and terms are governed by the institution's policies and applicable regulations.",
    },
    {
      icon: Coins,
      title: "Start with a minimum of ₹500 per month",
      desc: "Many institutions accept RD bookings starting from ₹500 per month. The actual minimum monthly amount, eligibility and terms depend on the bank/institution.",
    },
    {
      icon: Clock,
      title: "Withdraw easily after 1 year",
      desc: "Several RD products allow premature closure after a lock-in (commonly 1 year from the booking date), subject to the institution's premature-closure policy and applicable penalty. TNL Fincorp helps you understand the applicable rules.",
    },
    {
      icon: PiggyBank,
      title: "Book RD instantly",
      desc: "With documentation in place, we assist you to complete the RD booking promptly. Final booking and confirmation depend on the bank/institution's verification and approval.",
    },
  ],
  safetyPoints: [
    "Deposit safety and any applicable limits (including deposit insurance limits) depend on the respective bank/institution and prevailing regulations.",
    "Interest rates are indicative and may change. The rate applicable to your deposit is the one offered by the bank/institution at the time of booking.",
    "Missed monthly contributions or premature closure may attract penalty as per the institution's policy.",
    "TNL Fincorp provides guidance and application assistance only — it is not the deposit-taking institution.",
  ],
  faqs: [
    {
      q: "What is a Recurring Deposit (RD)?",
      a: "A Recurring Deposit is a deposit product where you save a fixed amount every month with a bank/institution for a chosen tenure and earn indicative interest. TNL Fincorp helps you understand available options and complete the booking journey.",
    },
    {
      q: "Is RD booking guaranteed through TNL Fincorp?",
      a: "No. RD booking, eligibility, rate and tenure are subject to the bank/institution's policies, verification and approval. TNL Fincorp provides guidance and application support only.",
    },
    {
      q: "What is the minimum monthly amount to start an RD?",
      a: "Many institutions accept RD bookings from ₹500 per month onwards. The actual minimum monthly amount, eligibility and terms depend on the bank/institution and the specific RD product.",
    },
    {
      q: "What is the indicative interest rate for RDs?",
      a: "Interest rates are indicative and configurable in our calculator for planning only. The actual rate depends on the bank/institution, product, tenure and prevailing regulations on the date of booking.",
    },
    {
      q: "Can I close my RD before maturity?",
      a: "Several RD products allow premature closure after a lock-in (commonly 1 year from booking), subject to the institution's premature-closure policy and applicable penalty. We help you understand the applicable rules before booking.",
    },
    {
      q: "What happens if I miss a monthly contribution?",
      a: "Missed contributions may attract a penalty as per the bank/institution's RD policy. We help you understand the contribution schedule and applicable penalties before booking.",
    },
    {
      q: "How is RD maturity calculated?",
      a: "RD maturity is commonly estimated using the formula: maturity = monthly × (((1+i)^n − 1) / i) × (1+i), where i = rate/12/100 and n = months. Our calculator uses this formula for indicative estimates; the actual maturity depends on the institution's compounding rules.",
    },
    {
      q: "Is my RD deposit safe?",
      a: "Deposit safety and applicable limits (including deposit-insurance limits) depend on the respective bank/institution and prevailing regulations. TNL Fincorp is not the deposit-taking institution; it assists with guidance and application support.",
    },
    {
      q: "What documents are typically required for an RD?",
      a: "Typically identity proof (Aadhaar / PAN), address proof and bank account details, along with any other documents specified by the institution. We guide you on the documents usually required.",
    },
    {
      q: "How do I start my RD enquiry with TNL Fincorp?",
      a: "Submit an enquiry through the website, call +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documents and the booking journey.",
    },
  ],
  calculator: {
    depositAmount: 0,
    monthlyDeposit: 5000,
    rate: 7,
    tenureYears: 5,
  },
};

/**
 * General investment FAQ — applicable to both FD and RD.
 */
export const INVESTMENT_FAQS: InvestmentFaq[] = [
  {
    q: "Does TNL Fincorp accept deposits?",
    a: "No. TNL Fincorp is a financial services assistance company and does not accept deposits. We assist customers in understanding and booking FD/RD products with banks/institutions through our financial services network. Deposits are made directly with the respective bank/institution.",
  },
  {
    q: "Are the FD/RD interest rates shown on this site final?",
    a: "No. The interest rates shown are indicative and configurable in our calculators for planning purposes only. The actual rate depends on the bank/institution, product, tenure and prevailing regulations on the date of booking.",
  },
  {
    q: "Is my deposit amount protected?",
    a: "Deposit safety and applicable limits (including deposit-insurance limits) depend on the respective bank/institution and prevailing regulations. TNL Fincorp is not the deposit-taking institution; it provides guidance and application support only.",
  },
  {
    q: "Can I book both an FD and an RD?",
    a: "Yes. You can explore and book both FD and RD products through separate applications with the respective bank/institution, subject to their eligibility and terms. We assist you with both journeys.",
  },
  {
    q: "What is the difference between FD and RD?",
    a: "A Fixed Deposit (FD) involves depositing a single lump-sum amount for a chosen tenure, whereas a Recurring Deposit (RD) involves saving a fixed amount every month for a chosen tenure. Both earn indicative interest at the rate applicable on booking. See the comparison table for more details.",
  },
  {
    q: "Do you charge for FD/RD assistance?",
    a: "Any applicable charges or fees will be communicated transparently before proceeding. Deposit terms and conditions are set by the respective bank/institution.",
  },
  {
    q: "What documents are typically required?",
    a: "Typically identity proof (Aadhaar / PAN), address proof and bank account details, along with any other documents specified by the institution. We guide you on the documents usually required.",
  },
  {
    q: "How do I track my FD/RD booking?",
    a: "Booking status and account details are issued by the bank/institution. We assist you during the booking journey and help you understand the next steps once the institution confirms your booking.",
  },
  {
    q: "Can NRIs book FD/RD through TNL Fincorp?",
    a: "NRI eligibility and permissible deposit products depend on the bank/institution's policies and applicable regulations. We can help you understand suitable options based on your status; final eligibility is subject to the institution.",
  },
  {
    q: "How do I contact TNL Fincorp for investment assistance?",
    a: "You can call us at +91 94279 79991, email care@tnlfincorp.in, or visit our office at 34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli, Surat, Gujarat, India.",
  },
];

/**
 * FD vs RD comparison table — used on /investment pages.
 */
export const FD_VS_RD_COMPARISON: {
  feature: string;
  fd: string;
  rd: string;
}[] = [
  {
    feature: "Contribution Style",
    fd: "Single lump-sum deposit at the time of booking.",
    rd: "Fixed monthly contribution over the chosen tenure.",
  },
  {
    feature: "Saving Approach",
    fd: "Best when you already have a corpus to set aside.",
    rd: "Best when you want to build savings gradually every month.",
  },
  {
    feature: "Suitable For",
    fd: "Lump-sum savings, contingencies and goal-based horizons.",
    rd: "Disciplined monthly saving for planned future goals.",
  },
  {
    feature: "Calculator",
    fd: "Estimates maturity on a lump-sum deposit at an indicative rate.",
    rd: "Estimates maturity on monthly contributions at an indicative rate.",
  },
  {
    feature: "Booking",
    fd: "Booked directly with the bank/institution, subject to their terms.",
    rd: "Booked directly with the bank/institution, subject to their terms.",
  },
];

/**
 * Investment / deposit disclaimer — used across FD/RD pages and calculator footnotes.
 */
export const INVESTMENT_DISCLAIMER =
  "Investment/deposit products are subject to the terms and conditions of the respective institution. Interest rates and product features may change. Eligibility and booking are subject to applicable requirements. Calculator outputs are estimates. TNL Fincorp assists with guidance and application support; deposit safety and applicable limits depend on the respective bank/institution and applicable regulations.";

/**
 * Convenience re-exports so calculators / sections can import everything
 * from one place.
 */
export const INVESTMENT_PRODUCTS: InvestmentProduct[] = [FD_PRODUCT, RD_PRODUCT];

export const INVESTMENT_ICONS = {
  PiggyBank,
  TrendingUp,
  Calendar,
  Target,
  ShieldCheck,
  Lock,
  Landmark,
  Coins,
  Clock,
  Wallet,
  FileCheck,
  Handshake,
  Banknote,
  Percent,
  Trophy,
  CheckCircle2,
  Calculator,
};
