import type { Metadata } from "next";
import { LoanPageLayout } from "@/components/tnl/loan-page-layout";
import { LoanPageClient } from "@/components/tnl/loan-page-client";
import { LOAN_PAGE_DATA } from "@/lib/loan-page-data";

const loan = LOAN_PAGE_DATA.home;

export const metadata: Metadata = {
  title: loan.metaTitle,
  description: loan.metaDescription,
  alternates: { canonical: "/home-loan" },
  openGraph: {
    title: loan.metaTitle,
    description: loan.metaDescription,
    images: [{ url: loan.heroImage, width: 864, height: 1152, alt: "Home Loan" }],
  },
};

export default function HomeLoanPage() {
  return (
    <LoanPageLayout>
      <LoanPageClient slug="home" variant="home" />
    </LoanPageLayout>
  );
}
