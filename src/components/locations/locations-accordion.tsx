"use client";

import { ChevronDown, Search } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useState } from "react";
import { LocationCard } from "@/components/locations/location-card";
import {
  locationStates,
  type ParkingLocation,
} from "@/constants/locations-content";

type StateId = (typeof locationStates)[number]["id"];
type FilteredLocationState = {
  id: StateId;
  name: string;
  count: number;
  locations: readonly ParkingLocation[];
};

function filterLocationStates(query: string): readonly FilteredLocationState[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return locationStates;
  }

  return locationStates.flatMap((state) => {
    const stateMatches = state.name
      .toLocaleLowerCase()
      .includes(normalizedQuery);
    const matchingLocations = stateMatches
      ? state.locations
      : state.locations.filter((location) =>
          `${location.name} ${location.address}`
            .toLocaleLowerCase()
            .includes(normalizedQuery),
        );

    return matchingLocations.length
      ? [{ ...state, locations: matchingLocations }]
      : [];
  });
}

export function LocationsAccordion() {
  const [openStateId, setOpenStateId] = useState<StateId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const filteredStates = filterLocationStates(submittedQuery);
  const isSearchDisabled = !searchQuery.trim();

  function submitSearchQuery() {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    const matches = filterLocationStates(trimmedQuery);
    setSubmittedQuery(trimmedQuery);

    if (matches[0]) {
      setOpenStateId(matches[0].id);
    }
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSearchQuery();
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    submitSearchQuery();
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);

    if (!value.trim() && submittedQuery) {
      setSubmittedQuery("");
      setOpenStateId(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        role="search"
        onSubmit={handleSearchSubmit}
        className="flex min-h-[72px] items-end gap-3 overflow-hidden rounded-[6px] bg-midnight px-4 py-2 shadow-lg"
      >
        <label
          htmlFor="location-search"
          className="flex min-w-0 flex-1 flex-col text-xs leading-4 font-semibold text-warm-gray uppercase"
        >
          Find parking near
          <input
            id="location-search"
            type="search"
            value={searchQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="City, state, or zip code"
            className="mt-1 h-6 min-w-0 appearance-none bg-transparent text-base leading-6 font-normal text-white normal-case outline-none placeholder:text-warm-gray focus-visible:placeholder:text-muted"
          />
        </label>
        <button
          type="submit"
          disabled={isSearchDisabled}
          className="mb-1 flex h-7 shrink-0 items-center gap-1 rounded-full bg-amber px-3.5 text-xs leading-4 font-semibold text-midnight transition-colors hover:bg-amber/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber"
        >
          <Search aria-hidden="true" className="size-3.5" strokeWidth={2} />
          Search
        </button>
      </form>

      {filteredStates.length ? (
        filteredStates.map((state) => {
          const isOpen = state.id === openStateId;
          const buttonId = `location-state-${state.id}-button`;
          const panelId = `location-state-${state.id}-panel`;

          return (
            <section
              key={state.id}
              className={`rounded-md bg-card wide:ml-1.5 wide:mr-2 ${
                isOpen ? "border border-white/10 p-4" : ""
              }`}
            >
              <h2>
                <button
                  id={buttonId}
                  type="button"
                  aria-label={`${state.name}, ${state.count} Locations`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenStateId((currentStateId) =>
                      currentStateId === state.id ? null : state.id,
                    )
                  }
                  className={`flex w-full items-center justify-between gap-4 text-left text-white transition-colors hover:text-amber focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${
                    isOpen ? "min-h-6" : "min-h-14 px-4 py-4"
                  }`}
                >
                  <span className="flex min-w-0 items-baseline gap-2">
                    <span className="text-base leading-6 font-bold">
                      {state.name}
                    </span>
                    <span className="truncate text-sm leading-5 font-normal text-muted">
                      {state.count} Locations
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-6 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
              </h2>

              {isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-label={state.name}
                  className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  {state.locations.map((location, index) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isHighlighted={index === 0}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })
      ) : (
        <div
          role="status"
          className="rounded-md border border-white/10 bg-card px-6 py-10 text-center text-sm leading-5 text-muted wide:ml-1.5 wide:mr-2"
        >
          No locations found. Try another city, state, or ZIP code.
        </div>
      )}
    </div>
  );
}
