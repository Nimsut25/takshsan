"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Download, FileText, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/tnl/reveal";
import { cn } from "@/lib/utils";

type CertData = {
  ok: boolean;
  applicationNumber: string;
  certificateNumber: string;
  fullName: string;
  fatherHusbandName: string;
  panNumber: string;
  bondName: string;
  bondType: string;
  issuer: string;
  tenure: string;
  couponRate: string;
  faceValue: string;
  investmentAmount: string;
  quantity: number;
  applicationDate: string;
  certificateIssueDate: string;
  residentialAddress: string;
  city: string;
  state: string;
  pinCode: string;
  paymentStatus: string;
  paymentAmount: string;
  place: string;
};

export function BondSuccessPage({ applicationNumber }: { applicationNumber: string }) {
  const [data, setData] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!applicationNumber) {
      queueMicrotask(() => {
        setError("No application number provided.");
        setLoading(false);
      });
      return;
    }
    fetch(`/api/bonds/certificate?applicationNumber=${applicationNumber}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setData(d);
        else setError(d.message || "Certificate not found.");
      })
      .catch(() => setError("Failed to load certificate."))
      .finally(() => setLoading(false));
  }, [applicationNumber]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-royal" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <AlertCircle className="mx-auto size-12 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-bold text-navy">{error || "Certificate not found"}</p>
          <Link href="/government-bonds" className="mt-4 inline-block text-sm font-semibold text-royal hover:underline">← Back to Government Bonds</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="up">
          <div className="mb-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-teal-brand to-sky text-white shadow-glow">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">Bond Certificate</h1>
            <p className="mt-1 text-sm text-muted-foreground">Certificate No: <span className="font-bold text-royal">{data.certificateNumber}</span></p>
          </div>
        </Reveal>

        {/* Certificate */}
        <Reveal direction="up" delay={0.1}>
          <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-glow">
            {/* Certificate header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-navy via-royal to-sky p-6 text-center text-white">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
              <div className="relative">
                <h2 className="font-display text-2xl font-extrabold tracking-wide">BOND CERTIFICATE</h2>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">Government / Corporate Bond Certificate</p>
              </div>
            </div>

            {/* Certificate body */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                <span>Certificate No.: <span className="font-bold text-navy">{data.certificateNumber}</span></span>
                <span>Date of Issue: <span className="font-bold text-navy">{new Date(data.certificateIssueDate).toLocaleDateString("en-IN")}</span></span>
              </div>

              <div className="mt-6 text-sm leading-relaxed text-foreground">
                <p>This is to certify that <span className="font-bold text-navy">{data.fullName}</span>,</p>
                <p>S/o / D/o / W/o <span className="font-bold text-navy">{data.fatherHusbandName || "—"}</span>,</p>
                <p>having PAN <span className="font-bold text-navy">{data.panNumber}</span>, is the registered holder of the following bond:</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <CertRow label="Bond Name" value={data.bondName} />
                <CertRow label="Bond Type" value={data.bondType} />
                <CertRow label="Issuer" value={data.issuer} />
                <CertRow label="Face Value" value={`₹${Number(data.faceValue).toLocaleString("en-IN")}`} />
                <CertRow label="Number of Bonds" value={String(data.quantity)} />
                <CertRow label="Total Investment" value={`₹${Number(data.investmentAmount).toLocaleString("en-IN")}`} />
                <CertRow label="Coupon Rate" value={data.couponRate} />
                <CertRow label="Tenure" value={data.tenure} />
                <CertRow label="Application Date" value={new Date(data.applicationDate).toLocaleDateString("en-IN")} />
              </div>

              {/* Holder details */}
              <div className="mt-6 rounded-xl border border-primary/10 bg-secondary/40 p-4">
                <h3 className="font-display text-sm font-bold text-navy">Holder Details</h3>
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>{data.residentialAddress}</p>
                  <p>{data.city}, {data.state} — {data.pinCode}</p>
                </div>
              </div>

              {/* Declaration */}
              <div className="mt-6 text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-navy">Declaration</p>
                <p className="mt-1">"This certificate confirms the ownership of the above-mentioned bond(s), subject to the terms and conditions applicable to the respective bond issue."</p>
              </div>

              <div className="mt-6 flex flex-wrap justify-between gap-2 text-xs">
                <span>Place: <span className="font-bold text-navy">{data.place || "—"}</span></span>
                <span>Date: <span className="font-bold text-navy">{new Date(data.certificateIssueDate).toLocaleDateString("en-IN")}</span></span>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-4 text-center">
                <p className="font-display text-sm font-bold text-navy">Authorized Signatory</p>
                <p className="text-xs text-muted-foreground">TNL Fincorp</p>
              </div>
            </div>

            {/* Authenticity footer */}
            <div className="border-t border-primary/10 bg-secondary/30 p-4 text-center">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                This document is a digitally generated transaction/investment record based on the application data submitted through this website. It is not an official Government of India, RBI, SEBI, or statutory authority certificate unless expressly issued or authorized by the relevant authority.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Actions */}
        <Reveal direction="up" delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`/api/bonds/certificate?applicationNumber=${applicationNumber}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal to-sky px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5">
              <Download className="size-4" /> Download Certificate PDF
            </a>
            <Link href="/government-bonds" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-royal hover:bg-primary/5">
              <ArrowLeft className="size-4" /> Back to Government Bonds
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CertRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-primary/5 pb-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-navy">{value}</span>
    </div>
  );
}
