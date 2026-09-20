import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { FdSuccessPage } from "@/components/sections/fd-success-page";

export const metadata: Metadata = { title: "FD Certificate | TNL Fincorp" };

export default async function FdSuccessRoute({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) {
  const { app } = await searchParams;
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1"><FdSuccessPage applicationNo={app || ""} /></main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
