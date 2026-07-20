import { fireEvent, render, screen } from "@testing-library/react";
import { CookieRibbon } from "./cookie-ribbon";

const storageKey = "trux-cookie-consent";

beforeEach(() => {
  window.localStorage.clear();
});

it("shows the cookie ribbon when analytics have not been accepted", async () => {
  render(<CookieRibbon />);

  expect(
    await screen.findByText(/We use essential cookies to operate this site/i),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Essential Only" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Accept Analytics" }),
  ).toBeInTheDocument();
});

it("persists acceptance and does not show again after analytics are accepted", async () => {
  const { rerender } = render(<CookieRibbon />);

  fireEvent.click(
    await screen.findByRole("button", { name: "Accept Analytics" }),
  );

  expect(window.localStorage.getItem(storageKey)).toBe("analytics");
  expect(
    screen.queryByText(/We use essential cookies to operate this site/i),
  ).not.toBeInTheDocument();

  rerender(<CookieRibbon />);

  expect(
    screen.queryByText(/We use essential cookies to operate this site/i),
  ).not.toBeInTheDocument();
});

it("hides for the current visit when essential only is selected without persisting acceptance", async () => {
  const { unmount } = render(<CookieRibbon />);

  fireEvent.click(await screen.findByRole("button", { name: "Essential Only" }));

  expect(window.localStorage.getItem(storageKey)).toBeNull();
  expect(
    screen.queryByText(/We use essential cookies to operate this site/i),
  ).not.toBeInTheDocument();

  unmount();
  render(<CookieRibbon />);

  expect(
    await screen.findByText(/We use essential cookies to operate this site/i),
  ).toBeInTheDocument();
});
