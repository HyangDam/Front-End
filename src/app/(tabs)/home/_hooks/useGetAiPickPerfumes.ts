"use client";

import { useQuery } from "@tanstack/react-query";

import { getOnboardingMe } from "@/apis/onboarding";

import { postRecommendations } from "../_apis/recommendation";

const AI_PICK_SIZE = 5;

/** 온보딩에서 저장한 향 취향(selected/avoid/focus categories)으로 개인화 추천을 받는다 */
export const useGetAiPickPerfumes = () => {
  const { data: onboardingMeData, isPending: isOnboardingMePending } = useQuery({
    queryKey: ["onboardingMe"],
    queryFn: getOnboardingMe,
  });

  const selectedCategories = onboardingMeData?.selected_categories ?? [];
  const hasSelectedCategories = selectedCategories.length > 0;

  const { data, isPending: isRecommendationPending } = useQuery({
    queryKey: ["aiPickPerfumes", selectedCategories],
    queryFn: () =>
      postRecommendations({
        selected_categories: selectedCategories,
        avoid_categories: onboardingMeData?.avoid_categories,
        focus_categories: onboardingMeData?.focus_categories,
        top_n: AI_PICK_SIZE,
      }),
    enabled: hasSelectedCategories,
  });

  return {
    aiPickPerfumes: data?.results ?? [],
    isAiPickPerfumesPending:
      isOnboardingMePending || (hasSelectedCategories && isRecommendationPending),
  };
};
