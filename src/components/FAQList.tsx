"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { FAQ } from "@/sanity/lib/queries";

interface FAQListProps {
  faqs: FAQ[];
  variant?: "dark" | "light";
}

export function FAQList({ faqs, variant = "dark" }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const isLight = variant === "light";

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className={cn(
        isLight
          ? "flex bg-[#eef2ff] px-6 py-16 text-midnight md:px-10 wide:min-h-[464px] wide:px-20 wide:py-0"
          : "bg-midnight",
      )}
    >
      <div
        className={cn(
          isLight
            ? "mx-auto flex w-full max-w-[1352px] flex-col gap-12 wide:flex-row wide:items-center wide:gap-14"
            : "flex w-full flex-col gap-10 px-6 py-12 md:px-10 wide:grid wide:min-h-[602px] wide:grid-cols-[minmax(0,1fr)_780px] wide:items-center wide:gap-14 wide:px-20 wide:py-0",
        )}
      >
        <h2
          id={`${baseId}-heading`}
          className={cn(
            isLight
              ? "flex-1 font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
              : "font-display text-[40px] leading-[44px] font-semibold tracking-[-1.2px] text-white wide:text-5xl wide:leading-12",
          )}
        >
          Frequently Asked
          {!isLight && (
            <>
              <br aria-hidden="true" /> Questions
            </>
          )}
          {isLight && " Questions"}
        </h2>

        <div
          className={cn(
            isLight
              ? "w-full wide:w-[780px] wide:border-l wide:border-[#9e9e9e]/30 wide:py-20 wide:pl-10"
              : "w-full wide:grid wide:h-full wide:grid-cols-[1px_minmax(0,1fr)] wide:items-center wide:gap-10 wide:py-20",
          )}
        >
          {!isLight && (
            <span
              aria-hidden="true"
              className="hidden h-full bg-warm-gray/30 wide:block"
            />
          )}

          <ul
            className={cn(
              "flex min-w-0 list-none flex-col",
              isLight
                ? "divide-y divide-[#9e9e9e]/30"
                : "divide-y divide-warm-gray/30",
            )}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `${baseId}-faq-answer-${faq._id}`;

              return (
                <li
                  key={faq._id}
                  className={cn(!isLight && "py-5 first:pt-0 last:pb-0")}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={cn(
                      "flex w-full items-center justify-between gap-10 text-left text-base leading-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
                      isLight
                        ? "min-h-[61px] py-4 focus-visible:outline-trux-blue"
                        : "min-h-11 py-2.5 text-white focus-visible:outline-amber",
                    )}
                  >
                    <span className="min-w-0">{faq.question}</span>
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
                      className={cn(
                        "max-w-[680px] text-sm font-normal",
                        isLight
                          ? "pb-5 pr-12 leading-6 text-[#444441]"
                          : "pr-14 pb-2 leading-5 text-muted",
                      )}
                    >
                      {faq.answer}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
