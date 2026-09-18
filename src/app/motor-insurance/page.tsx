import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { InsurancePage } from "@/components/sections/insurance-page";
import { INSURANCE_DATA } from "@/lib/insurance-data";

const data = INSURANCE_DATA.motor;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: data.route },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [{ url: data.heroImage, width: 1344, height: 768, alt: "Motor Insurance" }] },
};

export default function MotorInsurancePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"><InsurancePage slug="motor" /></main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
