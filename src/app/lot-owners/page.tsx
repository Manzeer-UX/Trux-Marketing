import type { Metadata } from "next";
import { FAQList } from "@/components/FAQList";
import { LotOwnersBenefitsSection } from "@/components/lot-owners/lot-owners-benefits-section";
import { LotOwnersCtaSection } from "@/components/lot-owners/lot-owners-cta-section";
import { LotOwnersHero } from "@/components/lot-owners/lot-owners-hero";
import { LotOwnersStatsSection } from "@/components/lot-owners/lot-owners-stats-section";
import { LotOwnersStepsSection } from "@/components/lot-owners/lot-owners-steps-section";
import { LotOwnersTestimonialsSection } from "@/components/lot-owners/lot-owners-testimonials-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY, type FAQ } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "List Your Parking Lot | TRUX",
  description:
    "Turn unused parking spaces into monthly revenue with TRUX lot management.",
  alternates: { canonical: "/lot-owners" },
};

export default async function LotOwnersPage() {
  const { data } = await sanityFetch({
    query: FAQS_QUERY,
    params: { pageType: "lot-owners" },
  });
  const faqs = data as FAQ[];

  return (
    <>
      <SiteHeader activeItem="Lot Owners" />
      <main aria-label="TRUX lot owners">
        <LotOwnersHero />
        <LotOwnersStatsSection />
        <LotOwnersStepsSection />
        <LotOwnersBenefitsSection />
        <LotOwnersTestimonialsSection />
        <FAQList faqs={faqs} variant="light" />
        <LotOwnersCtaSection />
      </main>
      <SiteFooter activeItem={null} variant="light" />
    </>
  );
}
