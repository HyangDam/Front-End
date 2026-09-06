"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getOnboardingMe, patchOnboardingPreferences } from "@/apis/onboarding";
import { getMe, patchMe } from "@/apis/user";

type SaveProfileParamsT = {
  nickname: string;
  selectedCategories: string[];
  preferredBrands: string[];
};

export const useEditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: meData, isPending: isMePending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { data: onboardingMeData, isPending: isOnboardingMePending } = useQuery({
    queryKey: ["onboardingMe"],
    queryFn: getOnboardingMe,
  });

  const {
    mutate: saveProfileMutation,
    isPending: isSaveProfilePending,
    error: saveProfileError,
  } = useMutation({
    mutationFn: async ({
      nickname,
      selectedCategories,
      preferredBrands,
    }: SaveProfileParamsT) => {
      // 닉네임 중복 같은 오류를 먼저 드러내기 위해 프로필부터 저장한다
      await patchMe({ nickname });
      await patchOnboardingPreferences({
        selected_categories: selectedCategories,
        preferred_brands: preferredBrands,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["onboardingMe"] });
      router.back();
    },
  });

  return {
    me: meData,
    onboardingMe: onboardingMeData,
    isProfilePending: isMePending || isOnboardingMePending,
    saveProfileMutation,
    isSaveProfilePending,
    saveProfileError,
  };
};
