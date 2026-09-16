"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LOAN_PRODUCTS } from "@/lib/site-data";
import { useModalStore } from "@/lib/modal-store";
import { LoanDetailContent } from "@/components/tnl/loan-detail-content";

export function LoanDetailModal() {
  const { loanSlug, closeLoan } = useModalStore();
  const loan = LOAN_PRODUCTS.find((p) => p.slug === loanSlug) ?? null;

  // lock scroll
  useEffect(() => {
    if (loanSlug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loanSlug]);

  return (
    <Dialog open={!!loan} onOpenChange={(o) => !o && closeLoan()}>
      <DialogContent
        showCloseButton
        className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border-primary/10 p-0 lg:max-w-6xl xl:max-w-[80rem]"
      >
        <DialogTitle className="sr-only">{loan?.title} details</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed information about {loan?.title} assistance provided by TNL
          Fincorp.
        </DialogDescription>

        {loan && (
          <div className="tnl-scrollbar max-h-[92vh] overflow-y-auto">
            <LoanDetailContent loan={loan} onEnquire={closeLoan} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
