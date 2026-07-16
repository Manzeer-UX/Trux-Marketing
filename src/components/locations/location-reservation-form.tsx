"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { MapLocationDetails } from "@/constants/locations-content";

interface LocationReservationFormProps {
  location: MapLocationDetails;
}

const millisecondsPerDay = 24 * 60 * 60 * 1000;
const spotOptions = [1, 2, 3, 4, 5] as const;

function formatDateRange(checkInDate: string, checkOutDate: string) {
  const checkIn = new Date(`${checkInDate}T00:00:00Z`);
  const checkOut = new Date(`${checkOutDate}T00:00:00Z`);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return "Select dates";
  }

  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  if (
    checkIn.getUTCFullYear() === checkOut.getUTCFullYear() &&
    checkIn.getUTCMonth() === checkOut.getUTCMonth()
  ) {
    return `${monthFormatter.format(checkIn)} ${checkIn.getUTCDate()}–${checkOut.getUTCDate()}`;
  }

  return `${dateFormatter.format(checkIn)}–${dateFormatter.format(checkOut)}`;
}

function calculateNights(checkInDate: string, checkOutDate: string) {
  const checkInTime = Date.parse(`${checkInDate}T00:00:00Z`);
  const checkOutTime = Date.parse(`${checkOutDate}T00:00:00Z`);

  if (
    Number.isNaN(checkInTime) ||
    Number.isNaN(checkOutTime) ||
    checkOutTime <= checkInTime
  ) {
    return 0;
  }

  return Math.ceil((checkOutTime - checkInTime) / millisecondsPerDay);
}

export function LocationReservationForm({
  location,
}: LocationReservationFormProps) {
  const [reservationType, setReservationType] = useState("one-time");
  const [spotCount, setSpotCount] = useState(String(location.spots));
  const [checkInDate, setCheckInDate] = useState(location.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(location.checkOutDate);
  const [isDateEditorOpen, setIsDateEditorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const nights = calculateNights(checkInDate, checkOutDate);
  const isMonthly = reservationType === "monthly";
  const billableNights = isMonthly ? 30 : Math.max(nights, 1);
  const total = location.nightlyRate * billableNights;
  const stayLabel = isMonthly
    ? "for 1 month"
    : `for ${Math.max(nights, 1)} ${Math.max(nights, 1) === 1 ? "night" : "nights"}`;
  const dateRangeLabel = formatDateRange(checkInDate, checkOutDate);

  const resetFeedback = () => {
    setErrorMessage("");
    setConfirmationMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nights < 1) {
      setConfirmationMessage("");
      setErrorMessage("Check-out date must be after the check-in date.");
      return;
    }

    setErrorMessage("");
    setConfirmationMessage(
      `Reservation details saved for ${spotCount} ${Number(spotCount) === 1 ? "half spot" : "half spots"}. You won’t be charged yet.`,
    );
  };

  return (
    <aside
      role="region"
      aria-label="Parking reservation"
      className="w-full rounded-[8px] bg-white p-6 xl:mt-8 xl:w-[400px]"
    >
      <div className="flex items-baseline gap-[7px]" aria-live="polite">
        <p className="text-xl leading-7 font-bold underline underline-offset-4">
          ${total}
        </p>
        <p className="text-base leading-6 text-black">{stayLabel}</p>
      </div>

      <form className="relative mt-6" onSubmit={handleSubmit} noValidate>
        <div className="overflow-hidden rounded-md border border-[#e5e5e5]">
          <div className="grid grid-cols-2">
            <label
              htmlFor="reservation-type"
              className="border-r border-b border-[#e5e5e5] px-4 py-3"
            >
              <span className="block text-xs leading-4 font-semibold text-warm-gray uppercase">
                Type
              </span>
              <select
                id="reservation-type"
                value={reservationType}
                onChange={(event) => {
                  setReservationType(event.target.value);
                  resetFeedback();
                }}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-base leading-6 outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <option value="one-time">One time</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>

            <label
              htmlFor="reservation-spots"
              className="border-b border-[#e5e5e5] px-4 py-3"
            >
              <span className="block text-xs leading-4 font-semibold text-warm-gray uppercase">
                Number of spots
              </span>
              <select
                id="reservation-spots"
                value={spotCount}
                onChange={(event) => {
                  setSpotCount(event.target.value);
                  resetFeedback();
                }}
                className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent text-base leading-6 outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                {spotOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} {option === 1 ? "Half spot" : "Half spots"}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            aria-expanded={isDateEditorOpen}
            aria-controls="reservation-date-editor"
            aria-label={`Edit dates: ${dateRangeLabel}`}
            onClick={() => setIsDateEditorOpen((isOpen) => !isOpen)}
            className="flex w-full cursor-pointer flex-col items-start gap-0.5 px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber"
          >
            <span className="text-xs leading-4 font-semibold text-warm-gray uppercase">
              Dates
            </span>
            <span className="text-base leading-6 text-[#0f0f1d]">
              {dateRangeLabel}
            </span>
          </button>
        </div>

        {isDateEditorOpen ? (
          <fieldset
            id="reservation-date-editor"
            className="absolute top-[136px] right-0 left-0 z-30 rounded-[8px] border border-[#e5e5e5] bg-white p-4 shadow-[0_12px_30px_rgba(15,15,29,0.14)]"
          >
            <legend className="sr-only">Edit reservation dates</legend>
            <div className="grid grid-cols-2 gap-3">
              <label htmlFor="reservation-check-in" className="min-w-0">
                <span className="block text-xs leading-4 font-semibold text-warm-gray">
                  Check-in
                </span>
                <input
                  id="reservation-check-in"
                  aria-label="Check-in date"
                  type="date"
                  required
                  value={checkInDate}
                  max={checkOutDate || undefined}
                  onChange={(event) => {
                    setCheckInDate(event.target.value);
                    resetFeedback();
                  }}
                  className="mt-1 h-9 w-full min-w-0 rounded-md border border-[#e5e5e5] bg-white px-2 text-sm leading-5 outline-none focus-visible:ring-2 focus-visible:ring-amber"
                />
              </label>

              <label htmlFor="reservation-check-out" className="min-w-0">
                <span className="block text-xs leading-4 font-semibold text-warm-gray">
                  Check-out
                </span>
                <input
                  id="reservation-check-out"
                  aria-label="Check-out date"
                  type="date"
                  required
                  value={checkOutDate}
                  min={checkInDate || undefined}
                  aria-invalid={Boolean(errorMessage)}
                  aria-describedby={
                    errorMessage ? "reservation-date-error" : undefined
                  }
                  onChange={(event) => {
                    setCheckOutDate(event.target.value);
                    resetFeedback();
                  }}
                  className="mt-1 h-9 w-full min-w-0 rounded-md border border-[#e5e5e5] bg-white px-2 text-sm leading-5 outline-none focus-visible:ring-2 focus-visible:ring-amber"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => setIsDateEditorOpen(false)}
              className="mt-3 h-8 w-full rounded-full bg-[#f5a623] px-3 text-sm leading-5 font-medium text-[#171729] outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Done editing dates
            </button>
          </fieldset>
        ) : null}

        {errorMessage ? (
          <p
            id="reservation-date-error"
            role="alert"
            className="mt-3 text-sm leading-5 text-red-700"
          >
            {errorMessage}
          </p>
        ) : null}

        <Button type="submit" className="mt-6 h-9 min-h-9 w-full text-sm">
          Reserve Parking
        </Button>

        {confirmationMessage ? (
          <p
            role="status"
            aria-label="Reservation confirmation"
            className="mt-4 text-center text-sm leading-5 text-[#3b6b3d]"
          >
            {confirmationMessage}
          </p>
        ) : (
          <p className="mt-4 text-center text-sm leading-5 text-[#737373]">
            You won’t be charged yet
          </p>
        )}
      </form>
    </aside>
  );
}
