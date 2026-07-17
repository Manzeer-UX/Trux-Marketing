import Image from "next/image";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import { blogArticle } from "@/constants/blog-content";

export function BlogArticle() {
  return (
    <article className="mx-auto flex w-full max-w-[768px] flex-col gap-16 px-6 py-16 wide:py-24">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime="2024-11-11">{blogArticle.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{blogArticle.category}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[1px] text-[#fafafa] sm:text-5xl wide:text-[60px] wide:leading-[60px]">
            {blogArticle.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Image
            src={blogArticle.author.image}
            alt={blogArticle.author.name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div className="text-sm leading-5">
            <p className="font-medium text-[#fafafa]">
              {blogArticle.author.name}
            </p>
            <p className="text-muted">{blogArticle.author.role}</p>
          </div>
        </div>

        <BlogPlaceholderImage
          label="Article placeholder hero image"
          className="aspect-[8/5] w-full"
        />
      </header>

      <div className="text-base leading-6 text-[#fafafa]">
        <p>
          <strong>At a Glance:</strong> A freight broker is an FMCSA-licensed
          middleman who connects a shipper’s freight with a motor carrier. The
          broker earns the difference between what the shipper pays and what the
          carrier accepts. A freight dispatcher works on behalf of the carrier,
          finding loads, booking them, and handling paperwork for a flat fee or
          a percentage. The biggest difference is who they represent. A broker
          represents the freight and the shipper. A dispatcher represents the
          truck driver. Brokers need broker authority and a surety bond. Most
          dispatchers do not.
        </p>
        <p className="mt-6">
          Freight brokers and freight dispatchers both play a part in keeping
          your truck loaded, but they are not the same thing. This guide breaks
          down what each one does, how they get paid, and how to tell which role
          belongs on your side of the table.
        </p>

        <BlogPlaceholderImage
          label="Article placeholder supporting image"
          className="mt-8 aspect-[8/5] w-full"
        />

        <h2 className="mt-8 border-b border-white/10 pb-2 font-display text-[30px] leading-9 font-semibold text-[#fafafa]">
          Why the Difference Matters to Professional Drivers
        </h2>
        <p>
          “Broker” and “dispatcher” are used like the same word, but they sit on
          opposite sides of your business. A broker works for the shipper. A
          dispatcher works for you. Knowing which is which tells you who is on
          your side and where your money is going.
        </p>
        <p className="mt-6">Understanding the difference helps you:</p>
        <ul className="list-disc pl-6">
          <li>
            Know who is working for you versus who is working for the shipper
          </li>
          <li>Understand where your money goes and who is taking a cut</li>
          <li>Avoid legal trouble tied to working with an unlicensed party</li>
          <li>Pick the right support as an owner-operator or small carrier</li>
        </ul>

        <h3 className="pt-8 font-display text-2xl leading-8 font-semibold text-[#fafafa]">
          What Is a Freight Broker?
        </h3>
        <p>
          A freight broker is a licensed intermediary that matches a shipper’s
          freight with a motor carrier that can haul it. The broker does not own
          trucks and does not work for the driver. Under federal rules, a broker
          is an independent party, separate from the trucking company that
          actually moves the load. Think of the broker as a matchmaker: the
          shipper has goods to move, the carrier has a truck to fill, and the
          broker sits in the middle to connect them.
        </p>
        <p className="mt-6">
          The broker gets paid on the difference between what the shipper pays
          and what the carrier accepts. The shipper agrees to one rate, the
          broker books a carrier for less, and the broker keeps the difference
          as profit.
        </p>
      </div>
    </article>
  );
}
