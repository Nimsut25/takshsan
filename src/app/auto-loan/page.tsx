import type { Metadata } from "next";
import { LoanPageLayout } from "@/components/tnl/loan-page-layout";
import { LoanPageClient } from "@/components/tnl/loan-page-client";
import { LOAN_PAGE_DATA } from "@/lib/loan-page-data";

const loan = LOAN_PAGE_DATA.auto;

export const metadata: Metadata = {
  title: loan.metaTitle,
  description: loan.metaDescription,
  alternates: { canonical: "/auto-loan" },
  openGraph: {
    title: loan.metaTitle,
    description: loan.metaDescription,
    images: [{ url: loan.heroImage, width: 864, height: 1152, alt: "Auto Loan" }],
  },
};

export default function AutoLoanPage() {
  return (
    <LoanPageLayout>
      <LoanPageClient slug="auto" variant="auto" />
    </LoanPageLayout>
  );
}
