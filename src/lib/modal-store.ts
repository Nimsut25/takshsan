"use client";

import { create } from "zustand";
import type { LoanSlug } from "@/lib/site-data";

type ModalStore = {
  loanSlug: LoanSlug | null;
  enquiryOpen: boolean;
  enquiryLoan: string | null;
  openLoan: (slug: LoanSlug) => void;
  closeLoan: () => void;
  openEnquiry: (loan?: string) => void;
  closeEnquiry: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  loanSlug: null,
  enquiryOpen: false,
  enquiryLoan: null,
  openLoan: (slug) => set({ loanSlug: slug }),
  closeLoan: () => set({ loanSlug: null }),
  openEnquiry: (loan) => set({ enquiryOpen: true, enquiryLoan: loan ?? null }),
  closeEnquiry: () => set({ enquiryOpen: false, enquiryLoan: null }),
}));
