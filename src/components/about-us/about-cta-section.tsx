import { ButtonLink } from "@/components/ui/button";

export function AboutCtaSection() {
  return (
    <section
      id="about-contact"
      aria-labelledby="about-contact-heading"
      className="flex bg-white px-6 py-16 text-midnight md:px-10 wide:h-[332px] wide:px-20 wide:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1352px] flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h2
            id="about-contact-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            Got a lot, a truck, or a question?
          </h2>
          <p className="text-base leading-6 text-[#444441]">
            We’ll get you to the right person on our team — usually within the
            day.
          </p>
        </div>

        <ButtonLink href="mailto:info@truxparking.com" variant="blue">
          Talk to Our Team
        </ButtonLink>
      </div>
    </section>
  );
}
