import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Return Policy | TNL Fincorp",
  description: "Return Policy for TNL Fincorp — how requests relating to applications, services, and transactions are handled.",
  alternates: { canonical: "/return-policy" },
};

const sections = [
  { id: "applicability", heading: "Applicability", body: <P>Physical-product returns do not apply to financial services, applications, investments, deposits, or digital services unless specifically stated. This Return Policy addresses how requests relating to applications, services, documents, or other transactions may be handled by TNL Fincorp.</P> },
  { id: "application-cancellation", heading: "Application Cancellation", body: <P>Users may request cancellation of an application where cancellation is permitted under the applicable product/service terms. Cancellation after processing, approval, allotment, investment, or completion may not be possible.</P> },
  { id: "service-requests", heading: "Service Requests", body: <P>If you believe an application or service request was submitted incorrectly, please contact TNL Fincorp as soon as possible with the relevant details.</P> },
  { id: "incorrect-information", heading: "Incorrect Information", body: <P>If you discover incorrect information in an application, please contact TNL Fincorp immediately. Corrections may be possible subject to verification and applicable procedures.</P> },
  { id: "documents", heading: "Documents", body: <P>If documents are uploaded or submitted, correction or resubmission may be possible subject to applicable procedures and verification.</P> },
  { id: "financial-transactions", heading: "Financial Transactions", body: <P>Financial transactions cannot necessarily be "returned" in the same way as physical products. Any cancellation, redemption, withdrawal, or reversal will be governed by the applicable product terms, application documents, agreements, applicable laws/regulations, and relevant financial institution/service provider procedures.</P> },
  { id: "how-to-request", heading: "How to Request Assistance", body: <><P>To request assistance:</P><UL><li>Step 1: Contact TNL Fincorp</li><li>Step 2: Provide application/transaction reference</li><li>Step 3: Explain the issue</li><li>Step 4: Provide supporting information/documents where required</li><li>Step 5: Wait for review and further instructions</li></UL></> },
  { id: "contact", heading: "Contact", body: <><P>Email: care@tnlfincorp.in</P><P>Phone: +91 94279 79991</P></> },
  { id: "exceptions", heading: "Exceptions", body: <P>Certain products/services may have separate cancellation, withdrawal, redemption, or dispute procedures. Please review the applicable product terms for specific guidance.</P> },
  { id: "updates", heading: "Updates", body: <P>TNL Fincorp may update this policy when business processes or legal requirements change.</P> },
];

export default function ReturnPolicyPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="Return Policy"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="This Return Policy explains how requests relating to applications, services, documents, or other transactions may be handled by TNL Fincorp."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
