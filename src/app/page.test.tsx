import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the TRUX driver page landmark", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("main", { name: "TRUX driver parking" }),
  ).toBeInTheDocument();
});
