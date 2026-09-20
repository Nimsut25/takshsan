"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Download, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/tnl/reveal";

type CertData = {
  ok: boolean;
  applicationNo: string;
  certificateNo: string;
  rdAccountNo: string;
  applicantName: string;
  fatherHusbandName: string;
  panNo: string;
  residentialAddress: string;
  city: string;
  state: string;
  pin: string;
  monthlyInstallment: string;
  amountInWords: string;
  depositDate: string;
  tenureYears: number;
  tenureMonths: number;
  interestRate: string;
  maturityDate: string;
  maturityAmount: string;
  interestPaymentOption: string;
  depositType: string;
  nomineeName: string;
  nomineeRelationship: string;
  certificateIssueDate: string;
  paymentStatus: string;
};

export function RdSuccessPage({ applicationNo }: { applicationNo: string }) {
  const [data, setData] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!applicationNo) { queueMicrotask(() => { setError("No application number provided."); setLoading(false); }); return; }
    fetch(`/api/rd/certificate?applicationNo=${applicationNo}`)
      .then((r) => r.json())
      .then((d) => { if (d.ok) setData(d); else setError(d.message || "Certificate not found."); })
      .catch(() => setError("Failed to load certificate."))
      .finally(() => setLoading(false));
  }, [applicationNo]);

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="size-10 animate-spin text-royal" /></div>;
  if (error || !data) return <div className="flex min-h-[60vh] items-center justify-center px-6"><div className="text-center"><AlertCircle className="mx-auto size-12 text-muted-foreground" /><p className="mt-4 font-display text-lg font-bold text-navy">{error || "Certificate not found"}</p><Link href="/investment/rd" className="mt-4 inline-block text-sm font-semibold text-royal hover:underline">← Back to RD Page</Link></div></div>;

  return (
    <div className="overflow-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal direction="up">
          <div className="mb-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow"><CheckCircle2 className="size-8" /></span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">Recurring Deposit Certificate</h1>
            <p className="mt-1 text-sm text-muted-foreground">Certificate No: <span className="font-bold text-royal">{data.certificateNo}</span></p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-glow">
            <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky p-6 text-center text-white">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="relative"><h2 className="font-display text-2xl font-extrabold tracking-wide">FIXED DEPOSIT CERTIFICATE</h2></div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                <span>Certificate No.: <span className="font-bold text-navy">{data.certificateNo}</span></span>
                <span>RD Account No.: <span className="font-bold text-navy">{data.rdAccountNo}</span></span>
                <span>Date of Issue: <span className="font-bold text-navy">{new Date(data.certificateIssueDate).toLocaleDateString("en-IN")}</span></span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <CertRow label="Name of Depositor" value={data.applicantName} />
                <CertRow label="PAN No." value={data.panNo} />
                <CertRow label="Address" value={`${data.residentialAddress}, ${data.city}, ${data.state} - ${data.pin}`} />
                <CertRow label="Monthly Installment" value={`₹${Number(data.monthlyInstallment).toLocaleString("en-IN")}`} />
                <CertRow label="Amount in Words" value={data.amountInWords || "—"} />
                <CertRow label="Date of Deposit" value={new Date(data.depositDate).toLocaleDateString("en-IN")} />
                <CertRow label="Tenure" value={`${data.tenureYears} Years ${data.tenureMonths} Months`} />
                <CertRow label="Rate of Interest" value={`${data.interestRate}% p.a.`} />
                <CertRow label="Maturity Date" value={new Date(data.maturityDate).toLocaleDateString("en-IN")} />
                <CertRow label="Maturity Amount" value={`₹${Number(data.maturityAmount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`} />
                <CertRow label="Interest Payment" value={data.interestPaymentOption} />
                <CertRow label="Deposit Type" value={data.depositType} />
                <CertRow label="Nominee Name" value={data.nomineeName || "—"} />
                <CertRow label="Nominee Relationship" value={data.nomineeRelationship || "—"} />
              </div>

              <div className="mt-6 rounded-xl border border-primary/10 bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-navy">Terms &amp; Conditions</p>
                <p className="mt-1">This certificate is issued against the Recurring Deposit amount received by the institution. Interest will be payable as per the applicable terms and conditions of the RD scheme. The Recurring Deposit will mature on the maturity date mentioned above. Premature withdrawal, if permitted, will be subject to the applicable rules, charges, and conditions. The depositor must notify the institution of any change in address or other relevant details. This certificate should be kept safely and presented as required for maturity or other permitted transactions. Applicable taxes and statutory deductions will be made as per prevailing law.</p>
              </div>

              <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs">
                <div><p className="font-semibold text-navy">Place: —</p><p className="mt-1 text-muted-foreground">Authorized Signatory</p><p className="font-semibold text-navy">TNL Fincorp</p></div>
                <div className="text-right"><p className="font-semibold text-navy">Depositor Signature</p><p className="mt-1 text-muted-foreground">{data.applicantName}</p></div>
              </div>
            </div>

            <div className="border-t border-primary/10 bg-secondary/30 p-4 text-center">
              <p className="text-[10px] leading-relaxed text-muted-foreground">This document is a digitally generated transaction record based on the application data submitted through this website. It is not an official Government of India, RBI, SEBI, or statutory authority certificate unless expressly issued or authorized by the relevant authority.</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`/api/rd/certificate?applicationNo=${applicationNo}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"><Download className="size-4" /> Download RD Certificate (PDF)</a>
            <Link href="/investment/rd" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-royal hover:bg-primary/5"><ArrowLeft className="size-4" /> Back to RD Page</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CertRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b border-primary/5 pb-2"><span className="text-xs text-muted-foreground">{label}</span><span className="text-sm font-semibold text-navy">{value}</span></div>;
}
