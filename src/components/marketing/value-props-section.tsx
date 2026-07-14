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
    <div className="flex flex-col gap-7 wide:h-[400px]">
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
      id="why-trux"
      aria-labelledby="value-props-heading"
      className="bg-section px-6 py-12 md:px-10 wide:grid wide:h-[560px] wide:grid-cols-2 wide:items-center wide:gap-20 wide:px-20 wide:py-0"
    >
      <h2
        id="value-props-heading"
        className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-off-white wide:min-w-0 wide:text-5xl wide:leading-12"
      >
        Why drivers choose TRUX.
      </h2>

      <div className="mt-10 grid min-w-0 gap-7 wide:mt-0 wide:h-full wide:grid-cols-value-props wide:items-center wide:gap-10 wide:py-10">
        <ValuePropColumn start={0} />
        <span
          aria-hidden="true"
          className="h-px border-t border-border wide:h-[400px] wide:border-t-0 wide:border-l"
        />
        <ValuePropColumn start={2} />
      </div>
    </section>
  );
}
