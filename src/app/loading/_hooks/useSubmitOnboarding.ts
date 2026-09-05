"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { postOnboardingPreferences } from "@/apis/onboarding";
import { patchMe } from "@/apis/user";

import { useOnboardingStore } from "../../onboarding/_common/_hooks/useOnboardingStore";
import type { OnboardingDraftT } from "../../onboarding/_common/_types/onboardingDraft";

/** 저장이 너무 빨리 끝나면 분석 화면이 깜빡이므로 최소 시간은 보여준다 */
const MIN_VISIBLE_MS = 1800;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const submitOnboarding = async (draft: OnboardingDraftT) => {
  const { gender, birthDate, currentPerfumes, brands, scents } = draft;

  // 프로필과 취향은 서로 독립적이라 함께 보낸다
  await Promise.all([
    patchMe({
      ...(gender ? { gender } : {}),
      ...(birthDate ? { birth_date: birthDate } : {}),
    }),
    postOnboardingPreferences({
      current_perfumes: currentPerfumes,
      selected_categories: scents,
      preferred_brands: brands,
    }),
    wait(MIN_VISIBLE_MS),
  ]);
};

export const useSubmitOnboarding = () => {
  const router = useRouter();
  const reset = useOnboardingStore((state) => state.reset);

  const {
    mutate: submitOnboardingMutation,
    isPending: isSubmitOnboardingPending,
    error: submitOnboardingError,
  } = useMutation({
    mutationFn: submitOnboarding,
    onSuccess: () => {
      reset();
      router.replace("/home");
    },
  });

  return {
    submitOnboardingMutation,
    isSubmitOnboardingPending,
    submitOnboardingError,
  };
};
