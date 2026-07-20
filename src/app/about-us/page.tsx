import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about-us/about-cta-section";
import { AboutHero } from "@/components/about-us/about-hero";
import { AboutOriginStory } from "@/components/about-us/about-origin-story";
import { AboutPrinciplesSection } from "@/components/about-us/about-principles-section";
import { AboutTeamSection } from "@/components/about-us/about-team-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About TRUX | Secure Truck Parking",
  description:
    "Meet the team building TRUX and learn how our nationwide secure truck parking network began.",
  alternates: { canonical: "/about-us" },
};

export default async function AboutUsPage() {
  const { data: websiteImages } = await sanityFetch({
    query: ABOUT_PAGE_IMAGES_QUERY,
  });
  const brand = websiteImages?.brand;

  return (
    <>
      <SiteHeader activeItem="About Us" logo={brand?.headerLogo} />
      <main aria-label="TRUX about us">
        <AboutHero image={websiteImages?.about?.heroImage} />
        <AboutOriginStory />
        <AboutPrinciplesSection />
        <AboutTeamSection decoration={websiteImages?.about?.teamDecoration} />
        <AboutCtaSection />
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
