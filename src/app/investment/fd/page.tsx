import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { InvestmentPage } from "@/components/sections/investment-page";
import { FdCalculator } from "@/components/tnl/fd-calculator";
import { FD_PRODUCT } from "@/lib/investment-data";

export const metadata: Metadata = {
  title: "Fixed Deposit (FD)",
  description:
    "Invest in Fixed Deposits with TNL Fincorp. Understand FD options, estimate maturity and get guidance on documentation and booking with TNL Fincorp.",
  alternates: { canonical: "/investment/fd" },
  openGraph: {
    title: "Fixed Deposit (FD) | TNL Fincorp",
    description:
      "Explore FD investment options with indicative returns, an FD return calculator and guided application support.",
    images: [
      { url: "/images/fd-hero.jpg", width: 1344, height: 768, alt: "FD investment" },
    ],
  },
};

export default function FdPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InvestmentPage slug="fd" Calculator={FdCalculator} />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
