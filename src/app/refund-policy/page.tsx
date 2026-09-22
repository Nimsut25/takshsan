import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy | TNL Fincorp",
  description: "Refund Policy for TNL Fincorp — understand how refunds, cancellations, and payment disputes are handled.",
  alternates: { canonical: "/refund-policy" },
};

const sections = [
  { id: "overview", heading: "Overview", body: <P>This Refund Policy explains the general approach to refunds for fees, charges, and payments made through the TNL Fincorp website. This policy is subject to the specific terms applicable to each product or service.</P> },
  { id: "application-fees", heading: "Application and Service Fees", body: <P>Refunds, if applicable, depend on the nature of the fee and the applicable product/service terms. <Placeholder>INSERT ACTUAL REFUNDABLE/NON-REFUNDABLE FEE TERMS</Placeholder></P> },
  { id: "financial-transactions", heading: "Financial Product Transactions", body: <P>Cancellation/refund rights for financial products or transactions are governed by the applicable product terms, application documents, agreements, and applicable laws/regulations. This Refund Policy does not override specific product terms.</P> },
  { id: "duplicate-payments", heading: "Duplicate or Incorrect Payments", body: <><P>If a payment was accidentally duplicated, the amount was debited incorrectly, a technical error occurred, or a transaction appears unsuccessful but money was deducted, please contact us immediately at <Placeholder>REFUND/PAYMENT SUPPORT EMAIL</Placeholder> with your transaction reference and payment details.</P></> },
  { id: "eligibility", heading: "Refund Eligibility", body: <P>Refund eligibility depends on the applicable product/service terms and the nature of the payment. <Placeholder>INSERT ACTUAL REFUND ELIGIBILITY CRITERIA</Placeholder></P> },
  { id: "process", heading: "Refund Process", body: <><P>The general refund process is as follows:</P><UL><li>Contact TNL Fincorp</li><li>Provide transaction/application reference</li><li>Provide payment details necessary for verification</li><li>TNL Fincorp reviews the request</li><li>If approved, refund is processed through the applicable payment channel</li></UL><P>Refund processing timeframe: <Placeholder>REFUND PROCESSING TIMEFRAME</Placeholder></P></> },
  { id: "non-refundable", heading: "Non-Refundable Amounts", body: <P><Placeholder>LIST APPLICABLE NON-REFUNDABLE FEES/CHARGES</Placeholder></P> },
  { id: "third-party-providers", heading: "Third-Party Payment Providers", body: <P>Payment processing may be handled by third-party payment gateways. Processing timelines may depend on the relevant provider/bank and are subject to their policies.</P> },
  { id: "contact", heading: "Contact", body: <><P>Email: <Placeholder>OFFICIAL EMAIL ADDRESS</Placeholder></P><P>Phone: <Placeholder>PHONE NUMBER</Placeholder></P><P>Address: <Placeholder>REGISTERED OFFICE ADDRESS</Placeholder></P></> },
];

export default function RefundPolicyPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="Refund Policy"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="This Refund Policy explains the general approach to refunds for fees, charges, and payments associated with TNL Fincorp's services."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
