import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about-us/about-cta-section";
import { AboutHero } from "@/components/about-us/about-hero";
import { AboutOriginStory } from "@/components/about-us/about-origin-story";
import { AboutPrinciplesSection } from "@/components/about-us/about-principles-section";
import { AboutTeamSection } from "@/components/about-us/about-team-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export const metadata: Metadata = {
  title: "About TRUX | Secure Truck Parking",
  description:
    "Meet the team building TRUX and learn how our nationwide secure truck parking network began.",
  alternates: { canonical: "/about-us" },
};

export default function AboutUsPage() {
  return (
    <>
      <SiteHeader activeItem="About Us" />
      <main aria-label="TRUX about us">
        <AboutHero />
        <AboutOriginStory />
        <AboutPrinciplesSection />
        <AboutTeamSection />
        <AboutCtaSection />
      </main>
      <SiteFooter activeItem={null} variant="light" />
    </>
  );
}
