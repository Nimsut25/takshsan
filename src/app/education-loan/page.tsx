import type { Metadata } from "next";
import { LoanPageLayout } from "@/components/tnl/loan-page-layout";
import { LoanPageClient } from "@/components/tnl/loan-page-client";
import { LOAN_PAGE_DATA } from "@/lib/loan-page-data";

const loan = LOAN_PAGE_DATA.education;

export const metadata: Metadata = {
  title: loan.metaTitle,
  description: loan.metaDescription,
  alternates: { canonical: "/education-loan" },
  openGraph: {
    title: loan.metaTitle,
    description: loan.metaDescription,
    images: [{ url: loan.heroImage, width: 864, height: 1152, alt: "Education Loan" }],
  },
};

export default function EducationLoanPage() {
  return (
    <LoanPageLayout>
      <LoanPageClient slug="education" variant="education" />
    </LoanPageLayout>
  );
}
