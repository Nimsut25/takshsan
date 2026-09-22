import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | TNL Fincorp",
  description: "Terms and Conditions governing your use of the TNL Fincorp website and services.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections = [
  { id: "acceptance", heading: "Acceptance of Terms", body: <P>By accessing or using the TNL Fincorp website, you indicate your acceptance of these Terms & Conditions. If you do not agree with any part of these Terms, please do not use the website.</P> },
  { id: "about-website", heading: "About the Website", body: <P>This website provides information about financial products, services, applications, and related offerings. TNL Fincorp provides FD & RD facilities, loan assistance, investment guidance, and insurance information through this platform.</P> },
  { id: "eligibility", heading: "Eligibility", body: <P>Users must provide accurate information and comply with applicable laws and eligibility requirements for specific products/services. Certain products may have specific age, residency, or other eligibility criteria.</P> },
  { id: "accuracy", heading: "Accuracy of Information", body: <><P>Users must provide <Strong>accurate, complete, current, and authentic</Strong> information when submitting forms or applications. False or misleading information may result in rejection, cancellation, or other action where legally permitted.</P></> },
  { id: "financial-disclaimer", heading: "Financial Information Disclaimer", body: <P>General website information should not be automatically interpreted as personalized financial, investment, tax, or legal advice. Users should independently evaluate products and obtain professional advice where appropriate.</P> },
  { id: "product-info", heading: "Product/Service Information", body: <P>Product availability, rates, returns, fees, eligibility, tenure, terms, documentation requirements, and other details may change. Only the applicable official documentation/agreement/application terms should govern a specific transaction. Returns or approvals are not guaranteed.</P> },
  { id: "applications", heading: "Applications and Approvals", body: <><P>Submitting an online application does not necessarily mean approval or acceptance. Applications may be subject to:</P><UL><li>Verification</li><li>KYC</li><li>Eligibility criteria</li><li>Documentation</li><li>Internal procedures</li><li>Applicable laws and regulations</li></UL></> },
  { id: "user-responsibilities", heading: "User Responsibilities", body: <><P>Users agree not to:</P><UL><li>Provide false information</li><li>Impersonate another person</li><li>Misuse the website</li><li>Attempt unauthorized access</li><li>Introduce malicious code</li><li>Disrupt website functionality</li><li>Scrape or copy protected content unlawfully</li><li>Use the website for illegal purposes</li></UL></> },
  { id: "intellectual-property", heading: "Intellectual Property", body: <P>The logo, brand name, website design, text, images, graphics, software, and content are owned by TNL Fincorp. Users must not reproduce or commercially exploit protected content without authorization, except where permitted by law.</P> },
  { id: "third-party-links", heading: "Third-Party Links", body: <P>Third-party links may be provided for convenience. TNL Fincorp does not necessarily control or endorse third-party content and is not responsible for the content or practices of external websites.</P> },
  { id: "availability", heading: "Website Availability", body: <P>TNL Fincorp does not guarantee uninterrupted or error-free availability of the website. The website may be temporarily unavailable due to maintenance, technical issues, or other reasons.</P> },
  { id: "liability", heading: "Limitation of Liability", body: <P>To the extent permitted by applicable law, TNL Fincorp shall not be liable for indirect, incidental, or consequential damages arising from the use of the website. This does not exclude rights that cannot legally be excluded.</P> },
  { id: "indemnification", heading: "Indemnification", body: <P>Users agree to indemnify TNL Fincorp against losses or claims arising from misuse of the website or violation of these Terms, to the extent permitted by applicable law.</P> },
  { id: "suspension", heading: "Suspension or Termination", body: <P>Access may be restricted or suspended where necessary for security, legal compliance, misuse, or other legitimate reasons.</P> },
  { id: "governing-law", heading: "Governing Law and Jurisdiction", body: <P><Placeholder>APPLICABLE STATE/COUNTRY AND JURISDICTION — TO BE CONFIRMED</Placeholder></P> },
  { id: "changes-to-terms", heading: "Changes to Terms", body: <P>TNL Fincorp may update these Terms from time to time. The latest version will be published on the website.</P> },
  { id: "contact", heading: "Contact Information", body: <><P><Strong>TNL Fincorp</Strong></P><P>Address: 34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli, Surat, Gujarat, India.</P><P>Email: care@tnlfincorp.in</P><P>Phone: +91 94279 79991</P></> },
];

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="Terms & Conditions"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="These Terms & Conditions govern your use of the TNL Fincorp website and the services, information, forms, and features made available through it."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
