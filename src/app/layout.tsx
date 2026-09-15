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

const SITE_URL = "https://tnlfinance.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TNL Finance | Smart Loan Solutions. Simple Financial Journey.",
    template: "%s | TNL Finance",
  },
  description:
    "TNL Finance provides loan assistance and financial solutions across Personal, Business, Home, Loan Against Property, Auto and Education Loans in Surat, Gujarat. Get personalized guidance, documentation support and end-to-end application assistance.",
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
    "TNL Finance",
  ],
  authors: [{ name: "TNL Finance" }],
  creator: "TNL Finance",
  publisher: "TNL Finance",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TNL Finance | Smart Loan Solutions. Simple Financial Journey.",
    description:
      "Explore flexible loan solutions with personalized guidance, documentation assistance and end-to-end application support. Personal, Business, Home, LAP, Auto & Education Loans.",
    url: SITE_URL,
    siteName: "TNL Finance",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1344, height: 768, alt: "TNL Finance loan solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TNL Finance | Smart Loan Solutions",
    description:
      "Loan assistance & financial solutions across Personal, Business, Home, LAP, Auto & Education Loans.",
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
  name: "TNL Finance",
  description:
    "TNL Finance provides financial loan solutions and loan assistance across Personal, Business, Home, Loan Against Property, Auto and Education Loans.",
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
