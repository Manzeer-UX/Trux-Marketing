import { testimonials } from "@/constants/marketing-content";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="flex flex-col justify-center bg-section px-6 py-12 md:px-10 lg:h-[510px] lg:px-20 lg:py-12 xl:py-20"
    >
      <div className="flex w-full flex-col gap-6">
        <h2
          id="testimonials-heading"
          className="text-xs leading-4 font-extrabold tracking-[1.8px] text-amber"
        >
          WHAT DRIVERS ARE SAY
        </h2>

        <div className="flex flex-col gap-7">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="contents">
              {index > 0 ? (
                <span aria-hidden="true" className="border-t border-border" />
              ) : null}

              <article
                aria-label={`Testimonial by ${testimonial.name}`}
                className="grid items-start gap-5 sm:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_310px] xl:gap-[156px]"
              >
                <blockquote className="flex min-w-0 items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="w-[18px] shrink-0 font-display text-5xl leading-[43px] text-amber"
                  >
                    &ldquo;
                  </span>
                  <p className="min-w-0 text-base leading-6 text-white lg:text-lg lg:leading-7">
                    {testimonial.quote}
                  </p>
                </blockquote>

                <div className="flex flex-col gap-[3px] text-sm leading-5 sm:whitespace-nowrap">
                  <p className="font-semibold text-amber">{testimonial.name}</p>
                  <p className="text-muted/80">{testimonial.location}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
