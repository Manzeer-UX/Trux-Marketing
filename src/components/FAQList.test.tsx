import { fireEvent, render, screen } from "@testing-library/react";
import { FAQList } from "./FAQList";

const faqs = [
  {
    _id: "faq-1",
    question: "Can I reserve monthly parking?",
    answer: "Yes. TRUX supports monthly truck parking reservations.",
    order: 1,
    pageType: "drivers" as const,
  },
  {
    _id: "faq-2",
    question: "Can I cancel later?",
    answer: "You can contact support to adjust your parking plan.",
    order: 2,
    pageType: "drivers" as const,
  },
];

it("renders Sanity FAQs in an accessible accordion", () => {
  render(<FAQList faqs={faqs} />);

  const reserveQuestion = screen.getByRole("button", {
    name: "Can I reserve monthly parking?",
  });
  const cancelQuestion = screen.getByRole("button", {
    name: "Can I cancel later?",
  });

  expect(reserveQuestion).toHaveAttribute("aria-expanded", "false");
  expect(cancelQuestion).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.queryByText(
      "Yes. TRUX supports monthly truck parking reservations.",
    ),
  ).not.toBeInTheDocument();

  fireEvent.click(reserveQuestion);

  expect(reserveQuestion).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByText("Yes. TRUX supports monthly truck parking reservations."),
  ).toBeVisible();

  fireEvent.click(cancelQuestion);

  expect(reserveQuestion).toHaveAttribute("aria-expanded", "false");
  expect(cancelQuestion).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.queryByText(
      "Yes. TRUX supports monthly truck parking reservations.",
    ),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText("You can contact support to adjust your parking plan."),
  ).toBeVisible();
});

it("keeps the lot owners variant styled like the lot owners page", () => {
  render(<FAQList faqs={faqs} variant="light" />);

  expect(
    screen.getByRole("region", { name: "Frequently Asked Questions" }),
  ).toHaveClass("bg-[#eef2ff]", "text-midnight");
});
