"use client";

import { useEffect, useState } from "react";

const COOKIE_CONSENT_STORAGE_KEY = "trux-cookie-consent";

export function CookieRibbon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "analytics") {
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsVisible(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 bg-[#1f1f3a] px-5 py-5 text-white shadow-[0_-8px_24px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="max-w-[920px] text-sm leading-5 text-white/90 md:text-base md:leading-6">
          Help us understand how visitors use our website so we can improve performance and user experience.{" "}
      
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="min-h-10 rounded-full bg-[#2d5bd7] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#3768ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem(
                COOKIE_CONSENT_STORAGE_KEY,
                "analytics",
              );
              setIsVisible(false);
            }}
            className="min-h-10 rounded-full bg-amber px-6 text-xs font-semibold text-midnight transition-colors hover:bg-[#ffbd35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
