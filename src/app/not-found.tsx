import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-midnight px-6 py-20 text-center text-off-white">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.24em] text-amber uppercase">
          404 / Wrong turn
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          This route doesn&apos;t lead to a TRUX parking page. Head back to keep
          planning your stop.
        </p>
        <ButtonLink href="/" className="mt-8">
          Return home
        </ButtonLink>
      </div>
    </main>
  );
}
