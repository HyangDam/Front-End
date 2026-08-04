"use client";

import { SEARCH_SORT_OPTIONS } from "../_consts/search.const";
import type { SearchSortOptionT } from "../_consts/search.const";

type SortTabsProps = {
  resultCount: number;
  sort: SearchSortOptionT;
  onChange: (sort: SearchSortOptionT) => void;
};

function SortTabs({ resultCount, sort, onChange }: SortTabsProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <span className="font-sans text-[11px] text-muted">{resultCount}개의 향수</span>
      <div className="flex gap-3">
        {SEARCH_SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`cursor-pointer border-b-[1.5px] bg-transparent pb-0.5 font-sans text-[11px] ${
              sort === option
                ? "border-charcoal font-bold text-charcoal"
                : "border-transparent font-normal text-muted"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortTabs;
