import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PartnerProfilesSection } from "@/components/partners/partner-profiles-section";
import { PartnersCtaSection } from "@/components/partners/partners-cta-section";
import { PartnersHero } from "@/components/partners/partners-hero";
import { PartnersStandardSection } from "@/components/partners/partners-standard-section";

export const metadata: Metadata = {
  title: "TRUX Partners | The Network Behind the Load",
  description:
    "Explore the vetted companies helping TRUX drivers with factoring, insurance, and small-fleet support.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <SiteHeader activeItem="Partners" />
      <main aria-label="TRUX partners">
        <PartnersHero />
        <PartnersStandardSection />
        <PartnerProfilesSection />
        <PartnersCtaSection />
      </main>
      <SiteFooter activeItem={null} variant="light" />
    </>
  );
}
