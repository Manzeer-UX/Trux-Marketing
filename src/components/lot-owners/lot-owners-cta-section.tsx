import { Button } from "@/components/ui/button";

export function LotOwnersCtaSection() {
  return (
    <section
      aria-labelledby="lot-owners-cta-heading"
      className="flex bg-white px-6 py-16 text-midnight md:px-10 wide:h-[332px] wide:px-20 wide:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h2
            id="lot-owners-cta-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            No cost. No contract. No effort.
          </h2>
          <p className="text-base leading-6 text-[#444441]">
            We install the equipment, bring the drivers, and deposit your cut
            every month. You just say yes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="blue">Get started</Button>
          <Button
            variant="ghost"
            className="border border-midnight text-midnight hover:bg-midnight hover:text-white"
          >
            Have a Question?
          </Button>
        </div>
      </div>
    </section>
  );
}
