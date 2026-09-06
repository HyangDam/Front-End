"use client";

import { useQuery } from "@tanstack/react-query";

import { getOnboardingMe } from "@/apis/onboarding";
import { getMe } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useGetCategories } from "@/hooks/useGetCategories";

/** 마이페이지 상단에 필요한 프로필 · 취향 정보를 한 번에 모은다 */
export const useGetMyProfile = () => {
  const {
    data: meData,
    isPending: isMePending,
    isError: isMeError,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { data: onboardingMeData, isError: isOnboardingMeError } = useQuery({
    queryKey: ["onboardingMe"],
    queryFn: getOnboardingMe,
  });

  const { categories } = useGetCategories("note_family");
  const sessionUser = useAuthStore((state) => state.user);

  // 서버는 카테고리 id만 주므로 화면에 쓸 한글 라벨로 바꾼다
  const preferredScents = (onboardingMeData?.selected_categories ?? []).map(
    (id) => categories.find((category) => category.id === id)?.label ?? id,
  );

  // 서버에 아직 저장되지 않은 값은 로그인 때 받은 소셜 프로필로 채운다
  const me = meData && {
    ...meData,
    name: meData.name ?? sessionUser?.name ?? null,
    nickname: meData.nickname ?? sessionUser?.nickname ?? null,
    profile_image_url: meData.profile_image_url ?? sessionUser?.profile_image_url ?? null,
  };

  return {
    me,
    preferredScents,
    isMePending,
    isMeError,
    /** 취향 조회만 실패한 경우. 이름은 그대로 보여주고 선호 향만 생략한다 */
    isOnboardingMeError,
    refetchMe,
  };
};
