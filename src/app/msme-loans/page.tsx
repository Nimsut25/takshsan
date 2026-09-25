import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { MsmePage } from "@/components/sections/msme-loans/msme-page";

export const metadata: Metadata = {
  title: "MSME Loans | Business Financing Solutions | TNL Fincorp",
  description:
    "Explore MSME loan solutions from TNL Fincorp for business expansion, working capital, eligible commercial or industrial property requirements and new business opportunities. Apply online.",
  alternates: { canonical: "/msme-loans" },
  openGraph: {
    title: "MSME Loans | Business Financing Solutions | TNL Fincorp",
    description:
      "Explore MSME loan solutions from TNL Fincorp for business expansion, working capital, eligible commercial or industrial property requirements and new business opportunities. Apply online.",
    url: "/msme-loans",
    images: [{ url: "/images/msme-loans/hero.png", width: 1344, height: 768, alt: "MSME business financing" }],
  },
};

export default function MsmeLoansRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <MsmePage />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
