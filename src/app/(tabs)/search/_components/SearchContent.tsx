"use client";

import Link from "next/link";
import { useState } from "react";

import Chip from "@/components/chip";
import PerfumeCard from "@/components/perfume-card";
import { useAppStore } from "@/hooks/useAppStore";
import type { PerfumeSummaryT, PerfumeT } from "@/types/perfume";

import SearchBar from "./SearchBar";
import SortTabs from "./SortTabs";
import { useDebouncedValue } from "../_hooks/useDebouncedValue";
import { useGetPerfumeSearch } from "../_hooks/useGetPerfumeSearch";
import {
  SEARCH_FAMILY_FILTERS,
  SEARCH_FAMILY_TO_CATEGORY,
  SEARCH_SORT_OPTIONS,
  SEARCH_SORT_TO_PARAM,
  SEARCH_UNSUPPORTED_SORTS,
} from "../_consts/search.const";
import type { SearchFamilyFilterT, SearchSortOptionT } from "../_consts/search.const";

const toPerfumeCardItem = (item: PerfumeSummaryT): PerfumeT => ({
  id: item.perfume_id,
  name: item.name,
  brand: item.brand,
  brandKr: item.brand,
  price: "",
  img: item.image_url ?? undefined,
});

function SearchContent() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFamilyFilterT>("전체");
  const [sort, setSort] = useState<SearchSortOptionT>(SEARCH_SORT_OPTIONS[0]);
  const debouncedQuery = useDebouncedValue(query, 300);
  const { likes, toggleLike } = useAppStore();

  const category = filter === "전체" ? undefined : SEARCH_FAMILY_TO_CATEGORY[filter];

  const {
    perfumes,
    total,
    isPerfumeSearchPending,
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
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2.5">
          {SEARCH_FAMILY_FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={filter === f}
              onClick={() => setFilter(f)}
              size="sm"
            />
          ))}
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
                      liked={likes.includes(perfume.id)}
                      onLike={toggleLike}
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
    </>
  );
}

export default SearchContent;
