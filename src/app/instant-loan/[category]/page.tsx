import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { InstantLoanCategoryPage } from "@/components/sections/instant-loan-category-page";
import { INSTANT_LOAN_CATEGORIES } from "@/lib/instant-loan-data";

const VALID = INSTANT_LOAN_CATEGORIES.map((c) => c.id);

export function generateStaticParams() {
  return VALID.map((slug) => ({ category: slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = INSTANT_LOAN_CATEGORIES.find((c) => c.id === category);
  if (!cat) return {};
  return {
    title: `${cat.title} Partners | TNL Fincorp`,
    description: cat.description,
    alternates: { canonical: `/instant-loan/${category}` },
    openGraph: {
      title: `${cat.title} Partners | TNL Fincorp`,
      description: cat.description,
      images: [{ url: cat.image, width: 864, height: 1152, alt: cat.title }],
    },
  };
}

export default async function CategoryRoute({ params }: Params) {
  const { category } = await params;
  if (!VALID.includes(category as typeof VALID[number])) notFound();
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstantLoanCategoryPage categorySlug={category} />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
