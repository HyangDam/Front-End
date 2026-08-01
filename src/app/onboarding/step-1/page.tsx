"use client";

import { useRouter } from "next/navigation";

import Chip from "@/components/common/chip";

import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";

const GENDER_OPTIONS = ["여성", "남성"];

export default function OnboardStep1Page() {
  const router = useRouter();
  const { gender, age, setGender, setAge } = useOnboardingStore();

  const handleNext = () => {
    router.push("/onboarding/step-2");
  };

  const isAgeValid = Number.isInteger(Number(age)) && Number(age) > 0;

  return (
    <OnboardShell
      step={0}
      total={4}
      eyebrow="나를 소개할게요"
      title={"나이와 성별을\n입력해주세요"}
      backHref="/login"
      onNext={handleNext}
      nextDisabled={!gender || !isAgeValid}
    >
      <div className="mb-8">
        <p className="mb-3.5 font-sans text-[11px] tracking-[0.5px] text-muted">성별</p>
        <div className="flex gap-2.5">
          {GENDER_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={gender === option}
              onClick={() => setGender(option)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2.5 font-sans text-[11px] tracking-[0.5px] text-muted">나이</p>
        <div className="flex items-baseline gap-2">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="24"
            className="w-20 border-0 border-b-[1.5px] border-border bg-transparent py-1.5 text-center font-serif text-[28px] text-charcoal outline-none"
          />
          <span className="font-sans text-[15px] text-muted">세</span>
        </div>
      </div>
    </OnboardShell>
  );
}
