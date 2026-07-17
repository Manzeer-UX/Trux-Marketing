"use client";

import {
  Bus,
  Cctv,
  Clock3,
  Container,
  Fence,
  Fuel,
  Grid2X2,
  Lightbulb,
  MoveRight,
  PackageOpen,
  QrCode,
  Route,
  Truck,
  UserRound,
  Utensils,
  Wifi,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Amenity {
  label: string;
  icon?: LucideIcon;
}

const allAmenities = [
  { label: "Electric Gates", icon: Fence },
  { label: "Security Cameras", icon: Cctv },
  { label: "Bathrooms" },
  { label: "Lighting", icon: Lightbulb },
  { label: "Stabilized Yard Surface", icon: Grid2X2 },
  { label: "Perimeter Fencing", icon: Fence },
  { label: "24/7 Access", icon: Clock3 },
  { label: "Mobile QR Code Entry", icon: QrCode },
  { label: "Wide Turning Radius", icon: Route },
  { label: "Tractor Parking", icon: Truck },
  { label: "Trailer Parking", icon: Container },
  { label: "Oversized Vehicle Parking", icon: Bus },
  { label: "Pull-Through Spaces", icon: MoveRight },
  { label: "On-Site Attendant", icon: UserRound },
  { label: "Fuel Nearby", icon: Fuel },
  { label: "Food Nearby", icon: Utensils },
  { label: "Repair Services Nearby", icon: Wrench },
  { label: "Wi-Fi Access", icon: Wifi },
  { label: "Vending Machines", icon: PackageOpen },
] as const satisfies readonly Amenity[];

const previewAmenities = allAmenities.slice(0, 5);

function AmenityIcon({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon;

  if (Icon) {
    return <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />;
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-[2px] border-2 border-[#0f0f1d] text-[8px] leading-none font-bold"
    >
      WC
    </span>
  );
}

export function LocationAmenities() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <section className="border-b border-[#e5e5e5] py-6">
        <h2 className="text-base leading-6 font-medium">Amenities</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[0, 1].map((column) => (
            <div key={column} className="flex flex-col gap-4">
              {previewAmenities.map((amenity) => (
                <div
                  key={`${column}-${amenity.label}`}
                  className="flex min-h-6 items-center gap-4 text-sm leading-5"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center">
                    <AmenityIcon amenity={amenity} />
                  </span>
                  {amenity.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="mt-4 min-h-8 rounded-full border border-[#e5e5e5] px-3.5 text-sm leading-5 font-medium transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
        >
          Show all 19 amenities
        </button>
      </section>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-50 grid place-items-center bg-[#0f0f1d]/85 p-4 sm:p-8"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="all-location-amenities-title"
                onKeyDown={(event) => {
                  if (event.key === "Tab") {
                    event.preventDefault();
                    closeButtonRef.current?.focus();
                  }
                }}
                className="flex max-h-[calc(100vh-32px)] w-full max-w-[840px] flex-col overflow-hidden rounded-md bg-[#fafafa] text-[#0f0f1d] shadow-2xl sm:max-h-[calc(100vh-64px)]"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-5 py-4 sm:px-6">
                  <h2
                    id="all-location-amenities-title"
                    className="text-xl leading-7 font-semibold"
                  >
                    All amenities
                  </h2>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close all amenities"
                    onClick={() => setIsOpen(false)}
                    className="grid size-10 place-items-center rounded-full transition-colors hover:bg-[#f0f0f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                  >
                    <X
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </button>
                </div>

                <div className="overflow-y-auto p-5 sm:p-6">
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {allAmenities.map((amenity) => (
                      <li
                        key={amenity.label}
                        className="flex min-h-10 items-center gap-3 rounded-sm bg-white px-3 py-2 text-sm leading-5"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center text-[#0f0f1d]">
                          <AmenityIcon amenity={amenity} />
                        </span>
                        {amenity.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
