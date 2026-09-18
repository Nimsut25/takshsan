import type { LucideIcon } from "lucide-react";
import {
  Heart, ShieldCheck, Users, Clock, Target, TrendingUp, Home, Plane,
  HeartPulse, Building2, Briefcase, FileText, Wallet, AlertTriangle,
  Car, Zap, Wrench, Receipt, IndianRupee, Phone, CheckCircle2,
  FileCheck, ClipboardCheck, Banknote, Gauge, MapPin, Calendar, Cloud,
} from "lucide-react";

export type InsuranceBenefit = { icon: LucideIcon; title: string; desc: string };
export type InsuranceType = { icon: LucideIcon; title: string; desc: string; accent: string };
export type InsuranceProcessStep = { step: string; title: string; desc: string; icon: LucideIcon };
export type InsuranceFactor = { icon: LucideIcon; title: string; desc: string };
export type InsuranceFaq = { q: string; a: string };
export type InsuranceCoverage = { icon: LucideIcon; title: string; desc: string };
export type InsuranceAddon = { icon: LucideIcon; title: string; desc: string };

export type InsurancePageContent = {
  slug: "life" | "general" | "motor";
  route: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  heroFloatingCards: { icon: LucideIcon; label: string }[];
  accent: string;
  benefitsTitle: string;
  benefitsHighlight: string;
  benefits: InsuranceBenefit[];
  typesTitle: string;
  typesHighlight: string;
  types: InsuranceType[];
  processTitle: string;
  processHighlight: string;
  process: InsuranceProcessStep[];
  factorsTitle: string;
  factorsHighlight: string;
  factors: InsuranceFactor[];
  coverageTitle?: string;
  coverageHighlight?: string;
  coverage?: InsuranceCoverage[];
  addonsTitle?: string;
  addonsHighlight?: string;
  addons?: InsuranceAddon[];
  claimProcessTitle?: string;
  claimProcessHighlight?: string;
  claimProcess?: InsuranceProcessStep[];
  faqs: InsuranceFaq[];
  ctaTitle: string;
  ctaDescription: string;
  disclaimer: string;
};

const COMMON_DISCLAIMER = "Insurance coverage, premiums, exclusions, deductibles, eligibility, claim procedures and benefits depend on the specific insurer and policy terms. TNL Fincorp provides guidance and assistance; it is not an insurance provider. Please review the applicable policy document and consult the respective insurer before making any decision.";

export const INSURANCE_DATA: Record<"life" | "general" | "motor", InsurancePageContent> = {
  // ───────────── LIFE INSURANCE ─────────────
  life: {
    slug: "life",
    route: "/life-insurance",
    metaTitle: "Life Insurance | TNL Fincorp",
    metaDescription: "Understand life insurance — types (term, whole life, endowment, ULIP), benefits, how it works, key factors and FAQs. Get insurance guidance through TNL Fincorp.",
    eyebrow: "PROTECT • PLAN • SECURE",
    heroTitle: "Life Insurance",
    heroSubtitle: "Protect What Matters Most. Plan for Tomorrow.",
    heroDescription: "Life insurance provides financial protection to your beneficiaries according to the policy terms. Explore different types of life insurance and understand how they can fit into your financial planning strategy.",
    heroImage: "/images/insurance-life-hero.jpg",
    heroFloatingCards: [
      { icon: ShieldCheck, label: "Family Protection" },
      { icon: Clock, label: "Long-Term Planning" },
      { icon: Heart, label: "Peace of Mind" },
    ],
    accent: "from-royal to-sky",
    benefitsTitle: "Why Consider",
    benefitsHighlight: "Life Insurance?",
    benefits: [
      { icon: ShieldCheck, title: "Financial Protection", desc: "Provides financial support to beneficiaries according to the policy terms." },
      { icon: Users, title: "Family Security", desc: "Can help protect dependents against financial disruption following the insured person's death." },
      { icon: Clock, title: "Long-Term Planning", desc: "Can form part of a broader financial planning strategy." },
      { icon: Wallet, title: "Income Protection", desc: "Certain products may provide benefits according to their policy terms." },
      { icon: Target, title: "Goal Planning", desc: "Some life insurance products may combine protection with other features." },
      { icon: Heart, title: "Peace of Mind", desc: "Protection can help families plan for financial uncertainty." },
    ],
    typesTitle: "Types of",
    typesHighlight: "Life Insurance",
    types: [
      { icon: ShieldCheck, title: "Term Life Insurance", desc: "Provides coverage for a specified period. Benefits are paid according to policy terms if the insured event occurs during the term.", accent: "from-royal to-sky" },
      { icon: Clock, title: "Whole Life Insurance", desc: "Designed to provide coverage for the lifetime of the insured, subject to policy terms and premium payments.", accent: "from-navy to-royal" },
      { icon: Target, title: "Endowment Plans", desc: "Combine insurance coverage with a savings component. Terms and benefits vary by policy.", accent: "from-teal-brand to-cyan-brand" },
      { icon: Wallet, title: "Money-Back Plans", desc: "May provide periodic payments during the policy term according to the policy's terms.", accent: "from-sky to-teal-brand" },
      { icon: TrendingUp, title: "ULIPs", desc: "Unit-Linked Insurance Plans combine insurance with investment. Returns are market-linked and not guaranteed.", accent: "from-royal to-teal-brand" },
      { icon: Users, title: "Child/Family Protection Plans", desc: "Designed to help secure a child's future or family financial goals, subject to policy terms.", accent: "from-navy to-sky" },
    ],
    processTitle: "How It",
    processHighlight: "Works",
    process: [
      { step: "01", title: "Understand Your Protection Needs", desc: "Assess your financial goals, dependents and coverage requirements.", icon: Target },
      { step: "02", title: "Choose a Suitable Policy", desc: "Explore different types of life insurance and select one that fits your needs.", icon: ShieldCheck },
      { step: "03", title: "Complete the Application", desc: "Provide the required personal and health information accurately.", icon: FileText },
      { step: "04", title: "Underwriting & Verification", desc: "The insurer evaluates the application based on their underwriting process.", icon: ClipboardCheck },
      { step: "05", title: "Policy Issued", desc: "On approval, the policy is issued with the applicable terms and conditions.", icon: FileCheck },
      { step: "06", title: "Pay Premiums", desc: "Pay premiums according to the policy schedule to keep the coverage active.", icon: IndianRupee },
      { step: "07", title: "Benefits Paid", desc: "Benefits are paid to nominees/beneficiaries according to the policy terms.", icon: Banknote },
    ],
    factorsTitle: "What Should You",
    factorsHighlight: "Consider?",
    factors: [
      { icon: IndianRupee, title: "Coverage Amount", desc: "The sum assured should align with your family's financial needs." },
      { icon: Clock, title: "Policy Term", desc: "Choose a term that matches your protection horizon." },
      { icon: Wallet, title: "Premium", desc: "Ensure the premium is affordable and sustainable over the policy term." },
      { icon: FileCheck, title: "Claim Terms", desc: "Understand the claim process, settlement ratio and timelines." },
      { icon: AlertTriangle, title: "Exclusions", desc: "Review what is not covered under the policy." },
      { icon: Zap, title: "Riders", desc: "Optional add-ons that can enhance coverage, subject to terms." },
      { icon: Users, title: "Beneficiary/Nominee", desc: "Ensure your nominee details are accurate and up to date." },
      { icon: FileText, title: "Policy Features", desc: "Understand all features, charges, surrender values and terms." },
    ],
    faqs: [
      { q: "What is life insurance?", a: "Life insurance is a contract between the policyholder and the insurer, where the insurer agrees to pay a specified benefit to designated beneficiaries upon the occurrence of the insured event, subject to the policy's terms and conditions." },
      { q: "Why is life insurance important?", a: "Life insurance can provide financial protection to your dependents in case of an unfortunate event. It can help cover living expenses, debts and future financial goals according to the policy terms." },
      { q: "What is term insurance?", a: "Term life insurance provides coverage for a specified period. If the insured event occurs during the term, benefits are paid according to the policy. Term plans typically do not have a savings or investment component." },
      { q: "How is life insurance premium determined?", a: "Premiums depend on factors such as age, health, coverage amount, policy term, type of plan, lifestyle habits and the insurer's underwriting assessment. Each insurer has its own pricing methodology." },
      { q: "What documents are generally required?", a: "Commonly required documents include identity proof, address proof, age proof, income proof, photographs and medical reports where applicable. Exact requirements vary by insurer and product." },
      { q: "What is a nominee?", a: "A nominee is the person designated by the policyholder to receive the policy benefits in case of an unfortunate event. The nominee should be clearly specified in the policy." },
      { q: "What are policy exclusions?", a: "Exclusions are specific situations or conditions under which the policy does not provide benefits. Common exclusions may include suicide within a certain period, dangerous activities or pre-existing conditions. Exclusions vary by policy." },
      { q: "What are riders?", a: "Riders are optional add-ons that can be attached to a base policy to enhance coverage, such as accidental death benefit, critical illness cover or waiver of premium. Availability and terms vary by insurer." },
      { q: "Can a life insurance policy be cancelled?", a: "Most policies offer a free-look period (typically 15-30 days) during which you can cancel the policy and receive a refund subject to deductions. After the free-look period, cancellation terms depend on the policy." },
      { q: "What should I check before buying a policy?", a: "Review the coverage amount, premium, policy term, exclusions, claim settlement record, riders, charges, surrender terms and the insurer's reputation. Read the policy document carefully before purchasing." },
    ],
    ctaTitle: "Protect What Matters. Plan With Confidence.",
    ctaDescription: "Explore insurance options, understand the coverage and terms, and choose based on your own protection needs.",
    disclaimer: COMMON_DISCLAIMER,
  },

  // ───────────── GENERAL INSURANCE ─────────────
  general: {
    slug: "general",
    route: "/general-insurance",
    metaTitle: "General Insurance | TNL Fincorp",
    metaDescription: "Understand general insurance — health, travel, home, personal accident, business insurance. Learn about categories, benefits, how it works and FAQs through TNL Fincorp.",
    eyebrow: "PROTECT • ASSETS • EVERYDAY",
    heroTitle: "General Insurance",
    heroSubtitle: "Protect Your Assets, Health & Everyday Life.",
    heroDescription: "General insurance broadly covers non-life insurance products that may protect against specified financial losses according to policy terms. Explore different categories and understand how they can help manage everyday risks.",
    heroImage: "/images/insurance-general-hero.jpg",
    heroFloatingCards: [
      { icon: Home, label: "Home & Assets" },
      { icon: HeartPulse, label: "Health Cover" },
      { icon: Plane, label: "Travel Safety" },
    ],
    accent: "from-teal-brand to-cyan-brand",
    benefitsTitle: "Why Consider",
    benefitsHighlight: "General Insurance?",
    benefits: [
      { icon: ShieldCheck, title: "Financial Protection", desc: "Can help cover specified financial losses according to policy terms." },
      { icon: AlertTriangle, title: "Risk Management", desc: "Helps transfer specific risks to the insurer, subject to policy terms." },
      { icon: Home, title: "Asset Protection", desc: "Can protect valuable assets like homes and property against specified risks." },
      { icon: HeartPulse, title: "Health & Accident Protection", desc: "May cover eligible medical expenses or accident-related costs per policy terms." },
      { icon: Plane, title: "Travel Protection", desc: "Can cover specified travel-related risks such as trip cancellation or medical emergencies abroad." },
      { icon: Building2, title: "Business Risk Coverage", desc: "May help protect businesses against certain specified risks per policy terms." },
    ],
    typesTitle: "Insurance",
    typesHighlight: "Categories",
    types: [
      { icon: HeartPulse, title: "Health Insurance", desc: "Coverage for eligible medical expenses according to policy terms.", accent: "from-royal to-sky" },
      { icon: Plane, title: "Travel Insurance", desc: "Protection for specified travel-related risks such as medical emergencies, trip cancellation or baggage loss.", accent: "from-teal-brand to-cyan-brand" },
      { icon: Home, title: "Home Insurance", desc: "Protection for eligible home/property-related risks such as fire, theft or natural events, subject to policy terms.", accent: "from-navy to-royal" },
      { icon: AlertTriangle, title: "Personal Accident Insurance", desc: "Coverage for specified accidental events including injury, disability or death, subject to policy terms.", accent: "from-sky to-teal-brand" },
      { icon: Building2, title: "Business Insurance", desc: "Protection for certain business-related risks such as property damage, liability or business interruption.", accent: "from-royal to-teal-brand" },
      { icon: Briefcase, title: "Other General Insurance", desc: "Other non-life insurance categories may be available depending on the insurer and product offerings.", accent: "from-navy to-sky" },
    ],
    processTitle: "How It",
    processHighlight: "Works",
    process: [
      { step: "01", title: "Identify the Risk", desc: "Understand what risks you want to protect against.", icon: AlertTriangle },
      { step: "02", title: "Select an Appropriate Policy", desc: "Explore available policies that match your protection needs.", icon: ShieldCheck },
      { step: "03", title: "Compare Coverage & Terms", desc: "Review coverage limits, premiums, deductibles and exclusions.", icon: ClipboardCheck },
      { step: "04", title: "Submit Application", desc: "Complete the application with accurate information.", icon: FileText },
      { step: "05", title: "Complete Verification", desc: "The insurer may conduct verification or inspection as required.", icon: FileCheck },
      { step: "06", title: "Policy Issued", desc: "On approval, the policy is issued with applicable terms.", icon: ShieldCheck },
      { step: "07", title: "Make Claims When Required", desc: "File claims according to the policy's claim procedure when needed.", icon: Banknote },
    ],
    factorsTitle: "What to Check",
    factorsHighlight: "Before Buying",
    factors: [
      { icon: ShieldCheck, title: "Coverage", desc: "What risks and events are covered under the policy." },
      { icon: IndianRupee, title: "Premium", desc: "The cost of the policy and payment frequency." },
      { icon: Wallet, title: "Deductibles", desc: "The amount you must pay before the insurer pays a claim." },
      { icon: AlertTriangle, title: "Exclusions", desc: "What is specifically not covered under the policy." },
      { icon: Clock, title: "Waiting Periods", desc: "Periods during which certain benefits are not available, where applicable." },
      { icon: FileCheck, title: "Claim Process", desc: "How to file a claim and the documentation required." },
      { icon: IndianRupee, title: "Policy Limits", desc: "The maximum amount the insurer will pay for covered losses." },
      { icon: Calendar, title: "Renewal Conditions", desc: "Terms for renewing the policy, including premium changes." },
      { icon: Zap, title: "Add-ons/Riders", desc: "Optional covers that can enhance the base policy." },
      { icon: FileText, title: "Terms & Conditions", desc: "Read all policy terms carefully before purchasing." },
    ],
    faqs: [
      { q: "What is general insurance?", a: "General insurance broadly covers non-life insurance products that may protect against specified financial losses. This includes health, travel, home, personal accident and business insurance, among others." },
      { q: "What types of general insurance are available?", a: "Common types include health insurance, travel insurance, home insurance, personal accident insurance and business insurance. Availability and terms vary by insurer and product." },
      { q: "What is health insurance?", a: "Health insurance may cover eligible medical expenses such as hospitalisation, surgery and treatments, subject to the policy's terms, coverage limits, waiting periods and exclusions." },
      { q: "What is travel insurance?", a: "Travel insurance can cover specified travel-related risks such as medical emergencies abroad, trip cancellation, baggage loss or flight delays, subject to policy terms." },
      { q: "What is home insurance?", a: "Home insurance may protect your home and its contents against specified risks such as fire, theft, natural events or other perils, subject to the policy's terms and exclusions." },
      { q: "What is personal accident insurance?", a: "Personal accident insurance provides coverage for specified accidental events including injury, disability or death resulting from an accident, subject to policy terms." },
      { q: "How does an insurance claim work?", a: "The claim process typically involves notifying the insurer, submitting required documents, inspection/assessment where applicable, and claim review. The insurer then settles the claim according to the policy terms. Exact procedures vary by insurer and policy." },
      { q: "What are deductibles?", a: "A deductible is the amount the policyholder must pay out of pocket before the insurer pays a claim. Higher deductibles typically result in lower premiums. Deductible terms vary by policy." },
      { q: "What are exclusions?", a: "Exclusions are specific situations, conditions or events that are not covered under the policy. It is important to review exclusions carefully before purchasing any insurance policy." },
      { q: "What should I compare before choosing a policy?", a: "Compare coverage, premiums, deductibles, exclusions, claim process, policy limits, waiting periods, add-ons, the insurer's claim settlement record and renewal terms before making a decision." },
    ],
    ctaTitle: "Protect What Matters. Plan With Confidence.",
    ctaDescription: "Explore insurance options, understand the coverage and terms, and choose based on your own protection needs.",
    disclaimer: COMMON_DISCLAIMER,
  },

  // ───────────── MOTOR INSURANCE ─────────────
  motor: {
    slug: "motor",
    route: "/motor-insurance",
    metaTitle: "Motor Insurance | TNL Fincorp",
    metaDescription: "Understand motor insurance — types (third-party, comprehensive, own-damage), coverage, add-ons, claim process, premium factors and FAQs through TNL Fincorp.",
    eyebrow: "DRIVE • PROTECT • CONFIDENCE",
    heroTitle: "Motor Insurance",
    heroSubtitle: "Drive With Confidence. Protect Your Vehicle.",
    heroDescription: "Motor insurance can protect your vehicle against specified risks such as accidents, theft and third-party liabilities. Explore different types of motor insurance and understand coverage options, add-ons and claim procedures.",
    heroImage: "/images/insurance-motor-hero.jpg",
    heroFloatingCards: [
      { icon: Car, label: "Vehicle Protection" },
      { icon: ShieldCheck, label: "Third-Party Cover" },
      { icon: FileText, label: "Digital Policy" },
    ],
    accent: "from-navy to-royal",
    benefitsTitle: "Types of",
    benefitsHighlight: "Motor Insurance",
    benefits: [
      { icon: ShieldCheck, title: "Third-Party Motor Insurance", desc: "Covers specified third-party liabilities according to the applicable policy and legal requirements. Third-party liability insurance is mandatory for vehicles as per applicable law.", accent: "from-royal to-sky" },
      { icon: Car, title: "Comprehensive Motor Insurance", desc: "Can combine third-party liability coverage with own-damage coverage, subject to policy terms. Offers broader protection for your vehicle.", accent: "from-teal-brand to-cyan-brand" },
      { icon: Wrench, title: "Own-Damage Cover", desc: "Covers damage to your own vehicle due to specified events. Availability and eligibility depend on the product and insurer.", accent: "from-navy to-royal" },
    ],
    typesTitle: "What Can Be",
    typesHighlight: "Covered?",
    types: [
      { icon: Car, title: "Accidental Damage", desc: "Damage to the vehicle caused by accidents, subject to policy terms.", accent: "from-royal to-sky" },
      { icon: AlertTriangle, title: "Theft", desc: "Loss of the vehicle due to theft, subject to policy terms and conditions.", accent: "from-navy to-royal" },
      { icon: Zap, title: "Fire", desc: "Damage caused by fire or explosion, subject to policy terms.", accent: "from-amber-500 to-amber-600" },
      { icon: Cloud, title: "Natural Events", desc: "Damage from natural events such as floods, earthquakes or storms, subject to policy terms.", accent: "from-sky to-teal-brand" },
      { icon: ShieldCheck, title: "Third-Party Liability", desc: "Liability for injury or damage caused to third parties, subject to legal requirements and policy terms.", accent: "from-teal-brand to-cyan-brand" },
      { icon: FileText, title: "Other Specified Risks", desc: "Certain other risks may be covered depending on the specific policy and insurer.", accent: "from-royal to-teal-brand" },
    ],
    processTitle: "How To",
    processHighlight: "Buy",
    process: [
      { step: "01", title: "Enter Vehicle Details", desc: "Provide your vehicle registration number, make, model and year.", icon: Car },
      { step: "02", title: "Compare Available Policies", desc: "Review policies from different insurers and their coverage.", icon: ClipboardCheck },
      { step: "03", title: "Review Coverage & Premium", desc: "Examine the coverage details, premium, deductibles and add-ons.", icon: IndianRupee },
      { step: "04", title: "Select Suitable Policy", desc: "Choose the policy that best fits your needs and budget.", icon: ShieldCheck },
      { step: "05", title: "Complete Required Information", desc: "Fill in the required personal and vehicle information accurately.", icon: FileText },
      { step: "06", title: "Make Payment", desc: "Pay the premium through the available payment options.", icon: Banknote },
      { step: "07", title: "Receive Policy Documents", desc: "Receive your policy documents digitally upon successful processing.", icon: FileCheck },
    ],
    factorsTitle: "Factors Affecting",
    factorsHighlight: "Premium",
    factors: [
      { icon: Car, title: "Vehicle Type", desc: "Make, model, variant and engine capacity affect the premium." },
      { icon: Clock, title: "Vehicle Age", desc: "Older vehicles may have different premium calculations due to depreciation." },
      { icon: MapPin, title: "Location", desc: "The registered location of the vehicle can impact the premium." },
      { icon: IndianRupee, title: "Insured Declared Value (IDV)", desc: "The current market value of the vehicle, where applicable, affects coverage and premium." },
      { icon: ShieldCheck, title: "Coverage Selected", desc: "Comprehensive coverage typically costs more than third-party only." },
      { icon: Zap, title: "Add-ons", desc: "Optional add-ons increase coverage but also the premium." },
      { icon: FileCheck, title: "Claim History", desc: "A history of claims may affect the premium (No Claim Bonus where applicable)." },
      { icon: FileText, title: "Policy/Insurer Terms", desc: "Each insurer has its own pricing methodology and terms." },
    ],
    coverageTitle: "Optional",
    coverageHighlight: "Add-ons",
    coverage: [
      { icon: ShieldCheck, title: "Zero Depreciation", desc: "May allow claims without deduction for depreciation on certain parts, subject to policy terms." },
      { icon: Phone, title: "Roadside Assistance", desc: "Can provide emergency roadside support services, subject to policy terms." },
      { icon: Wrench, title: "Engine Protection", desc: "May cover engine damage due to specified causes, subject to policy terms." },
      { icon: Receipt, title: "Return to Invoice", desc: "May provide settlement based on the invoice value of the vehicle, subject to policy terms." },
      { icon: Gauge, title: "Consumables Cover", desc: "May cover the cost of consumables such as oil, coolant and bolts during repairs." },
      { icon: HeartPulse, title: "Personal Accident Cover", desc: "May provide coverage for personal accident-related injuries to the owner-driver, subject to policy terms." },
    ],
    claimProcessTitle: "How a Motor Insurance Claim",
    claimProcessHighlight: "Generally Works",
    claimProcess: [
      { step: "01", title: "Report the Incident", desc: "Inform the insurer about the accident or incident as soon as possible.", icon: Phone },
      { step: "02", title: "Register the Claim", desc: "File a claim with the insurer providing details of the incident.", icon: FileText },
      { step: "03", title: "Submit Required Documents", desc: "Provide documents such as FIR copy (if applicable), driving licence, RC and claim form.", icon: ClipboardCheck },
      { step: "04", title: "Inspection/Assessment", desc: "The insurer may inspect the vehicle and assess the damage, where applicable.", icon: Wrench },
      { step: "05", title: "Claim Review", desc: "The insurer reviews the claim based on policy terms and documentation.", icon: FileCheck },
      { step: "06", title: "Settlement/Repair", desc: "The claim is settled or the vehicle is repaired at a network/non-network garage per policy terms.", icon: Banknote },
    ],
    addonsTitle: "Optional",
    addonsHighlight: "Add-ons",
    addons: [
      { icon: ShieldCheck, title: "Zero Depreciation", desc: "May allow claims without deduction for depreciation on certain parts." },
      { icon: Phone, title: "Roadside Assistance", desc: "Emergency support services for breakdowns." },
      { icon: Wrench, title: "Engine Protection", desc: "Covers engine damage from specified causes." },
      { icon: Receipt, title: "Return to Invoice", desc: "Settlement based on the vehicle's invoice value." },
      { icon: Gauge, title: "Consumables Cover", desc: "Covers consumables during repairs." },
      { icon: HeartPulse, title: "Personal Accident Options", desc: "Additional accident-related coverage for occupants." },
    ],
    faqs: [
      { q: "What is motor insurance?", a: "Motor insurance provides coverage for vehicles against specified risks such as accidental damage, theft, fire and third-party liabilities, subject to policy terms and conditions." },
      { q: "Is third-party motor insurance required?", a: "Yes, as per applicable Indian law, third-party liability insurance is mandatory for all motor vehicles. Driving without valid third-party insurance may result in penalties." },
      { q: "What is comprehensive insurance?", a: "Comprehensive motor insurance combines third-party liability coverage with own-damage coverage, offering broader protection for your vehicle. Terms, coverage and exclusions vary by policy." },
      { q: "What is own-damage cover?", a: "Own-damage cover protects against damage to your own vehicle caused by specified events such as accidents, theft, fire or natural events. Availability depends on the product and insurer." },
      { q: "What does zero depreciation mean?", a: "A zero depreciation (zero dep) add-on may allow you to claim without deduction for depreciation on certain parts, subject to the policy's terms, conditions and limits. Availability varies by insurer and policy." },
      { q: "What is a deductible?", a: "A deductible is the amount you must pay out of pocket before the insurer pays a claim. Compulsory and voluntary deductibles may apply. Higher voluntary deductibles typically result in lower premiums." },
      { q: "What documents are needed for a claim?", a: "Common documents include the claim form, FIR copy (if applicable), driving licence, vehicle registration certificate (RC), insurance policy copy and repair estimates. Exact requirements vary by insurer and claim type." },
      { q: "How does the claim process work?", a: "The process typically involves reporting the incident, registering the claim, submitting documents, vehicle inspection (where applicable), claim review and settlement/repair. Exact procedures differ between insurers and policies." },
      { q: "Can motor insurance be renewed online?", a: "Yes, many insurers offer online renewal of motor insurance policies. The renewal process may involve reviewing coverage, updating details and paying the premium online." },
      { q: "What affects motor insurance premium?", a: "Premiums depend on factors such as vehicle type, age, location, IDV, coverage selected, add-ons, claim history and the insurer's pricing methodology. Each insurer has its own assessment criteria." },
    ],
    ctaTitle: "Drive With Confidence. Protect Your Vehicle.",
    ctaDescription: "Explore insurance options, understand the coverage and terms, and choose based on your own protection needs.",
    disclaimer: COMMON_DISCLAIMER,
  },
};
