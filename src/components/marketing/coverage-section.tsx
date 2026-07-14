import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CoverageSection() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="flex flex-col gap-10 bg-section px-6 py-12 md:px-10 wide:grid wide:h-[512px] wide:grid-cols-coverage wide:items-center wide:gap-14 wide:px-20 wide:py-14"
    >
      <div className="flex w-full items-center justify-center wide:h-[400px]">
        <Image
          src="/assets/coverage-map.png"
          alt="TRUX parking coverage across 25 states"
          width={631}
          height={402}
          sizes="(min-width: 1440px) 620px, calc(100vw - 48px)"
          className="h-auto w-full max-w-[620px] wide:h-[400px] wide:w-[620px] wide:object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-col items-start gap-8 wide:h-[257px]">
        <h2
          id="coverage-heading"
          className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-white wide:flex-1 wide:text-5xl wide:leading-12"
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
