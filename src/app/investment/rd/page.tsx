import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { InvestmentPage } from "@/components/sections/investment-page";
import { RdCalculator } from "@/components/tnl/rd-calculator";
import { RD_PRODUCT } from "@/lib/investment-data";

export const metadata: Metadata = {
  title: "Recurring Deposit (RD)",
  description:
    "Build your savings with Recurring Deposits at TNL Fincorp. Understand RD options, estimate maturity and get guidance on documentation and booking with TNL Fincorp.",
  alternates: { canonical: "/investment/rd" },
  openGraph: {
    title: "Recurring Deposit (RD) | TNL Fincorp",
    description:
      "Explore RD investment options with indicative returns, an RD return calculator and guided application support.",
    images: [
      { url: "/images/rd-hero.jpg", width: 1344, height: 768, alt: "RD investment" },
    ],
  },
};

export default function RdPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InvestmentPage slug="rd" Calculator={RdCalculator} />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
