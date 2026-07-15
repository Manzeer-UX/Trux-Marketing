"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { locationRegions } from "@/constants/locations-content";

type RegionId = (typeof locationRegions)[number]["id"];

export function LocationsAccordion() {
  const [openRegionId, setOpenRegionId] = useState<RegionId>(
    locationRegions[0].id,
  );

  return (
    <div className="divide-y divide-white/15 border-y border-white/15">
      {locationRegions.map((region) => {
        const isOpen = region.id === openRegionId;
        const buttonId = `location-region-${region.id}-button`;
        const panelId = `location-region-${region.id}-panel`;

        return (
          <section key={region.id}>
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenRegionId(region.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-display text-xl font-semibold text-white transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                {region.name}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.75}
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <ul className="grid gap-2">
                {region.states.map((state) => (
                  <li
                    key={`${region.id}-${state.name}`}
                    className="flex min-h-10 items-center justify-between gap-4 rounded-md bg-white/5 px-4 py-2 text-sm"
                  >
                    <span className="font-medium text-off-white">
                      {state.name}
                    </span>
                    <span className="whitespace-nowrap text-muted">
                      {state.count} {state.count === 1 ? "location" : "locations"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
