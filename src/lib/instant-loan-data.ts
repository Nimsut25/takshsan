/**
 * Centralized Instant Loan partner configuration.
 *
 * IMPORTANT: The `applyLink` URLs are EXACT backlinks supplied by the business.
 * Do NOT modify, add UTM parameters, remove query parameters, or alter these
 * URLs in any way. They are the single source of truth for partner redirects.
 *
 * Add new partners by simply adding a new object to the appropriate array.
 */

export type InstantLoanCategory = {
  id: "personal-loan" | "business-loan" | "credit-cards";
  title: string;
  route: string;
  description: string;
  image: string;
  accent: string;
};

export type InstantLoanPartner = {
  id: string;
  name: string;
  category: "personal-loan" | "business-loan" | "credit-cards";
  productType: string;
  description: string;
  applyLink: string;
};

export const INSTANT_LOAN_CATEGORIES: InstantLoanCategory[] = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    route: "/instant-loan/personal-loan",
    description: "Explore personal loan options from participating financial partners.",
    image: "/images/personal-loan.png",
    accent: "from-royal to-sky",
  },
  {
    id: "business-loan",
    title: "Business Loan",
    route: "/instant-loan/business-loan",
    description: "Explore financing options designed for eligible businesses and self-employed applicants.",
    image: "/images/business-loan.png",
    accent: "from-teal-brand to-cyan-brand",
  },
  {
    id: "credit-cards",
    title: "Credit Cards",
    route: "/instant-loan/credit-cards",
    description: "Explore credit card options from participating banking and financial partners.",
    image: "/images/credit-card.png",
    accent: "from-navy to-royal",
  },
];

export const INSTANT_LOAN_PARTNERS: InstantLoanPartner[] = [
  // ── PERSONAL LOAN PARTNERS ──
  {
    id: "poonawalla",
    name: "Poonawalla",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Personal loan application option through the participating partner.",
    applyLink:
      "https://instant-pocket-loan.poonawallafincorp.com/?utm_DSA_Code=PDL00142&UTM_Partner_Name=MyMoneyMantra&UTM_Partner_Medium=B2BApp&UTM_Partner_AgentCode=PFLEARN&UTM_Partner_ReferenceID=ENT972306",
  },
  {
    id: "prefr",
    name: "Prefr",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://marketplace.prefr.com/mymoneymantra?utm_source=EARNTRA_972306",
  },
  {
    id: "hero-fincorp",
    name: "Hero Fincorp",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://hipl.onelink.me/1OrE?af_ios_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_android_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_web_dp=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_xp=custom&pid=Mymoneymantra&is_retargeting=true&af_reengagement_window=30d&c=Mymoneymantra&utm_source=partnership&utm_campaign=mymoneymantra&utm_content=ENT&utm_medium=MMMENT972306",
  },
  {
    id: "dmi-finance",
    name: "DMI Finance",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://play.google.com/store/apps/details?id=in.dmifinance.app&referrer=utm_source%3DMymoneymantra%26utm_medium%3D972306%26utm_term%3D1100110011%26utm_campaign%3DEARNTRA",
  },
  {
    id: "unity-sfb",
    name: "Unity SFB",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=partnership&utm_medium=mymoneymantra&utm_campaign=ENT-972306",
  },
  {
    id: "incred",
    name: "Incred",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://incredpl.mymoneymantra.com/?btb=true&utm_source=incpl&utm_medium=mmm&utm_campaign=incpl-mmm-972306",
  },
  {
    id: "muthoot",
    name: "Muthoot",
    category: "personal-loan",
    productType: "Personal Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://creditlink.finbox.in/?partnerCode=LS_POIOUY&agentCode=dcdel006&productType=business_loan_emi&agentId=972306",
  },

  // ── BUSINESS LOAN PARTNERS ──
  {
    id: "protium",
    name: "Protium",
    category: "business-loan",
    productType: "Business Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://dbl.protium.co.in/utm_source=my_money_mantra&utm_medium=digital&utm_campaign=Earntra_972306",
  },
  {
    id: "muthoot-bl",
    name: "Muthoot BL",
    category: "business-loan",
    productType: "Business Loan",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://creditlink.finbox.in/?partnerCode=LS_POIOUY&agentCode=dcdel006&productType=business_loan_emi&agentId=972306",
  },

  // ── CREDIT CARD PARTNERS ──
  {
    id: "au-bank",
    name: "AU Bank",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://cconboarding.au.bank.in/auccself/utm_source=MMFNT&utm_medium=banner&utm_campaign=MMFNT-display-campaign-ENT-972306",
  },
  {
    id: "federal-bank",
    name: "Federal Bank",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://federalcc.mymoneymantra.com/sms=false&btb=true&utm_source=fedcc&utm_medium=mmm&utm_campaign=fedcc-mmm-972306&utm_term=id",
  },
  {
    id: "axis-bank",
    name: "Axis Bank",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://web.axisbank.co.in/DigitalChannel/WebForm/?ipa68&axisreferralcode=972306",
  },
  {
    id: "indusind-bank",
    name: "IndusInd Bank",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://induseasycredit.indusind.bank.in/customer/credit-card/new-lead?utm_source=partnerships&utm_medium=MyMoneyMantra&utm_campaign=credit-card&utm_content=ENT&gclid=972306",
  },
  {
    id: "tata-neu",
    name: "Tata Neu",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://www.tatadigital.com/v2/finance/creditcard/product-detail?utm_source=Partnerships_external&utm_medium=MyMoneyMantra&utm_campaign=EARNTRA_972306",
  },
  {
    id: "sbi",
    name: "SBI",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://www.sbicard.com/corecards/?CHN=OMLG&GEMID1=ENT_972306&GEMID2=LGD3",
  },
  {
    id: "bobcard",
    name: "BOBCARD",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://mycard.bobcard.tech/utm_source=MMM_xyz&utm_medium=EARNTRA&utm_campaign=972306",
  },
  {
    id: "scapia",
    name: "Scapia",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://apply.scapia.cards/landing_page?utm_source=RKPL_physical&utm_medium=physical&utm_campaign=EARNTRA&utm_content=forex&utm_term=972306",
  },
  {
    id: "kiwi-cards",
    name: "Kiwi Cards",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://au-apply.gokiwi.in?utm_source=mmm&utm_campaign=au&utm_medium=&utm_content=&utm_term=972306",
  },
  {
    id: "yes-ace-kredit-pe",
    name: "Yes Ace from Kredit Pe",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://www.kredit.pe/invite/mymoneymantra_ace/EARNTRA/972306",
  },
  {
    id: "zagg-pnb",
    name: "Zagg PNB",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://app.zagg.money/pnb?source=PNB&campaign=mmm&lead=972306",
  },
  {
    id: "tiger-card",
    name: "Tiger Card",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink:
      "https://induseasycredit.indusind.bank.in/customer/credit-card/lead?utm_source=BCTIGER&utm_medium=hpcarousal&utm_campaign=CC-Microsite&gclid=1&utm_content=RKPL_ENT_972306",
  },
  {
    id: "pop-card",
    name: "POP CARD",
    category: "credit-cards",
    productType: "Credit Card",
    description: "Explore the application option available through this participating partner.",
    applyLink: "https://mmm2-h.getpopcard.co?utm_source=MMM1&utm_medium=EARNTRA&utm_campaign=972306",
  },
];

/** Get partners for a specific category. */
export function getPartnersByCategory(
  category: "personal-loan" | "business-loan" | "credit-cards"
): InstantLoanPartner[] {
  return INSTANT_LOAN_PARTNERS.filter((p) => p.category === category);
}

/** Get a category by its slug. */
export function getCategoryBySlug(
  slug: string
): InstantLoanCategory | undefined {
  return INSTANT_LOAN_CATEGORIES.find((c) => c.id === slug);
}

export const VERIFICATION_FEE = 49;

export const INSTANT_LOAN_FAQS = [
  {
    q: "What is the ₹49 payment for?",
    a: "It is a one-time payment used for the basic verification/application workflow defined by TNL Fincorp. The applicable payment terms are clearly shown before payment.",
  },
  {
    q: "Does paying ₹49 guarantee loan approval?",
    a: "No. Approval remains subject to the respective partner's eligibility and assessment criteria. The ₹49 payment only unlocks the partner application links.",
  },
  {
    q: "Do I need to pay ₹49 for every partner?",
    a: "No. Under the intended one-time verification flow, a successful verified payment unlocks the applicable partner application links according to the system's access rules.",
  },
  {
    q: "What happens after successful payment?",
    a: "Your application information is recorded, payment is verified and the applicable partner links become available through the Apply Instantly buttons.",
  },
  {
    q: "Can I apply to multiple partners?",
    a: "Once the applicable access state is unlocked, you can open the available partner application links directly from the relevant cards.",
  },
  {
    q: "Is my payment information stored?",
    a: "We do not store card credentials, CVV, UPI PIN or other sensitive payment credentials. Only the required transaction/payment reference information is stored.",
  },
  {
    q: "Does TNL Fincorp approve the loan?",
    a: "No. The respective financial partner makes the final decision according to its own eligibility and underwriting process.",
  },
  {
    q: "Can I use the page on mobile?",
    a: "Yes. The entire page and application/payment workflow is fully responsive.",
  },
];

export const INSTANT_LOAN_DISCLAIMER =
  "TNL Fincorp provides this digital interface to help users explore available financial products and partner application options. Loan approval, credit card approval, amount, interest rate, fees, tenure, eligibility and other terms are determined by the respective financial partner according to its applicable criteria and policies. Completing a ₹49 verification/payment does not guarantee loan or credit card approval, sanction or disbursement. Users should review the applicable terms, charges, Key Facts Statement (KFS), agreements and privacy information before proceeding.";
