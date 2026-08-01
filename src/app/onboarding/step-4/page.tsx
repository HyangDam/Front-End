"use client";

import { useRouter } from "next/navigation";

import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { SCENT_OPTIONS } from "./_consts/scentOptions.const";

export default function OnboardStep4Page() {
  const router = useRouter();
  const { scents, toggleScent } = useOnboardingStore();

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
      <div className="grid grid-cols-2 gap-2.5 pb-4">
        {SCENT_OPTIONS.map(({ label, emoji }) => {
          const selected = scents.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleScent(label)}
              className={`flex cursor-pointer items-center gap-2 rounded-[14px] px-3 py-3.5 font-sans text-[13px] transition-colors ${
                selected
                  ? "border-[1.5px] border-rose bg-rose font-semibold text-white"
                  : "border border-border-dark bg-transparent font-normal text-charcoal"
              }`}
            >
              <span className="text-lg">{emoji}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </OnboardShell>
  );
}
