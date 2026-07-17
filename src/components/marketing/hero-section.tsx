import { DriverMap } from "@/components/marketing/driver-map";
import { ParkingDatesDropdown } from "@/components/marketing/parking-dates-dropdown";
import { ParkingTypeDropdown } from "@/components/marketing/parking-type-dropdown";
import { SearchDropdown } from "@/components/marketing/search-dropdown";
import { Button } from "@/components/ui/button";

const controlClassName =
  "min-w-0 appearance-none border-0 bg-transparent p-0 text-base leading-6 text-warm-gray outline-none placeholder:text-warm-gray focus:border-transparent focus:outline-none focus-visible:outline-none";

const numberOfSpotsOptions = Array.from({ length: 10 }, (_, index) => {
  const amount = String(index + 1);

  return { value: amount, label: amount };
});

function SearchField({
  id,
  label,
  className = "",
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-search-field={id}
      className={`flex h-[66px] flex-col gap-0.5 bg-off-white/5 px-4 py-3 transition-colors focus-within:bg-off-white/10 ${className}`}
    >
      <label
        htmlFor={id}
        className="text-xs font-semibold leading-4 text-warm-gray uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-visible bg-midnight lg:h-[640px]"
    >
      <div className="relative w-full lg:grid lg:h-full lg:grid-cols-[620px_minmax(0,1fr)]">
        <div className="relative z-10 flex bg-midnight px-6 py-12 md:px-10 lg:items-center lg:py-0">
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-extrabold leading-4 tracking-[1.8px] text-amber">
                PARKING FOR TRUCK DRIVERS
              </p>
              <h1
                id="hero-heading"
                className="font-display text-[40px] leading-[44px] font-semibold text-off-white md:text-5xl md:leading-[52px] lg:text-[60px] lg:leading-[60px]"
              >
                The Safest Truck Parking Network.
              </h1>
              <p className="max-w-[540px] text-base leading-6 text-off-white lg:text-lg lg:leading-7">
                Every lot meets the TRUX Standard - cameras, electric gates,
                perimeter fencing, and industrial lighting. That&apos;s our
                promise.
              </p>
            </div>

            <div className="flex flex-col items-start gap-6">
              <div
                role="group"
                aria-label="Parking search details"
                className="grid h-[198px] w-full max-w-[540px] grid-cols-2 rounded-md"
              >
                <div className="col-span-2">
                  <SearchField
                    id="parking-location"
                    label="Location"
                    className="rounded-t-md border-b border-border"
                  >
                    <input
                      id="parking-location"
                      type="text"
                      name="location"
                      placeholder="City, state, or zip code"
                      className={controlClassName}
                    />
                  </SearchField>
                </div>
                <SearchField
                  id="parking-type"
                  label="Type"
                  className="border-r border-b border-border"
                >
                  <ParkingTypeDropdown
                    id="parking-type"
                    name="parkingType"
                    className={`${controlClassName} w-full`}
                  />
                </SearchField>
                <SearchField
                  id="number-of-spots"
                  label="Number of spots"
                  className="border-b border-border"
                >
                  <SearchDropdown
                    id="number-of-spots"
                    name="numberOfSpots"
                    placeholder="Select amount"
                    listboxLabel="Number of spots options"
                    options={numberOfSpotsOptions}
                    className={`${controlClassName} w-full`}
                    optionClassName="border-b border-white/[0.06] py-2 text-black last:border-b-0"
                    initialActiveIndex={3}
                    scrollable
                  />
                </SearchField>
                <div className="col-span-2">
                  <SearchField
                    id="parking-dates"
                    label="Dates"
                    className="rounded-b-md"
                  >
                    <ParkingDatesDropdown
                      id="parking-dates"
                      name="parkingDates"
                      className={controlClassName}
                    />
                  </SearchField>
                </div>
              </div>

              <Button
                type="button"
                className="h-11 w-[191px] whitespace-nowrap"
              >
                Search Available Lots
              </Button>
            </div>
          </div>
        </div>

        <div className="relative h-[320px] w-full lg:h-full">
          <DriverMap />
        </div>
      </div>
    </section>
  );
}
