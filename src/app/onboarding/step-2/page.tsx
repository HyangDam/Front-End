"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Chip from "@/components/common/chip";

import OnboardSearchField from "../_common/_components/OnboardSearchField";
import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { CURRENT_PERFUME_OPTIONS } from "./_consts/currentPerfumeOptions.const";

export default function OnboardStep2Page() {
  const router = useRouter();
  const { currentPerfumes, toggleCurrentPerfume } = useOnboardingStore();
  const [query, setQuery] = useState("");

  const popular = CURRENT_PERFUME_OPTIONS.slice(0, 8);
  const filtered = query
    ? CURRENT_PERFUME_OPTIONS.filter((name) => name.includes(query))
    : popular;

  const handleNext = () => {
    router.push("/onboarding/step-3");
  };

  return (
    <OnboardShell
      step={1}
      total={4}
      eyebrow="향수 취향 1/3"
      title={"지금 사용하는\n향수를 알려주세요"}
      subtitle="없다면 건너뛰어도 괜찮아요"
      backHref="/onboarding/step-1"
      onNext={handleNext}
    >
      <OnboardSearchField
        value={query}
        onChange={setQuery}
        placeholder="향수명을 검색해주세요"
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
              selected={currentPerfumes.includes(name)}
              onClick={() => toggleCurrentPerfume(name)}
            />
          ))
        )}
      </div>
    </OnboardShell>
  );
}
