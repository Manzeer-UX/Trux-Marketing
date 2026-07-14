import Image from "next/image";
import { Button } from "@/components/ui/button";

const searchFields = [
  {
    label: "LOCATION",
    value: "City, state, or zip code",
    className: "border-b border-border",
  },
  {
    label: "TYPE",
    value: "Select type",
    className: "border-r border-b border-border",
  },
  {
    label: "NUMBER OF SPOTS",
    value: "Select amount",
    className: "border-b border-border",
  },
  { label: "DATES", value: "Select parking dates", className: "" },
] as const;

function SearchField({
  label,
  value,
  className,
}: (typeof searchFields)[number]) {
  return (
    <div
      className={`flex h-[66px] flex-col gap-0.5 bg-off-white/5 px-4 py-3 ${className}`}
    >
      <span className="text-xs font-semibold leading-4 text-warm-gray">
        {label}
      </span>
      <span className="truncate text-base leading-6 text-warm-gray">
        {value}
      </span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-midnight lg:h-[640px]"
    >
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
                <SearchField {...searchFields[0]} />
              </div>
              <SearchField {...searchFields[1]} />
              <SearchField {...searchFields[2]} />
              <div className="col-span-2">
                <SearchField {...searchFields[3]} />
              </div>
            </div>

            <Button type="button" className="h-11 w-[191px] px-6">
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
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
