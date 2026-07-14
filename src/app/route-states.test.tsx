import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import ErrorState from "./error";
import GlobalError from "./global-error";
import Loading from "./loading";
import NotFound from "./not-found";

it("announces loading status", () => {
  render(<Loading />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading TRUX parking");
});

it("renders an accessible not-found heading", () => {
  render(<NotFound />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeInTheDocument();
});

it("offers a safe reset action without exposing route error details", () => {
  const reset = vi.fn();
  const error = new Error("sensitive route failure");

  render(<ErrorState error={error} reset={reset} />);

  expect(
    screen.getByRole("heading", { level: 1, name: "We hit a roadblock" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(/sensitive route failure/i),
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(reset).toHaveBeenCalledOnce();
});

it("renders a safe global error document", () => {
  const markup = renderToStaticMarkup(
    <GlobalError
      error={new Error("sensitive global failure")}
      reset={() => undefined}
    />,
  );

  expect(markup).toContain('<html lang="en">');
  expect(markup).toContain("Something went wrong");
  expect(markup).toContain("Try again");
  expect(markup).not.toContain("sensitive global failure");
});
