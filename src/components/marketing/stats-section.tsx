import { stats } from "@/constants/marketing-content";

function StatAccent() {
  return (
    <span aria-hidden="true" className="flex h-[3px] items-center pl-1">
      <span className="h-[3px] w-1 bg-trux-blue" />
      <span className="h-[3px] w-9 bg-gradient-to-r from-trux-blue/50 to-transparent" />
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-amber text-midnight"
    >
      <div className="flex w-full flex-col gap-10 px-6 py-12 md:px-10 lg:h-[251px] lg:flex-row lg:items-center lg:gap-12 lg:p-20">
        <h2
          id="stats-heading"
          className="text-xs leading-4 font-extrabold tracking-[1.8px] text-trux-blue"
        >
          BY THE
          <br />
          NUMBERS
        </h2>

        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:flex lg:gap-10">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="contents lg:flex lg:flex-1 lg:gap-10"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden self-stretch bg-off-white/30 lg:block lg:w-px"
                />
              ) : null}

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <StatAccent />
                <div className="flex flex-col gap-1">
                  <p className="font-display text-4xl leading-10 font-semibold tracking-[-1.2px] lg:text-5xl lg:leading-12">
                    {stat.value}
                  </p>
                  <p className="text-sm leading-5 text-midnight/80 lg:text-base lg:leading-6">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
