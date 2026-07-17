"use client";

import Link from "next/link";
import { Map, type StaticMapMarker } from "@/components/marketing/Map";
import { mapLocationDetails } from "@/constants/locations-content";

const locationMapMarkers = mapLocationDetails.map(
  ({ coordinates, id, mapName, mapSpots }) => ({
    activeIconUrl: "/assets/hero-map-marker-active.svg",
    iconUrl: "/assets/hero-map-marker-default.svg",
    id,
    position: coordinates,
    title: `${mapName}, ${mapSpots} spots`,
  }),
) satisfies readonly StaticMapMarker[];

function renderLocationPopup(marker: StaticMapMarker) {
  const selectedLocation = mapLocationDetails.find(
    (location) => location.id === marker.id,
  );

  if (!selectedLocation) return null;

  return (
    <article
      role="region"
      aria-label="Selected parking location"
      aria-live="polite"
      className="flex w-full flex-col gap-2.5 overflow-hidden rounded-sm border border-amber bg-white px-4 py-3 text-midnight shadow-md"
    >
      <div className="flex h-[183px] w-full items-end justify-center bg-[#d9d9d9] pb-4">
        <div aria-hidden="true" className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#a3a3a3]" />
          <span className="size-2 rounded-full bg-[#a3a3a3]" />
          <span className="size-2 rounded-full bg-[#a3a3a3]" />
        </div>
      </div>
      <div>
        <h2 className="text-sm leading-5 font-semibold">
          {selectedLocation.mapName}
        </h2>
        <p className="text-xs leading-4 text-[#444441]">
          {selectedLocation.cardAddress}
        </p>
      </div>
      <Link
        href={`/locations/${selectedLocation.id}`}
        prefetch
        className="inline-flex min-h-11 w-full items-center text-sm leading-5 font-bold text-amber transition-colors hover:text-midnight focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
      >
        View Details
      </Link>
    </article>
  );
}

export function StaticLocationMap() {
  return (
    <div
      id="locations-map"
      className="relative min-h-[620px] scroll-mt-24 overflow-hidden rounded-md bg-midnight shadow-lg wide:sticky wide:top-0 wide:h-[1162px] wide:min-h-[1162px] wide:rounded-none wide:shadow-none"
    >
      <Map
        ariaLabel="TRUX parking locations around Atlanta"
        className="h-full min-h-0 w-full"
        renderStaticMarkerPopup={renderLocationPopup}
        showMarker={false}
        staticMarkers={locationMapMarkers}
        theme="dark"
      />
    </div>
  );
}
