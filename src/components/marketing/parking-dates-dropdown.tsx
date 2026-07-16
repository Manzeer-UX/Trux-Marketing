"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

const initialMonth = new Date(2026, 6, 1);
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const selectedDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function isSameDate(firstDate: Date | null, secondDate: Date) {
  return firstDate?.getTime() === secondDate.getTime();
}

interface ParkingDatesDropdownProps {
  id: string;
  name: string;
  className?: string;
}

export function ParkingDatesDropdown({
  id,
  name,
  className,
}: ParkingDatesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstDayRef = useRef<HTMLButtonElement>(null);
  const dialogId = `${id}-dialog`;
  const monthName = monthFormatter.format(viewMonth);
  const monthYear = monthYearFormatter.format(viewMonth);
  const year = viewMonth.getFullYear();
  const monthIndex = viewMonth.getMonth();
  const monthDays = Array.from(
    { length: new Date(year, monthIndex + 1, 0).getDate() },
    (_, index) => index + 1,
  );
  const displayValue =
    startDate === null
      ? "Select parking dates"
      : endDate === null
        ? selectedDateFormatter.format(startDate)
        : `${selectedDateFormatter.format(startDate)} – ${selectedDateFormatter.format(endDate)}`;

  useEffect(() => {
    if (!isOpen) return;

    firstDayRef.current?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function closeCalendar() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function changeMonth(offset: number) {
    setViewMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + offset,
          1,
        ),
    );
  }

  function selectDay(day: number) {
    const selectedDate = new Date(year, monthIndex, day);

    if (startDate === null || endDate !== null) {
      setStartDate(selectedDate);
      setEndDate(null);
      return;
    }

    if (selectedDate < startDate) {
      setStartDate(selectedDate);
      setEndDate(startDate);
    } else {
      setEndDate(selectedDate);
    }

    closeCalendar();
  }

  function handleCalendarKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeCalendar();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0", isOpen ? "z-40" : "z-30")}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        name={name}
        value={startDate?.toISOString() ?? ""}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={() => (isOpen ? closeCalendar() : setIsOpen(true))}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className={cn(
          className,
          "flex w-full cursor-pointer items-center justify-between gap-2 text-left",
        )}
      >
        <span className="truncate">{displayValue}</span>
        <CalendarDays
          data-date-indicator
          aria-hidden="true"
          className="pointer-events-none size-4 shrink-0 text-warm-gray"
        />
      </button>

      {isOpen ? (
        <div
          id={dialogId}
          role="dialog"
          aria-label={`${monthName} date picker`}
          onKeyDown={handleCalendarKeyDown}
          className="absolute top-[calc(100%+8px)] left-0 z-50 min-h-[257px] w-full overflow-hidden rounded-sm border border-white/10 bg-warm-gray p-2 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          <div className="flex h-10 items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-sm text-black transition-colors hover:bg-dropdown-active hover:text-white focus-visible:bg-dropdown-active focus-visible:text-white focus-visible:outline-none"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <p
              aria-live="polite"
              className="text-sm leading-5 font-medium text-black"
            >
              {monthYear}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-sm text-black transition-colors hover:bg-dropdown-active hover:text-white focus-visible:bg-dropdown-active focus-visible:text-white focus-visible:outline-none"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-y-1">
            {monthDays.map((day) => {
              const date = new Date(year, monthIndex, day);
              const isSelected =
                isSameDate(startDate, date) || isSameDate(endDate, date);

              return (
                <button
                  key={`${year}-${monthIndex}-${day}`}
                  ref={day === 1 ? firstDayRef : undefined}
                  type="button"
                  aria-label={`Choose ${monthName} ${day}, ${year}`}
                  aria-pressed={isSelected}
                  onClick={() => selectDay(day)}
                  className={cn(
                    "h-[35px] min-w-0 cursor-pointer text-center text-sm leading-5 text-black outline-none transition-colors hover:bg-dropdown-active hover:text-white focus-visible:bg-dropdown-active focus-visible:text-white",
                    isSelected && "bg-dropdown-active text-white",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
