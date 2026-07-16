import { LocationsAccordion } from "@/components/locations/locations-accordion";
import { StaticLocationMap } from "@/components/locations/static-location-map";

export function LocationsSection() {
  return (
    <section
      aria-label="Parking locations"
      className="overflow-x-clip bg-section"
    >
      <div className="flex w-full flex-col gap-12 px-6 py-8 md:px-10 md:py-10 wide:grid wide:w-screen wide:grid-cols-2 wide:items-start wide:gap-0 wide:px-0 wide:py-0">
        <div className="wide:px-4 wide:pt-4 wide:pb-0">
          <LocationsAccordion />
        </div>

        <StaticLocationMap />
      </div>
    </section>
  );
}
