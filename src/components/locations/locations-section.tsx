import Image from "next/image";
import { LocationsAccordion } from "@/components/locations/locations-accordion";

export function LocationsSection() {
  return (
    <section aria-labelledby="locations-heading" className="bg-section">
      <div className="w-full px-6 py-14 md:px-10 md:py-16 wide:px-20 wide:py-20">
        <div className="max-w-[760px]">
          <p className="text-xs font-extrabold tracking-[1.8px] text-amber">
            LOCATIONS
          </p>
          <h1
            id="locations-heading"
            className="mt-4 font-display text-[44px] leading-[48px] font-semibold tracking-[-1.2px] text-white wide:text-6xl wide:leading-[64px]"
          >
            TRUX Parking National Locations
          </h1>
          <p className="mt-5 max-w-[680px] text-lg leading-7 text-muted">
            Browse our growing network of secure truck parking by region.
          </p>
        </div>

        <div className="mt-12 grid gap-12 wide:grid-cols-[minmax(0,520px)_minmax(0,1fr)] wide:items-start wide:gap-20">
          <LocationsAccordion />

          <div className="flex min-h-[320px] items-center justify-center rounded-md bg-midnight/45 p-6 md:p-10 wide:min-h-[560px]">
            <Image
              src="/assets/coverage-map.svg"
              alt="TRUX parking locations across the United States"
              width={631}
              height={402}
              sizes="(min-width: 1440px) 720px, calc(100vw - 48px)"
              className="h-auto w-full max-w-[760px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
