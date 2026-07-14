"use client";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorState({ reset }: ErrorStateProps) {
  return (
    <main
      role="alert"
      aria-describedby="route-error-description"
      className="grid min-h-screen place-items-center bg-midnight px-6 py-20 text-center text-off-white"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.24em] text-amber uppercase">
          Temporary detour
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          We hit a roadblock
        </h1>
        <p
          id="route-error-description"
          className="mt-5 text-base leading-7 text-muted"
        >
          We couldn&apos;t load this page. Try again to get back on route.
        </p>
        <Button className="mt-8" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
