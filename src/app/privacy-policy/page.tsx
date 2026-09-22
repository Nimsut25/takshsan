import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | TNL Fincorp",
  description: "Learn how TNL Fincorp collects, uses, stores, and protects your personal information when you use our website and services.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  { id: "introduction", heading: "Introduction", body: <P>This Privacy Policy describes how TNL Fincorp ("Takshsan Nidhi Limited") handles information collected through its website, online forms, applications, inquiries, communications, and related services. By using our website and services, you acknowledge the practices described in this Privacy Policy.</P> },
  { id: "information-collected", heading: "Information We Collect", body: <><P><Strong>Personal Information:</Strong> When you use certain forms or services, we may collect your full name, father's/husband's name (where applicable), date of birth, PAN, Aadhaar or other KYC information (where legally required), mobile number, email address, residential address, city, state, and PIN code.</P><P><Strong>Financial/Application Information:</Strong> When required for an application, we may collect bank name, branch, account number, IFSC code, account type, investment/application details, product/service selected, and transaction/application information.</P><P><Strong>Technical Information:</Strong> We may automatically collect IP address, browser type, device information, operating system, website usage information, cookies, and log information.</P></> },
  { id: "how-collected", heading: "How We Collect Information", body: <P>Information may be collected when you: visit the website; submit an inquiry; complete an application form; contact TNL Fincorp; subscribe to communications; request a product/service; communicate through email, phone, WhatsApp, or other available channels; or interact with website features.</P> },
  { id: "how-used", heading: "How We Use Your Information", body: <><P>We may use collected information for purposes including:</P><UL><li>Processing inquiries and applications</li><li>Providing requested services</li><li>Communicating with customers</li><li>Verifying information where required</li><li>Completing KYC or compliance procedures where applicable</li><li>Processing transactions/applications</li><li>Providing customer support</li><li>Improving website functionality</li><li>Maintaining website security</li><li>Preventing fraud or misuse</li><li>Meeting legal and regulatory obligations</li><li>Maintaining business records</li><li>Sending service-related communications</li></UL></> },
  { id: "cookies", heading: "Cookies and Tracking Technologies", body: <><P>Cookies are small text files stored on your device. We may use essential cookies for website functionality, analytics/performance cookies to understand usage patterns, and preference cookies to remember your settings. You can manage or disable cookies through your browser settings. Disabling certain cookies may affect website functionality.</P></> },
  { id: "sharing", heading: "Sharing of Information", body: <><P>Information may be shared only where reasonably necessary and legally permitted, such as with:</P><UL><li>Service providers and technology providers</li><li>Payment/service partners</li><li>Verification/KYC providers</li><li>Professional advisors</li><li>Government/regulatory authorities where legally required</li><li>Law-enforcement authorities where legally required</li><li>Business partners where necessary to provide requested services</li></UL><P>We do not sell your personal information.</P></> },
  { id: "data-security", heading: "Data Security", body: <P>We use reasonable technical and organizational safeguards to protect personal information. However, no internet transmission or electronic storage method can be guaranteed to be completely secure. We strive to protect your information but cannot guarantee absolute security.</P> },
  { id: "data-retention", heading: "Data Retention", body: <P>Information may be retained for as long as reasonably necessary for providing services, completing applications, maintaining business records, legal/regulatory compliance, dispute resolution, fraud prevention, and enforcing agreements.</P> },
  { id: "user-rights", heading: "User Rights and Choices", body: <><P>You may have the right to:</P><UL><li>Request access to your personal information</li><li>Request correction of inaccurate information</li><li>Request information about data handling</li><li>Request deletion where legally permissible</li><li>Withdraw consent where applicable</li><li>Opt out of certain marketing communications</li></UL><P>Some requests may be limited where retention is required by law or legitimate business/legal obligations.</P></> },
  { id: "third-party", heading: "Third-Party Websites and Services", body: <P>Our website may contain links to third-party websites/services. TNL Fincorp is not responsible for the privacy practices of independent third parties. We encourage you to review the privacy policies of any third-party websites you visit.</P> },
  { id: "childrens-privacy", heading: "Children's Privacy", body: <P>The website is not intentionally designed to collect personal information from children where prohibited by applicable law.</P> },
  { id: "changes", heading: "Changes to This Privacy Policy", body: <P>This Privacy Policy may be updated from time to time. The updated version will be published on this page with a revised "Last Updated" date.</P> },
  { id: "contact", heading: "Contact Us", body: <><P><Strong>TNL Fincorp</Strong></P><P>Address: 34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli, Surat, Gujarat, India.</P><P>Email: care@tnlfincorp.in</P><P>Phone: +91 94279 79991</P></> },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="Privacy Policy"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="Your privacy is important to us. This Privacy Policy explains how TNL Fincorp collects, uses, stores, protects, and handles your personal information when you use our website and services."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
