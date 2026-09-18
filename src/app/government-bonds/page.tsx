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
    "Understand government bonds — types of government securities, how they work, benefits, risks, coupon vs yield, and investor education through TNL Fincorp.",
  alternates: { canonical: "/government-bonds" },
  openGraph: {
    title: "Government Bonds | TNL Fincorp",
    description:
      "Educational guide to government bonds: types of securities, how they work, benefits & risks, coupon vs yield, price movements, and a simple bond return calculator.",
    images: [{ url: "/images/bonds-hero.jpg", width: 1344, height: 768, alt: "Government bonds investment education" }],
  },
};

export default function GovernmentBondsRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
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
