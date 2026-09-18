import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { BondSuccessPage } from "@/components/sections/bond-success-page";

export const metadata: Metadata = {
  title: "Bond Certificate | TNL Fincorp",
  description: "Your bond application certificate.",
};

export default async function SuccessRoute({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) {
  const { app } = await searchParams;
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <BondSuccessPage applicationNumber={app || ""} />
      </main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
