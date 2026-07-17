export function AboutOriginStory() {
  return (
    <section
      aria-labelledby="about-origin-heading"
      className="bg-white px-6 py-16 text-midnight md:px-10 wide:h-[500px] wide:p-20"
    >
      <div className="mx-auto grid w-full max-w-[1352px] gap-12 wide:grid-cols-[560px_560px] wide:gap-20">
        <div className="flex flex-col gap-6">
          <h2
            id="about-origin-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Truck parking was broken. So we fixed it.
          </h2>

          <div className="flex flex-col items-start gap-3 pt-6">
            <p className="font-display text-[64px] leading-[68px] font-semibold tracking-[-2px] text-trux-blue md:text-[80px] md:leading-[80px] md:tracking-[-2.8px]">
              1 → 25
            </p>
            <p className="text-base leading-6 text-[#444441]">
              States in just 4 years.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-base leading-6 text-[#444441] md:text-lg md:leading-7 wide:pt-3">
          <p>
            Truck drivers were sleeping at rest stops, parking on shoulders, and
            gambling on lots they couldn’t verify. Lot owners had acres of
            unused land and no way to monetize it. The two sides never met.
          </p>
          <p>
            TRUX bridges them. Every lot on our platform is inspected, equipped
            to the TRUX Standard — cameras, electric gates, perimeter fencing,
            industrial lighting — and held there before a single driver pulls
            in.
          </p>
          <p>
            Drivers get a guaranteed spot. Owners get a monthly check. We handle
            bookings, payments, gate access, and 24/7 support so neither side
            has to.
          </p>
        </div>
      </div>
    </section>
  );
}
