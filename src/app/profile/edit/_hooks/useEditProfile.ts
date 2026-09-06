"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getOnboardingMe, patchOnboardingPreferences } from "@/apis/onboarding";
import { getMe, patchMe } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";

type SaveProfileParamsT = {
  nickname: string;
  selectedCategories: string[];
  preferredBrands: string[];
};

export const useEditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const sessionUser = useAuthStore((state) => state.user);

  const {
    data: meData,
    isPending: isMePending,
    isError: isMeError,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const {
    data: onboardingMeData,
    isPending: isOnboardingMePending,
    isError: isOnboardingMeError,
    refetch: refetchOnboardingMe,
  } = useQuery({
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

  // 마이페이지와 같은 기준으로, 서버에 없는 값은 로그인 세션 정보로 채운다
  const me = meData && {
    ...meData,
    name: meData.name ?? sessionUser?.name ?? null,
    nickname: meData.nickname ?? sessionUser?.nickname ?? null,
    profile_image_url: meData.profile_image_url ?? sessionUser?.profile_image_url ?? null,
  };

  const retryProfile = () => {
    refetchMe();
    refetchOnboardingMe();
  };

  return {
    me,
    onboardingMe: onboardingMeData,
    isProfilePending: isMePending || isOnboardingMePending,
    /**
     * 취향 조회가 실패한 상태로 저장하면 빈 배열이 전송돼 기존 취향이 지워진다.
     * 그래서 둘 중 하나라도 실패하면 폼을 그리지 않는다.
     */
    isProfileError: isMeError || isOnboardingMeError,
    retryProfile,
    saveProfileMutation,
    isSaveProfilePending,
    saveProfileError,
  };
};
