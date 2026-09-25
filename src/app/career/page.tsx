import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { CareerPage } from "@/components/sections/career/career-page";

export const metadata: Metadata = {
  title: "Careers at TNL Fincorp | Join Our Team",
  description:
    "Explore career opportunities at TNL Fincorp and build your professional future with a team committed to honest financial guidance and customer trust.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers at TNL Fincorp | Join Our Team",
    description:
      "Explore career opportunities at TNL Fincorp and build your professional future with our team.",
    url: "/career",
    images: [{ url: "/images/career/hero-1.png", width: 1344, height: 768, alt: "Careers at TNL Fincorp" }],
  },
};

export default function CareerRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <CareerPage />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
