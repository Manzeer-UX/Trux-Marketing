import { render, screen } from "@testing-library/react";
import { Button, ButtonLink } from "./button";

it("renders an accessible amber button with merged classes", () => {
  render(<Button className="test-hook">Search Available Lots</Button>);
  const button = screen.getByRole("button", { name: "Search Available Lots" });
  expect(button).toHaveClass("bg-amber", "test-hook");
});

it("renders a Next.js link with the requested button variant", () => {
  render(
    <ButtonLink href="/" variant="blue" className="test-hook">
      Visit destination
    </ButtonLink>,
  );

  const link = screen.getByRole("link", { name: "Visit destination" });
  expect(link).toHaveAttribute("href", "/");
  expect(link).toHaveClass("bg-trux-blue", "test-hook", "min-h-11");
});
