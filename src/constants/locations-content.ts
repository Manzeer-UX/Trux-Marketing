export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  rating: number;
  spots: number;
  nightlyRate: number;
}

export interface LocationState {
  id: string;
  name: string;
  count: number;
  locations: readonly ParkingLocation[];
}

export interface MapLocationDetails {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapName: string;
  cardAddress: string;
  mapSpots: number;
  title: string;
  address: string;
  managedBy: string;
  nightlyRate: number;
  spots: number;
  checkInDate: string;
  checkOutDate: string;
}

const createStaticLocations = (
  stateId: string,
  stateName: string,
  previewCount: number,
  address: string,
): readonly ParkingLocation[] =>
  Array.from({ length: previewCount }, (_, index) => ({
    id: `${stateId}-location-${index + 1}`,
    name: `${stateName} Parking Lot #1`,
    address,
    rating: 4.8,
    spots: 30,
    nightlyRate: 18,
  }));

export const locationStates = [
  {
    id: "arkansas",
    name: "Arkansas",
    count: 2,
    locations: createStaticLocations(
      "arkansas",
      "Arkansas",
      2,
      "1200 Interstate Dr, Little Rock, AR 72209",
    ),
  },
  {
    id: "alabama",
    name: "Alabama",
    count: 3,
    locations: createStaticLocations(
      "alabama",
      "Alabama",
      3,
      "2800 Industrial Pkwy, Birmingham, AL 35217",
    ),
  },
  {
    id: "georgia",
    name: "Georgia",
    count: 34,
    locations: createStaticLocations(
      "georgia",
      "Georgia",
      13,
      "17707 NW Miami Ct, Atlanta, GA 33169",
    ),
  },
  {
    id: "california",
    name: "California",
    count: 9,
    locations: createStaticLocations(
      "california",
      "California",
      9,
      "4100 Logistics Way, Ontario, CA 91761",
    ),
  },
] as const satisfies readonly LocationState[];

export const mapLocationDetails = [
  {
    id: "georgia-atlanta",
    coordinates: { lat: 33.749, lng: -84.388 },
    mapName: "Georgia Parking Lot #1",
    cardAddress: "17707 NW Miami Ct, Atlanta, GA 33169",
    mapSpots: 14,
    title: "Atlanta, GA Truck and Trailer Parking on 1345 M-52",
    address: "1345 M-52, Atlanta, GA 33169",
    managedBy: "Lot Owner Company",
    nightlyRate: 18,
    spots: 2,
    checkInDate: "2027-07-07",
    checkOutDate: "2027-07-08",
  },
  {
    id: "west-atlanta",
    coordinates: { lat: 33.78, lng: -84.445 },
    mapName: "West Atlanta Parking Lot",
    cardAddress: "1800 Marietta Blvd NW, Atlanta, GA 30318",
    mapSpots: 8,
    title: "West Atlanta Truck and Trailer Parking on Marietta Blvd",
    address: "1800 Marietta Blvd NW, Atlanta, GA 30318",
    managedBy: "Lot Owner Company",
    nightlyRate: 18,
    spots: 2,
    checkInDate: "2027-07-07",
    checkOutDate: "2027-07-08",
  },
  {
    id: "south-atlanta",
    coordinates: { lat: 33.7, lng: -84.365 },
    mapName: "South Atlanta Parking Lot",
    cardAddress: "2600 Moreland Ave SE, Atlanta, GA 30315",
    mapSpots: 10,
    title: "South Atlanta Truck and Trailer Parking on Moreland Ave",
    address: "2600 Moreland Ave SE, Atlanta, GA 30315",
    managedBy: "Lot Owner Company",
    nightlyRate: 18,
    spots: 2,
    checkInDate: "2027-07-07",
    checkOutDate: "2027-07-08",
  },
] as const satisfies readonly MapLocationDetails[];

export function getMapLocationDetails(locationId: string) {
  return mapLocationDetails.find((location) => location.id === locationId);
}
