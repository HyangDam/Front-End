"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Chip from "@/components/chip";
import PerfumeCard from "@/components/perfume-card";
import { useAppStore } from "@/hooks/useAppStore";
import { PERFUMES } from "@/mocks/perfume";

import SearchBar from "./_components/SearchBar";
import SortTabs from "./_components/SortTabs";
import { SEARCH_FAMILY_FILTERS } from "./_consts/search.const";
import type { SearchFamilyFilterT, SearchSortOptionT } from "./_consts/search.const";

const parsePrice = (price: string) => Number(price.replace(/[^0-9]/g, ""));

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFamilyFilterT>("전체");
  const [sort, setSort] = useState<SearchSortOptionT>("인기순");
  const { likes, toggleLike } = useAppStore();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = PERFUMES.filter((perfume) => {
      const matchQuery =
        q === "" ||
        perfume.name.toLowerCase().includes(q) ||
        perfume.brandKr.includes(q) ||
        perfume.brand.toLowerCase().includes(q);
      const matchFilter =
        filter === "전체" || (perfume.familyNames ?? []).includes(filter);
      return matchQuery && matchFilter;
    });

    if (sort === "최신순") filtered = [...filtered].reverse();
    else if (sort === "가격순")
      filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return filtered;
  }, [query, filter, sort]);

  return (
    <div>
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
        <SortTabs resultCount={results.length} sort={sort} onChange={setSort} />
      </div>

      <div className="px-3.5 py-3">
        {results.length === 0 ? (
          <p className="py-14 text-center font-sans text-[13px] text-muted">
            검색 결과가 없어요
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {results.map((perfume) => (
              <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                <PerfumeCard
                  perfume={perfume}
                  variant="compact"
                  liked={likes.includes(perfume.id)}
                  onLike={toggleLike}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
