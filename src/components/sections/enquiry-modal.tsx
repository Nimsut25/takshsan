"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, X } from "lucide-react";
import { useModalStore } from "@/lib/modal-store";
import { EnquiryForm } from "@/components/tnl/enquiry-form";
import { COMPANY } from "@/lib/site-data";

export function EnquiryModal() {
  const { enquiryOpen, enquiryLoan, closeEnquiry } = useModalStore();

  useEffect(() => {
    if (enquiryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [enquiryOpen]);

  return (
    <Dialog open={enquiryOpen} onOpenChange={(o) => !o && closeEnquiry()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border-primary/10 p-0"
      >
        <DialogTitle className="sr-only">Loan Enquiry</DialogTitle>
        <DialogDescription className="sr-only">
          Submit your loan enquiry and our team will contact you.
        </DialogDescription>

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky p-6 text-white sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
          <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
          <button
            onClick={closeEnquiry}
            aria-label="Close enquiry form"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <X className="size-4" />
          </button>
          <div className="relative flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="size-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Apply for a Loan
              </h2>
              <p className="text-sm text-white/80">
                Quick enquiry · {COMPANY.name} team will guide you
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="tnl-scrollbar max-h-[calc(92vh-7rem)] overflow-y-auto p-6 sm:p-7">
          <EnquiryForm
            defaultLoanType={enquiryLoan ?? undefined}
            onDone={() => {
              /* keep modal open to show success state inside the form */
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
