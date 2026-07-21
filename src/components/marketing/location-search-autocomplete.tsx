"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

const locationKeywordOptions = [
  {
    value: "Atlanta, GA",
    aliases: ["atlanta", "ga", "georgia", "33169", "midtown atlanta"],
  },
  {
    value: "Birmingham, AL",
    aliases: ["birmingham", "al", "alabama", "35217", "birmingham al"],
  },
  {
    value: "Little Rock, AR",
    aliases: ["little rock", "ar", "arkansas", "72209", "northeast little rock"],
  },
  {
    value: "Ontario, CA",
    aliases: ["ontario", "ca", "california", "91761", "central ontario"],
  },
  {
    value: "South Atlanta, GA",
    aliases: ["south atlanta", "south atlanta ga", "30315", "moreland"],
  },
  {
    value: "West Atlanta, GA",
    aliases: ["west atlanta", "west atlanta ga", "30318", "marietta"],
  },
] as const satisfies readonly {
  readonly value: string;
  readonly aliases: readonly string[];
}[];

interface LocationSearchAutocompleteProps {
  id: string;
  name: string;
  placeholder: string;
  className?: string;
}

export function LocationSearchAutocomplete({
  id,
  name,
  placeholder,
  className,
}: LocationSearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) {
      return [] as string[];
    }

    return locationKeywordOptions
      .filter((option) => {
        const haystack = `${option.value} ${option.aliases.join(" ")}`.toLocaleLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .map((option) => option.value);
  }, [normalizedQuery]);

  const hasSuggestions = filteredOptions.length > 0;

  useEffect(() => {
    if (!isOpen || !hasSuggestions) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [hasSuggestions, isOpen]);

  useEffect(() => {
    if (activeIndex >= filteredOptions.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, filteredOptions.length]);

  function selectOption(option: string) {
    setQuery(option);
    setIsOpen(false);
  }

  function handleInputChange(value: string) {
    setQuery(value);
    setIsOpen(true);
    setActiveIndex(0);
  }

  function handleInputFocus() {
    if (normalizedQuery) {
      setIsOpen(true);
    }
  }

  function handleInputBlur() {
    setTimeout(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!hasSuggestions) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % filteredOptions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(
        (current) => (current - 1 + filteredOptions.length) % filteredOptions.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex] ?? query);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0", isOpen ? "z-40" : "z-30")}
    >
      <input
        ref={inputRef}
        id={id}
        type="text"
        name={name}
        value={query}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        aria-controls={hasSuggestions ? `${id}-listbox` : undefined}
        aria-autocomplete="list"
        aria-expanded={isOpen && hasSuggestions}
        aria-haspopup={hasSuggestions ? "listbox" : false}
        autoComplete="off"
        className={cn(className, "w-full")}
      />

      {isOpen && filteredOptions.length > 0 ? (
        <div
          id={`${id}-listbox`}
          role="listbox"
          aria-label="Location suggestions"
          className="search-dropdown-scrollbar absolute top-[calc(100%+8px)] left-0 z-50 w-full overflow-y-auto rounded-sm border border-white/10 bg-warm-gray py-2 shadow-[0_4px_16px_rgba(0,0,0,0.3)] max-h-[276px]"
        >
          {filteredOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              role="option"
              id={`${id}-option-${index}`}
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                selectOption(option);
              }}
              onClick={() => selectOption(option)}
              className={cn(
                "flex w-full cursor-pointer px-4 py-2.5 text-left text-base leading-normal text-dropdown-ink transition-colors outline-none border-b border-white/[0.06] last:border-b-0",
                index === activeIndex && "bg-dropdown-active text-white",
                index === activeIndex ? null : "hover:bg-dropdown-active/70 hover:text-white",
              )}
              onFocus={() => setActiveIndex(index)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {isOpen && query.trim().length > 0 && !filteredOptions.length ? (
        <div
          role="status"
          className="absolute top-[calc(100%+8px)] left-0 z-50 w-full rounded-sm border border-white/10 bg-warm-gray px-4 py-2 text-sm leading-5 text-dropdown-ink shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          No matching parking locations found.
        </div>
      ) : null}
    </div>
  );
}
