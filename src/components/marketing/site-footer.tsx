import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/marketing-content";

const socialItems = [
  { label: "Facebook", src: "/assets/social-facebook.svg" },
  { label: "LinkedIn", src: "/assets/social-linkedin.svg" },
  { label: "Instagram", src: "/assets/social-instagram.svg" },
] as const;

const legalItems = ["Privacy Policy", "Terms of Service", "Cookies Settings"];

export function SiteFooter() {
  return (
    <footer className="bg-midnight py-12 wide:h-[368px] wide:py-24">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col gap-10 px-6 wide:gap-16">
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
                    {item.label}
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
              <Button
                key={item.label}
                type="button"
                variant="ghost"
                aria-label={item.label}
                className="size-11 shrink-0 p-2.5"
              >
                <Image src={item.src} alt="" width={24} height={24} />
              </Button>
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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
