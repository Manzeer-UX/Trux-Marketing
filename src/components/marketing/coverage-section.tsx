import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CoverageSection() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="flex flex-col gap-10 bg-section px-6 py-12 md:px-10 lg:h-[512px] lg:flex-row lg:items-center lg:gap-14 lg:px-20 lg:py-14"
    >
      <div className="flex w-full items-center justify-center lg:h-[400px] lg:w-[55%] lg:max-w-[780px] lg:shrink-0 xl:w-[780px]">
        <Image
          src="/assets/coverage-map.png"
          alt="TRUX parking coverage across 25 states"
          width={631}
          height={402}
          sizes="(min-width: 1024px) 620px, calc(100vw - 48px)"
          className="h-auto w-full max-w-[620px] lg:h-[400px] lg:w-[620px] lg:object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col items-start gap-8 lg:h-[257px]">
        <h2
          id="coverage-heading"
          className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-white lg:flex-1 lg:text-5xl lg:leading-12"
        >
          <span className="block">Secure parking</span>
          in 25 states and growing.
        </h2>
        <Button type="button" className="whitespace-nowrap">
          Explore Locations
        </Button>
      </div>
    </section>
  );
}
