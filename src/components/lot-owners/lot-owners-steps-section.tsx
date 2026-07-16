import { lotOwnerSteps } from "@/constants/lot-owners-content";

export function LotOwnersStepsSection() {
  return (
    <section
      aria-labelledby="lot-owners-steps-heading"
      className="bg-white px-6 py-16 text-midnight md:px-10 wide:h-[441px] wide:p-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2
            id="lot-owners-steps-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Start earning in 3 simple steps.
          </h2>
          <p className="text-base leading-6 text-[#444441] md:text-lg md:leading-7">
            We handle bookings, payments, and access. You just collect your
            share.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 wide:gap-14">
          {lotOwnerSteps.map((step) => (
            <article
              key={step.number}
              aria-label={`Step ${step.number}: ${step.title}`}
              className="flex flex-col items-start gap-4"
            >
              <p className="font-display text-5xl leading-12 font-semibold tracking-[-1.2px] text-trux-blue">
                {step.number}
              </p>
              <span
                aria-hidden="true"
                className="h-[3px] w-[100px] bg-gradient-to-r from-trux-blue via-trux-blue/50 to-transparent"
              />
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-2xl leading-6 font-semibold">
                  {step.title}
                </h3>
                <p className="text-base leading-6 text-[#444441]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
