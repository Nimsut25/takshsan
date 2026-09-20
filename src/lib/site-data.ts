import type { LucideIcon } from "lucide-react";
import {
  UserRound,
  Briefcase,
  Home,
  Building2,
  Car,
  GraduationCap,
  Phone,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Users,
  FileText,
  Network,
  Headphones,
  Handshake,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

export const COMPANY = {
  name: "TNL Fincorp",
  tagline: "Smart Loan Solutions. Simple Financial Journey.",
  phone: "+91 94279 79991",
  phoneHref: "tel:+919427979991",
  email: "care@tnlfincorp.in",
  emailHref: "mailto:care@tnlfincorp.in",
  address:
    "34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli, Surat, Gujarat, India.",
  city: "Surat",
  state: "Gujarat",
  year: 2026,
  description:
    "We are engaged in providing financial loan solutions to customers through various loan products, including Personal Loans, Business Loans, Home Loans, Loan Against Property (LAP), Auto Loans and Education Loans. We assist customers with suitable loan options, documentation, application processing and end-to-end support through our financial services network.",
};

/** In-page (homepage) anchor links used by the mobile side menu + footer quick links. */
export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Loans", href: "/#services" },
  { label: "Investment", href: "/investment" },
  { label: "Why Choose Us", href: "/#why" },
  { label: "How It Works", href: "/#how" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * Top-level desktop header navigation. "Why Choose Us", "How It Works" and
 * "FAQ" are intentionally NOT in the header (their sections remain on the
 * homepage and stay reachable via the mobile menu + footer quick links).
 * "Loans" and "Investment" are dropdowns (see LOAN_DROPDOWN + INVEST_DROPDOWN).
 */
export const HEADER_NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
] as const;

/** Loans dropdown items (desktop hover + mobile accordion). */
export const LOAN_DROPDOWN = [
  { label: "Personal Loan", href: "/personal-loan", slug: "personal" as const },
  { label: "Business Loan", href: "/business-loan", slug: "business" as const },
  { label: "Home Loan", href: "/home-loan", slug: "home" as const },
  { label: "Auto Loan", href: "/auto-loan", slug: "auto" as const },
  { label: "Education Loan", href: "/education-loan", slug: "education" as const },
  { label: "Loan Against Property", href: "/loan-against-property", slug: "lap" as const },
];

/** Map a loan slug to its standalone page route. */
export const LOAN_ROUTE: Record<LoanSlug, string> = {
  personal: "/personal-loan",
  business: "/business-loan",
  home: "/home-loan",
  lap: "/loan-against-property",
  auto: "/auto-loan",
  education: "/education-loan",
};

/** Investment dropdown items (desktop hover + mobile accordion). */
export const INVEST_DROPDOWN = [
  { label: "FD & RD", href: "/investment" },
  { label: "Fixed Deposit (FD)", href: "/investment/fd" },
  { label: "Recurring Deposit (RD)", href: "/investment/rd" },
  { label: "Government Bonds", href: "/government-bonds" },
  { label: "SIP & Mutual Funds", href: "/sip-mutual-funds" },
  { label: "Life Insurance", href: "/life-insurance" },
  { label: "General Insurance", href: "/general-insurance" },
  { label: "Motor Insurance", href: "/motor-insurance" },
];

/**
 * Social media profiles.
 * NOTE: These are clearly-marked configurable placeholders. Replace the `href`
 * values with the actual TNL Fincorp profile URLs before launch. They are kept
 * here in one place (not hardcoded inside components) so they are easy to update.
 */
export const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919427979991", // uses the official TNL phone number
    color: "from-[#25D366] to-[#128C7E]",
  },
  {
    label: "Instagram",
    href: "#", // placeholder — replace with real Instagram URL
    color: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    label: "Facebook",
    href: "#", // placeholder — replace with real Facebook URL
    color: "from-[#1877F2] to-[#0a5dc7]",
  },
] as const;

export type LoanSlug =
  | "personal"
  | "business"
  | "home"
  | "lap"
  | "auto"
  | "education";

export type LoanProduct = {
  slug: LoanSlug;
  title: string;
  short: string;
  description: string;
  image: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient classes
  glow: string;
  overview: string;
  benefits: string[];
  useCases: string[];
  eligibility: string[];
  documents: string[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    slug: "personal",
    title: "Personal Loan",
    short:
      "Flexible personal loan solutions to help manage important expenses, emergencies, travel, lifestyle needs and more.",
    description:
      "Flexible personal loan solutions to help manage important expenses, emergencies, travel, lifestyle needs and more.",
    image: "/images/loan-personal.jpg",
    icon: UserRound,
    accent: "from-royal to-sky",
    glow: "shadow-[0_20px_60px_-20px_rgba(56,102,243,0.55)]",
    overview:
      "A Personal Loan can help you manage important life expenses such as medical needs, family events, travel, home improvements or lifestyle purchases. TNL Fincorp assists you in understanding available personal loan options, organising your documentation and guiding your application through the financial services network.",
    benefits: [
      "Guidance for multiple personal loan options",
      "Assistance with documentation and application",
      "Flexible loan amounts and tenure discussions",
      "Support for salaried and self-employed individuals",
      "End-to-end application assistance",
    ],
    useCases: [
      "Medical or emergency expenses",
      "Wedding and family events",
      "Travel and lifestyle needs",
      "Home renovation or repairs",
      "Debt consolidation planning",
    ],
    eligibility: [
      "Indian resident, typically 21–60 years",
      "Salaried or self-employed with stable income",
      "Acceptable credit repayment history",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Identity proof (Aadhaar / PAN)",
      "Address proof",
      "Income proof / salary slips / bank statements",
      "Employment or business proof",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your requirement with us",
      "Explore suitable personal loan options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Is personal loan approval guaranteed through TNL Fincorp?",
        a: "No. Loan approval, eligibility, interest rates and tenure are subject to the policies, verification and approval processes of the respective lender. TNL Fincorp assists with guidance, documentation and application support only.",
      },
      {
        q: "Do you charge for personal loan assistance?",
        a: "Any applicable charges or fees will be communicated transparently before proceeding. Loan terms are set by the respective financial institution/lender.",
      },
    ],
  },
  {
    slug: "business",
    title: "Business Loan",
    short:
      "Financial solutions designed to support business expansion, working capital, equipment purchases and growth requirements.",
    description:
      "Financial solutions designed to support business expansion, working capital, equipment purchases and growth requirements.",
    image: "/images/loan-business.jpg",
    icon: Briefcase,
    accent: "from-teal-brand to-cyan-brand",
    glow: "shadow-[0_20px_60px_-20px_rgba(20,184,166,0.55)]",
    overview:
      "A Business Loan can support working capital, business expansion, equipment purchases, inventory or growth requirements. TNL Fincorp helps business owners understand suitable loan options, structure documentation and complete the application process through the financial services network.",
    benefits: [
      "Assistance across business loan variants",
      "Guidance for working capital & term loans",
      "Documentation and application support",
      "Suitable for MSMEs, professionals and enterprises",
      "End-to-end assistance through the journey",
    ],
    useCases: [
      "Working capital requirements",
      "Business expansion and new branches",
      "Equipment and machinery purchase",
      "Inventory and raw material funding",
      "Hiring and operational growth",
    ],
    eligibility: [
      "Business vintage as required by lender",
      "Stable business turnover and profitability",
      "GST and financial documents in order",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Business registration proof",
      "GST returns and financial statements",
      "Bank statements (business)",
      "PAN and KYC of proprietor/partners/directors",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your business requirement",
      "Explore suitable business loan options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Do you assist startups with business loans?",
        a: "TNL Fincorp assists with understanding available business loan options. Eligibility for startups depends on the respective lender's policies, business vintage and financial profile.",
      },
      {
        q: "Can you help with working capital loans?",
        a: "Yes. We assist with exploring working capital and term loan options and support you with documentation and application processing.",
      },
    ],
  },
  {
    slug: "home",
    title: "Home Loan",
    short:
      "Loan assistance for purchasing, constructing or financing your dream home with suitable financing options.",
    description:
      "Loan assistance for purchasing, constructing or financing your dream home with suitable financing options.",
    image: "/images/loan-home.jpg",
    icon: Home,
    accent: "from-royal to-teal-brand",
    glow: "shadow-[0_20px_60px_-20px_rgba(56,102,243,0.55)]",
    overview:
      "A Home Loan can help you purchase, construct or renovate your home. TNL Fincorp assists you with understanding home loan options, property-related documentation, eligibility discussions and the application process through the financial services network.",
    benefits: [
      "Assistance for purchase, construction & renovation",
      "Guidance for eligible property documentation",
      "Support for salaried and self-employed applicants",
      "Documentation and application assistance",
      "End-to-end guidance through the journey",
    ],
    useCases: [
      "Purchasing a new or resale home",
      "Constructing a house",
      "Home renovation or extension",
      "Plot + construction financing",
      "Balance transfer and top-up guidance",
    ],
    eligibility: [
      "Indian resident, typically 21–65 years",
      "Stable income (salaried or self-employed)",
      "Acceptable property title and valuation",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Identity and address proof",
      "Income proof / salary slips / bank statements",
      "Property documents (title, agreement, approvals)",
      "Tax and financial documents",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your home loan requirement",
      "Explore suitable home loan options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Can you help with home loan balance transfer?",
        a: "Yes. We can assist you with understanding balance transfer and top-up options available through our financial services network.",
      },
      {
        q: "Is property documentation guidance included?",
        a: "Yes. We guide you on the typical documentation required, though final documentation and legal verification are governed by the respective lender.",
      },
    ],
  },
  {
    slug: "lap",
    title: "Loan Against Property",
    short:
      "Utilize the value of eligible property to access funds for personal or business-related financial requirements.",
    description:
      "Utilize the value of eligible property to access funds for personal or business-related financial requirements.",
    image: "/images/loan-lap.jpg",
    icon: Building2,
    accent: "from-navy to-royal",
    glow: "shadow-[0_20px_60px_-20px_rgba(15,30,70,0.55)]",
    overview:
      "A Loan Against Property (LAP) lets you access funds by using eligible residential or commercial property. TNL Fincorp assists you with understanding LAP options, property documentation, eligibility discussions and the application process through the financial services network.",
    benefits: [
      "Assistance for residential & commercial property",
      "Guidance for personal or business fund usage",
      "Documentation and application support",
      "Support for salaried and self-employed applicants",
      "End-to-end assistance through the journey",
    ],
    useCases: [
      "Business expansion funding",
      "Large personal or family expenses",
      "Debt consolidation",
      "Education or wedding funding",
      "Working capital for self-employed",
    ],
    eligibility: [
      "Owner of eligible property with clear title",
      "Stable income source",
      "Acceptable property valuation",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Property title and ownership documents",
      "Identity and address proof",
      "Income proof / financial statements",
      "Property tax and approval documents",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your funding requirement",
      "Explore suitable LAP options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Can I use LAP funds for business purposes?",
        a: "Yes. Loan Against Property funds can generally be used for business or personal needs, subject to the respective lender's terms and conditions.",
      },
      {
        q: "What property types are considered for LAP?",
        a: "Eligible residential, commercial or industrial property with clear title may be considered. Final acceptance depends on the lender's policies and valuation.",
      },
    ],
  },
  {
    slug: "auto",
    title: "Auto Loan",
    short:
      "Loan assistance for purchasing a new or used vehicle with suitable financing options.",
    description:
      "Loan assistance for purchasing a new or used vehicle with suitable financing options.",
    image: "/images/loan-auto.jpg",
    icon: Car,
    accent: "from-sky to-cyan-brand",
    glow: "shadow-[0_20px_60px_-20px_rgba(56,189,248,0.55)]",
    overview:
      "An Auto Loan helps you finance a new or used vehicle. TNL Fincorp assists you with understanding auto loan options, documentation, eligibility discussions and the application process through the financial services network.",
    benefits: [
      "Assistance for new and used vehicles",
      "Guidance for cars & commercial vehicles",
      "Documentation and application support",
      "Support for salaried and self-employed applicants",
      "End-to-end assistance through the journey",
    ],
    useCases: [
      "New car purchase",
      "Used vehicle purchase",
      "Commercial vehicle financing",
      "Electric vehicle purchase",
      "Top-up on existing vehicle loan",
    ],
    eligibility: [
      "Indian resident, typically 21–65 years",
      "Stable income source",
      "Acceptable vehicle age and condition",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Identity and address proof",
      "Income proof / salary slips / bank statements",
      "Vehicle quotation or valuation (used vehicle)",
      "PAN and KYC documents",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your vehicle requirement",
      "Explore suitable auto loan options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Do you assist with used vehicle loans?",
        a: "Yes. We assist with exploring both new and used vehicle loan options, subject to the respective lender's vehicle age and condition policies.",
      },
      {
        q: "Can self-employed applicants get auto loans?",
        a: "Yes. We assist both salaried and self-employed applicants. Final eligibility is subject to the lender's policies and verification.",
      },
    ],
  },
  {
    slug: "education",
    title: "Education Loan",
    short:
      "Financial assistance for higher education and academic expenses in India and eligible study destinations.",
    description:
      "Financial assistance for higher education and academic expenses in India and eligible study destinations.",
    image: "/images/loan-education.jpg",
    icon: GraduationCap,
    accent: "from-teal-brand to-royal",
    glow: "shadow-[0_20px_60px_-20px_rgba(20,184,166,0.55)]",
    overview:
      "An Education Loan helps finance higher studies in India or eligible study destinations. TNL Fincorp assists students and families with understanding education loan options, documentation, eligibility discussions and the application process through the financial services network.",
    benefits: [
      "Assistance for India and overseas education",
      "Guidance for tuition, living and academic expenses",
      "Documentation and application support",
      "Support for admission and course documentation",
      "End-to-end assistance through the journey",
    ],
    useCases: [
      "Undergraduate and postgraduate studies",
      "Professional and technical courses",
      "Study abroad programs",
      "Skill and certification courses",
      "Living and academic expense support",
    ],
    eligibility: [
      "Confirmed admission or offer letter",
      "Recognised course and institution",
      "Co-applicant with stable income (typically parent/guardian)",
      "Final eligibility subject to lender policies",
    ],
    documents: [
      "Admission letter / offer letter",
      "Identity and address proof",
      "Academic documents",
      "Co-applicant income proof / bank statements",
      "Other documents as required by the lender",
    ],
    process: [
      "Share your education requirement",
      "Explore suitable education loan options",
      "Get documentation & application assistance",
      "Receive end-to-end support through the journey",
    ],
    faqs: [
      {
        q: "Do you assist with education loans for studying abroad?",
        a: "Yes. We assist with exploring education loan options for India and eligible overseas study destinations, subject to lender policies.",
      },
      {
        q: "Is a co-applicant required for an education loan?",
        a: "Most lenders require a co-applicant such as a parent or guardian with a stable income. Final requirements depend on the lender's policies.",
      },
    ],
  },
];

export const LOAN_TYPES = LOAN_PRODUCTS.map((p) => p.title);

export const WHY_FEATURES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
}[] = [
  {
    icon: Handshake,
    title: "Personalized Guidance",
    desc: "We help you understand available loan options based on your specific requirements and goals.",
    accent: "from-royal to-sky",
  },
  {
    icon: Network,
    title: "Multiple Loan Solutions",
    desc: "Access assistance across Personal, Business, Home, LAP, Auto and Education Loans.",
    accent: "from-teal-brand to-cyan-brand",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    desc: "Clear guidance through required documentation and the overall application process.",
    accent: "from-royal to-teal-brand",
  },
  {
    icon: Headphones,
    title: "End-to-End Assistance",
    desc: "Support throughout your loan application journey, from enquiry to submission.",
    accent: "from-sky to-cyan-brand",
  },
  {
    icon: Users,
    title: "Customer-Centric Approach",
    desc: "Focus on clear communication and understanding your actual financial requirements.",
    accent: "from-teal-brand to-royal",
  },
  {
    icon: Network,
    title: "Financial Service Network",
    desc: "Connect with suitable loan solutions through our financial services network.",
    accent: "from-navy to-royal",
  },
];

export const HOW_STEPS: {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    step: "01",
    title: "Share Your Requirement",
    desc: "Tell us what type of financing you need and your broad goals.",
    icon: Phone,
  },
  {
    step: "02",
    title: "Explore Suitable Options",
    desc: "Understand available loan solutions based on your requirement.",
    icon: Network,
  },
  {
    step: "03",
    title: "Documentation & Application",
    desc: "Get assistance with documentation and application processing.",
    icon: FileText,
  },
  {
    step: "04",
    title: "End-to-End Support",
    desc: "Receive guidance throughout the loan journey.",
    icon: ShieldCheck,
  },
];

export const TRUST_POINTS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Handshake,
    title: "Customer-Focused Assistance",
    desc: "Guidance built around your actual financial requirements.",
  },
  {
    icon: Network,
    title: "Multiple Loan Solutions",
    desc: "Assistance across six major loan categories.",
  },
  {
    icon: FileText,
    title: "Documentation Guidance",
    desc: "Clear help with paperwork and application steps.",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    desc: "Assistance throughout your loan journey.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Assistance",
    desc: "Trusted financial solution guidance.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  location: string;
  initials: string;
  accent: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rohit Sharma",
    role: "Salaried Professional",
    location: "Surat",
    initials: "RS",
    accent: "from-royal to-sky",
    quote:
      "The team at TNL Fincorp patiently explained my personal loan options and helped me arrange my documents. The whole enquiry process felt organised and stress-free.",
    rating: 5,
  },
  {
    name: "Priya Desai",
    role: "Home Buyer",
    location: "Dindoli, Surat",
    initials: "PD",
    accent: "from-teal-brand to-cyan-brand",
    quote:
      "I was confused about the home loan paperwork. TNL Fincorp guided me step by step and made the application support really easy to understand.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Business Owner",
    location: "Surat",
    initials: "AP",
    accent: "from-royal to-teal-brand",
    quote:
      "As a business owner I needed clear guidance on working capital options. Their team understood my requirement and supported me throughout the application.",
    rating: 5,
  },
  {
    name: "Sneha Mehta",
    role: "Parent",
    location: "Surat",
    initials: "SM",
    accent: "from-sky to-cyan-brand",
    quote:
      "For my daughter's education loan enquiry, the team was responsive and helpful at every step. The documentation guidance was especially reassuring.",
    rating: 5,
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What types of loans does TNL Fincorp assist with?",
    a: "TNL Fincorp assists customers across Personal Loans, Business Loans, Home Loans, Loan Against Property (LAP), Auto Loans and Education Loans through our financial services network.",
  },
  {
    q: "How can I submit a loan enquiry?",
    a: "You can submit a loan enquiry through the enquiry form on our website, call us at +91 94279 79991, or visit our office in Dindoli, Surat. Our team will guide you on the next steps.",
  },
  {
    q: "What documents may be required?",
    a: "Documentation varies by loan type and lender, but typically includes identity proof, address proof, income proof, bank statements and loan-specific documents such as property or admission papers. We guide you on the typical documents required.",
  },
  {
    q: "Can TNL Fincorp help with the loan application process?",
    a: "Yes. We assist with documentation, application processing and end-to-end support through the loan journey. Final approval, eligibility and terms are subject to the respective lender's policies.",
  },
  {
    q: "Do you assist with Personal Loans?",
    a: "Yes. We assist with exploring personal loan options, documentation and application support for salaried and self-employed individuals.",
  },
  {
    q: "Do you assist with Business Loans?",
    a: "Yes. We assist with business loan options including working capital and term loans, along with documentation and application guidance.",
  },
  {
    q: "Do you assist with Home Loans?",
    a: "Yes. We assist with home loan options for purchase, construction and renovation, including property documentation guidance.",
  },
  {
    q: "Do you assist with Loan Against Property?",
    a: "Yes. We assist with Loan Against Property options for residential or commercial property, subject to lender eligibility and valuation.",
  },
  {
    q: "Do you assist with Auto Loans?",
    a: "Yes. We assist with auto loan options for new and used vehicles, including cars and commercial vehicles.",
  },
  {
    q: "Do you assist with Education Loans?",
    a: "Yes. We assist with education loan options for higher studies in India and eligible study destinations, including documentation guidance.",
  },
  {
    q: "How can I contact TNL Fincorp?",
    a: "You can call us at +91 94279 79991, email care@tnlfincorp.in, or visit our office at 34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli, Surat, Gujarat, India.",
  },
];

export const CONTACT_CARDS: {
  icon: LucideIcon;
  title: string;
  lines: string[];
  action?: { label: string; href: string };
}[] = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "34 Madhuban, Sumukh Circle,",
      "Nr. Happy Villy International School,",
      "Dindoli, Surat, Gujarat, India.",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 94279 79991"],
    action: { label: "Call Now", href: "tel:+919427979991" },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["care@tnlfincorp.in"],
    action: { label: "Send Email", href: "mailto:care@tnlfincorp.in" },
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: By Appointment"],
  },
];

export const DISCLAIMER =
  "TNL Fincorp provides loan assistance and financial solution guidance. Loan approval, interest rates, eligibility, tenure, processing fees and other terms are subject to the policies, verification and approval processes of the respective financial institution/lender. Loan approval is not guaranteed.";

export type IconType = ComponentType<LucideProps>;
