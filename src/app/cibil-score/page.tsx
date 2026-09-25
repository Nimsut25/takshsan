import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "CIBIL Score & Credit Health | TNL Fincorp",
  description:
    "Understand your CIBIL score, what affects it and how to improve it before applying for a loan. TNL Fincorp helps you prepare a stronger credit profile for better loan approvals.",
  alternates: { canonical: "/cibil-score" },
};

const sections = [
  {
    id: "overview",
    heading: "What is a CIBIL score",
    body: (
      <P>
        A CIBIL score is a three-digit number (ranging from{" "}
        <Strong>300 to 900</Strong>) that represents your creditworthiness
        based on your credit history. It is one of the key factors lenders
        review when you apply for a loan or credit card. A higher score
        generally improves your chances of approval and may help you access
        better interest rates.
      </P>
    ),
  },
  {
    id: "what-affects",
    heading: "What affects your CIBIL score",
    body: (
      <UL>
        <li>
          <Strong>Repayment history</Strong> — timely EMI and credit card
          payments improve your score; missed or delayed payments hurt it.
        </li>
        <li>
          <Strong>Credit utilisation</Strong> — using a large portion of your
          available credit limit can lower your score.
        </li>
        <li>
          <Strong>Credit mix &amp; age</Strong> — a healthy mix of secured and
          unsecured credit and a longer credit history help.
        </li>
        <li>
          <Strong>Hard enquiries</Strong> — multiple loan applications in a
          short period can temporarily reduce your score.
        </li>
        <li>
          <Strong>Outstanding debts</Strong> — high outstanding balances or
          accounts in default negatively impact your score.
        </li>
      </UL>
    ),
  },
  {
    id: "score-ranges",
    heading: "Score ranges — what they usually mean",
    body: (
      <UL>
        <li>
          <Strong>750 – 900:</Strong> Excellent — strong chances of approval at
          favourable terms.
        </li>
        <li>
          <Strong>700 – 749:</Strong> Good — most lenders will consider your
          application.
        </li>
        <li>
          <Strong>650 – 699:</Strong> Fair — approval possible, but rates may
          be higher.
        </li>
        <li>
          <Strong>550 – 649:</Strong> Poor — likely to face rejection or
          stricter terms.
        </li>
        <li>
          <Strong>300 – 549:</Strong> Very poor — significant improvement
          needed before applying.
        </li>
      </UL>
    ),
  },
  {
    id: "how-to-improve",
    heading: "How to improve your CIBIL score",
    body: (
      <UL>
        <li>Pay EMIs and credit card bills on time, every time</li>
        <li>Keep credit utilisation below 30% of your available limit</li>
        <li>Avoid applying for multiple loans simultaneously</li>
        <li>Maintain a healthy mix of secured and unsecured credit</li>
        <li>Review your credit report regularly and dispute any errors</li>
        <li>Keep older credit accounts open — a longer history helps</li>
      </UL>
    ),
  },
  {
    id: "how-we-help",
    heading: "How TNL Fincorp helps",
    body: (
      <P>
        Before you apply for a loan, our team can help you understand where
        your credit profile stands and what steps you can take to strengthen
        it — so you approach lenders with confidence.
        <Placeholder> INSERT CIBIL SCORE CHECK PARTNER LINK IF AVAILABLE</Placeholder>
      </P>
    ),
  },
  {
    id: "contact",
    heading: "Talk to us",
    body: (
      <>
        <P>Email: care@tnlfincorp.in</P>
        <P>Phone: +91 94279 79991</P>
        <P>
          Address: 34 Madhuban, Sumukh Circle, Nr. Happy Villy International
          School, Dindoli, Surat, Gujarat, India.
        </P>
      </>
    ),
  },
];

export default function CibilScorePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="CIBIL Score & Credit Health"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="Understand your CIBIL score, what influences it and how to improve it — so you can approach your next loan application with confidence."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
