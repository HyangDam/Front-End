"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import PerfumeCard from "@/components/perfume-card";
import { usePerfumeLike } from "@/hooks/usePerfumeLike";
import type { PerfumeSummaryT, PerfumeT } from "@/types/perfume";
import { getPerfumeDisplay } from "@/utils/perfumeDisplay";

import CategoryFilterSheet from "./CategoryFilterSheet";
import SearchBar from "./SearchBar";
import SortTabs from "./SortTabs";
import { useDebouncedValue } from "../_hooks/useDebouncedValue";
import { useGetPerfumeSearch } from "../_hooks/useGetPerfumeSearch";
import {
  parseCategoryParam,
  SEARCH_FAMILY_TO_CATEGORY,
  SEARCH_SORT_OPTIONS,
  SEARCH_SORT_TO_PARAM,
  SEARCH_UNSUPPORTED_SORTS,
} from "../_consts/search.const";
import type {
  SearchNonAllFamilyFilterT,
  SearchSortOptionT,
} from "../_consts/search.const";

const toPerfumeCardItem = (item: PerfumeSummaryT): PerfumeT => {
  const display = getPerfumeDisplay(item);
  return {
    id: item.perfume_id,
    name: display.name,
    brand: display.brand,
    brandKr: display.brand,
    price: "",
    img: item.image_url ?? undefined,
  };
};

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchNonAllFamilyFilterT[]>(() =>
    parseCategoryParam(searchParams.get("category")),
  );
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [sort, setSort] = useState<SearchSortOptionT>(SEARCH_SORT_OPTIONS[0]);
  const debouncedQuery = useDebouncedValue(query, 300);
  const { isLiked, toggleLikeMutation } = usePerfumeLike();

  const category =
    filters.length === 0
      ? undefined
      : filters.map((f) => SEARCH_FAMILY_TO_CATEGORY[f]).join(",");

  const filterSummary =
    filters.length <= 2
      ? filters.join(" · ")
      : `${filters.slice(0, 2).join(" · ")} 외 ${filters.length - 2}개`;

  const handleApplyFilters = (nextFilters: SearchNonAllFamilyFilterT[]) => {
    setFilters(nextFilters);
    setIsFilterSheetOpen(false);
  };

  const {
    perfumes,
    total,
    isPerfumeSearchPending,
    isPerfumeSearchError,
    refetchPerfumeSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPerfumeSearch({
    keyword: debouncedQuery,
    category,
    sort: SEARCH_SORT_TO_PARAM[sort],
  });

  return (
    <>
      <div className="sticky top-0 z-10 bg-ivory px-4 pt-3.5">
        <h1 className="mb-3.5 font-serif text-lg text-charcoal">탐색</h1>
        <SearchBar value={query} onChange={setQuery} />
        <div className="flex items-center gap-1.5 pb-1.5">
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            aria-haspopup="dialog"
            className={`flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full border px-3.5 py-[7px] font-sans text-xs transition-colors ${
              filters.length > 0
                ? "border-rose bg-rose text-white"
                : "border-border-dark bg-transparent text-charcoal"
            }`}
          >
            향 계열
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke={filters.length > 0 ? "#ffffff" : "#191b1f"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {filters.length > 0 && (
            <p className="min-w-0 truncate font-sans text-[11px] text-charcoal">
              {filterSummary}
            </p>
          )}
        </div>
        <SortTabs
          resultCount={total}
          sort={sort}
          onChange={setSort}
          disabledOptions={SEARCH_UNSUPPORTED_SORTS}
        />
      </div>

      <div className="px-3.5 py-3">
        {isPerfumeSearchPending ? (
          <p className="py-14 text-center font-sans text-[13px] text-muted">
            불러오는 중...
          </p>
        ) : isPerfumeSearchError ? (
          <div className="flex flex-col items-center gap-3 py-14">
            <p className="font-sans text-[13px] text-muted">
              검색 결과를 불러오지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => refetchPerfumeSearch()}
              className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-sans text-[12px] text-charcoal"
            >
              다시 시도
            </button>
          </div>
        ) : perfumes.length === 0 ? (
          <p className="py-14 text-center font-sans text-[13px] text-muted">
            검색 결과가 없어요
          </p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              {perfumes.map((item) => {
                const perfume = toPerfumeCardItem(item);
                return (
                  <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                    <PerfumeCard
                      perfume={perfume}
                      variant="compact"
                      liked={isLiked(perfume.id)}
                      onLike={toggleLikeMutation}
                    />
                  </Link>
                );
              })}
            </div>
            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-4 w-full cursor-pointer rounded-full border border-border py-2.5 font-sans text-[13px] text-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
              </button>
            )}
          </>
        )}
      </div>

      {isFilterSheetOpen && (
        <CategoryFilterSheet
          selectedFilters={filters}
          onApply={handleApplyFilters}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}

export default SearchContent;
