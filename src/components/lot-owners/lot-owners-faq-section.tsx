"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { lotOwnerFaqs } from "@/constants/lot-owners-content";
import { cn } from "@/lib/cn";

export function LotOwnersFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="lot-owners-faq-heading"
      className="flex bg-[#eef2ff] px-6 py-16 text-midnight md:px-10 wide:min-h-[464px] wide:px-20 wide:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col gap-12 wide:flex-row wide:items-center wide:gap-14">
        <h2
          id="lot-owners-faq-heading"
          className="flex-1 font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
        >
          Frequently Asked Questions
        </h2>

        <ul className="w-full list-none divide-y divide-[#9e9e9e]/30 wide:w-[780px] wide:border-l wide:border-[#9e9e9e]/30 wide:py-20 wide:pl-10">
          {lotOwnerFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            const answerId = `lot-owner-faq-answer-${index}`;

            return (
              <li key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex min-h-[61px] w-full items-center justify-between gap-10 py-4 text-left text-base leading-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trux-blue"
                >
                  <span>{faq.question}</span>
                  <Plus
                    aria-hidden="true"
                    className={cn(
                      "size-6 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                {isOpen && (
                  <p
                    id={answerId}
                    className="max-w-[680px] pb-5 pr-12 text-sm leading-6 font-normal text-[#444441]"
                  >
                    {faq.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
