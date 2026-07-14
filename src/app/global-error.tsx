"use client";

import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-midnight text-off-white">
        <main
          role="alert"
          aria-describedby="global-error-description"
          className="grid min-h-screen place-items-center bg-midnight px-6 py-20 text-center text-off-white"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-amber uppercase">
              TRUX needs a reset
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Something went wrong
            </h1>
            <p
              id="global-error-description"
              className="mt-5 text-base leading-7 text-muted"
            >
              We couldn&apos;t finish loading TRUX parking. Try again to
              continue.
            </p>
            <Button className="mt-8" onClick={reset}>
              Try again
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
