import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const controlClassName =
  "min-w-0 appearance-none bg-transparent p-0 text-base leading-6 text-warm-gray placeholder:text-warm-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

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
      className={`flex h-[66px] flex-col gap-0.5 bg-off-white/5 px-4 py-3 ${className}`}
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

function SelectIndicator() {
  return (
    <ChevronDown
      data-select-indicator
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-warm-gray"
      strokeWidth={1.75}
    />
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-midnight lg:h-[640px]"
    >
      <div className="site-container relative lg:h-full">
        <div className="relative z-10 flex bg-midnight px-6 py-12 md:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[620px] lg:items-center lg:py-0">
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
                className="grid h-[198px] w-full max-w-[540px] grid-cols-2 overflow-hidden rounded-md"
              >
                <div className="col-span-2">
                  <SearchField
                    id="parking-location"
                    label="Location"
                    className="border-b border-border"
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
                  <div className="relative min-w-0">
                    <select
                      id="parking-type"
                      name="parkingType"
                      defaultValue=""
                      className={`${controlClassName} w-full pr-6`}
                    >
                      <option value="">Select type</option>
                      <option value="one-time">One time</option>
                      <option value="monthly">Monthly</option>
                    </select>
                    <SelectIndicator />
                  </div>
                </SearchField>
                <SearchField
                  id="number-of-spots"
                  label="Number of spots"
                  className="border-b border-border"
                >
                  <div className="relative min-w-0">
                    <select
                      id="number-of-spots"
                      name="numberOfSpots"
                      defaultValue=""
                      className={`${controlClassName} w-full pr-6`}
                    >
                      <option value="">Select amount</option>
                      {Array.from({ length: 10 }, (_, index) => {
                        const amount = index + 1;

                        return (
                          <option key={amount} value={amount}>
                            {amount}
                          </option>
                        );
                      })}
                    </select>
                    <SelectIndicator />
                  </div>
                </SearchField>
                <div className="col-span-2">
                  <SearchField id="parking-dates" label="Dates">
                    <input
                      id="parking-dates"
                      type="text"
                      name="parkingDates"
                      placeholder="Select parking dates"
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

        <div className="relative h-[320px] w-full lg:absolute lg:inset-0 lg:h-full">
          <Image
            src="/assets/hero-map.png"
            alt="Available TRUX parking lots around Atlanta"
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover lg:object-right"
          />
        </div>
      </div>
    </section>
  );
}
