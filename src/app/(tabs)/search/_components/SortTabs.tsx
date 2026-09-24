"use client";

import { SEARCH_SORT_OPTIONS } from "../_consts/search.const";
import type { SearchSortOptionT } from "../_consts/search.const";

type SortTabsProps = {
  resultCount: number;
  sort: SearchSortOptionT;
  onChange: (sort: SearchSortOptionT) => void;
  disabledOptions?: readonly SearchSortOptionT[];
};

function SortTabs({ resultCount, sort, onChange, disabledOptions = [] }: SortTabsProps) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5">
      <span className="font-sans text-[11px] text-muted">{resultCount}개의 향수</span>
      <div className="flex gap-3">
        {SEARCH_SORT_OPTIONS.map((option) => {
          const isDisabled = disabledOptions.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={isDisabled ? undefined : () => onChange(option)}
              disabled={isDisabled}
              title={isDisabled ? "준비 중인 기능이에요" : undefined}
              className={`border-b-[1.5px] bg-transparent pb-0.5 font-sans text-[11px] ${
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${
                sort === option
                  ? "border-charcoal font-bold text-charcoal"
                  : "border-transparent font-normal text-muted"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SortTabs;
