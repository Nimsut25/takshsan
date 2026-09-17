/**
 * loan-page-data.ts
 * ------------------
 * Comprehensive, fully-typed content for the 6 standalone premium loan pages
 * (Personal, Business, Home, Loan Against Property, Auto, Education).
 *
 * Design notes
 * - Each loan page is self-contained: this file provides everything beyond what
 *   is in LOAN_PRODUCTS (hero copy, floating cards, why-choose, process,
 *   eligibility, documents, loan types, partners, testimonials, trust counters,
 *   FAQ and an EMI calculator config).
 * - Financial-responsibility policy: every claim is worded with appropriate
 *   qualifiers ("subject to lender assessment", "up to", "as applicable",
 *   "terms and conditions apply"). There are NO "guaranteed approval",
 *   "lowest rate guaranteed" or similar promises anywhere in this file.
 * - Testimonials and trust counters are clearly editable placeholders. They are
 *   the single source of truth — the UI layer renders them as demo content.
 *
 * Imports only `LoanSlug` from `@/lib/site-data` — this file is self-contained
 * otherwise.
 */

import type { LucideIcon } from "lucide-react";
import {
  UserRound,
  Briefcase,
  Home,
  Building2,
  Car,
  GraduationCap,
  ShieldCheck,
  FileText,
  Clock,
  Wallet,
  TrendingUp,
  Target,
  Handshake,
  Network,
  Lock,
  Zap,
  CheckCircle2,
  Landmark,
  Coins,
  PiggyBank,
  Banknote,
  Percent,
  Trophy,
  Users,
  FileCheck2,
  CreditCard,
  Smartphone,
  BadgeIndianRupee,
  Calculator,
  ClipboardCheck,
  FileSignature,
  Stamp,
  Factory,
  Trees,
  Bike,
  CarFront,
  Receipt,
  ScrollText,
  Globe2,
  Rocket,
  ClipboardList,
  FileSearch,
  PhoneCall,
  LineChart,
  IndianRupee,
  BadgePercent,
  Building,
  BanknoteIcon,
  Mailbox,
  MessageSquare,
  MapPinned,
  Wallet2,
  Hourglass,
  BookOpen,
  GraduationCap as GradCap,
  Plane,
  Library,
  School,
  Wrench,
  HardHat,
  Hammer,
  TreePalm,
  Building2 as BuildingIcon,
  Microscope,
  Briefcase as BriefcaseIcon,
  Settings2,
  Truck,
  Gauge,
} from "lucide-react";

import type { LoanSlug } from "@/lib/site-data";

/* -------------------------------------------------------------------------- */
/* Shared types                                                               */
/* -------------------------------------------------------------------------- */

export type LoanBenefit = { icon: LucideIcon; title: string; desc: string };

export type LoanProcessStep = {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

export type LoanWhyBetter = { icon: LucideIcon; title: string; desc: string };

export type LoanTypeCard = { icon: LucideIcon; title: string; desc: string };

export type LoanTestimonial = {
  name: string;
  role: string;
  location: string;
  initials: string;
  accent: string;
  quote: string;
  rating: number;
  loanType: string;
};

export type TrustCounter = { value: number; suffix: string; label: string };

export type CalculatorConfig = {
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  minYears: number;
  maxYears: number;
  defaultYears: number;
  /** When true, the calculator renders a down-payment / margin input. */
  hasDownPayment?: boolean;
};

export type LoanPageContent = {
  slug: LoanSlug;
  route: string;
  /** e.g. "FAST • SIMPLE • DIGITAL" */
  eyebrow: string;
  /** e.g. "Instant Personal Loan" */
  heroHeadline: string;
  heroDescription: string;
  heroImage: string;
  /** 3–4 floating cards displayed on the hero image */
  heroFloatingCards: { icon: LucideIcon; label: string }[];
  /** Tailwind gradient classes e.g. "from-royal to-sky" */
  accent: string;
  /** Section: Why Choose / benefits */
  benefits: LoanBenefit[];
  /** Section: What Makes Us Better (4 cards) — optional */
  whyBetter?: LoanWhyBetter[];
  /** Section: Application process */
  process: LoanProcessStep[];
  /** Section: Eligibility */
  eligibility: { icon: LucideIcon; label: string; value: string }[];
  /** Section: Required documents */
  documents: { icon: LucideIcon; title: string; desc: string }[];
  /** Section: Loan types (home loan, auto loan, etc.) — optional */
  loanTypes?: LoanTypeCard[];
  /** Section: Partner brands (home loan) — placeholder names, clearly editable */
  partners?: string[];
  /** Section: Customer reviews (clearly editable placeholders / demo content) */
  testimonials: LoanTestimonial[];
  /**
   * Section: Trust banner counters.
   * NOTE: these are editable placeholders — replace with verified figures
   * before going live.
   */
  trustCounters: TrustCounter[];
  /** Section: FAQ */
  faqs: { q: string; a: string }[];
  /** EMI calculator config */
  calculator: CalculatorConfig;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
};

/* -------------------------------------------------------------------------- */
/* Shared trust counters                                                      */
/* -------------------------------------------------------------------------- */

/**
 * EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch.
 * Used as the default trust banner on each loan page; individual pages may
 * override the labels to feel product-specific while keeping values editable.
 */
const DEFAULT_TRUST_COUNTERS: TrustCounter[] = [
  { value: 50000, suffix: "+", label: "Customers Served" },
  { value: 75000, suffix: "+", label: "Loans Processed" },
  { value: 20, suffix: "+", label: "Partner Network" },
  { value: 100000, suffix: "+", label: "Applications Processed" },
];

/* -------------------------------------------------------------------------- */
/* 1. PERSONAL LOAN — /personal-loan                                          */
/* -------------------------------------------------------------------------- */

const personalLoan: LoanPageContent = {
  slug: "personal",
  route: "/personal-loan",
  eyebrow: "FAST • SIMPLE • DIGITAL",
  heroHeadline: "Instant Personal Loan",
  heroDescription:
    "Manage important life expenses — medical needs, family events, travel, home upgrades or lifestyle purchases — with personal loan assistance from TNL Fincorp. We help you understand available options, organise your documents and guide your application through our financial services network. Loan approval, eligibility, rates and tenure are subject to the respective lender's policies.",
  heroImage: "/images/loan-personal.jpg",
  heroFloatingCards: [
    { icon: Zap, label: "Quick Digital Enquiry" },
    { icon: ShieldCheck, label: "Secure & Private" },
    { icon: Wallet, label: "Flexible Amounts" },
    { icon: FileCheck2, label: "Documentation Help" },
  ],
  accent: "from-royal to-sky",

  benefits: [
    {
      icon: Network,
      title: "Multiple Lender Options",
      desc: "Explore personal loan options across our financial services network — offers may vary by lender and applicant profile.",
    },
    {
      icon: FileText,
      title: "Documentation Guidance",
      desc: "We help you understand and arrange the documents typically required for your personal loan application.",
    },
    {
      icon: Users,
      title: "Salaried & Self-Employed",
      desc: "Assistance for both salaried professionals and self-employed individuals, subject to lender eligibility.",
    },
    {
      icon: Handshake,
      title: "Personalised Assistance",
      desc: "Guidance built around your specific requirement — no one-size-fits-all approach.",
    },
    {
      icon: ShieldCheck,
      title: "End-to-End Support",
      desc: "Support from enquiry through application submission, with clear communication at each step.",
    },
    {
      icon: Clock,
      title: "Convenient Process",
      desc: "Submit your enquiry online or offline and our team will guide you on the next steps.",
    },
  ],

  whyBetter: [
    {
      icon: Trophy,
      title: "Highest Loan Amount",
      desc: "Explore higher eligible loan amounts across our lender network — final amount subject to lender assessment and your profile.",
    },
    {
      icon: BadgePercent,
      title: "Most Affordable Offers",
      desc: "We help you compare indicative offers across lenders. Actual rate depends on lender, applicant profile and credit assessment.",
    },
    {
      icon: ShieldCheck,
      title: "No Surprises",
      desc: "Any applicable processing fees, charges and terms are communicated transparently by the lender before you proceed.",
    },
    {
      icon: Zap,
      title: "Hassle-Free & Easy to Use",
      desc: "A simple, guided journey — share your requirement, get help with documents and we support you through submission.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Sign Up",
      desc: "Share your contact details and basic requirement to get started. A TNL Fincorp advisor will reach out to guide you.",
      icon: Smartphone,
    },
    {
      step: "02",
      title: "Profile Information",
      desc: "Provide your employment, income and basic profile details so we can understand suitable options for you.",
      icon: UserRound,
    },
    {
      step: "03",
      title: "Documents Verification & KYC",
      desc: "Submit identity, address and income documents. Verification timelines and requirements are set by the lender.",
      icon: FileCheck2,
    },
    {
      step: "04",
      title: "Select Amount & Tenure",
      desc: "Review indicative offers, loan amount and tenure options. Final approval, amount and rate are subject to lender assessment.",
      icon: Calculator,
    },
    {
      step: "05",
      title: "Disbursed in Bank",
      desc: "On lender approval, the sanctioned amount is disbursed to your bank account as per the lender's process.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: UserRound,
      label: "Age",
      value: "Typically 21–60 years (subject to lender policy)",
    },
    {
      icon: BadgeIndianRupee,
      label: "Income",
      value: "Stable monthly income — salaried or self-employed (lender-defined minimums)",
    },
    {
      icon: FileText,
      label: "Credit History",
      value: "Acceptable repayment history; final eligibility subject to lender credit assessment",
    },
    {
      icon: MapPinned,
      label: "Residence",
      value: "Indian resident with valid address proof",
    },
  ],

  documents: [
    {
      icon: FileText,
      title: "Identity Proof",
      desc: "Aadhaar / PAN / Passport / Driving Licence as accepted by the lender.",
    },
    {
      icon: MapPinned,
      title: "Address Proof",
      desc: "Aadhaar / Utility bill / Passport / Voter ID as accepted by the lender.",
    },
    {
      icon: Receipt,
      title: "Income Proof",
      desc: "Recent salary slips / bank statements / financials for self-employed.",
    },
    {
      icon: Briefcase,
      title: "Employment / Business Proof",
      desc: "Employee ID, offer letter or business registration as applicable.",
    },
    {
      icon: Stamp,
      title: "Additional Documents",
      desc: "Any other documents requested by the lender during verification.",
    },
  ],

  testimonials: [
    {
      name: "Rohit Sharma",
      role: "IT Professional",
      location: "Bengaluru",
      initials: "RS",
      accent: "from-royal to-sky",
      quote:
        "The team explained my personal loan options patiently and helped me arrange my documents. The whole enquiry felt organised and stress-free.",
      rating: 5,
      loanType: "Personal Loan",
    },
    {
      name: "Anjali Nair",
      role: "Marketing Manager",
      location: "Mumbai",
      initials: "AN",
      accent: "from-royal to-sky",
      quote:
        "I was unsure about the documents needed. TNL Fincorp gave me a clear checklist and walked me through every step of the application.",
      rating: 5,
      loanType: "Personal Loan",
    },
    {
      name: "Vikram Reddy",
      role: "Self-Employed",
      location: "Hyderabad",
      initials: "VR",
      accent: "from-royal to-sky",
      quote:
        "As a freelancer I was worried about eligibility. The team understood my requirement and supported me throughout the documentation process.",
      rating: 4,
      loanType: "Personal Loan",
    },
    {
      name: "Pooja Verma",
      role: "Teacher",
      location: "Pune",
      initials: "PV",
      accent: "from-royal to-sky",
      quote:
        "Honest guidance with no pressure. They explained that final approval is the lender's call — exactly the transparency I was looking for.",
      rating: 5,
      loanType: "Personal Loan",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "What is a personal loan?",
      a: "A personal loan is an unsecured loan typically used for expenses such as medical needs, weddings, travel, home renovation or lifestyle purchases. TNL Fincorp assists you in understanding available options, organising documents and guiding your application through the financial services network.",
    },
    {
      q: "Who can apply for a personal loan through TNL Fincorp?",
      a: "Indian residents, typically aged 21–60 years, who are salaried or self-employed with a stable income, may share an enquiry. Final eligibility is subject to the respective lender's policies and verification.",
    },
    {
      q: "How much personal loan amount can I get?",
      a: "Loan amounts vary by lender, applicant income, credit profile and other factors. TNL Fincorp helps you understand indicative amounts you may be eligible for; the final sanctioned amount is at the lender's discretion.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include identity proof, address proof, income proof (salary slips or bank statements), and employment or business proof. Additional documents may be requested by the lender based on its verification process.",
    },
    {
      q: "How is the personal loan interest rate determined?",
      a: "Interest rates are determined by the lender based on factors such as your credit score, income, employment stability, existing obligations and internal risk assessment. TNL Fincorp does not set rates — we help you understand indicative offers from lenders in our network.",
    },
    {
      q: "How long does approval take?",
      a: "Approval timelines vary by lender and depend on document verification, credit assessment and internal processes. Some lenders offer quicker processing for pre-qualified profiles, but no approval timeframe is guaranteed.",
    },
    {
      q: "How is the EMI calculated?",
      a: "EMI depends on the loan amount, interest rate and tenure. You can use the EMI calculator on this page for an indicative estimate. The actual EMI is based on the final rate, tenure and terms set by the lender.",
    },
    {
      q: "Can I repay my personal loan early?",
      a: "Early repayment (foreclosure or prepayment) is generally allowed by lenders, subject to their terms and any applicable charges. Please review the lender's specific foreclosure and prepayment policy before proceeding.",
    },
    {
      q: "Is there a processing fee?",
      a: "Lenders may charge a processing fee, which varies by lender and product. Any applicable fees and charges are communicated by the lender before you proceed. TNL Fincorp does not levy lender fees.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 50000,
    maxAmount: 4000000,
    defaultAmount: 500000,
    minRate: 10,
    maxRate: 24,
    defaultRate: 14,
    minYears: 1,
    maxYears: 5,
    defaultYears: 3,
  },

  metaTitle:
    "Personal Loan Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Personal loan assistance for salaried and self-employed individuals. Explore options, get documentation help and guided application support through TNL Fincorp's financial services network.",
};

/* -------------------------------------------------------------------------- */
/* 2. BUSINESS LOAN — /business-loan                                          */
/* -------------------------------------------------------------------------- */

const businessLoan: LoanPageContent = {
  slug: "business",
  route: "/business-loan",
  eyebrow: "FLEXIBLE • SCALABLE • WORKING CAPITAL",
  heroHeadline: "Business Loan",
  heroDescription:
    "Fuel your business growth — working capital, expansion, equipment, inventory or operational requirements — with business loan assistance from TNL Fincorp. We help MSMEs, professionals and enterprises understand suitable loan options, structure documentation and complete the application process. All loan terms, eligibility and approvals are subject to the respective lender's policies.",
  heroImage: "/images/loan-business.jpg",
  heroFloatingCards: [
    { icon: TrendingUp, label: "Growth Capital" },
    { icon: Briefcase, label: "MSME Friendly" },
    { icon: Wallet, label: "Flexible Usage" },
    { icon: ShieldCheck, label: "Guided Process" },
  ],
  accent: "from-teal-brand to-cyan-brand",

  benefits: [
    {
      icon: BadgeIndianRupee,
      title: "Affordable Credit Every Step",
      desc: "Explore indicative business loan offers across our lender network. Actual rate depends on lender, business profile and credit assessment.",
    },
    {
      icon: Zap,
      title: "Hassle-Free Process",
      desc: "Guided documentation and application support from enquiry to submission — no guesswork.",
    },
    {
      icon: Clock,
      title: "Flexible Repayment",
      desc: "Understand repayment tenures and structures offered by lenders; final tenure subject to lender assessment.",
    },
    {
      icon: Lock,
      title: "Zero Collateral*",
      desc: "Some lenders offer collateral-free business loans for eligible profiles, subject to lender/product terms, business vintage and credit assessment.",
    },
    {
      icon: Network,
      title: "Multiple Lender Network",
      desc: "Access assistance across working capital, term loan and MSME loan options through our financial services network.",
    },
    {
      icon: FileText,
      title: "Documentation Support",
      desc: "Clear guidance on the financial and business documents typically required for a business loan application.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Check Eligibility",
      desc: "Share your business profile, vintage and turnover. We help you understand indicative eligibility across lenders.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Select Offers",
      desc: "Review indicative offers — amounts, rates and tenures vary by lender. Final offer is subject to lender assessment.",
      icon: Target,
    },
    {
      step: "03",
      title: "Documents Verification & KYC",
      desc: "Submit business and financial documents for verification. Requirements and timelines are set by the lender.",
      icon: FileCheck2,
    },
    {
      step: "04",
      title: "Disbursed in Bank",
      desc: "On lender approval, the sanctioned amount is disbursed to your business bank account per the lender's process.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: Briefcase,
      label: "Business Vintage",
      value: "Typically 2+ years (subject to lender policy)",
    },
    {
      icon: TrendingUp,
      label: "Annual Turnover",
      value: "Stable turnover as required by the lender",
    },
    {
      icon: FileText,
      label: "GST & Financials",
      value: "GST returns and audited financials in order",
    },
    {
      icon: Landmark,
      label: "Credit Profile",
      value: "Acceptable repayment history; subject to lender assessment",
    },
  ],

  documents: [
    {
      icon: Stamp,
      title: "Business Registration",
      desc: "Shop & Establishment, GST, MSME / Udyam, or company registration as applicable.",
    },
    {
      icon: FileText,
      title: "Financial Statements",
      desc: "Audited financials, GST returns and bank statements (typically 6–12 months).",
    },
    {
      icon: Landmark,
      title: "Bank Statements",
      desc: "Business bank statements reflecting transactions and turnover.",
    },
    {
      icon: UserRound,
      title: "PAN & KYC",
      desc: "PAN and KYC of proprietor / partners / directors as applicable.",
    },
    {
      icon: FileSignature,
      title: "Additional Documents",
      desc: "Any other documents requested by the lender during assessment.",
    },
  ],

  testimonials: [
    {
      name: "Aarav Patel",
      role: "Founder, Textile Business",
      location: "Surat",
      initials: "AP",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "For my working capital requirement, TNL Fincorp clearly explained what each lender would need. The documentation guidance saved me several back-and-forths.",
      rating: 5,
      loanType: "Business Loan",
    },
    {
      name: "Neha Kulkarni",
      role: "Boutique Owner",
      location: "Pune",
      initials: "NK",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "As a small business owner I found the process intimidating. The team patiently walked me through every document and step.",
      rating: 5,
      loanType: "Business Loan",
    },
    {
      name: "Sanjay Gupta",
      role: "Retailer",
      location: "Jaipur",
      initials: "SG",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "Honest about the fact that final approval is the lender's call. That transparency is exactly why I trusted them with my application.",
      rating: 4,
      loanType: "Business Loan",
    },
    {
      name: "Vikram Reddy",
      role: "Manufacturing Unit Owner",
      location: "Bengaluru",
      initials: "VR",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "The working capital guidance was clear and practical. The team understood my business requirement and supported the documentation properly.",
      rating: 5,
      loanType: "Business Loan",
    },
    {
      name: "Pooja Bhatia",
      role: "Restaurant Owner",
      location: "Chandigarh",
      initials: "PB",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "They explained how lenders look at GST returns and bank statements. The documentation checklist they shared saved me a lot of back-and-forth.",
      rating: 5,
      loanType: "Business Loan",
    },
    {
      name: "Rohan Deshpande",
      role: "Pharma Distributor",
      location: "Nagpur",
      initials: "RD",
      accent: "from-teal-brand to-cyan-brand",
      quote:
        "I appreciated that they were upfront — final sanction and rate depend on the lender's assessment of my business profile. Guidance was honest throughout.",
      rating: 4,
      loanType: "Business Loan",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "Who is eligible for a business loan through TNL Fincorp?",
      a: "MSMEs, professionals, proprietors, partnerships and private limited companies with the required business vintage and turnover, as defined by the lender, may share an enquiry. Final eligibility is subject to the respective lender's policies and verification.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include business registration proof, GST returns, audited financials, bank statements and PAN/KYC of proprietors, partners or directors. Additional documents may be requested by the lender based on its assessment.",
    },
    {
      q: "How much business loan amount can I get?",
      a: "Loan amounts vary by lender, business profile, turnover and credit assessment. We help you understand indicative amounts you may be eligible for; the final sanctioned amount is at the lender's discretion.",
    },
    {
      q: "What interest rates apply to business loans?",
      a: "Interest rates are determined by the lender based on your business profile, financials, credit assessment and loan structure. TNL Fincorp does not set rates — we help you understand indicative offers from lenders in our network.",
    },
    {
      q: "What tenures are available?",
      a: "Tenures vary by lender and product (working capital, term loan, etc.). Typical tenures range from 1 to 10 years; final tenure is subject to lender assessment and product terms.",
    },
    {
      q: "How is repayment structured?",
      a: "Repayment structures (EMI, bullet, overdraft, etc.) depend on the lender and product. We help you understand typical structures; final terms are set by the lender.",
    },
    {
      q: "Is there a processing fee?",
      a: "Lenders may charge a processing fee, which varies by lender and product. Any applicable fees and charges are communicated by the lender before you proceed. TNL Fincorp does not levy lender fees.",
    },
    {
      q: "Is collateral required for a business loan?",
      a: "Some lenders offer collateral-free business loans for eligible profiles, while others may require collateral or security. This is subject to the lender's product terms, your business profile and credit assessment.",
    },
    {
      q: "Do you assist startups?",
      a: "We assist with understanding available business loan options. Eligibility for startups depends on the respective lender's policies, business vintage and financial profile.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 100000,
    maxAmount: 20000000,
    defaultAmount: 2500000,
    minRate: 11,
    maxRate: 22,
    defaultRate: 15,
    minYears: 1,
    maxYears: 10,
    defaultYears: 5,
  },

  metaTitle:
    "Business Loan Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Business loan assistance for MSMEs, professionals and enterprises — working capital, expansion, equipment and inventory. Guided documentation and application support through TNL Fincorp.",
};

/* -------------------------------------------------------------------------- */
/* 3. HOME LOAN — /home-loan                                                  */
/* -------------------------------------------------------------------------- */

const homeLoan: LoanPageContent = {
  slug: "home",
  route: "/home-loan",
  eyebrow: "BUILD • OWN • CELEBRATE",
  heroHeadline: "Home Loan",
  heroDescription:
    "Purchase, construct or renovate your home with home loan assistance from TNL Fincorp. We help you understand available options, structure property-related documentation and guide your application through our financial services network. Loan amount, LTV, tenure, rates and approval are subject to the respective lender's policies and property assessment.",
  heroImage: "/images/loan-home.jpg",
  heroFloatingCards: [
    { icon: Home, label: "Up to 90% Funding*" },
    { icon: Clock, label: "Up to 30 Year Tenure*" },
    { icon: Network, label: "Lender Network" },
    { icon: Handshake, label: "Agent Support" },
  ],
  accent: "from-royal to-teal-brand",

  benefits: [
    {
      icon: BadgeIndianRupee,
      title: "Up to 90% of Property Value*",
      desc: "LTV (loan-to-value) up to 90% of property value, subject to lender policy, property type, valuation and applicant profile.",
    },
    {
      icon: Clock,
      title: "Repayment Up to 30 Years*",
      desc: "Long repayment tenures up to 30 years, subject to lender policy, applicant age and eligibility assessment.",
    },
    {
      icon: Zap,
      title: "Quick Approval & Processing",
      desc: "Guided application process aimed at efficient turnaround. Actual timelines are subject to lender verification and documentation.",
    },
    {
      icon: Percent,
      title: "Zero Charges*",
      desc: "Some lenders may waive specific charges — subject to lender offers and terms. Any applicable fees are communicated by the lender before you proceed.",
    },
    {
      icon: Handshake,
      title: "Agent Support",
      desc: "Dedicated assistance from enquiry through submission, including property documentation guidance.",
    },
    {
      icon: Smartphone,
      title: "100% Online Application",
      desc: "Share your enquiry digitally and our team will guide you through documentation and the application journey.",
    },
  ],

  /* Placeholder partner names — clearly editable. Replace with real partner
     lenders before going live. Do NOT invent real bank names here. */
  partners: [
    "Partner Bank 1",
    "Housing Lender A",
    "Partner Bank 2",
    "Housing Lender B",
    "Partner Bank 3",
    "Housing Lender C",
  ],

  process: [
    {
      step: "01",
      title: "Personal Details",
      desc: "Share your income, employment and property details so we can understand suitable home loan options for you.",
      icon: UserRound,
    },
    {
      step: "02",
      title: "Agent Call for Verification",
      desc: "A TNL Fincorp advisor reaches out to verify details and guide you on documentation requirements.",
      icon: PhoneCall,
    },
    {
      step: "03",
      title: "Site Visit",
      desc: "Lender may arrange a property site visit and technical/legal verification as part of the assessment process.",
      icon: MapPinned,
    },
    {
      step: "04",
      title: "Loan Approval & Funds Disbursed",
      desc: "On lender approval, the sanctioned loan amount is disbursed as per the lender's disbursement schedule.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: MapPinned,
      label: "Citizenship",
      value: "Indian citizen",
    },
    {
      icon: UserRound,
      label: "Age",
      value: "Typically 21–70 years (subject to lender policy)",
    },
    {
      icon: Briefcase,
      label: "Self-Employed",
      value: "Annual turnover typically minimum ₹3 lakhs (lender-defined)",
    },
    {
      icon: BadgeIndianRupee,
      label: "Salaried",
      value: "Minimum monthly salary typically ₹15,000 (lender-defined)",
    },
    {
      icon: LineChart,
      label: "Credit Score",
      value: "CIBIL typically above 600 (subject to lender policy)",
    },
  ],

  documents: [
    {
      icon: Receipt,
      title: "Proof of Income",
      desc: "Salary slips (for salaried) or financial statements (for self-employed) as required by the lender.",
    },
    {
      icon: Landmark,
      title: "Bank Statement",
      desc: "Recent bank statements (typically 6–12 months) reflecting income and transactions.",
    },
    {
      icon: MapPinned,
      title: "Permanent Residence Proof",
      desc: "Aadhaar / Passport / Voter ID / utility bill as accepted by the lender.",
    },
    {
      icon: FileText,
      title: "Property Documents",
      desc: "Title deed, sale agreement, approvals and other property papers as required by the lender.",
    },
    {
      icon: FileCheck2,
      title: "Latest Form 16",
      desc: "Latest Form 16 / tax documents as applicable and required by the lender.",
    },
  ],

  loanTypes: [
    {
      icon: Home,
      title: "Home Purchase Loan",
      desc: "Financing assistance for purchasing a new or resale residential property, subject to lender and property eligibility.",
    },
    {
      icon: Wrench,
      title: "Home Improvement Loan",
      desc: "Loans for renovation, repair or upgrade of an existing home, subject to lender terms.",
    },
    {
      icon: HardHat,
      title: "Construction Loan",
      desc: "Funding assistance for constructing a residential house, subject to lender and property assessment.",
    },
    {
      icon: Trees,
      title: "Plot Loan",
      desc: "Loans for purchasing a residential plot, subject to lender policy and property documentation.",
    },
  ],

  testimonials: [
    {
      name: "Priya Desai",
      role: "Home Buyer",
      location: "Surat",
      initials: "PD",
      accent: "from-royal to-teal-brand",
      quote:
        "The home loan paperwork looked overwhelming at first. TNL Fincorp guided me step by step and made the application support easy to understand.",
      rating: 5,
      loanType: "Home Loan",
    },
    {
      name: "Manish Agarwal",
      role: "Salaried Professional",
      location: "Ahmedabad",
      initials: "MA",
      accent: "from-royal to-teal-brand",
      quote:
        "They explained how LTV, tenure and rate are decided by the lender. Honest guidance — no inflated promises.",
      rating: 5,
      loanType: "Home Loan",
    },
    {
      name: "Kavya Iyer",
      role: "First-Time Buyer",
      location: "Chennai",
      initials: "KI",
      accent: "from-royal to-teal-brand",
      quote:
        "As a first-time buyer I had many questions about property documents. The team was patient and explained each one clearly.",
      rating: 4,
      loanType: "Home Loan",
    },
    {
      name: "Suresh Nair",
      role: "Senior Banker",
      location: "Kochi",
      initials: "SN",
      accent: "from-royal to-teal-brand",
      quote:
        "The team clarified how loan eligibility is calculated from net income and existing obligations. The step-by-step application support was very helpful.",
      rating: 5,
      loanType: "Home Loan",
    },
    {
      name: "Anjali Verma",
      role: "Government Employee",
      location: "Lucknow",
      initials: "AV",
      accent: "from-royal to-teal-brand",
      quote:
        "They walked me through the property documents the lender would verify. As a first-time applicant, I felt well-informed at every stage.",
      rating: 5,
      loanType: "Home Loan",
    },
    {
      name: "Rajiv Khanna",
      role: "NRI Returning Home",
      location: "Chandigarh",
      initials: "RK",
      accent: "from-royal to-teal-brand",
      quote:
        "As an NRI, the paperwork seemed daunting. TNL Fincorp explained the KYC and power-of-attorney requirements clearly, with no inflated promises.",
      rating: 4,
      loanType: "Home Loan",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "What is a home loan?",
      a: "A home loan is a secured loan used to purchase, construct or renovate a residential property. TNL Fincorp assists you with understanding options, property documentation and the application process through our financial services network.",
    },
    {
      q: "How much home loan amount am I eligible for?",
      a: "Eligible loan amounts depend on your income, age, existing obligations, credit profile and the property's value. LTV typically goes up to 90% of property value, subject to lender policy and property assessment.",
    },
    {
      q: "What tenure can I choose?",
      a: "Home loan tenures can extend up to 30 years, subject to lender policy, applicant age and eligibility assessment. Longer tenures typically result in lower EMIs but higher overall interest.",
    },
    {
      q: "What interest rates apply to home loans?",
      a: "Interest rates are determined by the lender based on your credit profile, income, loan amount, tenure and the prevailing rate environment. TNL Fincorp does not set rates — we help you understand indicative offers.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include identity and address proof, income proof / salary slips, bank statements, property documents (title, agreement, approvals) and tax/Form 16 documents. Additional documents may be requested by the lender.",
    },
    {
      q: "Can I get a home loan for an under-construction property?",
      a: "Yes, many lenders offer home loans for under-construction properties, subject to the lender's approved-project list and property documentation. We help you understand the typical process and paperwork.",
    },
    {
      q: "Is a home loan balance transfer possible?",
      a: "Yes. We can assist you with understanding balance transfer and top-up options available through our financial services network. Final terms are subject to the new lender's policies.",
    },
    {
      q: "Can I prepay or foreclose my home loan?",
      a: "Prepayment and foreclosure are generally allowed by lenders, subject to their terms and any applicable charges. Please review the lender's specific policy before proceeding.",
    },
    {
      q: "Is property documentation guidance included?",
      a: "Yes. We guide you on the typical documentation required, though final documentation and legal verification are governed by the respective lender.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 100000,
    maxAmount: 100000000,
    defaultAmount: 5000000,
    minRate: 7,
    maxRate: 12,
    defaultRate: 8.5,
    minYears: 1,
    maxYears: 30,
    defaultYears: 20,
  },

  metaTitle:
    "Home Loan Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Home loan assistance for purchase, construction, renovation and plot financing. Guided documentation, property paperwork help and application support through TNL Fincorp's lender network.",
};

/* -------------------------------------------------------------------------- */
/* 4. AUTO LOAN — /auto-loan                                                  */
/* -------------------------------------------------------------------------- */

const autoLoan: LoanPageContent = {
  slug: "auto",
  route: "/auto-loan",
  eyebrow: "NEW • USED • COMMERCIAL",
  heroHeadline: "Auto Loan",
  heroDescription:
    "Drive home your vehicle — a new car, a used car or a commercial vehicle — with auto loan assistance from TNL Fincorp. We help you understand available options, documentation and the application process through our financial services network. Loan amount, LTV, rates, tenure and approval are subject to the respective lender's policies and vehicle assessment.",
  heroImage: "/images/loan-auto.jpg",
  heroFloatingCards: [
    { icon: Car, label: "New & Used" },
    { icon: CarFront, label: "Car Finance" },
    { icon: Truck, label: "Commercial" },
    { icon: Percent, label: "Down Payment Help" },
  ],
  accent: "from-sky to-cyan-brand",

  benefits: [
    {
      icon: CarFront,
      title: "New & Used Vehicle Financing",
      desc: "Assistance for both new and used vehicle loans, subject to lender policy, vehicle age and condition assessment.",
    },
    {
      icon: Gauge,
      title: "Flexible Tenure Options",
      desc: "Explore indicative tenure options to balance your EMI and repayment comfort. Final tenure is subject to lender policy.",
    },
    {
      icon: Truck,
      title: "Commercial Vehicles",
      desc: "Guidance for commercial vehicle loans, subject to lender policy and applicant profile.",
    },
    {
      icon: Percent,
      title: "Down Payment Guidance",
      desc: "Understand how down payment (margin money) affects your loan amount and EMI. Final LTV is set by the lender.",
    },
    {
      icon: Zap,
      title: "Quick Enquiry",
      desc: "Share your vehicle and income details — our team will guide you on indicative options.",
    },
    {
      icon: ShieldCheck,
      title: "End-to-End Support",
      desc: "Documentation, application and submission guidance through the loan journey.",
    },
  ],

  whyBetter: [
    {
      icon: Network,
      title: "Multiple Lender Options",
      desc: "Compare indicative offers across our lender network. Actual rate and LTV depend on lender, vehicle and applicant profile.",
    },
    {
      icon: Handshake,
      title: "Personalised Guidance",
      desc: "We help you understand how vehicle type, age and your income affect eligible loan amount.",
    },
    {
      icon: FileText,
      title: "Documentation Help",
      desc: "Clear checklist of documents typically required for new and used vehicle loans.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Process",
      desc: "Honest communication — final approval, rate and tenure are subject to the lender's assessment.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Share Vehicle & Income Details",
      desc: "Tell us the vehicle you plan to purchase and your income profile so we can understand suitable options.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Check Eligibility & Offers",
      desc: "We help you understand indicative LTV, rate and tenure across lenders. Final offer is subject to lender assessment.",
      icon: Target,
    },
    {
      step: "03",
      title: "Documents Verification & KYC",
      desc: "Submit identity, address and income documents plus vehicle quotation / valuation as required by the lender.",
      icon: FileCheck2,
    },
    {
      step: "04",
      title: "Loan Approval & Disbursal",
      desc: "On lender approval, the sanctioned amount is disbursed to the dealer / seller per the lender's process.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: UserRound,
      label: "Age",
      value: "Typically 21–65 years (subject to lender policy)",
    },
    {
      icon: BadgeIndianRupee,
      label: "Income",
      value: "Stable income — salaried or self-employed (lender-defined minimums)",
    },
    {
      icon: Car,
      label: "Vehicle",
      value: "Acceptable vehicle age and condition (for used vehicles)",
    },
    {
      icon: FileText,
      label: "Credit Profile",
      value: "Acceptable repayment history; subject to lender assessment",
    },
  ],

  documents: [
    {
      icon: FileText,
      title: "Identity Proof",
      desc: "Aadhaar / PAN / Passport / Driving Licence as accepted by the lender.",
    },
    {
      icon: MapPinned,
      title: "Address Proof",
      desc: "Aadhaar / Utility bill / Passport / Voter ID as accepted by the lender.",
    },
    {
      icon: Receipt,
      title: "Income Proof",
      desc: "Salary slips / bank statements / financials for self-employed applicants.",
    },
    {
      icon: Car,
      title: "Vehicle Quotation / Valuation",
      desc: "Dealer quotation for new vehicles; valuation report for used vehicles as required by the lender.",
    },
    {
      icon: Stamp,
      title: "Additional Documents",
      desc: "Any other documents requested by the lender during verification.",
    },
  ],

  loanTypes: [
    {
      icon: CarFront,
      title: "New Car Loan",
      desc: "Financing assistance for purchasing a new car, subject to lender and applicant eligibility.",
    },
    {
      icon: Car,
      title: "Used Car Loan",
      desc: "Loans for pre-owned cars, subject to vehicle age, condition and lender policy.",
    },
    {
      icon: Truck,
      title: "Commercial Vehicle Loan",
      desc: "Loans for commercial vehicles, subject to lender policy and applicant profile.",
    },
    {
      icon: Percent,
      title: "Down Payment & LTV Guidance",
      desc: "Understand how down payment and loan-to-value affect your vehicle loan. Final LTV is set by the lender.",
    },
  ],

  testimonials: [
    {
      name: "Karthik Subramaniam",
      role: "IT Professional",
      location: "Bengaluru",
      initials: "KS",
      accent: "from-sky to-cyan-brand",
      quote:
        "The team explained how down payment and tenure affect my EMI. Clear guidance with no pressure to commit.",
      rating: 5,
      loanType: "Auto Loan",
    },
    {
      name: "Deepa Joshi",
      role: "Doctor",
      location: "Indore",
      initials: "DJ",
      accent: "from-sky to-cyan-brand",
      quote:
        "I was buying a used car and unsure about the documentation. TNL Fincorp gave me a clear checklist and helped me organise everything.",
      rating: 5,
      loanType: "Auto Loan",
    },
    {
      name: "Imran Khan",
      role: "Business Owner",
      location: "Hyderabad",
      initials: "IK",
      accent: "from-sky to-cyan-brand",
      quote:
        "Honest about the fact that LTV and rate are decided by the lender. The application support was smooth and well-organised.",
      rating: 4,
      loanType: "Auto Loan",
    },
    {
      name: "Lakshmi Venkataraman",
      role: "Marketing Manager",
      location: "Coimbatore",
      initials: "LV",
      accent: "from-sky to-cyan-brand",
      quote:
        "They explained how the vehicle's ex-showroom price and LTV decide the loan amount. Clear guidance, with no pressure to choose a particular model.",
      rating: 5,
      loanType: "Auto Loan",
    },
    {
      name: "Arjun Malhotra",
      role: "Freelance Designer",
      location: "Mumbai",
      initials: "AM",
      accent: "from-sky to-cyan-brand",
      quote:
        "I was buying my first car. The documentation checklist and EMI breakdown helped me plan my down payment properly.",
      rating: 5,
      loanType: "Auto Loan",
    },
    {
      name: "Farhan Ahmed",
      role: "Logistics Operator",
      location: "Kolkata",
      initials: "FA",
      accent: "from-sky to-cyan-brand",
      quote:
        "Honest about the rate being the lender's call based on my credit profile. The application support was organised and transparent throughout.",
      rating: 4,
      loanType: "Auto Loan",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "What is an auto loan?",
      a: "An auto loan is a secured loan used to purchase a new or used vehicle, including cars and commercial vehicles. TNL Fincorp assists you with understanding options, documentation and the application process.",
    },
    {
      q: "Can I get a loan for a used vehicle?",
      a: "Yes. We assist with both new and used vehicle loans. For used vehicles, eligibility depends on the lender's policy on vehicle age, condition and valuation.",
    },
    {
      q: "How much loan amount can I get?",
      a: "Loan amounts depend on the vehicle price, LTV set by the lender, your income and credit profile. The final sanctioned amount is subject to the lender's assessment.",
    },
    {
      q: "What is a down payment?",
      a: "A down payment (margin money) is the portion of the vehicle price you pay upfront, with the lender financing the rest. A higher down payment typically reduces your loan amount and EMI. Final LTV is set by the lender.",
    },
    {
      q: "What interest rates apply to auto loans?",
      a: "Interest rates are determined by the lender based on your credit profile, vehicle type, loan amount and tenure. TNL Fincorp does not set rates — we help you understand indicative offers.",
    },
    {
      q: "What tenure can I choose?",
      a: "Auto loan tenures typically range from 1 to 7 years, subject to lender policy, vehicle type and applicant eligibility. Longer tenures usually mean lower EMIs but higher overall interest.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include identity and address proof, income proof, bank statements and vehicle quotation or valuation report. Additional documents may be requested by the lender.",
    },
    {
      q: "Can self-employed applicants get an auto loan?",
      a: "Yes. We assist both salaried and self-employed applicants. Final eligibility is subject to the lender's policies and verification.",
    },
    {
      q: "Is there a processing fee?",
      a: "Lenders may charge a processing fee, which varies by lender and product. Any applicable fees and charges are communicated by the lender before you proceed. TNL Fincorp does not levy lender fees.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 50000,
    maxAmount: 2000000,
    defaultAmount: 800000,
    minRate: 8,
    maxRate: 16,
    defaultRate: 11,
    minYears: 1,
    maxYears: 7,
    defaultYears: 5,
    hasDownPayment: true,
  },

  metaTitle:
    "Auto Loan Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Auto loan assistance for new and used cars and commercial vehicles. Down payment guidance, documentation help and application support through TNL Fincorp.",
};

/* -------------------------------------------------------------------------- */
/* 5. EDUCATION LOAN — /education-loan                                        */
/* -------------------------------------------------------------------------- */

const educationLoan: LoanPageContent = {
  slug: "education",
  route: "/education-loan",
  eyebrow: "STUDY IN INDIA • STUDY ABROAD",
  heroHeadline: "Education Loan",
  heroDescription:
    "Finance higher studies in India or eligible study destinations with education loan assistance from TNL Fincorp. We help students and families understand available options, course-related documentation and the application process through our financial services network. Loan amount, coverage, collateral requirements, moratorium, rates and approval are subject to the respective lender's policies and the applicant's profile.",
  heroImage: "/images/loan-education.jpg",
  heroFloatingCards: [
    { icon: GraduationCap, label: "India & Abroad" },
    { icon: BookOpen, label: "Tuition & Living" },
    { icon: Globe2, label: "Study Abroad" },
    { icon: ShieldCheck, label: "Co-applicant Help" },
  ],
  accent: "from-teal-brand to-royal",

  benefits: [
    {
      icon: School,
      title: "Education Funding Benefits",
      desc: "Guidance on loans for tuition, examination, library, laboratory and other academic expenses typically covered by lenders.",
    },
    {
      icon: Globe2,
      title: "Study in India / Study Abroad",
      desc: "Assistance for higher studies in India and eligible overseas study destinations, subject to lender policy and course/institution recognition.",
    },
    {
      icon: BookOpen,
      title: "Courses & Categories",
      desc: "Help for undergraduate, postgraduate, professional, technical and skill-based courses, subject to lender-approved course lists.",
    },
    {
      icon: Users,
      title: "Co-applicant Guidance",
      desc: "Most lenders require a co-applicant such as a parent or guardian with stable income. We help you understand typical requirements.",
    },
    {
      icon: FileText,
      title: "Documentation Support",
      desc: "Clear guidance on admission letters, academic records and co-applicant financial documents.",
    },
    {
      icon: Handshake,
      title: "End-to-End Assistance",
      desc: "Support from enquiry through application submission, with clear communication at each step.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Share Course & Admission Details",
      desc: "Provide your admission status, course and institution details so we can understand suitable options.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Check Eligibility & Offers",
      desc: "We help you understand indicative loan amounts and lender options. Final offer is subject to lender assessment.",
      icon: Target,
    },
    {
      step: "03",
      title: "Documents Verification & KYC",
      desc: "Submit admission, academic and co-applicant documents for verification as required by the lender.",
      icon: FileCheck2,
    },
    {
      step: "04",
      title: "Approval & Disbursal",
      desc: "On lender approval, the sanctioned amount is disbursed to the institution / student as per the lender's process.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: GraduationCap,
      label: "Admission",
      value: "Confirmed admission or offer letter from a recognised institution",
    },
    {
      icon: BookOpen,
      label: "Course",
      value: "Recognised course and institution (lender-approved list)",
    },
    {
      icon: Users,
      label: "Co-applicant",
      value: "Typically a parent / guardian with stable income (lender-defined)",
    },
    {
      icon: FileText,
      label: "Credit Profile",
      value: "Acceptable repayment history; subject to lender assessment",
    },
  ],

  documents: [
    {
      icon: FileSignature,
      title: "Admission Letter",
      desc: "Confirmed admission letter / offer letter from the recognised institution.",
    },
    {
      icon: BookOpen,
      title: "Academic Documents",
      desc: "Mark sheets, certificates and proof of previous academic qualifications.",
    },
    {
      icon: FileText,
      title: "Identity & Address Proof",
      desc: "Aadhaar / PAN / Passport of student and co-applicant as accepted by the lender.",
    },
    {
      icon: Receipt,
      title: "Co-applicant Income Proof",
      desc: "Salary slips / bank statements / financials of the co-applicant as required by the lender.",
    },
    {
      icon: Stamp,
      title: "Course / Fee Structure",
      desc: "Fee structure, course duration and expense breakdown from the institution.",
    },
  ],

  testimonials: [
    {
      name: "Sneha Mehta",
      role: "Parent",
      location: "Surat",
      initials: "SM",
      accent: "from-teal-brand to-royal",
      quote:
        "For my daughter's education loan enquiry, the team was responsive and helpful at every step. The documentation guidance was especially reassuring.",
      rating: 5,
      loanType: "Education Loan",
    },
    {
      name: "Aditya Rao",
      role: "Engineering Student",
      location: "Hyderabad",
      initials: "AR",
      accent: "from-teal-brand to-royal",
      quote:
        "I had an offer letter but no idea how to proceed. TNL Fincorp explained the typical documents and co-applicant requirements clearly.",
      rating: 5,
      loanType: "Education Loan",
    },
    {
      name: "Meera Krishnan",
      role: "Parent",
      location: "Chennai",
      initials: "MK",
      accent: "from-teal-brand to-royal",
      quote:
        "Honest guidance with no inflated promises. They clearly explained that final terms depend on the lender and the institution's recognition.",
      rating: 4,
      loanType: "Education Loan",
    },
    {
      name: "Nikhil Sharma",
      role: "MBA Aspirant",
      location: "Delhi",
      initials: "NS",
      accent: "from-teal-brand to-royal",
      quote:
        "I had admits from two universities and was unsure which documents mattered. The team explained the typical lender requirements clearly.",
      rating: 5,
      loanType: "Education Loan",
    },
    {
      name: "Lakshmi Iyer",
      role: "Parent of Postgraduate Student",
      location: "Bengaluru",
      initials: "LI",
      accent: "from-teal-brand to-royal",
      quote:
        "For my son's postgraduate studies abroad, the co-applicant and collateral guidance was very useful. They set realistic expectations on timelines.",
      rating: 5,
      loanType: "Education Loan",
    },
    {
      name: "Joseph Mathew",
      role: "Father of Medical Student",
      location: "Kochi",
      initials: "JM",
      accent: "from-teal-brand to-royal",
      quote:
        "They were transparent that final approval depends on the institution's recognition and my repayment capacity. The documentation support was thorough.",
      rating: 4,
      loanType: "Education Loan",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "What is an education loan?",
      a: "An education loan helps finance higher studies in India or eligible study destinations, typically covering tuition, examination, library, laboratory and other academic expenses as defined by the lender. TNL Fincorp assists with understanding options, documentation and the application process.",
    },
    {
      q: "Do you assist with education loans for studying abroad?",
      a: "Yes. We assist with exploring education loan options for India and eligible overseas study destinations, subject to lender policies and the institution's recognition.",
    },
    {
      q: "What courses are typically eligible?",
      a: "Undergraduate, postgraduate, professional, technical and skill-based courses from lender-recognised institutions are typically considered. Final eligibility is subject to the lender's approved course list.",
    },
    {
      q: "Is a co-applicant required?",
      a: "Most lenders require a co-applicant such as a parent or guardian with a stable income. Final requirements depend on the lender's policies and the loan amount.",
    },
    {
      q: "How much loan amount can I get?",
      a: "Loan amounts vary by lender, course, institution, country and the co-applicant's income. For study-abroad loans, lenders may have higher limits, subject to collateral requirements and assessment. We help you understand indicative amounts; final sanction is at the lender's discretion.",
    },
    {
      q: "Is collateral required for an education loan?",
      a: "Collateral requirements depend on the lender, loan amount and the lender's internal thresholds. Some lenders offer collateral-free education loans up to certain limits, while higher amounts may require collateral or a third-party guarantee. Final terms are subject to the lender's policy.",
    },
    {
      q: "Is there a moratorium / repayment holiday?",
      a: "Many lenders offer a moratorium during the course period plus a specified grace period thereafter, subject to lender policy. Repayment terms, including the moratorium duration, are defined by the lender. We help you understand typical structures; final terms are set by the lender.",
    },
    {
      q: "What interest rates apply to education loans?",
      a: "Interest rates are determined by the lender based on the course, institution, country, loan amount, co-applicant profile and credit assessment. TNL Fincorp does not set rates — we help you understand indicative offers.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include the admission letter, academic records, identity and address proof, and co-applicant income proof. Additional documents may be requested by the lender based on its verification process.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 100000,
    maxAmount: 5000000,
    defaultAmount: 1000000,
    minRate: 9,
    maxRate: 14,
    defaultRate: 11,
    minYears: 1,
    maxYears: 15,
    defaultYears: 10,
  },

  metaTitle:
    "Education Loan Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Education loan assistance for higher studies in India and eligible study destinations. Co-applicant guidance, documentation help and application support through TNL Fincorp.",
};

/* -------------------------------------------------------------------------- */
/* 6. LOAN AGAINST PROPERTY — /loan-against-property                          */
/* -------------------------------------------------------------------------- */

const loanAgainstProperty: LoanPageContent = {
  slug: "lap",
  route: "/loan-against-property",
  eyebrow: "HIGH-VALUE • LONG TENURE • MULTI-PURPOSE",
  heroHeadline: "Loan Against Property",
  heroDescription:
    "Unlock the value of your eligible residential, commercial or industrial property with a Loan Against Property (LAP) from TNL Fincorp. We help you understand available options, property documentation, eligibility discussions and the application process through our financial services network. Loan amount, LTV, valuation, rates, tenure and approval are subject to the respective lender's policies and property assessment.",
  heroImage: "/images/loan-lap.jpg",
  heroFloatingCards: [
    { icon: Building2, label: "Residential & Commercial" },
    { icon: BadgeIndianRupee, label: "Higher Loan Amounts" },
    { icon: Clock, label: "Longer Tenures" },
    { icon: Wallet, label: "Multi-Purpose Usage" },
  ],
  accent: "from-navy to-royal",

  benefits: [
    {
      icon: BadgeIndianRupee,
      title: "Higher Loan Amounts",
      desc: "LAP typically offers higher loan amounts based on property valuation, subject to lender LTV policy and assessment.",
    },
    {
      icon: Clock,
      title: "Longer Tenure Options",
      desc: "Repayment tenures up to 20 years (subject to lender policy, applicant age and eligibility assessment).",
    },
    {
      icon: Wallet,
      title: "Multi-Purpose Usage",
      desc: "Funds can generally be used for business expansion, working capital, education, wedding or other large expenses, subject to lender terms.",
    },
    {
      icon: Building2,
      title: "Residential & Commercial Property",
      desc: "Assistance for residential, commercial and industrial property, subject to lender policy and clear title.",
    },
    {
      icon: Handshake,
      title: "Personalised Guidance",
      desc: "We help you understand how property type, valuation and your income affect eligible loan amount.",
    },
    {
      icon: FileText,
      title: "Documentation Support",
      desc: "Clear guidance on property title, ownership and income documents typically required by lenders.",
    },
  ],

  /* How It Works — reusing process steps with clear lender-dependent wording. */
  process: [
    {
      step: "01",
      title: "Share Property & Requirement",
      desc: "Provide property type, approximate value and your funding requirement so we can understand suitable LAP options.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Property & Profile Assessment",
      desc: "Lender arranges property valuation and legal verification, alongside your income and credit assessment.",
      icon: FileSearch,
    },
    {
      step: "03",
      title: "Documents Verification & KYC",
      desc: "Submit property title, ownership and income documents for verification as required by the lender.",
      icon: FileCheck2,
    },
    {
      step: "04",
      title: "Approval & Disbursal",
      desc: "On lender approval, the sanctioned amount is disbursed as per the lender's process and disbursement schedule.",
      icon: Banknote,
    },
  ],

  eligibility: [
    {
      icon: FileText,
      label: "Property Ownership",
      value: "Owner of eligible property with clear title",
    },
    {
      icon: Building2,
      label: "Property Type",
      value: "Residential, commercial or industrial property accepted by lender",
    },
    {
      icon: BadgeIndianRupee,
      label: "Income",
      value: "Stable income source — salaried or self-employed (lender-defined)",
    },
    {
      icon: LineChart,
      label: "Credit Profile",
      value: "Acceptable repayment history; subject to lender assessment",
    },
  ],

  documents: [
    {
      icon: ScrollText,
      title: "Property Title & Ownership",
      desc: "Title deed, sale deed and ownership documents for the property being offered as security.",
    },
    {
      icon: FileText,
      title: "Identity & Address Proof",
      desc: "Aadhaar / PAN / Passport / Voter ID of all property owners and applicants.",
    },
    {
      icon: Receipt,
      title: "Income Proof",
      desc: "Salary slips / bank statements / audited financials as required by the lender.",
    },
    {
      icon: Stamp,
      title: "Property Tax & Approvals",
      desc: "Latest property tax receipts, building approvals and other property-related papers.",
    },
    {
      icon: FileSignature,
      title: "Additional Documents",
      desc: "Any other documents requested by the lender during legal and technical verification.",
    },
  ],

  loanTypes: [
    {
      icon: Home,
      title: "Residential Property",
      desc: "LAP against self-occupied, rented or under-construction residential property, subject to lender policy and clear title.",
    },
    {
      icon: Building2,
      title: "Commercial Property",
      desc: "LAP against shops, offices or other commercial property, subject to lender assessment and valuation.",
    },
    {
      icon: Factory,
      title: "Industrial Property",
      desc: "LAP against industrial property such as factories or warehouses, subject to lender policy and valuation.",
    },
    {
      icon: Trees,
      title: "Plot + Building",
      desc: "LAP against a plot with an existing building, subject to lender policy and clear title documentation.",
    },
  ],

  testimonials: [
    {
      name: "Rajesh Malhotra",
      role: "Business Owner",
      location: "Delhi",
      initials: "RM",
      accent: "from-navy to-royal",
      quote:
        "I needed funds for business expansion and considered LAP. The team explained how valuation and LTV are decided by the lender — clear and honest guidance.",
      rating: 5,
      loanType: "Loan Against Property",
    },
    {
      name: "Fatima Sheikh",
      role: "Entrepreneur",
      location: "Mumbai",
      initials: "FS",
      accent: "from-navy to-royal",
      quote:
        "Property documentation looked complex. TNL Fincorp gave me a clear checklist of title and ownership papers required by lenders.",
      rating: 5,
      loanType: "Loan Against Property",
    },
    {
      name: "Vivek Menon",
      role: "Manufacturer",
      location: "Coimbatore",
      initials: "VM",
      accent: "from-navy to-royal",
      quote:
        "Transparent about the fact that final LTV, rate and tenure depend on lender and property assessment. The application support was well-organised.",
      rating: 4,
      loanType: "Loan Against Property",
    },
    {
      name: "Anand Kapoor",
      role: "Hotel Owner",
      location: "Ahmedabad",
      initials: "AK",
      accent: "from-navy to-royal",
      quote:
        "The team explained how property valuation and title verification drive the loan amount. Honest guidance, with no exaggerated LTV claims.",
      rating: 5,
      loanType: "Loan Against Property",
    },
    {
      name: "Sunita Rao",
      role: "School Trustee",
      location: "Pune",
      initials: "SR",
      accent: "from-navy to-royal",
      quote:
        "Property papers for our trust were complex. TNL Fincorp gave a clear checklist and helped me organise the ownership and tax documents.",
      rating: 5,
      loanType: "Loan Against Property",
    },
    {
      name: "Gurpreet Singh",
      role: "Trader",
      location: "Ludhiana",
      initials: "GS",
      accent: "from-navy to-royal",
      quote:
        "I appreciated that they were upfront — final rate and tenure depend on the lender's assessment of the property and my profile. Smooth application support.",
      rating: 4,
      loanType: "Loan Against Property",
    },
  ],

  /* EDITABLE PLACEHOLDER FIGURES — replace with verified numbers before launch. */
  trustCounters: DEFAULT_TRUST_COUNTERS,

  faqs: [
    {
      q: "What is a Loan Against Property (LAP)?",
      a: "A Loan Against Property is a secured loan where you pledge eligible residential, commercial or industrial property to access funds. TNL Fincorp assists you with understanding LAP options, property documentation and the application process through the financial services network.",
    },
    {
      q: "What property types are accepted for LAP?",
      a: "Eligible residential, commercial or industrial property with clear title may be considered. Final acceptance depends on the lender's policies, property type, valuation and legal verification.",
    },
    {
      q: "How much loan amount can I get?",
      a: "Loan amounts depend on the property's valuation, lender LTV policy (typically a percentage of property value), your income and credit profile. The final sanctioned amount is at the lender's discretion.",
    },
    {
      q: "What is LTV (Loan-to-Value)?",
      a: "LTV is the percentage of the property's assessed value that the lender is willing to finance. Higher LTV means a higher loan amount but is subject to lender policy and applicant profile.",
    },
    {
      q: "What tenure can I choose?",
      a: "LAP tenures can extend up to 20 years, subject to lender policy, applicant age and eligibility assessment. Longer tenures typically result in lower EMIs but higher overall interest.",
    },
    {
      q: "What interest rates apply to LAP?",
      a: "Interest rates are determined by the lender based on property type, loan amount, applicant profile and credit assessment. TNL Fincorp does not set rates — we help you understand indicative offers.",
    },
    {
      q: "Can I use LAP funds for business purposes?",
      a: "Yes. LAP funds can generally be used for business or personal needs such as expansion, working capital, education or large expenses, subject to the respective lender's terms and conditions.",
    },
    {
      q: "How is property valuation done?",
      a: "The lender arranges a property valuation and legal verification through its empanelled valuers and legal counsel. The valuation figure is used to determine the eligible loan amount as per the lender's LTV policy.",
    },
    {
      q: "What documents are typically required?",
      a: "Common documents include property title and ownership papers, identity and address proof, income proof / financial statements, and property tax and approval documents. Additional documents may be requested by the lender.",
    },
    {
      q: "How do I apply through TNL Fincorp?",
      a: "Submit your enquiry through the form on this page, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on suitable options, documentation and the application process.",
    },
  ],

  calculator: {
    minAmount: 500000,
    maxAmount: 150000000,
    defaultAmount: 5000000,
    minRate: 9,
    maxRate: 16,
    defaultRate: 12,
    minYears: 1,
    maxYears: 20,
    defaultYears: 15,
  },

  metaTitle:
    "Loan Against Property Assistance in Surat | TNL Fincorp",
  metaDescription:
    "Loan Against Property assistance for residential, commercial and industrial property. Documentation, valuation and application support through TNL Fincorp's lender network.",
};

/* -------------------------------------------------------------------------- */
/* Aggregated export                                                          */
/* -------------------------------------------------------------------------- */

export const LOAN_PAGE_DATA: Record<LoanSlug, LoanPageContent> = {
  personal: personalLoan,
  business: businessLoan,
  home: homeLoan,
  lap: loanAgainstProperty,
  auto: autoLoan,
  education: educationLoan,
};

/* -------------------------------------------------------------------------- */
/* Helper utilities                                                           */
/* -------------------------------------------------------------------------- */

/** Look up a single loan page's content by its route (e.g. "/personal-loan"). */
export function getLoanPageByRoute(
  route: string,
): LoanPageContent | undefined {
  return Object.values(LOAN_PAGE_DATA).find((p) => p.route === route);
}

/** Look up a single loan page's content by its slug. */
export function getLoanPageBySlug(slug: LoanSlug): LoanPageContent {
  return LOAN_PAGE_DATA[slug];
}
