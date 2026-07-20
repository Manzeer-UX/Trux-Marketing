import { AppDownloadSection } from "@/components/marketing/app-download-section";
import { CoverageSection } from "@/components/marketing/coverage-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { StatsSection } from "@/components/marketing/stats-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data: websiteImages } = await sanityFetch({
    query: HOME_PAGE_IMAGES_QUERY,
  });
  const brand = websiteImages?.brand;
  const home = websiteImages?.home;

  return (
    <>
      <SiteHeader logo={brand?.headerLogo} />
      <main aria-label="TRUX driver parking">
        <HeroSection />
        <StatsSection />
        <ValuePropsSection
          images={[
            home?.secureFeatureIcon,
            home?.easyFeatureIcon,
            home?.availabilityFeatureIcon,
            home?.serviceFeatureIcon,
          ]}
        />
        <CoverageSection image={home?.coverageMap} />
        <TestimonialsSection />
        <FaqSection />
        <AppDownloadSection phoneImage={home?.phoneApp} />
      </main>
      <SiteFooter
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
