import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { GovernmentBondsPage } from "@/components/sections/government-bonds-page";

export const metadata: Metadata = {
  title: "Government Bonds | TNL Fincorp",
  description:
    "Understand government bonds — types of government securities (Treasury Bills, Dated G-Secs, SDLs, Floating Rate Bonds, Sovereign Gold Bonds), how they work, benefits, risks, coupon vs yield, and investor education through TNL Fincorp.",
  alternates: { canonical: "/government-bonds" },
  openGraph: {
    title: "Government Bonds | TNL Fincorp",
    description:
      "Educational guide to government bonds: types of securities, how they work, benefits & risks, coupon vs yield, price movements, and a simple bond return calculator.",
    images: [{ url: "/images/bonds-hero.jpg", width: 1344, height: 768, alt: "Government bonds investment education" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are government bonds?", acceptedAnswer: { "@type": "Answer", text: "Government bonds are debt securities issued by governments to raise funds. When you purchase a government security, you are effectively lending money to the issuing government under the terms of that security." } },
    { "@type": "Question", name: "Are government bonds risk-free?", acceptedAnswer: { "@type": "Answer", text: "No investment is entirely risk-free. Government securities are generally considered to have low credit/default risk, but they carry interest-rate risk and market-price risk." } },
    { "@type": "Question", name: "What is the difference between coupon rate and yield?", acceptedAnswer: { "@type": "Answer", text: "The coupon rate is the scheduled interest rate specified by the security. Yield is a measure of return that reflects the security's price, coupon and time to maturity. They are not the same." } },
  ],
};

export default function GovernmentBondsRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="flex-1">
        <GovernmentBondsPage />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
