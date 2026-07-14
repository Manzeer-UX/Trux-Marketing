import { HeroSection } from "@/components/marketing/hero-section";
import { SiteHeader } from "@/components/marketing/site-header";
import { StatsSection } from "@/components/marketing/stats-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main aria-label="TRUX driver parking">
        <HeroSection />
        <StatsSection />
      </main>
    </>
  );
}
