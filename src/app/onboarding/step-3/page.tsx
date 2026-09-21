"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Chip from "@/components/chip";

import OnboardSearchField from "../_common/_components/OnboardSearchField";
import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { useGetPopularBrands } from "./_hooks/useGetPopularBrands";

/** 검색어가 없을 때 노출할 인기 브랜드 개수 */
const POPULAR_COUNT = 12;

export default function OnboardStep3Page() {
  const router = useRouter();
  const { brands: selectedBrands, toggleBrand } = useOnboardingStore();
  const [query, setQuery] = useState("");

  const { brands, isPopularBrandsPending } = useGetPopularBrands();

  const handleNext = () => {
    router.push("/onboarding/step-4");
  };

  const filtered = query
    ? brands.filter(({ brand }) => brand.toLowerCase().includes(query.toLowerCase()))
    : brands.slice(0, POPULAR_COUNT);

  return (
    <OnboardShell
      step={2}
      total={4}
      eyebrow="향수 취향 2/3"
      title={"선호하는 브랜드를\n선택해주세요"}
      backHref="/onboarding/step-2"
      onNext={handleNext}
      nextDisabled={selectedBrands.length === 0}
    >
      <OnboardSearchField
        value={query}
        onChange={setQuery}
        placeholder="브랜드명을 검색해주세요"
      />

      {!query && (
        <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[1.2px] text-muted">
          Popular
        </p>
      )}

      <div className="flex flex-wrap gap-2 pb-4">
        {isPopularBrandsPending && (
          <p className="w-full py-5 text-center font-sans text-xs text-muted">
            불러오는 중이에요
          </p>
        )}

        {!isPopularBrandsPending && filtered.length === 0 && (
          <p className="w-full py-5 text-center font-sans text-xs text-muted">
            검색 결과가 없어요
          </p>
        )}

        {!isPopularBrandsPending &&
          filtered.map(({ brand }) => (
            <Chip
              key={brand}
              label={brand}
              selected={selectedBrands.includes(brand)}
              onClick={() => toggleBrand(brand)}
            />
          ))}
      </div>
    </OnboardShell>
  );
}
