import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export function CoverageSection() {
  return (
    <section aria-labelledby="coverage-heading" className="bg-section">
      <div className="flex w-full flex-col gap-10 px-6 py-12 md:px-10 wide:grid wide:h-[512px] wide:grid-cols-coverage wide:items-center wide:gap-14 wide:px-20 wide:py-14">
        <div className="flex w-full items-center justify-center wide:h-[400px]">
          <Image
            src="/assets/coverage-map.svg"
            alt="TRUX parking coverage across 25 states"
            width={631}
            height={402}
            sizes="(min-width: 1512px) 620px, calc(100vw - 48px)"
            className="h-auto w-full max-w-[620px] wide:h-[400px] wide:w-[620px] wide:object-contain"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start gap-8 wide:h-[257px]">
          <h2
            id="coverage-heading"
            className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-white wide:flex-1 wide:text-5xl wide:leading-12"
          >
            <span className="block">Secure parking</span>
            <span className="block">in 25 states and</span>
            <span className="block">growing.</span>
          </h2>
          <ButtonLink href="/locations" className="whitespace-nowrap">
            Explore Locations
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
