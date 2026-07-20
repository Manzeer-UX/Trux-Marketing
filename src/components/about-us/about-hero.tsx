import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import { ButtonLink } from "@/components/ui/button";

export function AboutHero({
  image,
}: {
  image?: ManagedImageValue | null;
}) {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative min-h-[560px] overflow-hidden bg-midnight px-6 py-20 md:px-10 wide:h-[640px] wide:px-20 wide:py-[129px]"
    >
      <ManagedImage
        value={image}
        fallbackSrc="/assets/about-hero.png"
        fallbackAlt=""
        decorative
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1352px] flex-col items-start gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-amber">
            ABOUT US
          </p>
          <h1
            id="about-hero-heading"
            className="max-w-[1100px] font-display text-[40px] leading-[42px] font-semibold tracking-[-1px] text-white md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            We built TRUX because{" "}
            <span className="block">truck parking was broken.</span>
          </h1>
        </div>

        <p className="max-w-[720px] text-base leading-6 text-off-white/85 md:text-lg md:leading-7">
          Founded in Atlanta in 2022, TRUX runs a nationwide network of secure
          truck parking lots — and turns underused land into monthly revenue for
          the people who own it.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-4">
          <ButtonLink href="/locations" className="px-6">
            Explore Our Lots
          </ButtonLink>
          <ButtonLink
            href="#about-contact"
            variant="ghost"
            className="border border-white px-5 text-white hover:bg-white hover:text-midnight"
          >
            Talk to Our Team
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
