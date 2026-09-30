/**
 * Static content for the Career page.
 */

export const CAREER_HERO_SLIDES = [
  {
    image: "/images/career/hs-1.png",
    eyebrow: "Careers at TNL Fincorp",
    title: "Build Your Career With TNL Fincorp",
    subtitle:
      "Join a growing financial organization where your ideas, skills and ambition can create meaningful impact.",
  },
  {
    image: "/images/career/hs-2.png",
    eyebrow: "Learn · Contribute · Grow",
    title: "A Workplace Built on Collaboration",
    subtitle:
      "Work alongside experienced mentors on meaningful financial products that help real people make better decisions.",
  },
  {
    image: "/images/career/hs-3.png",
    eyebrow: "People First",
    title: "Be Part of a Team That Builds Better Financial Futures",
    subtitle:
      "We invest in people who take ownership, stay curious and care deeply about doing right by the customer.",
  },
  {
    image: "/images/career/hs-4.png",
    eyebrow: "Continuous Learning",
    title: "Grow With Guidance and Real Exposure",
    subtitle:
      "Practical experience, structured learning and mentorship across loans, deposits and investments.",
  },
  {
    image: "/images/career/hs-5.png",
    eyebrow: "Celebrate Success Together",
    title: "A Culture That Recognises Every Contribution",
    subtitle:
      "Your wins are our wins. Join a culture that values ownership, teamwork and shared growth.",
  },
] as const;

export const LIFE_AT_TNL = {
  eyebrow: "Our Culture",
  title: "Life At TNL Fincorp",
  description:
    "Life at TNL Fincorp is built around collaboration, learning, innovation and shared growth. We believe in creating a professional environment where people can develop their skills, take ownership of their work and contribute to meaningful financial solutions.",
  highlights: [
    { icon: "Users", title: "Collaborative Workplace", description: "Open communication and supportive teamwork across roles." },
    { icon: "GraduationCap", title: "Learning & Development", description: "Continuous learning through practical exposure and mentoring." },
    { icon: "TrendingUp", title: "Career Growth", description: "Clear paths to grow into specialised advisory and leadership roles." },
    { icon: "Heart", title: "Respectful Work Culture", description: "A professional environment built on trust and mutual respect." },
    { icon: "Lightbulb", title: "Innovation & Ownership", description: "We encourage new ideas and give people ownership to deliver." },
    { icon: "Sparkles", title: "Team Spirit", description: "We celebrate milestones and support each other’s success." },
  ],
} as const;

export const CAREER_BENEFITS = {
  eyebrow: "Why Join Us",
  title: "Features & Benefits",
  cards: [
    { icon: "TrendingUp", title: "Career Growth", description: "Build your professional journey with opportunities to learn, perform and grow.", accent: "from-royal to-sky" },
    { icon: "GraduationCap", title: "Learning & Development", description: "Strengthen your knowledge and skills through continuous learning opportunities.", accent: "from-teal-brand to-cyan-brand" },
    { icon: "Users", title: "Collaborative Culture", description: "Work with supportive teams and contribute your ideas in a collaborative environment.", accent: "from-navy to-royal" },
    { icon: "Target", title: "Meaningful Work", description: "Be part of work that contributes to better financial experiences and solutions.", accent: "from-sky to-teal-brand" },
    { icon: "Award", title: "Recognition & Opportunities", description: "Grow through new responsibilities, achievements and professional opportunities.", accent: "from-royal to-teal-brand" },
    { icon: "HeartPulse", title: "Employee Wellbeing", description: "A healthy, supportive environment that respects work-life balance.", accent: "from-cyan-brand to-sky" },
  ],
} as const;

export const WHY_TNL = {
  eyebrow: "Our Values",
  title: "Why TNL Fincorp?",
  description:
    "At TNL Fincorp, we believe that our people are at the heart of our growth. We aim to create an environment where talented professionals can take initiative, build expertise, collaborate with others and grow with the organization.",
  points: [
    { icon: "HeartHandshake", title: "People First", description: "We put our people and customers at the centre of every decision." },
    { icon: "TrendingUp", title: "Professional Growth", description: "Structured learning, mentoring and real exposure that helps you grow." },
    { icon: "Users", title: "Team Collaboration", description: "Supportive teams where ideas, teamwork and communication matter." },
    { icon: "Lightbulb", title: "Innovation", description: "We encourage new ideas and fresh thinking at every level." },
    { icon: "ShieldCheck", title: "Responsibility", description: "Ownership and accountability in everything we do." },
    { icon: "Rocket", title: "Long-Term Opportunities", description: "Build a long-term career with a growing fintech organization." },
  ],
} as const;

export const CAREER_PROGRAMME = {
  eyebrow: "Career Programme",
  title: "Grow With Us",
  description:
    "Our career programmes are designed to help professionals build practical experience, strengthen their capabilities and take the next step in their careers. Join a team that values commitment, continuous learning and growth.",
  points: [
    { icon: "GraduationCap", title: "Professional Development", description: "Structured onboarding and learning paths across our product lines." },
    { icon: "Wrench", title: "Skill Enhancement", description: "Hands-on exposure to real customer scenarios and documentation." },
    { icon: "UserCheck", title: "Mentorship & Guidance", description: "Work closely with experienced mentors who help you grow." },
    { icon: "Rocket", title: "Growth Opportunities", description: "Defined tracks into advisory, operations, sales and leadership." },
  ],
} as const;

export const JOIN_US = {
  title: "Ready to Build Your Future With TNL Fincorp?",
  description: "Explore our open opportunities and take the next step in your professional journey.",
  cta: "See Open Positions",
} as const;

export const CUSTOMER_REVIEWS = {
  eyebrow: "What People Say",
  title: "Customer Reviews",
  description:
    "Real experiences shared by people we’ve helped — reused from our existing customer testimonials.",
} as const;

export const OPEN_POSITIONS_ROUTE = "/career/open-positions";
