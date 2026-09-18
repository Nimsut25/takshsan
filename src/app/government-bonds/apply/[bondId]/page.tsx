import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { BondApplicationPage } from "@/components/sections/bond-application-page";
import { BOND_TYPES } from "@/lib/bonds-data";

const VALID = BOND_TYPES.map((b) => b.id);

export function generateStaticParams() {
  return VALID.map((id) => ({ bondId: id }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ bondId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { bondId } = await params;
  const bond = BOND_TYPES.find((b) => b.id === bondId);
  if (!bond) return {};
  return {
    title: `Apply for ${bond.title} | TNL Fincorp`,
    description: `Apply for ${bond.title} through TNL Fincorp's digital application form.`,
    alternates: { canonical: `/government-bonds/apply/${bondId}` },
  };
}

export default async function BondApplyRoute({ params }: Params) {
  const { bondId } = await params;
  if (!VALID.includes(bondId)) notFound();
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <BondApplicationPage bondId={bondId} />
      </main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
