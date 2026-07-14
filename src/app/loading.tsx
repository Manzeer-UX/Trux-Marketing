export default function Loading() {
  return (
    <main
      role="status"
      aria-busy="true"
      className="grid min-h-screen place-items-center bg-midnight px-6 py-20 text-center text-off-white"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.24em] text-amber uppercase">
          Finding your next stop
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Loading TRUX parking
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          We&apos;re checking the latest parking details for you.
        </p>
        <span
          aria-hidden="true"
          className="mx-auto mt-8 block size-3 animate-pulse rounded-full bg-amber"
        />
      </div>
    </main>
  );
}
