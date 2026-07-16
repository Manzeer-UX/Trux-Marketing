import * as locationsContent from "./locations-content";

const { locationStates } = locationsContent;

it("stores the static Figma location snapshot in display order", () => {
  expect(
    locationStates.map(({ id, name, count, locations }) => ({
      id,
      name,
      count,
      previewCount: locations.length,
    })),
  ).toEqual([
    { id: "arkansas", name: "Arkansas", count: 2, previewCount: 2 },
    { id: "alabama", name: "Alabama", count: 3, previewCount: 3 },
    { id: "georgia", name: "Georgia", count: 34, previewCount: 13 },
    { id: "california", name: "California", count: 9, previewCount: 9 },
  ]);

  expect(locationStates[2].locations[0]).toEqual({
    id: "georgia-location-1",
    name: "Georgia Parking Lot #1",
    address: "17707 NW Miami Ct, Atlanta, GA 33169",
    rating: 4.8,
    spots: 30,
    nightlyRate: 18,
  });

  expect(locationStates.map((state) => state.locations[0]?.address)).toEqual([
    "1200 Interstate Dr, Little Rock, AR 72209",
    "2800 Industrial Pkwy, Birmingham, AL 35217",
    "17707 NW Miami Ct, Atlanta, GA 33169",
    "4100 Logistics Way, Ontario, CA 91761",
  ]);
  expect(
    locationStates.flatMap((state) =>
      state.locations.map((location) => location.address),
    ),
  ).not.toContain("Address details available soon");
});

it("stores the static map locations needed by the details routes", () => {
  expect(locationsContent).toMatchObject({
    mapLocationDetails: [
      expect.objectContaining({
        id: "georgia-atlanta",
        title: "Atlanta, GA Truck and Trailer Parking on 1345 M-52",
        address: "1345 M-52, Atlanta, GA 33169",
        nightlyRate: 18,
        spots: 2,
      }),
      expect.objectContaining({ id: "west-atlanta" }),
      expect.objectContaining({ id: "south-atlanta" }),
    ],
  });
});
