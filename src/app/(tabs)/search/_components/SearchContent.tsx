"use client";

import Link from "next/link";
import { useState } from "react";

import Chip from "@/components/chip";
import PerfumeCard from "@/components/perfume-card";
import { useAppStore } from "@/hooks/useAppStore";
import type { PerfumeSearchItemT, PerfumeT } from "@/types/perfume";

import SearchBar from "./SearchBar";
import SortTabs from "./SortTabs";
import { useGetPerfumeSearch } from "../_apis/perfume";
import { useDebouncedValue } from "../_hooks/useDebouncedValue";
import { SEARCH_FAMILY_FILTERS, SEARCH_SORT_OPTIONS } from "../_consts/search.const";

const toPerfumeCardItem = (item: PerfumeSearchItemT): PerfumeT => ({
  id: item.perfume_id,
  name: item.name,
  brand: item.brand,
  brandKr: item.brand,
  price: "",
  img: item.image_url,
});

function SearchContent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const { likes, toggleLike } = useAppStore();

  const { perfumeSearchData, isPerfumeSearchLoading } =
    useGetPerfumeSearch(debouncedQuery);
  const results = perfumeSearchData?.results ?? [];

  return (
    <>
      <div className="sticky top-0 z-10 bg-ivory px-4 pt-3.5">
        <h1 className="mb-3.5 font-serif text-lg text-charcoal">탐색</h1>
        <SearchBar value={query} onChange={setQuery} />
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2.5">
          {SEARCH_FAMILY_FILTERS.map((f) => (
            <Chip key={f} label={f} selected={f === "전체"} size="sm" disabled />
          ))}
        </div>
        <SortTabs resultCount={results.length} sort={SEARCH_SORT_OPTIONS[0]} disabled />
      </div>

      <div className="px-3.5 py-3">
        {isPerfumeSearchLoading ? (
          <p className="py-14 text-center font-sans text-[13px] text-muted">
            불러오는 중...
          </p>
        ) : results.length === 0 ? (
          <p className="py-14 text-center font-sans text-[13px] text-muted">
            검색 결과가 없어요
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {results.map((item) => {
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
        )}
      </div>
    </>
  );
}

export default SearchContent;
