import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import { lotOwnerBenefits } from "@/constants/lot-owners-content";
import { cn } from "@/lib/cn";

interface LotOwnersBenefitsSectionProps {
  images?: readonly (ManagedImageValue | null | undefined)[];
}

export function LotOwnersBenefitsSection({
  images = [],
}: LotOwnersBenefitsSectionProps) {
  return (
    <section
      aria-labelledby="lot-owners-benefits-heading"
      className="flex bg-[#eef2ff] px-6 py-16 text-midnight md:px-10 wide:h-[560px] wide:px-20 wide:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col gap-12 wide:flex-row wide:items-center wide:gap-20">
        <h2
          id="lot-owners-benefits-heading"
          className="max-w-[534px] flex-1 font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
        >
          Everything you need, none of the headaches.
        </h2>

        <div className="relative grid flex-1 gap-x-10 gap-y-7 md:grid-cols-2 wide:h-[400px] wide:py-0 wide:before:absolute wide:before:top-0 wide:before:bottom-0 wide:before:left-1/2 wide:before:w-px wide:before:bg-[#9e9e9e]/30">
          {lotOwnerBenefits.map((benefit, index) => (
            <article
              key={benefit.title}
              aria-label={`Benefit: ${benefit.title}`}
              className={cn(
                "flex flex-col items-start gap-6",
                index < 2 && "border-b border-[#9e9e9e]/30 pb-7",
              )}
            >
              <ManagedImage
                value={images[index]}
                fallbackSrc={benefit.icon}
                fallbackAlt=""
                decorative
                width={48}
                height={48}
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl leading-6 font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-base leading-6 text-[#444441]">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
