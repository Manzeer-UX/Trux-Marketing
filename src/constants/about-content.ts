export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
}

export type TeamGlowPosition =
  "top-left" | "top-right" | "high-left" | "high-right";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  glow: TeamGlowPosition;
  board?: boolean;
}

export function getTeamMemberInitials(fullName: string) {
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstInitial = nameParts[0]?.[0] ?? "";
  const lastInitial = nameParts.length > 1 ? (nameParts.at(-1)?.[0] ?? "") : "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export const aboutPrinciples = [
  {
    number: "01",
    title: "Drivers come first.",
    description:
      "These show up in how we vet lots, how we price, who we hire, and what we ship.",
  },
  {
    number: "02",
    title: "Rigorous lot vetting.",
    description:
      "We don’t list properties we haven’t vetted. Every TRUX lot is inspected, equipped, and held to the same standard before a single driver pulls in.",
  },
  {
    number: "03",
    title: "Owners keep more.",
    description:
      "80% revenue share — the highest in the industry. We earn our 20% by running bookings, payments, security, and support so owners don’t have to.",
  },
  {
    number: "04",
    title: "Reliable support.",
    description:
      "We name our team. We pick up. No chatbot trees, no offshored ticket queues. If something goes wrong on a lot at 2 AM, you reach a person.",
  },
] as const satisfies readonly AboutPrinciple[];

export const teamMembers = [
  {
    name: "Alex Hegner",
    role: "Chief Legal Officer",
    bio: "AM Law 200 attorney representing owners and investors in commercial real estate. Co-founder of Magnolia Property Advisors. J.D. + M.B.A., Georgia State.",
    glow: "top-left",
  },
  {
    name: "Blaise Larrabee",
    role: "Director of Acquisitions",
    bio: "Scaled sales at high-growth startups, most recently helping AutoFi raise a Series C. At TRUX, growing the lot portfolio and advising clients on outdoor storage acquisitions.",
    glow: "top-right",
  },
  {
    name: "Mia Schaefer",
    role: "Director of Customer Success",
    bio: "Four years in trucking. Formerly a FedEx driver recruiter. Manages 500+ driver accounts at TRUX.",
    glow: "high-left",
  },
  {
    name: "Kinsey Bilardello",
    role: "Account Manager",
    bio: "Sales and customer success background. Owns onboarding, day-to-day support, and growth for her client portfolio.",
    glow: "top-left",
  },
  {
    name: "Lauren Meyerhoff",
    role: "Account Manager",
    bio: "Six years in customer success, focused on retention and renewals. Background spans data analysis and financial mapping.",
    glow: "high-right",
  },
  {
    name: "Jenna Chittick",
    role: "Account Manager",
    bio: "Joined TRUX from a hands-on background managing truck lots and customer accounts. Arizona State, 2024.",
    glow: "top-left",
  },
  {
    name: "Chip Patterson",
    role: "President",
    bio: "Founder and CEO of AmeriPark. 30+ years building parking businesses and the cloud platforms that run them.",
    glow: "top-left",
  },
  {
    name: "Bret Marks",
    role: "Director of Fleet Management",
    bio: "Leads fleet strategy and carrier partnerships across TRUX’s national network. Owns the largest-account relationships end to end.",
    glow: "top-right",
  },
  {
    name: "Danny Loe",
    role: "CEO & Board Member",
    bio: "25 years in logistics. Former President of Asset-Light Logistics at ArcBest, where he led the MoLo Solutions acquisition and built ArcBest into a top-15 brokerage.",
    glow: "high-left",
    board: true,
  },
  {
    name: "Matt Irving",
    role: "VP of Operations",
    bio: "Former SVP of Operations at ArcBest. Scaled Today’s Power from two people to 30 across 100+ renewable installs.",
    glow: "high-right",
  },
  {
    name: "Joey Goodman",
    role: "Chief Operating Officer",
    bio: "Operations at high-growth startups, focused on scaling marketplaces. Harvard, B.A. Economics & Finance — also played football there.",
    glow: "top-right",
  },
  {
    name: "Kayla Nestor",
    role: "Account Manager",
    bio: "Five years in logistics and recruiting. Built the training program that onboarded TRUX’s first 30+ team members.",
    glow: "top-right",
  },
] as const satisfies readonly TeamMember[];
