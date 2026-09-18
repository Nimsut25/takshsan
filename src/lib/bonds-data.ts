import type { LucideIcon } from "lucide-react";
import {
  Landmark, CalendarClock, PieChart, Clock, Eye, Smartphone,
  TrendingUp, Wallet, Banknote, Percent, ArrowDownRight, ArrowUpRight,
  ShieldCheck, Target, Building2, Coins, Scale, AlertTriangle, Info,
} from "lucide-react";

export type BondBenefit = { icon: LucideIcon; title: string; desc: string };
export type BondProcessStep = { step: string; title: string; desc: string; icon: LucideIcon };
export type BondType = { id: string; icon: LucideIcon; title: string; desc: string; examples?: string[]; accent: string; issuer?: string; tenure?: string; couponRate?: string; faceValue?: number };
export type BondProfile = { icon: LucideIcon; title: string; desc: string };
export type BondFaq = { q: string; a: string };

export const BONDS_HERO = {
  eyebrow: "INVEST • STABILITY • GOVERNMENT SECURITIES",
  title: "Government Bonds",
  subtitle: "Invest with Confidence. Build with Stability.",
  description:
    "Government bonds are debt securities through which governments raise funds from investors. When you purchase a government security, you are effectively lending money to the issuing government under the terms of that security, which may provide scheduled interest according to the security's terms.",
  riskNote:
    "Government securities are generally considered to have low credit/default risk, while their market prices can fluctuate when sold before maturity.",
  image: "/images/bonds-hero.jpg",
};

export const BONDS_INTRO = {
  title: "What Are Government Bonds?",
  image: "/images/bonds-intro.jpg",
  paragraphs: [
    "Government bonds are debt securities issued by governments to raise money. When an investor purchases a government security, the investor is effectively lending money to the issuing government under the terms of that security.",
    "In return, the investor may receive scheduled interest (coupon) payments for applicable securities, and the principal is repaid according to the security's terms at maturity.",
  ],
  keyTerms: [
    { term: "Principal / Face Value", desc: "The amount the security is issued for and repaid at maturity, subject to terms." },
    { term: "Coupon / Interest", desc: "The scheduled interest payment for applicable fixed-coupon securities." },
    { term: "Maturity", desc: "The date on which the principal is due to be repaid per the security's terms." },
    { term: "Market Price", desc: "The price at which the security trades in the market — it can change over time." },
    { term: "Yield", desc: "A measure of return that reflects price, coupon and time to maturity. Yield is not the same as the coupon rate." },
  ],
  flow: ["Invest", "Receive Interest According to Terms", "Maturity", "Principal Repayment According to Terms"],
  sellNote:
    "Selling a security before maturity can result in a capital gain or loss because market prices change.",
};

export const BONDS_BENEFITS: BondBenefit[] = [
  { icon: Landmark, title: "Government Issuer", desc: "The securities are obligations of the issuing government, subject to the security's terms." },
  { icon: CalendarClock, title: "Predictable Cash Flows", desc: "Applicable fixed-coupon securities may offer scheduled interest payments as per their terms." },
  { icon: PieChart, title: "Portfolio Diversification", desc: "Bonds can complement other investments such as equities within a diversified portfolio." },
  { icon: Clock, title: "Different Maturities", desc: "Government securities are available across different maturities, subject to issuance." },
  { icon: Eye, title: "Transparency", desc: "Government securities have defined terms such as coupon, maturity and face value." },
  { icon: Smartphone, title: "Digital Access", desc: "Access may be available through authorized digital platforms and intermediaries where applicable." },
];

export const BONDS_PROCESS: BondProcessStep[] = [
  { step: "01", title: "Invest", desc: "The investor purchases a government security.", icon: Wallet },
  { step: "02", title: "Hold", desc: "The investor holds the security according to its terms.", icon: ShieldCheck },
  { step: "03", title: "Receive Interest", desc: "For applicable coupon-bearing securities, interest is paid according to the specified schedule.", icon: Percent },
  { step: "04", title: "Market Value Changes", desc: "If the security is traded before maturity, its market price can rise or fall.", icon: TrendingUp },
  { step: "05", title: "Maturity", desc: "At maturity, the principal is repaid according to the security's terms.", icon: Banknote },
];

export const BOND_TYPES: BondType[] = [
  { id: "treasury-bills", icon: Banknote, title: "Treasury Bills", desc: "Short-term government securities, typically issued at a discount to face value.", examples: ["91-day", "182-day", "364-day"], accent: "from-royal to-sky", issuer: "Government of India", tenure: "91–364 days", couponRate: "Discount-based", faceValue: 100 },
  { id: "dated-gsec", icon: Landmark, title: "Dated Government Securities", desc: "Medium- and long-term securities issued by the Central Government, generally with specified maturity and coupon terms.", accent: "from-navy to-royal", issuer: "Government of India", tenure: "5–40 years", couponRate: "Fixed (as per issue)", faceValue: 100 },
  { id: "sdl", icon: Building2, title: "State Development Loans", desc: "Securities issued by State Governments to meet their borrowing requirements.", accent: "from-teal-brand to-cyan-brand", issuer: "State Governments", tenure: "10–30 years", couponRate: "Fixed (as per issue)", faceValue: 100 },
  { id: "floating-rate-bonds", icon: Percent, title: "Floating Rate Bonds", desc: "Government securities where the interest rate changes periodically according to the security's specified benchmark/reset mechanism.", accent: "from-sky to-teal-brand", issuer: "Government of India", tenure: "Varies", couponRate: "Floating (benchmark-linked)", faceValue: 100 },
  { id: "sovereign-gold-bonds", icon: Coins, title: "Sovereign Gold Bonds", desc: "Where an applicable issue is available, these are government securities linked to the market value of gold and subject to the terms of the particular issue.", accent: "from-amber-500 to-amber-600", issuer: "Government of India / RBI", tenure: "8 years", couponRate: "2.5% p.a. (indicative)", faceValue: 100 },
];

export const BONDS_COMPARISON = {
  title: "Understanding Your Investment Choices",
  description: "An educational comparison — no investment is universally better. The right choice depends on your goals, horizon, liquidity needs and risk tolerance.",
  headers: ["Feature", "Government Bonds", "Bank FDs", "Equity Mutual Funds", "Corporate Bonds"],
  rows: [
    { feature: "Issuer", govtBonds: "Government (Central / State)", bankFd: "Bank", equityMf: "Asset Management Company", corpBonds: "Corporates" },
    { feature: "Return Structure", govtBonds: "Coupon (for applicable securities) + principal at maturity", bankFd: "Fixed interest as per FD terms", equityMf: "Market-linked (no guaranteed return)", corpBonds: "Coupon + principal (subject to issuer credit)" },
    { feature: "Market Price Fluctuation", govtBonds: "Yes — prices can change before maturity", bankFd: "Generally not traded on market", equityMf: "NAV fluctuates daily with markets", corpBonds: "Yes — prices can change before maturity" },
    { feature: "Liquidity", govtBonds: "Depends on the security and market", bankFd: "Premature withdrawal subject to bank terms", equityMf: "Generally high (subject to fund terms)", corpBonds: "Depends on the security and market" },
    { feature: "Typical Horizon", govtBonds: "Short to long term (varies by security)", bankFd: "Short to medium term", equityMf: "Typically long term", corpBonds: "Medium to long term" },
    { feature: "Risk Characteristics", govtBonds: "Low credit/default risk; interest-rate & market-price risk", bankFd: "Subject to bank & deposit-insurance terms", equityMf: "Market risk; volatility", corpBonds: "Credit risk + interest-rate risk" },
    { feature: "Income Structure", govtBonds: "Scheduled coupon for applicable securities", bankFd: "Interest as per FD payout", equityMf: "Dividends / gains (not guaranteed)", corpBonds: "Scheduled coupon for applicable securities" },
  ],
};

export const BONDS_PRICE_RATE = {
  title: "Why Bond Prices Change",
  description: "There is an inverse relationship between prevailing market interest rates and the prices of existing fixed-coupon bonds — when rates rise, existing bond prices tend to fall, and vice versa. This is a simplified explanation; actual prices are affected by multiple factors.",
  ruleUp: { label: "Interest Rates ↑", effect: "Existing Fixed-Coupon Bond Prices ↓" },
  ruleDown: { label: "Interest Rates ↓", effect: "Existing Fixed-Coupon Bond Prices ↑" },
  note: "Illustrative example — not a prediction. Actual prices depend on many factors including coupon, time to maturity, liquidity and market conditions.",
};

export const BONDS_HOLD_VS_SELL = {
  title: "Holding to Maturity vs Selling Early",
  hold: { title: "Hold Until Maturity", points: [
    "Scheduled coupon payments where applicable.",
    "Principal repayment according to the security's terms at maturity.",
    "Market price fluctuations matter less if the investor does not sell before maturity, subject to issuer obligations.",
  ]},
  sell: { title: "Sell Before Maturity", points: [
    "The security is sold at the prevailing market price.",
    "The investor may make a capital gain.",
    "The investor may incur a capital loss.",
    "Interest-rate movements can affect market value.",
  ]},
};

export const BONDS_PROFILES: BondProfile[] = [
  { icon: ShieldCheck, title: "Conservative Investors", desc: "People seeking exposure to government securities." },
  { icon: CalendarClock, title: "Income-Oriented Investors", desc: "Investors interested in scheduled coupon payments where applicable." },
  { icon: PieChart, title: "Diversification Seekers", desc: "Investors looking to diversify beyond equities." },
  { icon: Clock, title: "Long-Term Investors", desc: "Investors whose objectives match the maturity and liquidity characteristics of the security." },
];

export const BONDS_PROFILES_NOTE = "Suitability depends on your financial goals, investment horizon, liquidity needs and risk tolerance. Government bonds are not suitable for everyone.";

export const BONDS_BENEFITS_RISKS = {
  title: "Understand Both the Benefits & Risks",
  benefits: ["Government issuer", "Defined maturity", "Potentially predictable coupon income for applicable securities", "Portfolio diversification", "Multiple maturity options"],
  risks: ["Interest-rate risk", "Market-price risk when selling before maturity", "Inflation risk", "Liquidity considerations", "Reinvestment risk", "Terms differ between securities"],
};

export const BONDS_EXAMPLE = {
  title: "A Simple Government Bond Example",
  faceValue: 100000,
  couponRate: 7,
  note: "This is an illustrative example for education only — NOT a current investment offer. Coupon rates, prices and terms vary between securities and change over time.",
  points: [
    "Coupon payment depends on the security's terms.",
    "Market value can change over time.",
    "Selling before maturity can produce a gain or loss.",
    "Principal repayment is according to the security's terms at maturity.",
  ],
};

export const BONDS_INVEST_PROCESS: BondProcessStep[] = [
  { step: "01", title: "Understand Your Investment Goal", desc: "Clarify your objectives, horizon, income needs and risk tolerance before considering any security.", icon: Target },
  { step: "02", title: "Select an Appropriate Government Security", desc: "Understand the available types of government securities and their general characteristics.", icon: PieChart },
  { step: "03", title: "Review Coupon, Yield, Maturity & Terms", desc: "Examine the security's coupon, yield, maturity and specific terms carefully. Remember: coupon rate ≠ yield ≠ total return.", icon: Scale },
  { step: "04", title: "Complete the Required Investment Process", desc: "Where applicable, access is available through authorized platforms and intermediaries.", icon: Smartphone },
  { step: "05", title: "Monitor or Hold Until Maturity", desc: "Track your investment or hold it until maturity, depending on your strategy and the security's terms.", icon: Eye },
];

export const BONDS_TRUST = {
  title: "Making Investment Concepts Easier to Understand",
  description: "We focus on clear, transparent investor education — helping you understand financial concepts so you can make informed decisions.",
  cards: [
    { icon: Eye, title: "Clear Information", desc: "We explain financial concepts in plain language." },
    { icon: ShieldCheck, title: "Transparent Communication", desc: "We present both benefits and risks honestly." },
    { icon: Info, title: "Investor Education", desc: "We help you understand how different securities work." },
  ],
};

export const BONDS_FAQS: BondFaq[] = [
  { q: "What are government bonds?", a: "Government bonds are debt securities issued by governments to raise funds. When you purchase a government security, you are effectively lending money to the issuing government under the terms of that security, which may provide scheduled interest and repayment of principal according to its terms." },
  { q: "Are government bonds risk-free?", a: "No investment is entirely risk-free. Government securities are generally considered to have low credit/default risk. However, they carry interest-rate risk and market-price risk — if you sell before maturity, the market price may be higher or lower than your purchase price. Inflation and liquidity risks also apply." },
  { q: "How do government bonds generate returns?", a: "Returns can come from two sources: (1) scheduled coupon (interest) payments for applicable securities, and (2) possible price appreciation or depreciation if the security is sold before maturity. The total return depends on the purchase price, coupon, holding period and sale/maturity terms." },
  { q: "Can I sell a government bond before maturity?", a: "Tradability and liquidity depend on the specific security and the market. Some government securities can be traded on the secondary market, where the prevailing market price may be higher or lower than your purchase price, resulting in a capital gain or loss." },
  { q: "What happens when a government bond reaches maturity?", a: "At maturity, the principal is repaid according to the security's terms. The investor receives the face-value repayment subject to the issuing government's obligations under that security." },
  { q: "What is a coupon rate?", a: "The coupon rate is the scheduled interest rate specified by the security, applied to its face value. It determines the periodic interest payment for applicable fixed-coupon securities. The coupon rate is fixed at issuance for fixed-coupon bonds and does not change with market conditions." },
  { q: "What is bond yield?", a: "Yield is a measure of return that reflects the security's price, coupon and time to maturity. Yield is not the same as the coupon rate — when a bond's market price changes, its yield changes too. Yield-to-maturity is a common measure used to estimate the annualised return if the security is held to maturity." },
  { q: "Why do bond prices change?", a: "Bond prices move primarily due to changes in prevailing market interest rates — there is an inverse relationship. When interest rates rise, existing fixed-coupon bond prices tend to fall, and vice versa. Other factors include time to maturity, liquidity, credit conditions and market demand." },
  { q: "What are Treasury Bills?", a: "Treasury Bills (T-Bills) are short-term government securities, typically issued at a discount to their face value. Common tenors include 91-day, 182-day and 364-day. They do not pay a periodic coupon; the return is the difference between the purchase price and the face value at maturity." },
  { q: "What are State Development Loans?", a: "State Development Loans (SDLs) are securities issued by State Governments to meet their borrowing requirements. They have their own coupon, maturity and terms, and are subject to the issuing State Government's obligations." },
  { q: "What is the difference between a government bond and an FD?", a: "A bank Fixed Deposit (FD) is a deposit product with a bank, while a government bond is a debt security issued by a government. FDs are generally not traded on the market, while government bonds can have fluctuating market prices. Their issuers, return structures, liquidity and risk characteristics differ. Neither is universally better — suitability depends on your goals." },
  { q: "Can I invest in government securities online?", a: "Access to government securities depends on the available authorized platforms and intermediaries and current offerings. TNL Fincorp provides education and guidance; it does not operate its own trading or investment execution platform. Please consult authorized platforms/intermediaries for actual transactions." },
  { q: "Are government bonds suitable for everyone?", a: "No. Suitability depends on your individual financial objectives, investment horizon, liquidity needs and risk tolerance. Government bonds may be considered by investors seeking exposure to government securities, but they are not appropriate for everyone. Please assess your own situation or consult a qualified advisor." },
];

export const BONDS_DISCLAIMER = "The information on this page is for general investor education only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security. Government securities are subject to the terms of the respective security and prevailing regulations. Coupon rates, yields, prices, availability and terms change over time. TNL Fincorp provides education and guidance; it is not a registered investment advisor, stockbroker, or trading platform. Please consult authorized platforms/intermediaries and a qualified advisor before making any investment decision.";

export const BONDS_CALCULATOR = {
  title: "Government Bond Return Calculator",
  description: "An educational tool to understand how coupon income works. This is a simplified illustration — not a guaranteed-return calculator. Actual returns depend on purchase price, yield, market conditions and the security's terms.",
  defaults: { investmentAmount: 100000, purchasePrice: 100, couponRate: 7, faceValue: 100, yearsToMaturity: 10 },
  note: "Educational estimate only. Coupon rate ≠ yield ≠ total investment return. Actual results vary based on the security, market price, reinvestment and other factors.",
};
