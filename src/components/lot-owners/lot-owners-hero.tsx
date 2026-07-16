"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { lotOwnerMapPins } from "@/constants/lot-owners-content";

function toNonNegativeNumber(value: string) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? Math.max(0, parsedValue) : 0;
}

export function LotOwnersHero() {
  const [numberOfSpaces, setNumberOfSpaces] = useState("10");
  const [nightlyRate, setNightlyRate] = useState("25");
  const calculatedEstimate =
    toNonNegativeNumber(numberOfSpaces) * toNonNegativeNumber(nightlyRate) * 30;
  const monthlyEstimate = Number.isFinite(calculatedEstimate)
    ? Math.round(calculatedEstimate)
    : 0;

  return (
    <section
      aria-labelledby="lot-owners-hero-heading"
      className="relative min-h-[640px] overflow-hidden bg-[#f5f5f5] wide:h-[640px]"
    >
      <div
        role="img"
        aria-label="Static map showing TRUX parking lot earnings"
        className="absolute inset-0 overflow-hidden bg-[#f5f5f5]"
      >
        <div className="absolute top-[-23.3px] left-0 h-[978.6px] w-full">
          <div className="absolute top-[58.8px] left-0 h-[910.552px] w-full">
            <Image
              src="/assets/lot-owners-map-parks.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-fill"
              priority
            />
          </div>
          <Image
            src="/assets/lot-owners-map-water.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-fill"
            priority
          />
          <Image
            src="/assets/lot-owners-map-secondary-roads.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-fill"
            priority
          />
          <Image
            src="/assets/lot-owners-map-main-roads.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-fill"
            priority
          />
        </div>

        {lotOwnerMapPins.map((pin) => (
          <div
            key={pin.price}
            className="absolute hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex"
            style={pin.style}
          >
            <span className="rounded-sm bg-trux-blue px-2 py-1.5 text-sm leading-5 font-semibold whitespace-nowrap text-white">
              {pin.price}
            </span>
            <Image
              src="/assets/lot-owners-map-pin.svg"
              alt=""
              width={33}
              height={40}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 m-6 flex max-w-[560px] flex-col rounded-sm bg-white px-6 py-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:m-10 md:px-10 md:py-12 wide:absolute wide:top-1/2 wide:left-10 wide:m-0 wide:size-[560px] wide:-translate-y-1/2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-trux-blue">
              ATTENTION LOT OWNERS
            </p>
            <h1
              id="lot-owners-hero-heading"
              className="font-display text-[38px] leading-10 font-semibold tracking-[-1px] text-midnight md:text-5xl md:leading-12 md:tracking-[-1.2px]"
            >
              Your lot could make{" "}
              <span aria-live="polite" className="text-trux-blue">
                ${monthlyEstimate.toLocaleString("en-US")}/m
              </span>{" "}
              on TRUX.
            </h1>
            <p className="text-base leading-6 text-[#444441] md:text-lg md:leading-7">
              Tell us about your lot — we’ll show you how much it can earn.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-sm whitespace-nowrap">
            <div className="grid grid-cols-2 gap-5">
              <label
                htmlFor="lot-owner-spaces"
                className="flex h-[72px] cursor-text flex-col justify-center gap-1 rounded-md bg-[#f7f7f7] px-4 focus-within:ring-2 focus-within:ring-trux-blue/30"
              >
                <span className="text-xs leading-4 font-semibold text-[#444441] uppercase">
                  Number of spaces
                </span>
                <input
                  id="lot-owner-spaces"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={numberOfSpaces}
                  onChange={(event) => setNumberOfSpaces(event.target.value)}
                  className="min-w-0 bg-transparent text-base leading-6 font-bold text-trux-blue outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </label>
              <label
                htmlFor="lot-owner-nightly-rate"
                className="flex h-[72px] cursor-text flex-col justify-center gap-1 rounded-md bg-[#f7f7f7] px-4 focus-within:ring-2 focus-within:ring-trux-blue/30"
              >
                <span
                  aria-hidden="true"
                  className="text-xs leading-4 font-semibold text-[#444441]"
                >
                  AVG NIGHTLY RATE
                </span>
                <span className="flex min-w-0 items-center text-base leading-6 font-bold text-trux-blue">
                  <span aria-hidden="true">$</span>
                  <input
                    id="lot-owner-nightly-rate"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="decimal"
                    aria-label="Average nightly rate"
                    value={nightlyRate}
                    onChange={(event) => setNightlyRate(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </span>
              </label>
            </div>
            <p className="text-sm leading-4 text-[#9e9e9e]">
              Learn how we{" "}
              <span className="underline underline-offset-2">
                estimate earnings
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="blue" className="px-6">
              List Your Lot &amp; Start Earning
            </Button>
            <Button
              variant="ghost"
              className="border border-midnight text-midnight hover:bg-midnight hover:text-white"
            >
              Talk to Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
