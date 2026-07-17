"use client";

import { Map, type StaticMapMarker } from "@/components/marketing/Map";

const driverMapMarkers = [
  {
    activeIconUrl: "/assets/hero-map-marker-active.svg",
    iconUrl: "/assets/hero-map-marker-default.svg",
    id: "atlanta-lot-47",
    position: { lat: 33.749, lng: -84.388 },
    title: "Lot #47 — Atlanta, GA",
  },
  {
    activeIconUrl: "/assets/hero-map-marker-active.svg",
    iconUrl: "/assets/hero-map-marker-default.svg",
    id: "south-atlanta-lot-47",
    position: { lat: 33.7, lng: -84.365 },
    title: "Lot #47 — Atlanta, GA",
  },
] satisfies readonly StaticMapMarker[];

function renderDriverMapTooltip() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Parking lot details for Lot #47 in Atlanta"
      className="mx-auto w-[248px] rounded border border-amber bg-white px-4 py-3.5 text-midnight shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
    >
      <p className="text-base leading-5 font-bold">Lot #47 — Atlanta, GA</p>
      <p className="mt-0.5 text-[13px] leading-[18px] text-[#6b7280]">
        14 spots available · Gated
      </p>
      <p className="mt-3 text-[15px] leading-5 font-bold text-amber">
        From $18 / night
      </p>
    </div>
  );
}

export function DriverMap() {
  return (
    <Map
      className="h-full w-full"
      renderStaticMarkerPopup={renderDriverMapTooltip}
      showMarker={false}
      staticMarkers={driverMapMarkers}
    />
  );
}
