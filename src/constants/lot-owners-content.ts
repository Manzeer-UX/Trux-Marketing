export interface LotOwnerStatistic {
  value: string;
  label: string;
}

export interface LotOwnerStep {
  number: string;
  title: string;
  description: string;
}

export interface LotOwnerBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface LotOwnerTestimonial {
  quote: string;
  name: string;
  location: string;
}

export interface LotOwnerFaq {
  question: string;
  answer: string;
}

export const lotOwnerStatistics = [
  { value: "$2M+", label: "Paid to owners" },
  { value: "80%", label: "Revenue Share" },
  { value: "10K +", label: "Drivers trust Trux" },
  { value: "1 day", label: "Rapid Setup" },
] as const satisfies readonly LotOwnerStatistic[];

export const lotOwnerSteps = [
  {
    number: "01",
    title: "List your lot",
    description:
      "Add address, capacity & pricing. Takes 10 minutes. Free to get started.",
  },
  {
    number: "02",
    title: "TRUX handles everything",
    description:
      "Bookings, driver access, payments, 24/7 support. Zero effort from you.",
  },
  {
    number: "03",
    title: "Get paid",
    description:
      "Receive 80% of all revenue directly to your bank account every month.",
  },
] as const satisfies readonly LotOwnerStep[];

export const lotOwnerBenefits = [
  {
    title: "You keep 80%",
    description:
      "Highest revenue share in the industry. We take 20% to cover ops.",
    icon: "/assets/lot-owners-benefit-revenue.svg",
  },
  {
    title: "Staff-Free Operations",
    description:
      "Reduced operational costs by eliminating the need for on-site staff.",
    icon: "/assets/lot-owners-benefit-staff.svg",
  },
  {
    title: "Online payments only",
    description: "No cash or invoices. Deposits to your bank every month.",
    icon: "/assets/lot-owners-benefit-payments.svg",
  },
  {
    title: "Engaged Tenant Pool",
    description:
      "Proven success in tenant retention and satisfaction through streamlined processes.",
    icon: "/assets/lot-owners-benefit-tenants.svg",
  },
] as const satisfies readonly LotOwnerBenefit[];

export const lotOwnerTestimonials = [
  {
    quote:
      "Listed my lot in a week. Made $2,200 the first month. Setup was easier than I expected and support is always responsive.",
    name: "Liam Hawthorne",
    location: "Katy, TX",
  },
  {
    quote:
      "The 80% revenue share is real. I’ve made more with TRUX in 3 months than I did managing bookings myself for a year.",
    name: "Sophie Kensington",
    location: "Covington, GA",
  },
  {
    quote:
      "What impressed me most was how seamlessly it integrated with our existing workflow. The documentation is clear, and the component quality is consistently high.",
    name: "Jasper Thorne",
    location: "Murfreesboro, TN",
  },
] as const satisfies readonly LotOwnerTestimonial[];

export const lotOwnerFaqs = [
  {
    question: "How much does it cost to list my lot?",
    answer:
      "Listing your lot is free. TRUX earns a 20% service fee only when your property generates revenue.",
  },
  {
    question: "What types of properties qualify?",
    answer:
      "Commercial lots, truck yards, industrial properties, and other accessible spaces with room for truck and trailer parking can qualify.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You keep 80% of booking revenue. Earnings are deposited directly to your bank account each month.",
  },
  {
    question: "Do I need to be on-site to manage the lot?",
    answer:
      "No. TRUX handles reservations, payments, access, and driver support, so you do not need staff on-site.",
  },
  {
    question: "What if I want to stop?",
    answer:
      "You can pause or remove your listing by contacting our team. There are no long-term contracts or cancellation fees.",
  },
] as const satisfies readonly LotOwnerFaq[];

export const lotOwnerMapPins = [
  { price: "$31 / Night", style: { left: "67%", top: "10%" } },
  { price: "$19 / Night", style: { left: "89.5%", top: "12%" } },
  { price: "$28 / Night", style: { left: "53.5%", top: "43%" } },
  { price: "$25 / Night", style: { left: "78.3%", top: "52%" } },
  { price: "$22 / Night", style: { left: "53.3%", top: "73%" } },
] as const;
