"use client";

import { useRouter } from "next/navigation";

import Chip from "@/components/chip";

import OnboardShell from "../_common/_components/OnboardShell";
import { useOnboardingStore } from "../_common/_hooks/useOnboardingStore";
import { GENDER_OPTIONS } from "./_consts/genderOptions.const";

const MIN_BIRTH_DATE = "1900-01-01";

export default function OnboardStep1Page() {
  const router = useRouter();
  const { gender, birthDate, setGender, setBirthDate } = useOnboardingStore();

  const handleNext = () => {
    router.push("/onboarding/step-2");
  };

  const today = new Date().toISOString().slice(0, 10);
  const isBirthDateValid = birthDate >= MIN_BIRTH_DATE && birthDate <= today;

  return (
    <OnboardShell
      step={0}
      total={4}
      eyebrow="나를 소개할게요"
      title={"생년월일과 성별을\n입력해주세요"}
      backHref="/login"
      onNext={handleNext}
      nextDisabled={!gender || !isBirthDateValid}
    >
      <div className="mb-8">
        <p className="mb-3.5 font-sans text-[11px] tracking-[0.5px] text-muted">성별</p>
        <div className="flex gap-2.5">
          {GENDER_OPTIONS.map(({ value, label }) => (
            <Chip
              key={value}
              label={label}
              selected={gender === value}
              onClick={() => setGender(value)}
            />
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="birth-date"
          className="mb-2.5 block font-sans text-[11px] tracking-[0.5px] text-muted"
        >
          생년월일
        </label>
        <input
          id="birth-date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          min={MIN_BIRTH_DATE}
          max={today}
          className="w-full border-0 border-b-[1.5px] border-border bg-transparent py-1.5 font-serif text-[22px] text-charcoal outline-none"
        />
      </div>
    </OnboardShell>
  );
}
