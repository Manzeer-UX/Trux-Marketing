import { fireEvent, render, screen } from "@testing-library/react";
import { LotOwnersFaqSection } from "./lot-owners-faq-section";

it("shows one static FAQ answer at a time and allows all items to close", () => {
  render(<LotOwnersFaqSection />);

  const costQuestion = screen.getByRole("button", {
    name: "How much does it cost to list my lot?",
  });
  const propertyQuestion = screen.getByRole("button", {
    name: "What types of properties qualify?",
  });

  expect(costQuestion).toHaveAttribute("aria-expanded", "false");
  expect(propertyQuestion).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.queryByText(
      "Listing your lot is free. TRUX earns a 20% service fee only when your property generates revenue.",
    ),
  ).not.toBeInTheDocument();

  fireEvent.click(costQuestion);

  expect(costQuestion).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByText(
      "Listing your lot is free. TRUX earns a 20% service fee only when your property generates revenue.",
    ),
  ).toBeVisible();

  fireEvent.click(propertyQuestion);

  expect(costQuestion).toHaveAttribute("aria-expanded", "false");
  expect(propertyQuestion).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.queryByText(
      "Listing your lot is free. TRUX earns a 20% service fee only when your property generates revenue.",
    ),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText(
      "Commercial lots, truck yards, industrial properties, and other accessible spaces with room for truck and trailer parking can qualify.",
    ),
  ).toBeVisible();

  fireEvent.click(propertyQuestion);

  expect(propertyQuestion).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.queryByText(
      "Commercial lots, truck yards, industrial properties, and other accessible spaces with room for truck and trailer parking can qualify.",
    ),
  ).not.toBeInTheDocument();
});
