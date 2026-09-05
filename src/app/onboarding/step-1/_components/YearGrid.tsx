"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

type YearGridProps = {
  minYear: number;
  maxYear: number;
  viewYear: number;
  onSelect: (year: number) => void;
};

function YearGrid({ minYear, maxYear, viewYear, onSelect }: YearGridProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  // 연도가 100개 넘게 있어서, 열자마자 선택된 연도가 보이도록 스크롤을 맞춘다
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );

  return (
    <div className="grid max-h-[212px] grid-cols-4 gap-1 overflow-y-auto">
      {years.map((year) => {
        const selected = year === viewYear;
        return (
          <button
            key={year}
            ref={selected ? selectedRef : undefined}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(year)}
            className={cn(
              "cursor-pointer rounded-lg py-2 font-sans text-[13px] transition-colors",
              selected
                ? "bg-rose font-semibold text-white"
                : "text-charcoal hover:bg-ivory-200",
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

export default YearGrid;
