import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants/marketing-content";

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

export function SiteFooter() {
  return (
    <footer className="bg-midnight py-12 wide:h-[368px] wide:py-24">
      <div className="site-container flex h-full flex-col gap-10 px-6 md:px-10 wide:gap-16 wide:px-20">
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
              <ul className="flex list-none flex-wrap items-center gap-x-8 gap-y-4 text-sm leading-5 text-muted">
                {navItems.map((item) => (
                  <li key={item.label} className="whitespace-nowrap">
                    <Link
                      href={item.href}
                      aria-current={
                        "active" in item && item.active ? "page" : undefined
                      }
                      className="nav-gradient-link inline-flex min-h-11 items-center transition-colors hover:text-off-white focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md p-2.5 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                <Image
                  src={item.src}
                  alt=""
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </Link>
            ))}
          </div>
        </div>

        <span
          aria-hidden="true"
          className="h-0 w-full border-t border-border"
        />

        <div className="flex flex-col gap-5 text-sm leading-5 text-muted wide:flex-row wide:items-center wide:justify-between wide:gap-8 wide:whitespace-nowrap">
          <p>Copyright © 2024. All rights reserved by TruxParking.</p>
          <ul className="flex list-none flex-wrap items-center gap-x-7 gap-y-4">
            {legalItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="nav-gradient-link inline-flex min-h-11 items-center transition-colors hover:text-off-white focus-visible:text-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
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
