export interface LocationState {
  name: string;
  count: number;
}

export interface LocationRegion {
  id: string;
  name: string;
  states: readonly LocationState[];
}

export const locationRegions = [
  {
    id: "southeast",
    name: "Southeast",
    states: [
      { name: "Florida", count: 6 },
      { name: "Georgia", count: 34 },
      { name: "Mississippi", count: 2 },
      { name: "Tennessee", count: 3 },
      { name: "North Carolina", count: 10 },
      { name: "Alabama", count: 3 },
      { name: "South Carolina", count: 7 },
      { name: "Arkansas", count: 2 },
    ],
  },
  {
    id: "southwest",
    name: "Southwest",
    states: [
      { name: "Oklahoma", count: 2 },
      { name: "Texas", count: 11 },
      { name: "Arkansas", count: 2 },
      { name: "Mississippi", count: 2 },
      { name: "Tennessee", count: 3 },
    ],
  },
  {
    id: "northeast",
    name: "Northeast",
    states: [{ name: "Pennsylvania", count: 1 }],
  },
  {
    id: "midwest",
    name: "Midwest",
    states: [
      { name: "Ohio", count: 4 },
      { name: "Missouri", count: 4 },
      { name: "Iowa", count: 1 },
      { name: "Minnesota", count: 3 },
    ],
  },
  {
    id: "northwest",
    name: "Northwest",
    states: [
      { name: "Idaho", count: 3 },
      { name: "Oregon", count: 1 },
    ],
  },
  {
    id: "west",
    name: "West",
    states: [
      { name: "California", count: 9 },
      { name: "Arizona", count: 1 },
      { name: "Nevada", count: 2 },
      { name: "Washington", count: 1 },
    ],
  },
] as const satisfies readonly LocationRegion[];
