import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PartnerProfilesSection } from "@/components/partners/partner-profiles-section";
import { PartnersCtaSection } from "@/components/partners/partners-cta-section";
import { PartnersHero } from "@/components/partners/partners-hero";
import { PartnersStandardSection } from "@/components/partners/partners-standard-section";
import { sanityFetch } from "@/sanity/lib/live";
import { PARTNERS_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "TRUX Partners | The Network Behind the Load",
  description:
    "Explore the vetted companies helping TRUX drivers with factoring, insurance, and small-fleet support.",
  alternates: { canonical: "/partners" },
};

export default async function PartnersPage() {
  const { data: websiteImages } = await sanityFetch({
    query: PARTNERS_PAGE_IMAGES_QUERY,
  });
  const brand = websiteImages?.brand;
  const partners = websiteImages?.partners;

  return (
    <>
      <SiteHeader activeItem="Partners" logo={brand?.headerLogo} />
      <main aria-label="TRUX partners">
        <PartnersHero image={partners?.heroImage} />
        <PartnersStandardSection />
        <PartnerProfilesSection
          images={{
            otr: partners?.otrImage,
            marquee: partners?.marqueeImage,
            es: partners?.esImage,
          }}
        />
        <PartnersCtaSection />
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
