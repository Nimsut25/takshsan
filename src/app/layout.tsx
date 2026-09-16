import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://tnlfincorp.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TNL Fincorp | Loans & Investment Solutions",
    template: "%s | TNL Fincorp",
  },
  description:
    "TNL Fincorp provides loan assistance and investment solutions across Personal, Business, Home, Loan Against Property, Auto and Education Loans, plus FD & RD investment options in Surat, Gujarat. Get personalized guidance, documentation support and end-to-end assistance.",
  keywords: [
    "loan services in Surat",
    "personal loan assistance Surat",
    "business loan assistance",
    "home loan assistance Surat",
    "loan against property",
    "auto loan assistance",
    "education loan assistance",
    "financial loan solutions",
    "loan consultancy Surat",
    "FD investment Surat",
    "RD investment Surat",
    "fixed deposit assistance",
    "recurring deposit assistance",
    "TNL Fincorp",
  ],
  authors: [{ name: "TNL Fincorp" }],
  creator: "TNL Fincorp",
  publisher: "TNL Fincorp",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TNL Fincorp | Loans & Investment Solutions",
    description:
      "Explore flexible loan solutions plus FD & RD investment options with personalized guidance, documentation assistance and end-to-end support.",
    url: SITE_URL,
    siteName: "TNL Fincorp",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1344, height: 768, alt: "TNL Fincorp loans & investment solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TNL Fincorp | Loans & Investment Solutions",
    description:
      "Loan assistance & investment solutions across Personal, Business, Home, LAP, Auto, Education Loans plus FD & RD.",
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/tnl-logo.jpeg",
    apple: "/tnl-logo.jpeg",
  },
  robots: { index: true, follow: true },
  category: "finance",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "TNL Fincorp",
  description:
    "TNL Fincorp provides financial loan solutions, loan assistance and investment options across Personal, Business, Home, Loan Against Property, Auto and Education Loans, plus Fixed Deposit (FD) and Recurring Deposit (RD) investment assistance.",
  image: `${SITE_URL}/images/hero.jpg`,
  url: SITE_URL,
  telephone: "+91-9427979991",
  address: {
    "@type": "PostalAddress",
    streetAddress: "34 Madhuban, Sumukh Circle, Nr. Happy Villy International School, Dindoli",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  areaServed: "IN",
  knowsAbout: [
    "Personal Loan",
    "Business Loan",
    "Home Loan",
    "Loan Against Property",
    "Auto Loan",
    "Education Loan",
    "Fixed Deposit",
    "Recurring Deposit",
  ],
  slogan: "Smart Loan Solutions. Simple Financial Journey.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
