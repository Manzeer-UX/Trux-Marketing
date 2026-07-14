import Image from "next/image";
import { valueProps } from "@/constants/marketing-content";

function ValuePropItem({
  valueProp,
  index,
}: {
  valueProp: (typeof valueProps)[number];
  index: number;
}) {
  const headingId = `value-prop-${index}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-1 flex-col items-start gap-6"
    >
      <Image src={valueProp.icon} alt="" width={48} height={48} />
      <div className="flex w-full flex-col gap-1">
        <h3
          id={headingId}
          className="font-display text-2xl leading-6 font-semibold text-white"
        >
          {valueProp.title}
        </h3>
        <p className="text-base leading-6 text-muted">
          {valueProp.description}
        </p>
      </div>
    </article>
  );
}

function ValuePropColumn({ start }: { start: number }) {
  const column = valueProps.slice(start, start + 2);

  return (
    <div className="flex flex-col gap-7 lg:h-[400px]">
      {column.map((valueProp, offset) => (
        <div key={valueProp.title} className="contents">
          {offset > 0 ? (
            <span aria-hidden="true" className="border-t border-border" />
          ) : null}
          <ValuePropItem valueProp={valueProp} index={start + offset} />
        </div>
      ))}
    </div>
  );
}

export function ValuePropsSection() {
  return (
    <section
      aria-labelledby="value-props-heading"
      className="bg-section px-6 py-12 md:px-10 lg:flex lg:h-[560px] lg:items-center lg:gap-12 lg:px-20 lg:py-0 xl:gap-20"
    >
      <h2
        id="value-props-heading"
        className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-off-white lg:max-w-[534px] lg:flex-1 lg:text-5xl lg:leading-12"
      >
        Why drivers choose TRUX.
      </h2>

      <div className="mt-10 grid flex-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:mt-0 lg:h-full lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-center lg:gap-6 lg:py-10 xl:gap-10">
        <ValuePropColumn start={0} />
        <span
          aria-hidden="true"
          className="hidden h-[400px] border-l border-border lg:block"
        />
        <ValuePropColumn start={2} />
      </div>
    </section>
  );
}
