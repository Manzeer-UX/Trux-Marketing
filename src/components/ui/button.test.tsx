import { render, screen } from "@testing-library/react";
import { Button } from "./button";

it("renders an accessible amber button with merged classes", () => {
  render(<Button className="test-hook">Search Available Lots</Button>);
  const button = screen.getByRole("button", { name: "Search Available Lots" });
  expect(button).toHaveClass("bg-amber", "test-hook");
});
