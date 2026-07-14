export interface NavItem {
  label: string;
  href: "#";
  active?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export interface Faq {
  question: string;
}

export const navItems = [
  { label: "Lot Owners", href: "#" },
  { label: "Drivers", href: "#", active: true },
  { label: "Why Trux", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Referrals", href: "#" },
  { label: "Trux Perx", href: "#" },
  { label: "Locations", href: "#" },
  { label: "Blog", href: "#" },
] as const satisfies readonly NavItem[];

export const stats = [
  { value: "200+", label: "Verified truck lots" },
  { value: "25", label: "States and growing" },
  { value: "10K +", label: "Drivers trust Trux" },
  { value: "24/7", label: "Remote gate access" },
] as const satisfies readonly Stat[];

export const valueProps = [
  {
    title: "Secure & Monitored",
    description:
      "Security cameras, fences, and high beams illuminate every spot. We only list lots with verifiable safety standards.",
    icon: "/assets/feature-secure.svg",
  },
  {
    title: "Easy to Park",
    description:
      "Pull in, take a spot. No zones to decode, no color-coded maps, no on-site instructions to figure out.",
    icon: "/assets/feature-easy.svg",
  },
  {
    title: "Real-time Availability & Guaranteed Spots",
    description: "No permits, no deposits, no contracts.",
    icon: "/assets/feature-availability.svg",
  },
  {
    title: "Professional Service",
    description: "Real people, real support.",
    icon: "/assets/feature-service.svg",
  },
] as const satisfies readonly ValueProp[];

export const testimonials = [
  {
    quote:
      "Nice place to park your truck/ trailer and be rest assured that your equipment will be safe.The location is very convenient and plenty of space to maneuver your trucks/trailer.No fear of any vandalization of your equipment and the pricing is right compare to other truck parking places.",
    name: "Tony Mark",
    location: "Katy, TX",
  },
  {
    quote:
      "I park my tractor trailer here all the time. It’s gated with limited access to the public, I’ve never had any issues. I feel safe with my truck here and I will continue to do business with this company.",
    name: "Evoney McFarland",
    location: "Covington, GA",
  },
  {
    quote:
      "Clean, safe, and convenient parking. We definitely need more places like this — having them in every city and state would be great.",
    name: "Vepa Halmamedov",
    location: "Murfreesboro, TN",
  },
] as const satisfies readonly Testimonial[];

export const faqs = [
  { question: "How do I pay for my truck parking space?" },
  { question: "How do I reserve more than one parking spot?" },
  { question: "Are your truck parking facilities secure?" },
  { question: "Are there assigned parking spots?" },
  { question: "Do I need to pay a deposit or sign a contract?" },
  { question: "How does TRUX compare to other truck parking lots?" },
  { question: "Can I park both my semi truck and trailer?" },
] as const satisfies readonly Faq[];
