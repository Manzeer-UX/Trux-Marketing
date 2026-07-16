"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mapLocationDetails } from "@/constants/locations-content";

type StaticMapLocationId = (typeof mapLocationDetails)[number]["id"];

export function StaticLocationMap() {
  const [selectedId, setSelectedId] = useState<StaticMapLocationId | null>(
    null,
  );
  const selectedLocation = selectedId
    ? (mapLocationDetails.find((location) => location.id === selectedId) ??
      null)
    : null;

  return (
    <div
      id="locations-map"
      className="relative min-h-[620px] scroll-mt-24 overflow-hidden rounded-md bg-midnight shadow-lg wide:sticky wide:top-0 wide:h-[1162px] wide:min-h-[1162px] wide:rounded-none wide:shadow-none"
    >
      <Image
        src="/assets/location-map-static.png"
        alt="Static map of TRUX parking locations around Atlanta"
        width={756}
        height={959}
        sizes="(min-width: 1440px) 50vw, calc(100vw - 48px)"
        className="absolute inset-0 z-0 h-full w-full object-cover wide:h-auto wide:object-contain"
        priority
      />

      {mapLocationDetails.map((location) => {
        const isSelected = location.id === selectedId;

        return (
          <button
            key={location.id}
            type="button"
            aria-label={`Show ${location.mapName}, ${location.mapSpots} spots`}
            aria-pressed={isSelected}
            onClick={() => setSelectedId(location.id)}
            className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${location.mapPositionClassName}`}
          >
            <Image
              src="/assets/location-pin.svg"
              alt=""
              width={33}
              height={40}
              className="h-10 w-[33px] drop-shadow-md"
            />
          </button>
        );
      })}

      {selectedLocation ? (
        <article
          role="region"
          aria-label="Selected parking location"
          aria-live="polite"
          className="absolute top-4 left-1/2 z-30 flex w-[calc(100%-1.5rem)] max-w-[332px] -translate-x-1/2 flex-col gap-2.5 overflow-hidden rounded-sm border border-amber bg-white px-4 py-3 text-midnight shadow-md wide:top-[171px] wide:left-[calc(50%+30px)]"
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
            View Location
          </Link>
        </article>
      ) : null}
    </div>
  );
}
