import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LoanPageContent } from "@/components/tnl/loan-page-content";
import { LOAN_PRODUCTS } from "@/lib/site-data";

/** Map URL param → loan slug. */
const PARAM_TO_SLUG: Record<string, string> = {
  personal: "personal",
  business: "business",
  home: "home",
  "loan-against-property": "lap",
  auto: "auto",
  education: "education",
};

export function generateStaticParams() {
  return Object.keys(PARAM_TO_SLUG).map((param) => ({ slug: param }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const loanSlug = PARAM_TO_SLUG[slug];
  const loan = LOAN_PRODUCTS.find((p) => p.slug === loanSlug);
  if (!loan) return {};
  return {
    title: loan.title,
    description: loan.short,
    alternates: { canonical: `/loans/${slug}` },
    openGraph: {
      title: `${loan.title} | TNL Fincorp`,
      description: loan.short,
      images: [{ url: loan.image, width: 864, height: 1152, alt: loan.title }],
    },
  };
}

export default async function LoanPage({ params }: Params) {
  const { slug } = await params;
  if (!PARAM_TO_SLUG[slug]) notFound();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-[4.5rem]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft">
            <LoanPageContent slug={slug} />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
      <PremiumCursor />
    </div>
  );
}
