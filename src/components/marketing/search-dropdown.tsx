"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export interface SearchDropdownOption {
  value: string;
  label: string;
}

interface SearchDropdownProps {
  id: string;
  name: string;
  placeholder: string;
  listboxLabel: string;
  options: readonly SearchDropdownOption[];
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  initialActiveIndex?: number;
  scrollable?: boolean;
}

export function SearchDropdown({
  id,
  name,
  placeholder,
  listboxLabel,
  options,
  className,
  dropdownClassName,
  optionClassName,
  initialActiveIndex = 0,
  scrollable = false,
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = `${id}-listbox`;
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    optionRefs.current[activeIndex]?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeIndex, isOpen]);

  function openDropdown(index = initialActiveIndex) {
    setActiveIndex(index);
    setIsOpen(true);
  }

  function closeDropdown() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDropdown(selectedIndex >= 0 ? selectedIndex : initialActiveIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown(selectedIndex >= 0 ? selectedIndex : options.length - 1);
    }
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index + direction + options.length) % options.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0", isOpen ? "z-40" : "z-30")}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        name={name}
        value={selectedValue}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen ? `${id}-option-${activeIndex}` : undefined
        }
        onClick={() =>
          isOpen
            ? closeDropdown()
            : openDropdown(
                selectedIndex >= 0 ? selectedIndex : initialActiveIndex,
              )
        }
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          className,
          "flex w-full cursor-pointer items-center justify-between gap-2 text-left",
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
        <ChevronDown
          data-select-indicator
          aria-hidden="true"
          className={cn(
            "pointer-events-none size-4 shrink-0 text-warm-gray transition-transform",
            isOpen && "rotate-180",
          )}
          strokeWidth={1.75}
        />
      </button>

      {isOpen ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label={listboxLabel}
          className={cn(
            "absolute top-[calc(100%+8px)] left-0 z-50 w-full rounded-sm border border-white/10 bg-warm-gray py-2 shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
            scrollable
              ? "search-dropdown-scrollbar max-h-[276px] overflow-y-auto"
              : "overflow-clip",
            dropdownClassName,
          )}
        >
          {options.map((option, index) => {
            const isActive = index === activeIndex;
            const isSelected = option.value === selectedValue;

            return (
              <button
                key={option.value}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                id={`${id}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onClick={() => {
                  setSelectedValue(option.value);
                  closeDropdown();
                }}
                className={cn(
                  "flex w-full cursor-pointer px-4 text-left text-base leading-normal text-dropdown-ink transition-colors outline-none",
                  optionClassName,
                  isActive && "bg-dropdown-active text-white",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
