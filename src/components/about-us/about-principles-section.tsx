import { aboutPrinciples } from "@/constants/about-content";

export function AboutPrinciplesSection() {
  return (
    <section
      aria-labelledby="about-principles-heading"
      className="bg-white px-6 py-16 text-midnight md:px-10 wide:h-[780px] wide:p-20"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="flex max-w-[800px] flex-col gap-4 wide:gap-6">
          <h2
            id="about-principles-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Four principles we don’t bend on.
          </h2>
          <p className="text-base leading-6 text-[#444441] md:text-lg md:leading-7">
            These show up in how we vet lots, how we price, who we hire, and
            what we ship.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 wide:mt-16 wide:max-w-[1336px]">
          {aboutPrinciples.map((principle) => (
            <article
              key={principle.number}
              aria-label={`Principle ${principle.number}: ${principle.title}`}
              className="flex min-h-[216px] flex-col items-start gap-4 rounded-[12px] border border-[#e5e5e5] bg-white p-6 md:p-8"
            >
              <p className="font-display text-[40px] leading-10 font-semibold tracking-[-1px] text-trux-blue md:text-5xl md:leading-12 md:tracking-[-1.2px]">
                {principle.number}
              </p>
              <h3 className="font-display text-xl leading-6 font-semibold md:text-2xl">
                {principle.title}
              </h3>
              <p className="max-w-[584px] text-base leading-6 text-[#444441]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
