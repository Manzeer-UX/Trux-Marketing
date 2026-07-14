import Image from "next/image";
import { Button } from "@/components/ui/button";

const storeBadges = [
  {
    label: "Download on the App Store",
    src: "/assets/app-store.svg",
    width: 120,
  },
  {
    label: "Get it on Google Play",
    src: "/assets/google-play.svg",
    width: 135,
  },
] as const;

export function AppDownloadSection() {
  return (
    <section
      aria-labelledby="app-download-heading"
      className="overflow-hidden bg-midnight"
    >
      <div className="site-container flex flex-col gap-10 px-6 py-12 md:px-10 wide:grid wide:h-[716px] wide:grid-cols-[560px_minmax(0,1fr)] wide:items-center wide:gap-20 wide:px-20 wide:py-14">
        <div className="flex w-full max-w-[560px] flex-col items-start gap-10">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-amber">
              DOWNLOAD THE APP
            </p>
            <h2
              id="app-download-heading"
              className="font-display text-4xl leading-10 font-semibold tracking-[-0.9px] text-white"
            >
              Book, access, and manage your spot all from your phone.
            </h2>
          </div>
          <p className="text-base leading-6 text-off-white">
            Join 10,000+ drivers who use the TRUX app to find parking, get gate
            access, and pay — all without leaving the cab.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div
            role="group"
            aria-label="Text a TRUX app link"
            className="flex h-[52px] w-full items-center overflow-hidden rounded-full bg-off-white/20 p-1 pl-4"
          >
            <span className="shrink-0 text-base leading-6 text-off-white">
              +1
            </span>
            <span
              aria-hidden="true"
              className="mx-4 h-7 w-px shrink-0 bg-warm-gray"
            />
            <label htmlFor="app-phone-number" className="sr-only">
              Mobile phone number
            </label>
            <input
              id="app-phone-number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(555) 123-4567"
              className="min-w-0 flex-1 bg-transparent p-0 text-base leading-6 text-off-white outline-none placeholder:text-off-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            />
            <Button type="button" className="h-11 shrink-0 whitespace-nowrap">
              Send Link
            </Button>
          </div>
          <p className="text-xs leading-4 text-warm-gray">
            By providing your number, you agree to receive a one-time SMS. Msg
            &amp; data rates may apply.
          </p>
        </div>

        <span
          aria-hidden="true"
          className="w-full border-t border-warm-gray/30"
        />

        <div className="flex flex-col gap-4">
          <p className="text-sm leading-5 text-off-white">
            Or download directly:
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {storeBadges.map((badge) => (
              <Button
                key={badge.label}
                type="button"
                variant="ghost"
                aria-label={badge.label}
                className="h-11 p-0"
              >
                <Image
                  src={badge.src}
                  alt=""
                  width={badge.width}
                  height={40}
                  className="h-10 w-auto"
                />
              </Button>
            ))}
          </div>
        </div>
        </div>

        <div className="relative flex min-w-0 justify-center wide:h-full">
          <Image
            src="/assets/phone-app.png"
            alt="TRUX mobile app showing a parking location"
            width={628}
            height={960}
            sizes="(min-width: 1440px) 628px, (min-width: 768px) 500px, calc(100vw - 48px)"
            className="h-auto w-full max-w-[500px] wide:absolute wide:top-[-110px] wide:left-[-77px] wide:h-[960px] wide:w-[628px] wide:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
