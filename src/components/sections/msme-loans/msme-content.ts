/**
 * Static content for the MSME Loans page (/msme-loans).
 */

/* ---------- Section 1: Hero ---------- */
export const MSME_HERO = {
  eyebrow: "MSME Business Finance",
  title: "MSME Loans",
  subtitle: "Powering Your Business Growth with Flexible MSME Financing",
  description:
    "Get financial support to expand your business, manage working capital, purchase commercial or industrial property, and unlock new growth opportunities with flexible MSME loan solutions.",
  primaryCta: "Apply Now",
  secondaryCta: "Explore MSME Loans",
} as const;

/* ---------- Section 2: About ---------- */
export const MSME_ABOUT = {
  eyebrow: "About MSME Loans",
  title: "About MSME Loans",
  description1:
    "MSME loans provide businesses with access to the funds they need to strengthen operations, expand their capabilities and pursue new opportunities. Whether you are managing day-to-day working capital, purchasing commercial or industrial property, expanding an existing business or entering a new line of business, the right financing can help support your business objectives.",
  description2:
    "From business expansion and working capital requirements to business infrastructure, new business opportunities and long-term growth, MSME financing can be structured around your business plans, subject to applicable eligibility and lending criteria.",
  cards: [
    {
      icon: "TrendingUp",
      title: "Business Growth",
      description: "Support your plans to scale and grow sustainably.",
    },
    {
      icon: "Wallet",
      title: "Flexible Financing",
      description: "Funding structured around different business requirements.",
    },
    {
      icon: "Banknote",
      title: "Working Capital Support",
      description: "Help manage operational and cash-flow requirements.",
    },
    {
      icon: "Rocket",
      title: "Expansion Opportunities",
      description: "Explore financing for eligible expansion plans.",
    },
  ],
} as const;

/* ---------- Section 3: Features & Benefits ---------- */
export const MSME_BENEFITS = {
  eyebrow: "Why Consider MSME Financing",
  title: "Features & Benefits",
  description:
    "MSME financing can help eligible businesses address different business funding requirements — from working capital and expansion to property and new business opportunities.",
  cards: [
    {
      icon: "Wallet",
      title: "Flexible Financing",
      description: "Funding solutions designed around different business requirements.",
      accent: "from-royal to-sky",
    },
    {
      icon: "TrendingUp",
      title: "Business Expansion",
      description: "Support your plans to expand operations, capacity, locations or infrastructure.",
      accent: "from-teal-brand to-cyan-brand",
    },
    {
      icon: "Banknote",
      title: "Working Capital Support",
      description: "Help manage day-to-day operational and cash-flow requirements.",
      accent: "from-navy to-royal",
    },
    {
      icon: "Building2",
      title: "Property Purchase",
      description: "Financing support for eligible industrial or commercial property requirements.",
      accent: "from-sky to-teal-brand",
    },
    {
      icon: "Sparkles",
      title: "New Business Opportunities",
      description: "Access funding to explore and develop new business lines.",
      accent: "from-royal to-teal-brand",
    },
    {
      icon: "CalendarClock",
      title: "Structured Repayment",
      description: "Loan structures can be designed according to applicable product terms and eligibility.",
      accent: "from-cyan-brand to-sky",
    },
  ],
} as const;

/* ---------- Section 4: Types of MSME Loans ---------- */
export const MSME_LOAN_TYPES = {
  eyebrow: "MSME Financing Options",
  title: "Types of MSME Loans",
  description:
    "Different financing options can serve different business requirements. Explore common MSME loan structures that may be suitable for eligible business purposes.",
  disclaimer:
    "Loan availability, amount, tenure, pricing and eligibility are subject to applicable policies, documentation, credit assessment and approval terms.",
  cards: [
    {
      icon: "TrendingUp",
      title: "Business Expansion Loan",
      description: "For businesses looking to expand operations, infrastructure, capacity or locations.",
      accent: "from-royal to-sky",
    },
    {
      icon: "Banknote",
      title: "Working Capital Loan",
      description: "For managing operational expenses and short-term business funding requirements.",
      accent: "from-teal-brand to-cyan-brand",
    },
    {
      icon: "Building2",
      title: "Commercial Property Loan",
      description: "For eligible commercial property-related requirements.",
      accent: "from-navy to-royal",
    },
    {
      icon: "Factory",
      title: "Industrial Property Loan",
      description: "For eligible industrial property acquisition or related business infrastructure requirements.",
      accent: "from-sky to-teal-brand",
    },
    {
      icon: "Rocket",
      title: "Business Loan for New Ventures",
      description: "For eligible businesses establishing or developing a new line of business.",
      accent: "from-royal to-teal-brand",
    },
    {
      icon: "RefreshCw",
      title: "Debt Consolidation / High-Interest Debt Repayment",
      description: "For eligible borrowers looking to restructure or repay existing high-interest business debt, subject to applicable eligibility and lender terms.",
      accent: "from-cyan-brand to-sky",
    },
  ],
} as const;

/* ---------- Section 5: Calculator ---------- */
export const MSME_CALCULATOR = {
  eyebrow: "Plan Your Repayment",
  title: "MSME Loan Calculator",
  description:
    "Estimate your potential monthly repayment based on the loan amount, interest rate and repayment tenure.",
  calculateBtn: "Calculate EMI",
  labels: {
    amount: "Loan Amount",
    rate: "Interest Rate (% p.a.)",
    tenure: "Loan Tenure",
    emi: "Estimated Monthly EMI",
    totalInterest: "Total Interest Payable",
    totalPayment: "Total Amount Payable",
    principal: "Principal Amount",
  },
  disclaimer:
    "This calculator provides an illustrative estimate only. Actual loan terms, interest rates, fees, repayment schedules and eligibility may vary.",
} as const;

/* ---------- Section 6: Loan Can Be Available For ---------- */
export const MSME_LOAN_PURPOSE = {
  eyebrow: "Business Purposes",
  title: "Loan Can Be Available For",
  slides: [
    {
      image: "/images/msme-loans/slide-1.png",
      title: "Expanding Your Existing Business",
      description:
        "Support your business expansion plans, increase capacity, upgrade operations or establish additional locations.",
    },
    {
      image: "/images/msme-loans/slide-2.png",
      title: "Purchase of Industrial / Commercial Property",
      description:
        "Explore financing support for eligible industrial or commercial property requirements that can strengthen your business infrastructure.",
    },
    {
      image: "/images/msme-loans/slide-3.png",
      title: "Repaying High-Interest Debt / Long-Term Working Capital",
      description:
        "Funding may help eligible businesses manage working capital requirements or address existing high-cost business debt, subject to applicable terms and approval.",
    },
    {
      image: "/images/msme-loans/slide-4.png",
      title: "Adding a New Line of Business",
      description:
        "Support your plans to diversify your business and explore new products, services or business opportunities.",
    },
  ],
} as const;

/* ---------- Section 7: CTA ---------- */
export const MSME_CTA = {
  eyebrow: "Ready to Take Your Business Forward?",
  title: "Ready to Take Your Business Forward?",
  description:
    "Apply for an MSME loan and explore financing options designed around your business requirements.",
  cta: "Apply Now",
} as const;

/* ---------- Section 8: FAQ ---------- */
export const MSME_FAQ = {
  eyebrow: "Need to Know More?",
  title: "Frequently Asked Questions About MSME Loans",
  items: [
    {
      q: "What is an MSME loan?",
      a: "An MSME loan is business financing designed to support eligible micro, small and medium enterprises with requirements such as working capital, business expansion, fixed assets, property and other approved business purposes.",
    },
    {
      q: "Who can apply for an MSME loan?",
      a: "Eligibility depends on the applicable product criteria, business profile, documentation, income, repayment capacity and credit assessment. Proprietorships, partnerships, LLPs and companies engaged in eligible business activities may consider applying.",
    },
    {
      q: "What can an MSME loan be used for?",
      a: "Depending on the applicable financing product, funds may support eligible business expansion, working capital, commercial or industrial property requirements, new business lines and other permitted business purposes.",
    },
    {
      q: "What documents are generally required?",
      a: "Documentation can vary, but may include identity and address proof, PAN, business registration documents, financial/business records and banking information as applicable. The exact list depends on the lender and the loan product.",
    },
    {
      q: "How much MSME loan can I apply for?",
      a: "The available amount depends on eligibility, business profile, financial information, credit assessment and applicable lending policies. There is no guaranteed loan amount — the final amount is determined by the lender based on their assessment.",
    },
    {
      q: "What is the repayment tenure?",
      a: "Repayment tenure depends on the selected product, loan amount, eligibility and applicable terms. Different products offer different tenure ranges, subject to the lender’s policies.",
    },
    {
      q: "How is the EMI calculated?",
      a: "EMI is calculated using the standard reducing-balance formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the principal, r is the monthly interest rate, and n is the number of monthly installments. You can use the MSME calculator above to estimate your EMI.",
    },
    {
      q: "Can an existing business apply for expansion funding?",
      a: "Yes. Eligible existing businesses may apply for financing for permitted expansion-related purposes, subject to applicable criteria and the lender’s assessment.",
    },
    {
      q: "Can MSME financing be used for working capital?",
      a: "Yes. Eligible working-capital requirements may be supported depending on the applicable loan product, subject to assessment and lending policies.",
    },
    {
      q: "How can I apply?",
      a: "Click the Apply Now button, complete the MSME application form and submit your details. Our team will review the information provided and contact you regarding the next steps.",
    },
  ],
} as const;

/* ---------- Application modal options ---------- */
export const MSME_BUSINESS_TYPES = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited",
  "Public Limited",
  "Other",
] as const;

export const MSME_LOAN_TYPE_OPTIONS = [
  "Business Expansion",
  "Working Capital",
  "Commercial Property",
  "Industrial Property",
  "New Business Line",
  "Debt Repayment",
  "Other",
] as const;

export const MSME_GENDER_OPTIONS = ["Male", "Female", "Other"] as const;
