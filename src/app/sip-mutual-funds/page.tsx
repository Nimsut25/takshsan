import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { SipMutualFundsPage } from "@/components/sections/sip-mutual-funds-page";

export const metadata: Metadata = {
  title: "SIP & Mutual Funds | TNL Fincorp",
  description:
    "Understand SIP and mutual funds — how SIPs work, types of mutual funds, SIP calculator, investment goals, risk disclosure and FAQs. Get investment guidance through TNL Fincorp.",
  alternates: { canonical: "/sip-mutual-funds" },
  openGraph: {
    title: "SIP & Mutual Funds | TNL Fincorp",
    description:
      "Explore SIP and mutual fund investment options with an interactive SIP calculator, educational content and investment guidance.",
    images: [{ url: "/images/sip-hero.jpg", width: 1344, height: 768, alt: "SIP & Mutual Funds" }],
  },
};

export default function SipMutualFundsRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <SipMutualFundsPage />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
