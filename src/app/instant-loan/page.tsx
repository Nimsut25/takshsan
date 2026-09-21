import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { InstantLoanPage } from "@/components/sections/instant-loan-page";

export const metadata: Metadata = {
  title: "Instant Loan | TNL Fincorp",
  description:
    "Explore personal loans, business loans and credit card partner options through TNL Fincorp's convenient digital application journey.",
  alternates: { canonical: "/instant-loan" },
  openGraph: {
    title: "Instant Loan | TNL Fincorp",
    description:
      "Explore personal loans, business loans and credit card partner options through TNL Fincorp's convenient digital application journey.",
    images: [{ url: "/images/hero-new.png", width: 1344, height: 768, alt: "Instant Loan" }],
  },
};

export default function InstantLoanRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstantLoanPage />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
