import { Button } from "@/components/ui/button";

export function PartnersCtaSection() {
  return (
    <section
      id="partner-inquiry"
      aria-labelledby="partner-inquiry-heading"
      className="flex bg-white px-6 py-16 text-midnight md:px-10 wide:h-[332px] wide:px-20 wide:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h2
            id="partner-inquiry-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Got a product that makes a driver’s day easier?
          </h2>
          <p className="mx-auto max-w-[1100px] text-base leading-6 text-[#444441]">
            We’re looking for partners across insurance, financing, maintenance,
            fuel, equipment, and fleet services. If it helps the cab or the
            carrier, we want to talk.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button type="button" variant="blue">
            Become a Partner
          </Button>
          <Button
            type="button"
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
