"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Chip from "@/components/common/chip";

import OnboardSearchField from "../_common/_components/OnboardSearchField";
import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { BRAND_OPTIONS, POPULAR_BRAND_OPTIONS } from "./_consts/brandOptions.const";

export default function OnboardStep3Page() {
  const router = useRouter();
  const { brands, toggleBrand } = useOnboardingStore();
  const [query, setQuery] = useState("");

  const filtered = query
    ? BRAND_OPTIONS.filter((name) => name.includes(query))
    : POPULAR_BRAND_OPTIONS;

  const handleNext = () => {
    router.push("/onboarding/step-4");
  };

  return (
    <OnboardShell
      step={2}
      total={4}
      eyebrow="향수 취향 2/3"
      title={"선호하는 브랜드를\n선택해주세요"}
      backHref="/onboarding/step-2"
      onNext={handleNext}
      nextDisabled={brands.length === 0}
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
        {filtered.length === 0 ? (
          <p className="w-full py-5 text-center font-sans text-xs text-muted">
            검색 결과가 없어요
          </p>
        ) : (
          filtered.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={brands.includes(name)}
              onClick={() => toggleBrand(name)}
            />
          ))
        )}
      </div>
    </OnboardShell>
  );
}
