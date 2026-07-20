import type { Metadata } from "next";
import { LotOwnersBenefitsSection } from "@/components/lot-owners/lot-owners-benefits-section";
import { LotOwnersCtaSection } from "@/components/lot-owners/lot-owners-cta-section";
import { LotOwnersFaqSection } from "@/components/lot-owners/lot-owners-faq-section";
import { LotOwnersHero } from "@/components/lot-owners/lot-owners-hero";
import { LotOwnersStatsSection } from "@/components/lot-owners/lot-owners-stats-section";
import { LotOwnersStepsSection } from "@/components/lot-owners/lot-owners-steps-section";
import { LotOwnersTestimonialsSection } from "@/components/lot-owners/lot-owners-testimonials-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import { LOT_OWNERS_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "List Your Parking Lot | TRUX",
  description:
    "Turn unused parking spaces into monthly revenue with TRUX lot management.",
  alternates: { canonical: "/lot-owners" },
};

export default async function LotOwnersPage() {
  const { data: websiteImages } = await sanityFetch({
    query: LOT_OWNERS_PAGE_IMAGES_QUERY,
  });
  const brand = websiteImages?.brand;
  const lotOwners = websiteImages?.lotOwners;

  return (
    <>
      <SiteHeader activeItem="Lot Owners" logo={brand?.headerLogo} />
      <main aria-label="TRUX lot owners">
        <LotOwnersHero />
        <LotOwnersStatsSection />
        <LotOwnersStepsSection />
        <LotOwnersBenefitsSection
          images={[
            lotOwners?.revenueIcon,
            lotOwners?.staffingIcon,
            lotOwners?.paymentsIcon,
            lotOwners?.tenantsIcon,
          ]}
        />
        <LotOwnersTestimonialsSection />
        <LotOwnersFaqSection />
        <LotOwnersCtaSection />
      </main>
      <SiteFooter
        activeItem={null}
        variant="light"
        logo={brand?.footerLogo}
        socialIcons={{
          facebook: brand?.facebookIcon,
          linkedIn: brand?.linkedInIcon,
          instagram: brand?.instagramIcon,
        }}
      />
    </>
  );
}
