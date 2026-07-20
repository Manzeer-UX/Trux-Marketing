import { render, screen } from "@testing-library/react";
import { ManagedImage } from "./managed-image";

const cmsImage = {
  image: {
    asset: {
      _id: "image-example-800x600-png",
      url: "https://cdn.sanity.io/images/aibxkdr2/marketing_insights123/example-800x600.png",
      metadata: {
        lqip: "data:image/jpeg;base64,preview",
        dimensions: { width: 800, height: 600 },
      },
    },
  },
  alt: "Editor supplied description",
  caption: null,
};

it("renders the existing local fallback when Sanity is empty", () => {
  render(
    <ManagedImage
      value={null}
      fallbackSrc="/assets/trux-logo.svg"
      fallbackAlt="TRUX Parking"
      width={80}
      height={20}
    />,
  );

  expect(screen.getByRole("img", { name: "TRUX Parking" })).toHaveAttribute(
    "src",
    expect.stringContaining("trux-logo.svg"),
  );
});

it("renders the Sanity asset and editor supplied alt text", () => {
  render(
    <ManagedImage
      value={cmsImage}
      fallbackSrc="/assets/fallback.png"
      fallbackAlt="Fallback"
      width={400}
      height={300}
    />,
  );

  const image = screen.getByRole("img", {
    name: "Editor supplied description",
  });
  expect(image).toHaveAttribute("src", expect.stringContaining("cdn.sanity.io"));
});

it("forces empty alt text for known decorative slots", () => {
  const { container } = render(
    <ManagedImage
      value={cmsImage}
      fallbackSrc="/assets/social-facebook.svg"
      fallbackAlt=""
      decorative
      width={24}
      height={24}
    />,
  );

  expect(container.querySelector("img")).toHaveAttribute("alt", "");
});
