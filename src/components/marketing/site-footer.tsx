import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  headerMoreNavItems,
  headerNavItems,
} from "@/constants/marketing-content";
import { cn } from "@/lib/cn";

type FooterNavLabel = (typeof headerNavItems)[number]["label"];

interface SiteFooterProps {
  activeItem?: FooterNavLabel | null;
  variant?: "dark" | "light";
}

const socialItems = [
  {
    label: "Facebook",
    src: "/assets/social-facebook.svg",
    href: "https://www.facebook.com/truxparking/",
  },
  {
    label: "LinkedIn",
    src: "/assets/social-linkedin.svg",
    href: "https://www.linkedin.com/company/trux-parking",
  },
  {
    label: "Instagram",
    src: "/assets/social-instagram.svg",
    href: "https://www.instagram.com/truxparking/",
  },
] as const;

const legalItems = [
  {
    label: "Privacy Policy",
    href: "https://truxparking.com/privacy-policy/",
  },
  {
    label: "Terms of Service",
    href: "https://truxparking.com/wp-content/uploads/2026/04/Terms-Conditions.pdf",
  },
  {
    label: "Cookies Settings",
    href: "https://truxparking.com/privacy-policy/#cookies",
  },
] as const;

export function SiteFooter({
  activeItem = "Drivers",
  variant = "dark",
}: SiteFooterProps) {
  const isLight = variant === "light";

  return (
    <footer
      className={cn(
        "py-12 wide:h-[368px] wide:py-24",
        isLight ? "bg-white text-midnight" : "bg-midnight",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-full w-full max-w-[1280px] flex-col gap-10 px-6 md:px-10 wide:gap-16 wide:px-6",
        )}
      >
        <div className="flex flex-col gap-8 wide:h-7 wide:flex-row wide:items-center wide:justify-between wide:gap-10">
          <div className="flex flex-col gap-6 wide:flex-row wide:items-center wide:gap-12">
            <Image
              src="/assets/trux-logo.svg"
              alt="TRUX Parking"
              width={80}
              height={21}
              className="h-[21px] w-20 shrink-0"
            />

            <nav aria-label="Footer navigation">
              <ul
                aria-label="Footer links"
                className={cn(
                  "flex list-none flex-wrap items-start gap-x-8 gap-y-4 text-sm leading-5 wide:items-center",
                  isLight ? "text-[#737373]" : "text-muted",
                )}
              >
                {headerNavItems.map((item) => (
                  <li key={item.label} className="whitespace-nowrap">
                    <Link
                      href={item.href}
                      aria-current={
                        item.label === activeItem ? "page" : undefined
                      }
                      className={cn(
                        "nav-gradient-link inline-flex min-h-11 items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
                        isLight
                          ? "hover:text-midnight focus-visible:text-midnight"
                          : "hover:text-off-white focus-visible:text-off-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="whitespace-nowrap">
                  <details className="group relative">
                    <summary
                      className={cn(
                        "nav-gradient-link inline-flex min-h-11 cursor-pointer list-none items-center gap-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber [&::-webkit-details-marker]:hidden",
                        isLight
                          ? "hover:text-midnight focus-visible:text-midnight"
                          : "hover:text-off-white focus-visible:text-off-white",
                      )}
                    >
                      More
                      <ChevronDown
                        aria-hidden="true"
                        className="size-4 transition-transform group-open:rotate-180"
                        strokeWidth={1.75}
                      />
                    </summary>
                    <ul
                      aria-label="Footer more links"
                      className={cn(
                        "mt-2 flex min-w-44 list-none flex-col rounded-md border p-2 shadow-xl wide:absolute wide:bottom-full wide:left-0 wide:z-30 wide:mb-2",
                        isLight
                          ? "border-[#e5e5e5] bg-white"
                          : "border-white/10 bg-midnight",
                      )}
                    >
                      {headerMoreNavItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex min-h-10 items-center rounded-md px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber",
                              isLight
                                ? "hover:bg-midnight/5 hover:text-midnight focus-visible:bg-midnight/5 focus-visible:text-midnight"
                                : "hover:bg-white/10 hover:text-off-white focus-visible:bg-white/10 focus-visible:text-off-white",
                            )}
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

          <div
            aria-label="TRUX social media"
            className="flex items-center gap-5"
            role="group"
          >
            {socialItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-md p-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
                  isLight ? "hover:bg-midnight/5" : "hover:bg-white/10",
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={24}
                  height={24}
                  className={cn(!isLight && "brightness-0 invert")}
                />
              </Link>
            ))}
          </div>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "h-0 w-full border-t",
            isLight ? "border-[#e5e5e5]" : "border-border",
          )}
        />

        <div
          className={cn(
            "flex flex-col gap-5 text-sm leading-5 wide:flex-row wide:items-center wide:justify-between wide:gap-8 wide:whitespace-nowrap",
            isLight ? "text-[#737373]" : "text-muted",
          )}
        >
          <p>Copyright © 2024. All rights reserved by TruxParking.</p>
          <ul className="flex list-none flex-wrap items-center gap-x-7 gap-y-4">
            {legalItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "nav-gradient-link inline-flex min-h-11 items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
                    isLight
                      ? "hover:text-midnight focus-visible:text-midnight"
                      : "hover:text-off-white focus-visible:text-off-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
