"use client";

import { useRouter } from "next/navigation";

import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { DEFAULT_SCENT_EMOJI, SCENT_EMOJI } from "./_consts/scentEmoji.const";
import { useGetCategories } from "./_hooks/useGetCategories";

export default function OnboardStep4Page() {
  const router = useRouter();
  const { scents, toggleScent } = useOnboardingStore();
  const { categories, isCategoriesPending } = useGetCategories("note_family");

  const handleNext = () => {
    router.push("/loading");
  };

  return (
    <OnboardShell
      step={3}
      total={4}
      eyebrow="향수 취향 3/3"
      title={"선호하는 향을\n선택해주세요"}
      subtitle="여러 개 선택할수록 더 정확해요"
      backHref="/onboarding/step-3"
      onNext={handleNext}
      nextDisabled={scents.length === 0}
      nextLabel="분석 시작"
    >
      {isCategoriesPending ? (
        <p className="py-5 text-center font-sans text-xs text-muted">불러오는 중이에요</p>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 pb-4">
          {categories.map(({ id, label }) => {
            const selected = scents.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleScent(id)}
                aria-pressed={selected}
                className={`flex cursor-pointer items-center gap-2 rounded-[14px] px-3 py-3.5 font-sans text-[13px] transition-colors ${
                  selected
                    ? "border-[1.5px] border-rose bg-rose font-semibold text-white"
                    : "border border-border-dark bg-transparent font-normal text-charcoal"
                }`}
              >
                <span className="text-lg">{SCENT_EMOJI[id] ?? DEFAULT_SCENT_EMOJI}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </OnboardShell>
  );
}
