export interface PartnerPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface PartnerProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: readonly string[];
  action: string;
  image: string;
}

export const partnerPrinciples = [
  {
    number: "01",
    title: "Captive driver audience.",
    description:
      "10K+ active drivers parking at TRUX lots every month — already in the cab, already buying, already inside the app.",
  },
  {
    number: "02",
    title: "Vetted brand association.",
    description:
      "We only co-brand with partners we’d trust ourselves. Our lots clear a hard standard; so do the companies we name next to ours.",
  },
  {
    number: "03",
    title: "Simple integration.",
    description:
      "No SDKs. No procurement loop. We surface your offer in-app, on the marketing site, and at the gate. You ship in days, not quarters.",
  },
  {
    number: "04",
    title: "Ongoing distribution.",
    description:
      "Acquisition, retention, renewal — handled by the platform. Stay in front of an audience that grows every quarter we add a lot.",
  },
] as const satisfies readonly PartnerPrinciple[];

export const partnerProfiles = [
  {
    id: "otr-solutions",
    name: "OTR Solutions",
    tagline: "Get paid faster — without giving up the upside.",
    description:
      "True non-recourse factoring with same-day payment on approved invoices. Top-rated mobile app and client portal. No chargebacks if the broker doesn’t pay — the risk lives with OTR, not you.",
    benefits: [
      "Same-day payment on approvals",
      "Fuel advances up to 50% of load",
      "Transparent terms, no hidden fees",
      "Dedicated account manager",
    ],
    action: "See the OTR program",
    image: "/assets/partner-otr.png",
  },
  {
    id: "marquee-insurance",
    name: "Marquee Insurance Group",
    tagline: "Insurance built for the way trucking actually works.",
    description:
      "30+ A-rated markets and coverage tuned to new authorities, owner-operators, and large fleets alike. The Marquee team brings industry knowledge, transparency, and the kind of ongoing support a policy alone can’t.",
    benefits: [
      "30+ A-rated insurance markets",
      "Coverage for any operating model",
      "Industry-specific risk advisory",
      "Onboarding and ongoing service",
    ],
    action: "Get a Marquee quote",
    image: "/assets/partner-marquee.png",
  },
  {
    id: "es-advantage",
    name: "ES Advantage",
    tagline: "Real support for owner-operators and small fleets.",
    description:
      "Deep discounts on the essentials a small fleet runs on — plus a community that knows the road and a margin-help model that turns one truck into a sustainable business. The kind of partner most carriers wish existed.",
    benefits: [
      "Discounts on fuel, tires, insurance",
      "Owner-operator community access",
      "Compliance and back-office help",
      "Margin tools for small fleets",
    ],
    action: "See ES Advantage benefits",
    image: "/assets/partner-es.png",
  },
] as const satisfies readonly PartnerProfile[];
