import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  headerMoreNavItems,
  headerNavItems,
} from "@/constants/marketing-content";

type HeaderNavLabel = (typeof headerNavItems)[number]["label"];

interface SiteHeaderProps {
  activeItem?: HeaderNavLabel;
}

export function SiteHeader({ activeItem = "Drivers" }: SiteHeaderProps) {
  return (
    <header className="relative z-20 bg-midnight">
      <div className="flex h-[65px] w-full items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-6">
          <Image
            src="/assets/trux-logo.svg"
            alt="TRUX Parking"
            width={80}
            height={20}
            priority
          />

          <div
            aria-hidden="true"
            className="hidden h-6 w-px bg-off-white/30 wide:block"
          />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center wide:flex"
          >
            <ul
              aria-label="Primary links"
              className="flex list-none items-center gap-6"
            >
              {headerNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={
                      item.label === activeItem ? "page" : undefined
                    }
                    className="nav-gradient-link flex min-h-11 items-center px-2 text-base whitespace-nowrap text-off-white/70 transition-colors hover:text-off-white focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-[current=page]:font-bold aria-[current=page]:text-off-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <details className="group relative">
                  <summary className="nav-gradient-link flex min-h-11 cursor-pointer list-none items-center gap-1 px-2 text-base whitespace-nowrap text-off-white/70 transition-colors hover:text-off-white focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber [&::-webkit-details-marker]:hidden">
                    More
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 transition-transform group-open:rotate-180"
                      strokeWidth={1.75}
                    />
                  </summary>
                  <ul
                    aria-label="More links"
                    className="absolute top-full left-0 z-30 hidden min-w-48 list-none flex-col rounded-md border border-white/10 bg-midnight py-2 shadow-xl group-open:flex"
                  >
                    {headerMoreNavItems.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="flex min-h-10 items-center px-4 text-sm whitespace-nowrap text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white focus-visible:bg-white/10 focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-3 wide:flex">
          <ButtonLink
            href="https://trucklots.com/"
            variant="ghost"
            size="sm"
            className="whitespace-nowrap"
          >
            Sign In
          </ButtonLink>
          <ButtonLink
            href="https://truxparking.com/propertyowners/"
            variant="blue"
            size="sm"
            className="whitespace-nowrap"
          >
            New Lot Owner Account
          </ButtonLink>
          <ButtonLink
            href="https://trucklots.com/"
            size="sm"
            className="whitespace-nowrap"
          >
            New Driver Account
          </ButtonLink>
        </div>

        <Button
          type="button"
          variant="ghost"
          aria-label="Open navigation menu"
          className="size-11 p-0 wide:hidden"
        >
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
        </Button>
      </div>
    </header>
  );
}
