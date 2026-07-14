import { Plus } from "lucide-react";
import { faqs } from "@/constants/marketing-content";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="flex flex-col gap-10 bg-midnight px-6 py-12 md:px-10 wide:grid wide:h-[602px] wide:grid-cols-[minmax(0,1fr)_780px] wide:items-center wide:gap-14 wide:px-20 wide:py-0"
    >
      <h2
        id="faq-heading"
        className="font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-white wide:text-5xl wide:leading-12"
      >
        Frequently Asked Questions
      </h2>

      <div className="w-full wide:grid wide:h-full wide:grid-cols-[1px_minmax(0,1fr)] wide:items-center wide:gap-10 wide:py-20">
        <span
          aria-hidden="true"
          className="hidden h-full bg-warm-gray/30 wide:block"
        />

        <ul className="flex min-w-0 flex-col divide-y divide-warm-gray/30">
          {faqs.map((faq) => (
            <li
              key={faq.question}
              role="listitem"
              aria-label={`FAQ: ${faq.question}`}
              className="flex min-h-11 items-start gap-10 py-5 first:pt-0 last:pb-0"
            >
              <p className="min-w-0 flex-1 text-base leading-6 font-semibold text-white">
                {faq.question}
              </p>
              <Plus
                aria-hidden="true"
                className="size-6 shrink-0 text-off-white"
                strokeWidth={2}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
