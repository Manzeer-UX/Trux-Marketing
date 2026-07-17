import type { Metadata } from "next";
import { LocationsSection } from "@/components/locations/locations-section";
import { SiteHeader } from "@/components/marketing/site-header";

export const metadata: Metadata = {
  title: "TRUX Parking Locations | Secure Truck Parking",
  description:
    "Browse TRUX secure truck parking coverage by region across the United States.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <SiteHeader activeItem="Locations" />
      <main aria-label="TRUX parking locations">
        <LocationsSection />
      </main>
    </>
  );
}
