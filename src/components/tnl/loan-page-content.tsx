"use client";

import { use } from "react";
import { LOAN_PRODUCTS } from "@/lib/site-data";
import { LoanDetailContent } from "@/components/tnl/loan-detail-content";

/**
 * Client wrapper for the loan detail page. The slug is read from the route
 * params (a Promise in Next 16) and the loan product is resolved on the
 * client side — this avoids serializing the Lucide icon function from a
 * server component to a client component.
 */
export function LoanPageContent({ slug }: { slug: string }) {
  const PARAM_TO_SLUG: Record<string, string> = {
    personal: "personal",
    business: "business",
    home: "home",
    "loan-against-property": "lap",
    auto: "auto",
    education: "education",
  };
  const loanSlug = PARAM_TO_SLUG[slug];
  const loan = LOAN_PRODUCTS.find((p) => p.slug === loanSlug);
  if (!loan) return null;
  return <LoanDetailContent loan={loan} />;
}
