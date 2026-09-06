"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { saveOnboardingPreferences } from "@/apis/onboarding";
import { patchMe } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";
import type { AuthUserT } from "@/types/user";

import { useOnboardingStore } from "../../onboarding/_common/_hooks/useOnboardingStore";
import type { OnboardingDraftT } from "../../onboarding/_common/_types/onboardingDraft";

/** 저장이 너무 빨리 끝나면 분석 화면이 깜빡이므로 최소 시간은 보여준다 */
const MIN_VISIBLE_MS = 1800;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 온보딩에서 이름·닉네임을 따로 묻지 않으므로 소셜 로그인으로 받은 값을 쓴다.
 * 제공자마다 주는 값이 달라(구글은 name, 카카오는 nickname) 서로 대신 채운다.
 */
const buildNameFields = (user: AuthUserT | null) => {
  const name = user?.name ?? user?.nickname;
  const nickname = user?.nickname ?? user?.name;

  return {
    ...(name ? { name } : {}),
    ...(nickname ? { nickname } : {}),
  };
};

type SubmitOnboardingParamsT = {
  draft: OnboardingDraftT;
  user: AuthUserT | null;
};

const submitOnboarding = async ({ draft, user }: SubmitOnboardingParamsT) => {
  const { gender, birthDate, currentPerfumes, brands, scents } = draft;

  // 프로필과 취향은 서로 독립적이라 함께 보낸다
  await Promise.all([
    patchMe({
      ...buildNameFields(user),
      ...(gender ? { gender } : {}),
      ...(birthDate ? { birth_date: birthDate } : {}),
    }),
    saveOnboardingPreferences({
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
  const user = useAuthStore((state) => state.user);

  const {
    mutate: submitOnboardingMutation,
    isPending: isSubmitOnboardingPending,
    error: submitOnboardingError,
  } = useMutation({
    mutationFn: (draft: OnboardingDraftT) => submitOnboarding({ draft, user }),
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
