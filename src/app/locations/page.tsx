import type { Metadata } from "next";
import { LocationsSection } from "@/components/locations/locations-section";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATIONS_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "TRUX Parking Locations | Secure Truck Parking",
  description:
    "Browse TRUX secure truck parking coverage by region across the United States.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const { data: websiteImages } = await sanityFetch({
    query: LOCATIONS_PAGE_IMAGES_QUERY,
  });

  return (
    <>
      <SiteHeader
        activeItem="Locations"
        logo={websiteImages?.brand?.headerLogo}
      />
      <main aria-label="TRUX parking locations">
        <LocationsSection />
      </main>
    </>
  );
}
