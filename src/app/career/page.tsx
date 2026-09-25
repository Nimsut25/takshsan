import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { PremiumCursor } from "@/components/tnl/premium-cursor";
import { LegalPage, P, UL, Strong, Placeholder } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Careers at TNL Fincorp | Join Our Team",
  description:
    "Explore career opportunities at TNL Fincorp and build your professional future with a team committed to honest financial guidance and customer trust.",
  alternates: { canonical: "/career" },
};

const sections = [
  {
    id: "overview",
    heading: "Why build a career with TNL Fincorp",
    body: (
      <P>
        TNL Fincorp is a growing financial services company headquartered in
        Surat, Gujarat. We help customers navigate loans, deposits and
        investment products with honest guidance and end-to-end support. Joining
        TNL Fincorp means being part of a team that values ownership, learning
        and customer trust above everything else.
      </P>
    ),
  },
  {
    id: "values",
    heading: "What we look for",
    body: (
      <>
        <P>We look for people who are:</P>
        <UL>
          <li>
            <Strong>Customer-first</Strong> — genuinely invested in helping
            clients make better financial decisions.
          </li>
          <li>
            <Strong>Curious &amp; coachable</Strong> — eager to learn about loan
            products, deposits, insurance and evolving fintech tools.
          </li>
          <li>
            <Strong>Dependable</Strong> — someone who follows through on
            documentation, follow-ups and commitments.
          </li>
          <li>
            <Strong>Integrity-driven</Strong> — comfortable doing the right
            thing, even when no one is watching.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "openings",
    heading: "Roles we hire for",
    body: (
      <>
        <P>
          We are always interested in meeting talent for the following kinds of
          roles. <Placeholder>INSERT ACTIVE OPENINGS / JD LINKS</Placeholder>
        </P>
        <UL>
          <li>Loan Advisor / Relationship Executive</li>
          <li>Operations &amp; Documentation Executive</li>
          <li>Sales &amp; Business Development (Loans / Investments)</li>
          <li>Customer Support Executive</li>
          <li>Digital Marketing &amp; Content Associate</li>
        </UL>
      </>
    ),
  },
  {
    id: "perks",
    heading: "What we offer",
    body: (
      <UL>
        <li>Supportive, learning-oriented work environment</li>
        <li>Hands-on exposure across loans, FD/RD, bonds and insurance</li>
        <li>Performance-linked incentives</li>
        <li>Opportunities to grow into specialised advisory roles</li>
      </UL>
    ),
  },
  {
    id: "how-to-apply",
    heading: "How to apply",
    body: (
      <P>
        Send your resume and a short note about the role you are interested in
        to <Strong>care@tnlfincorp.in</Strong> with the subject line{" "}
        <Strong>“Careers — [Role Name]”</Strong>. Our team reviews every
        application and will reach out if your profile matches an open
        position.
      </P>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <>
        <P>Email: care@tnlfincorp.in</P>
        <P>Phone: +91 94279 79991</P>
        <P>
          Address: 34 Madhuban, Sumukh Circle, Nr. Happy Villy International
          School, Dindoli, Surat, Gujarat, India.
        </P>
      </>
    ),
  },
];

export default function CareerPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <LegalPage
          title="Careers at TNL Fincorp"
          lastUpdated="[DATE — TO BE CONFIRMED]"
          intro="Explore career opportunities with TNL Fincorp and grow with a team committed to honest financial guidance and customer trust."
          sections={sections}
        />
      </main>
      <Footer />
      <FloatingActions />
      <PremiumCursor />
    </div>
  );
}
