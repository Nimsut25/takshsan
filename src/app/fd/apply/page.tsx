import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { FdApplicationPage } from "@/components/sections/fd-application-page";

export const metadata: Metadata = {
  title: "FD Application Form | TNL Fincorp",
  description: "Apply for a Fixed Deposit securely and conveniently through TNL Fincorp's digital application form.",
  alternates: { canonical: "/fd/apply" },
};

export default function FdApplyRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"><FdApplicationPage /></main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
