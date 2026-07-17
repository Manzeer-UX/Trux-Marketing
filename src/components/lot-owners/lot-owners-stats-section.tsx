import { lotOwnerStatistics } from "@/constants/lot-owners-content";

export function LotOwnersStatsSection() {
  return (
    <section
      aria-label="By the numbers"
      className="bg-trux-blue px-6 py-14 text-white md:px-10 wide:h-[251px] wide:p-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 wide:flex-row wide:items-center wide:gap-12">
        <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-amber wide:w-20">
          BY THE
          <span className="block">NUMBERS</span>
        </p>

        <div className="grid flex-1 gap-8 sm:grid-cols-2 wide:grid-cols-4 wide:gap-10">
          {lotOwnerStatistics.map((statistic) => (
            <article
              key={statistic.label}
              aria-label={`Statistic: ${statistic.value} ${statistic.label}`}
              className="relative flex flex-col gap-3 wide:border-l wide:border-[#eef2ff]/30 wide:pl-10 first:wide:border-l-0 first:wide:pl-0"
            >
              <span
                aria-hidden="true"
                className="h-[3px] w-10 bg-gradient-to-r from-amber via-amber/50 to-transparent"
              />
              <div className="flex flex-col gap-1">
                <p className="font-display text-5xl leading-12 font-semibold tracking-[-1.2px]">
                  {statistic.value}
                </p>
                <p className="text-base leading-6 text-off-white">
                  {statistic.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
