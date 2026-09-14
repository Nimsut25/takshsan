import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { LoanServicesCarousel } from "@/components/sections/loan-services-carousel";
import { LoanCategories } from "@/components/sections/loan-categories";
import { PromoBanners } from "@/components/sections/promo-banners";
import { About } from "@/components/sections/about";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EmiCalculator } from "@/components/sections/emi-calculator";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { TrustSection } from "@/components/sections/trust-section";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { LoanDetailModal } from "@/components/sections/loan-detail-modal";
import { EnquiryModal } from "@/components/sections/enquiry-modal";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LoanServicesCarousel />
        <PromoBanners />
        <LoanCategories />
        <About />
        <WhyChooseUs />
        <HowItWorks />
        <EmiCalculator />
        <EnquirySection />
        <TrustSection />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
      <LoanDetailModal />
      <EnquiryModal />
    </div>
  );
}
