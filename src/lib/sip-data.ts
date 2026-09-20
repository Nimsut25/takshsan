import type { LucideIcon } from "lucide-react";
import {
  CalendarClock, TrendingUp, Target, Wallet, Clock, Zap, ShieldCheck,
  PiggyBank, Briefcase, BarChart3, Landmark, Coins, AlertTriangle,
  FileText, IndianRupee, Users, Home, GraduationCap, Plane, Heart,
  CheckCircle2, XCircle, Info, Repeat, ArrowRight,
} from "lucide-react";

export type SipBenefit = { icon: LucideIcon; title: string; desc: string };
export type SipProcessStep = { step: string; title: string; desc: string; icon: LucideIcon };
export type FundCategory = { icon: LucideIcon; title: string; desc: string; accent: string };
export type InvestmentGoal = { icon: LucideIcon; title: string; desc: string };
export type Consideration = { icon: LucideIcon; title: string; desc: string };
export type SipFaq = { q: string; a: string };

export const SIP_HERO = {
  eyebrow: "INVEST • SYSTEMATICALLY • GROW",
  title: "SIP & Mutual Funds",
  subtitle: "Invest Systematically. Build Your Financial Future.",
  description: "SIPs allow you to invest a fixed amount at regular intervals into selected mutual fund schemes. Mutual funds pool money from investors into professionally managed investment portfolios. Explore how systematic investing can fit into your financial planning.",
  image: "/images/sip-hero.jpg",
  floatingCards: [
    { icon: TrendingUp, label: "Growth Potential" },
    { icon: CalendarClock, label: "Regular Investing" },
    { icon: ShieldCheck, label: "Professional Management" },
  ],
};

export const SIP_INTRO = {
  title: "What Are SIP & Mutual Funds?",
  sip: {
    title: "Systematic Investment Plan (SIP)",
    points: [
      "A recurring investment approach where you invest a fixed amount at regular intervals.",
      "Helps build consistent investment habits through disciplined investing.",
      "Convenient investment scheduling — commonly used for long-term financial planning.",
    ],
  },
  mutualFunds: {
    title: "Mutual Funds",
    points: [
      "A professionally managed pooled investment where investors participate through mutual fund units.",
      "Different schemes may focus on different asset classes such as equity, debt or hybrid.",
      "Risk and return characteristics vary between schemes.",
    ],
  },
};

export const SIP_BENEFITS: SipBenefit[] = [
  { icon: CalendarClock, title: "Investment Discipline", desc: "Regular contributions can help build consistent investment habits." },
  { icon: Wallet, title: "Start With a Planned Amount", desc: "Invest according to your selected contribution amount and schedule." },
  { icon: TrendingUp, title: "Long-Term Approach", desc: "SIPs can be used as part of a long-term financial planning strategy." },
  { icon: Zap, title: "Convenience", desc: "Regular investments can be automated depending on the platform and mandate setup." },
  { icon: Target, title: "Goal-Based Planning", desc: "Align SIPs with goals like education, home purchase, retirement or wealth planning." },
  { icon: Repeat, title: "Flexible Options", desc: "Choose different contribution amounts and investment schedules depending on the scheme/platform." },
];

export const SIP_PROCESS: SipProcessStep[] = [
  { step: "01", title: "Choose Your Investment Goal", desc: "Define what you want to achieve — education, retirement, wealth or other goals.", icon: Target },
  { step: "02", title: "Select a Suitable Mutual Fund Scheme", desc: "Explore different schemes and their investment objectives.", icon: Briefcase },
  { step: "03", title: "Choose SIP Amount & Frequency", desc: "Decide how much to invest and how often (monthly, quarterly, etc.).", icon: IndianRupee },
  { step: "04", title: "Complete Required Verification", desc: "Complete KYC and other required verification as applicable.", icon: ShieldCheck },
  { step: "05", title: "Set Up the Investment", desc: "Set up the SIP mandate through the selected platform.", icon: FileText },
  { step: "06", title: "Monitor Your Investments", desc: "Track your investments periodically and review performance.", icon: BarChart3 },
];

export const FUND_CATEGORIES: FundCategory[] = [
  { icon: TrendingUp, title: "Equity Funds", desc: "Primarily invest in equities and may have higher market risk and return potential.", accent: "from-royal to-sky" },
  { icon: Landmark, title: "Debt Funds", desc: "Primarily invest in fixed-income instruments, subject to applicable risks.", accent: "from-navy to-royal" },
  { icon: Briefcase, title: "Hybrid Funds", desc: "Combine different asset classes according to the scheme's investment strategy.", accent: "from-teal-brand to-cyan-brand" },
  { icon: BarChart3, title: "Index Funds", desc: "Designed to track a particular market index, subject to tracking differences.", accent: "from-sky to-teal-brand" },
  { icon: FileText, title: "ELSS", desc: "Equity-linked savings scheme category with applicable tax and lock-in rules.", accent: "from-royal to-teal-brand" },
  { icon: Coins, title: "Liquid / Short-Term Funds", desc: "Designed around short-duration money-market or debt-oriented investments.", accent: "from-navy to-sky" },
];

export const FUND_CATEGORIES_NOTE = "Investment characteristics, risks, taxation, liquidity, lock-in periods, and suitability vary by scheme and investor circumstances. No fund category is universally suitable.";

export const SIP_VS_LUMPSUM = {
  title: "SIP vs Lumpsum Investment",
  sip: {
    title: "SIP",
    points: [
      "Regular investment with periodic contributions",
      "Builds investment discipline",
      "Suitable for planned recurring investing",
      "Can be aligned with monthly income and goals",
    ],
  },
  lumpsum: {
    title: "Lumpsum",
    points: [
      "One-time investment of a larger amount",
      "Market timing can have a greater impact",
      "Suitable depending on available capital",
      "Depends on investor strategy and risk appetite",
    ],
  },
};

export const INVESTMENT_GOALS: InvestmentGoal[] = [
  { icon: GraduationCap, title: "Child Education", desc: "Plan for your children's educational milestones." },
  { icon: Home, title: "Home Purchase", desc: "Build a corpus for your dream home." },
  { icon: Heart, title: "Retirement", desc: "Create a retirement corpus for financial independence." },
  { icon: ShieldCheck, title: "Emergency Planning", desc: "Build an emergency fund for unexpected situations." },
  { icon: TrendingUp, title: "Wealth Creation", desc: "Grow your wealth over the long term." },
  { icon: Plane, title: "Travel", desc: "Save for travel aspirations and experiences." },
  { icon: PiggyBank, title: "Future Financial Goals", desc: "Plan for any future financial objective." },
];

export const SIP_CALCULATOR = {
  title: "Estimate Your SIP Investment",
  description: "An illustrative tool to understand how SIP investments may grow over time. Actual mutual fund returns are market-linked and may differ significantly.",
  defaults: { monthlyAmount: 10000, expectedReturn: 12, duration: 10 },
  note: "Actual mutual fund returns are market-linked and may differ significantly from the illustration. Past performance does not guarantee future results.",
};

export const SIP_CONSIDERATIONS: Consideration[] = [
  { icon: AlertTriangle, title: "Risk", desc: "Understand the level of market risk associated with the scheme." },
  { icon: Target, title: "Investment Objective", desc: "Check whether the scheme's objective aligns with your financial goal." },
  { icon: Clock, title: "Time Horizon", desc: "Consider how long you plan to remain invested." },
  { icon: IndianRupee, title: "Costs", desc: "Review expense ratios, transaction charges, exit loads and other applicable costs." },
  { icon: Wallet, title: "Liquidity", desc: "Understand how and when you can redeem the investment." },
  { icon: FileText, title: "Taxation", desc: "Tax treatment can vary depending on the investment and applicable rules." },
  { icon: BarChart3, title: "Past Performance", desc: "Historical performance should not be treated as a guarantee of future results." },
  { icon: Users, title: "Diversification", desc: "Understand what the scheme invests in and how diversified it is." },
];

export const RISK_DISCLOSURE = "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. The value of investments may rise or fall, and investors may receive less than their original investment.";

export const SIP_FAQS: SipFaq[] = [
  { q: "What is SIP?", a: "A Systematic Investment Plan (SIP) is a method of investing a fixed amount at regular intervals into a selected mutual fund scheme. It helps build disciplined investing habits over time." },
  { q: "How does a SIP work?", a: "When you start a SIP, a fixed amount is invested at your chosen frequency (e.g., monthly) into the selected mutual fund scheme. You receive mutual fund units based on the NAV applicable on the investment date. Over time, this can help build a corpus through regular contributions." },
  { q: "Is SIP the same as a mutual fund?", a: "No. A mutual fund is an investment product. SIP is a method of investing in a mutual fund scheme — you invest a fixed amount regularly instead of a lump sum. You can also invest a lump sum in the same mutual fund." },
  { q: "Can I change my SIP amount?", a: "Depending on the platform and scheme, you may be able to modify your SIP amount. Some platforms allow you to start a new SIP with a different amount or use a step-up SIP feature to increase contributions periodically." },
  { q: "Can I stop or modify my SIP?", a: "Yes, SIPs can generally be stopped or modified depending on the platform and scheme terms. You can pause, skip or cancel your SIP as per the applicable terms. Stopping a SIP does not affect the units already purchased." },
  { q: "What are the different types of mutual funds?", a: "Mutual funds are broadly categorized into equity funds, debt funds, hybrid funds, index funds, ELSS (tax-saving funds), liquid/short-term funds and others. Each category has different risk-return characteristics, investment objectives and applicable terms." },
  { q: "Are mutual fund returns guaranteed?", a: "No. Mutual fund returns are market-linked and not guaranteed. The value of investments may rise or fall based on market conditions. Past performance does not guarantee future results. Investors should review scheme-related documents and consider their risk tolerance before investing." },
];

export const SIP_CTA = {
  title: "Take the Next Step Toward Your Financial Goals",
  description: "Explore investment options and understand how SIPs and mutual funds may fit into your financial planning.",
};

export const SIP_DISCLAIMER = "Investment decisions involve risk. Mutual fund investments are subject to market risks. Investors should review scheme-related documents and consider their financial goals, risk tolerance, time horizon, and applicable costs before investing. TNL Fincorp provides education and guidance; it is not a registered investment advisor or mutual fund distributor. Please consult a SEBI-registered advisor before making investment decisions.";
