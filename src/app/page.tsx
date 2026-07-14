import { CoverageSection } from "@/components/marketing/coverage-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { SiteHeader } from "@/components/marketing/site-header";
import { StatsSection } from "@/components/marketing/stats-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main aria-label="TRUX driver parking">
        <HeroSection />
        <StatsSection />
        <ValuePropsSection />
        <CoverageSection />
        <TestimonialsSection />
      </main>
    </>
  );
}
