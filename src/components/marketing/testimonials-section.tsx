import { testimonials } from "@/constants/marketing-content";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-section"
    >
      <div className="flex w-full flex-col justify-center gap-6 px-6 py-12 md:px-10 wide:h-[510px] wide:px-20 wide:py-20">
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
                    className="relative h-[51px] w-[18px] shrink-0"
                  >
                    <span className="absolute top-[-8px] left-0 font-quote text-5xl leading-[normal] whitespace-nowrap text-amber">
                      &quot;
                    </span>
                  </span>
                  <p className="min-w-0 max-w-[950px] whitespace-pre-line text-base leading-6 text-white lg:text-lg lg:leading-7">
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
