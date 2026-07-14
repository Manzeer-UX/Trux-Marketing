import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/button";
import { navItems } from "@/constants/marketing-content";

const headerNavItems = navItems.slice(0, 7);

export function SiteHeader() {
  return (
    <header className="relative z-20 flex h-[65px] items-center justify-between bg-midnight px-6 lg:px-10">
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
          <ul className="flex list-none items-center gap-6">
            {headerNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={
                    "active" in item && item.active ? "page" : undefined
                  }
                  className="group flex min-h-11 flex-col items-center justify-center px-2 pt-1.5 text-base whitespace-nowrap text-off-white/70 aria-[current=page]:font-bold aria-[current=page]:text-off-white"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="mt-1 h-[3px] w-full bg-gradient-to-r from-amber to-transparent opacity-0 group-aria-[current=page]:opacity-100"
                  />
                </Link>
              </li>
            ))}
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
    </header>
  );
}
