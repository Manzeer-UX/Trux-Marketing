import { lotOwnerTestimonials } from "@/constants/lot-owners-content";

export function LotOwnersTestimonialsSection() {
  return (
    <section
      aria-label="What lot owners are saying"
      className="bg-white px-6 py-16 text-midnight md:px-10 wide:h-[482px] wide:p-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col gap-6">
        <p className="text-xs leading-4 font-extrabold tracking-[1.8px] text-trux-blue">
          WHAT LOT OWNERS ARE SAYING
        </p>

        <div className="divide-y divide-[#9e9e9e]/30">
          {lotOwnerTestimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="grid gap-5 py-6 first:pt-0 md:grid-cols-[minmax(0,1fr)_180px] md:gap-12"
            >
              <blockquote className="flex gap-2 text-base leading-6 text-[#444441] md:text-lg md:leading-7">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-8 text-amber"
                >
                  “
                </span>
                <p>{testimonial.quote}</p>
              </blockquote>
              <div className="flex flex-col gap-1 text-sm leading-5">
                <p className="font-semibold text-trux-blue">
                  {testimonial.name}
                </p>
                <p className="text-[#444441]/80">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
