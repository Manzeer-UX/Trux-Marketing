"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/constants/marketing-content";

const faqAnswer =
  "More information about this TRUX parking question will be available soon.";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-midnight"
    >
      <div className="site-container flex flex-col gap-10 px-6 py-12 md:px-10 wide:grid wide:min-h-[602px] wide:grid-cols-[minmax(0,1fr)_780px] wide:items-center wide:gap-14 wide:px-20 wide:py-0">
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
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;
              const toggleId = `faq-toggle-${index}`;

              return (
                <li
                  key={faq.question}
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <div className="flex min-h-11 items-start gap-6">
                    <p className="min-w-0 flex-1 pt-2.5 text-base leading-6 font-semibold text-white">
                      {faq.question}
                    </p>
                    <button
                      id={toggleId}
                      type="button"
                      aria-label={`${isOpen ? "Collapse" : "Expand"} answer for: ${faq.question}`}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex size-11 shrink-0 items-center justify-center rounded-md text-off-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                    >
                      <Plus
                        aria-hidden="true"
                        className={`size-6 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={toggleId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[640px] pr-14 pb-2 text-sm leading-5 text-muted">
                        {faqAnswer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
