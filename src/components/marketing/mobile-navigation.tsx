"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  headerMoreNavItems,
  headerNavItems,
} from "@/constants/marketing-content";

type HeaderNavLabel = (typeof headerNavItems)[number]["label"];

interface MobileNavigationProps {
  activeItem?: HeaderNavLabel | null;
}

export function MobileNavigation({ activeItem }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeNavigation() {
    setIsOpen(false);
  }

  return (
    <div className="wide:hidden">
      <Button
        type="button"
        variant="ghost"
        aria-label={`${isOpen ? "Close" : "Open"} navigation menu`}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        className="size-11 p-0"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
        ) : (
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
        )}
      </Button>

      {isOpen ? (
        <div className="absolute top-full right-0 left-0 z-40 border-t border-white/10 bg-midnight shadow-2xl">
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-65px)] overflow-y-auto px-6 py-6"
          >
            <ul className="flex list-none flex-col">
              {headerNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={
                      item.label === activeItem ? "page" : undefined
                    }
                    onClick={closeNavigation}
                    className="flex min-h-12 items-center border-b border-white/10 px-2 text-base text-off-white/80 transition-colors hover:text-off-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber aria-[current=page]:font-bold aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 px-2 text-xs leading-4 font-semibold tracking-[0.12em] text-warm-gray uppercase">
              More
            </p>
            <ul className="mt-2 flex list-none flex-col">
              {headerMoreNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeNavigation}
                    className="flex min-h-11 items-center rounded-md px-2 text-sm text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white focus-visible:bg-white/10 focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
              <ButtonLink
                href="https://trucklots.com/"
                variant="ghost"
                onClick={closeNavigation}
                className="w-full"
              >
                Sign In
              </ButtonLink>
              <ButtonLink
                href="https://truxparking.com/propertyowners/"
                variant="blue"
                onClick={closeNavigation}
                className="w-full"
              >
                New Lot Owner Account
              </ButtonLink>
              <ButtonLink
                href="https://trucklots.com/"
                onClick={closeNavigation}
                className="w-full"
              >
                New Driver Account
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
