import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import { partnerProfiles } from "@/constants/partners-content";

interface PartnerProfilesSectionProps {
  images?: {
    otr?: ManagedImageValue | null;
    marquee?: ManagedImageValue | null;
    es?: ManagedImageValue | null;
  };
}

const partnerImageKeys = {
  "otr-solutions": "otr",
  "marquee-insurance": "marquee",
  "es-advantage": "es",
} as const;

export function PartnerProfilesSection({
  images,
}: PartnerProfilesSectionProps) {
  return (
    <section
      aria-labelledby="partner-profiles-heading"
      className="bg-[#eef2ff] px-6 py-16 text-midnight md:px-10 wide:min-h-[1408px] wide:p-20"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="flex max-w-[720px] flex-col gap-4 wide:gap-6">
          <h2
            id="partner-profiles-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Built for the cab.{" "}
            <span className="block">Vetted before the listing.</span>
          </h2>
          <p className="text-base leading-6 text-[#444441] md:text-lg md:leading-7">
            Three companies running today on TRUX — covering the financial,
            legal, and operational gaps that most carriers feel hardest.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 wide:mt-16">
          {partnerProfiles.map((partner) => (
            <article
              key={partner.id}
              aria-label={`${partner.name} partner profile`}
              className="grid overflow-hidden rounded-2xl border border-midnight/10 bg-white wide:h-[320px] wide:grid-cols-[420px_minmax(0,1fr)]"
            >
              <div className="relative h-[240px] overflow-hidden wide:h-[320px]">
                <ManagedImage
                  value={images?.[partnerImageKeys[partner.id]]}
                  fallbackSrc={partner.image}
                  fallbackAlt={`${partner.name} logo`}
                  fill
                  sizes="(min-width: 1440px) 420px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col p-6 md:p-8 wide:px-12 wide:py-12">
                <h3 className="font-display text-[28px] leading-8 font-semibold tracking-[-0.7px] wide:text-[32px] wide:leading-9 wide:tracking-[-0.8px]">
                  {partner.name}
                </h3>
                <p className="mt-0.5 text-base leading-6 font-semibold text-trux-blue wide:text-lg wide:leading-7">
                  {partner.tagline}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-3.5 h-0.5 w-10 bg-amber"
                />

                <div className="mt-3.5 grid gap-6 wide:grid-cols-[minmax(0,530px)_280px] wide:gap-[26px]">
                  <div>
                    <p className="text-base leading-6 text-midnight/70">
                      {partner.description}
                    </p>
                    <button
                      type="button"
                      className="mt-5 inline-flex min-h-8 items-center gap-2 text-left text-[13px] leading-4 font-semibold tracking-[0.5px] text-trux-blue uppercase transition-colors hover:text-midnight focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                    >
                      {partner.action}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <ul className="flex list-none flex-col gap-1 text-[13px] leading-5 text-midnight/80">
                    {partner.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex min-h-6 items-start gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-2 shrink-0 bg-amber"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
