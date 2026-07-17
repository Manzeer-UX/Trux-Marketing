"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const galleryPhotos = [
  "object-center",
  "object-left",
  "object-right",
  "object-[35%_50%]",
  "object-[65%_50%]",
  "scale-110 object-left",
  "scale-110 object-center",
  "scale-110 object-right",
] as const;

export function LocationPhotoGallery() {
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
      <section
        aria-label="Parking location photos"
        className="grid gap-4 overflow-hidden xl:h-[378px] xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="relative h-[260px] overflow-hidden sm:h-[360px] xl:h-full">
          <Image
            src="/assets/location-details-primary.png"
            alt="Entrance to the Atlanta truck and trailer parking lot"
            fill
            sizes="(min-width: 1280px) 764px, calc(100vw - 48px)"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative grid grid-cols-2 gap-4 xl:grid-cols-1">
          <div className="relative h-[150px] overflow-hidden xl:h-[183px]">
            <Image
              src="/assets/location-details-primary.png"
              alt="Atlanta parking lot side view"
              fill
              sizes="(min-width: 1280px) 340px, calc(50vw - 32px)"
              className="object-cover object-left"
            />
          </div>
          <div className="relative h-[150px] overflow-hidden xl:h-[174px]">
            <Image
              src="/assets/location-details-primary.png"
              alt="Atlanta parking lot entrance view"
              fill
              sizes="(min-width: 1280px) 340px, calc(50vw - 32px)"
              className="scale-110 object-cover object-right"
            />
          </div>
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIsOpen(true)}
            className="absolute right-2 bottom-2 min-h-7 rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3.5 text-xs leading-4 font-medium transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            Show all photos
          </button>
        </div>
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
                aria-labelledby="all-location-photos-title"
                onKeyDown={(event) => {
                  if (event.key === "Tab") {
                    event.preventDefault();
                    closeButtonRef.current?.focus();
                  }
                }}
                className="flex max-h-[calc(100vh-32px)] w-full max-w-[1040px] flex-col overflow-hidden rounded-md bg-[#fafafa] text-[#0f0f1d] shadow-2xl sm:max-h-[calc(100vh-64px)]"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-5 py-4 sm:px-6">
                  <h2
                    id="all-location-photos-title"
                    className="text-xl leading-7 font-semibold"
                  >
                    All photos
                  </h2>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close all photos"
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    {galleryPhotos.map((positionClassName, index) => (
                      <figure
                        key={`${positionClassName}-${index}`}
                        className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#e5e5e5]"
                      >
                        <Image
                          src="/assets/location-details-primary.png"
                          alt={`Parking gallery view ${index + 1}`}
                          fill
                          sizes="(min-width: 640px) 480px, calc(100vw - 72px)"
                          className={`object-cover ${positionClassName}`}
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
