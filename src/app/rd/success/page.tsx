import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { RdSuccessPage } from "@/components/sections/rd-success-page";

export const metadata: Metadata = { title: "RD Certificate | TNL Fincorp" };

export default async function RdSuccessRoute({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) {
  const { app } = await searchParams;
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"><RdSuccessPage applicationNo={app || ""} /></main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
