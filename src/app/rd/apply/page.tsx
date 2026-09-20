import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { RdApplicationPage } from "@/components/sections/rd-application-page";

export const metadata: Metadata = {
  title: "RD Application Form | TNL Fincorp",
  description: "Apply for a Recurring Deposit securely and conveniently through TNL Fincorp's digital application form.",
  alternates: { canonical: "/rd/apply" },
};

export default function RdApplyRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"><RdApplicationPage /></main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
