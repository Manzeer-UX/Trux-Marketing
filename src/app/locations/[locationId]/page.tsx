import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetailsScreen } from "@/components/locations/location-details-screen";
import { SiteHeader } from "@/components/marketing/site-header";
import {
  getMapLocationDetails,
  mapLocationDetails,
} from "@/constants/locations-content";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATIONS_PAGE_IMAGES_QUERY } from "@/sanity/lib/queries";

interface LocationDetailsPageProps {
  params: Promise<{ locationId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return mapLocationDetails.map(({ id }) => ({ locationId: id }));
}

export async function generateMetadata({
  params,
}: LocationDetailsPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const location = getMapLocationDetails(locationId);

  if (!location) return {};

  return {
    title: `${location.title} | TRUX Parking`,
    description: `View parking details, amenities, hours, and reservation information for ${location.title}.`,
    alternates: { canonical: `/locations/${location.id}` },
  };
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;
  const location = getMapLocationDetails(locationId);

  if (!location) notFound();

  const { data: websiteImages } = await sanityFetch({
    query: LOCATIONS_PAGE_IMAGES_QUERY,
  });

  return (
    <>
      <SiteHeader
        activeItem="Locations"
        logo={websiteImages?.brand?.headerLogo}
      />
      <LocationDetailsScreen
        location={location}
        images={websiteImages?.locations || undefined}
      />
    </>
  );
}
