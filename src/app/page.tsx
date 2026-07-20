import { AppDownloadSection } from "@/components/marketing/app-download-section";
import { CookieRibbon } from "@/components/marketing/cookie-ribbon";
import { CoverageSection } from "@/components/marketing/coverage-section";
import { FAQList } from "@/components/FAQList";
import { HeroSection } from "@/components/marketing/hero-section";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { StatsSection } from "@/components/marketing/stats-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY, type FAQ } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: FAQS_QUERY,
    params: { pageType: "drivers" },
  });
  const faqs = data as FAQ[];

  return (
    <>
      <SiteHeader />
      <main aria-label="TRUX driver parking">
        <HeroSection />
        <StatsSection />
        <ValuePropsSection />
        <CoverageSection />
        <TestimonialsSection />
        <FAQList faqs={faqs} />
        <AppDownloadSection />
      </main>
      <SiteFooter />
      <CookieRibbon />
    </>
  );
}
