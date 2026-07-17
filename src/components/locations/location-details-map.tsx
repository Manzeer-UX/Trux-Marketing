"use client";

import { useMemo } from "react";
import { Map, type StaticMapMarker } from "@/components/marketing/Map";

interface LocationDetailsMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  title: string;
}

export function LocationDetailsMap({
  coordinates,
  title,
}: LocationDetailsMapProps) {
  const center = useMemo(
    () => ({ lat: coordinates.lat, lng: coordinates.lng }),
    [coordinates.lat, coordinates.lng],
  );
  const markers = useMemo(
    () =>
      [
        {
          iconUrl: "/assets/hero-map-marker-active.svg",
          position: center,
          title: `${title} parking location`,
        },
      ] satisfies readonly StaticMapMarker[],
    [center, title],
  );

  return (
    <Map
      ariaLabel={`Map showing ${title}`}
      center={center}
      className="h-full min-h-0 w-full"
      showMarker={false}
      staticMarkers={markers}
      theme="dark"
    />
  );
}
