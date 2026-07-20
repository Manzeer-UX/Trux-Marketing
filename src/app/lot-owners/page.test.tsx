import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { LotOwnersCtaSection } from "@/components/lot-owners/lot-owners-cta-section";
import { LotOwnersHero } from "@/components/lot-owners/lot-owners-hero";
import { FAQS_QUERY } from "@/sanity/lib/queries";

const sanityFetch = vi.hoisted(() => vi.fn());

vi.mock("@/sanity/lib/live", () => ({ sanityFetch }));

it("lets lot owners edit their values and updates the monthly estimate", () => {
  render(<LotOwnersHero />);

  const spacesInput = screen.getByRole("spinbutton", {
    name: "Number of spaces",
  });
  const nightlyRateInput = screen.getByRole("spinbutton", {
    name: "Average nightly rate",
  });

  expect(spacesInput).toHaveValue(10);
  expect(nightlyRateInput).toHaveValue(25);

  fireEvent.change(spacesInput, { target: { value: "12" } });
  fireEvent.change(nightlyRateInput, { target: { value: "30" } });

  expect(spacesInput).toHaveValue(12);
  expect(nightlyRateInput).toHaveValue(30);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Your lot could make $10,800/m on TRUX.",
    }),
  ).toBeInTheDocument();
});

it("matches the hero team button to the bottom contact button style", () => {
  render(
    <>
      <LotOwnersHero />
      <LotOwnersCtaSection />
    </>,
  );

  const talkToTeam = screen.getByRole("button", {
    name: "Talk to Our Team",
  });
  const bottomContact = screen.getByRole("button", {
    name: "Have a Question?",
  });

  for (const className of [
    "border",
    "border-midnight",
    "text-midnight",
    "hover:bg-midnight",
    "hover:text-white",
  ]) {
    expect(bottomContact).toHaveClass(className);
    expect(talkToTeam).toHaveClass(className);
  }

  expect(talkToTeam).not.toHaveClass("rounded-sm", "hover:bg-midnight/5");
});

it("renders the static Figma Lot Owners page and active navigation", async () => {
  const lotOwnersPageModule = await vi
    .importActual<typeof import("./page")>("./page")
    .catch(() => null);

  expect(lotOwnersPageModule).not.toBeNull();
  if (!lotOwnersPageModule) return;

  sanityFetch.mockResolvedValueOnce({
    data: [
      {
        _id: "lot-owner-faq-1",
        question: "How do owners get paid?",
        answer: "Owners receive revenue deposits from TRUX each month.",
        order: 1,
        pageType: "lot-owners",
      },
    ],
  });

  render(await lotOwnersPageModule.default());

  expect(
    screen.getByRole("main", { name: "TRUX lot owners" }),
  ).toBeInTheDocument();

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  const lotOwnersLink = within(primaryNavigation).getByRole("link", {
    name: "Lot Owners",
  });
  expect(lotOwnersLink).toHaveAttribute("href", "/lot-owners");
  expect(lotOwnersLink).toHaveAttribute("aria-current", "page");

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Your lot could make $7,500/m on TRUX.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", {
      name: "Your lot could make $7,500/m on TRUX.",
    }),
  ).toHaveClass("wide:h-[640px]");
  expect(
    screen.queryByRole("img", {
      name: "Static map showing TRUX parking lot earnings",
    }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("region", {
      name: "Map showing TRUX parking lot earnings",
    }),
  ).toHaveClass("bg-[#f5f5f5]");
  expect(screen.queryAllByText(/\$\d+ \/ Night/)).toHaveLength(0);
  expect(
    document.querySelectorAll('img[src="/assets/lot-owners-map-pin.svg"]'),
  ).toHaveLength(0);

  expect(screen.getByRole("region", { name: "By the numbers" })).toHaveClass(
    "wide:h-[251px]",
    "wide:p-20",
  );
  expect(screen.getAllByRole("article", { name: /statistic/i })).toHaveLength(
    4,
  );

  expect(
    screen.getByRole("region", { name: "Start earning in 3 simple steps." }),
  ).toHaveClass("wide:h-[441px]", "wide:p-20");
  expect(screen.getAllByRole("article", { name: /step/i })).toHaveLength(3);

  expect(
    screen.getByRole("region", {
      name: "Everything you need, none of the headaches.",
    }),
  ).toHaveClass("wide:h-[560px]", "wide:px-20");
  expect(screen.getAllByRole("article", { name: /benefit/i })).toHaveLength(4);

  expect(
    screen.getByRole("region", { name: "What lot owners are saying" }),
  ).toHaveClass("wide:h-[482px]", "wide:p-20");
  expect(screen.getAllByRole("blockquote")).toHaveLength(3);

  const faqSection = screen.getByRole("region", {
    name: "Frequently Asked Questions",
  });
  expect(faqSection).toHaveClass("wide:min-h-[464px]", "wide:px-20");
  expect(
    within(faqSection).getByText("How do owners get paid?"),
  ).toBeInTheDocument();
  expect(within(faqSection).getAllByRole("button")).toHaveLength(1);
  expect(sanityFetch).toHaveBeenCalledWith({
    query: FAQS_QUERY,
    params: { pageType: "lot-owners" },
  });

  expect(
    screen.getByRole("region", { name: "No cost. No contract. No effort." }),
  ).toHaveClass("wide:h-[332px]", "wide:px-20", "wide:py-20");

  expect(screen.getByRole("contentinfo")).toHaveClass(
    "wide:h-[368px]",
    "bg-white",
    "text-midnight",
  );
});
