import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import { Button } from "@/components/ui/button";

export function PartnersHero({
  image,
}: {
  image?: ManagedImageValue | null;
}) {
  return (
    <section
      aria-labelledby="partners-hero-heading"
      className="relative min-h-[520px] overflow-hidden bg-midnight px-6 md:px-10 wide:h-[585px] wide:px-20"
    >
      <ManagedImage
        value={image}
        fallbackSrc="/assets/partners-hero.png"
        fallbackAlt=""
        decorative
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />

      <div className="relative z-10 mx-auto min-h-[520px] w-full max-w-[1352px] py-20 wide:h-full wide:min-h-0 wide:py-[129px]">
        <div className="flex max-w-[1100px] flex-col items-start gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-amber">
              PARTNERS
            </p>
            <h1
              id="partners-hero-heading"
              className="max-w-[1100px] font-display text-[40px] leading-[42px] font-semibold tracking-[-1px] text-white md:text-5xl md:leading-12 md:tracking-[-1.2px]"
            >
              Beyond the gate.{" "}
              <span className="block">The network behind the load.</span>
            </h1>
          </div>

          <p className="max-w-[720px] text-base leading-6 text-off-white/85 md:text-lg md:leading-7">
            Every TRUX driver gets access to vetted partners across freight
            factoring, insurance, and small-fleet support. Real companies. Real
            terms. No marketplace noise.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button type="button" variant="blue" className="px-6">
              Become a Partner
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="border border-white px-5 text-white hover:bg-white hover:text-midnight"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
