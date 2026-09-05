"use client";

import { useQuery } from "@tanstack/react-query";

import { getOnboardingMe } from "@/apis/onboarding";
import { getMe } from "@/apis/user";
import { useGetCategories } from "@/hooks/useGetCategories";

/** 마이페이지 상단에 필요한 프로필 · 취향 정보를 한 번에 모은다 */
export const useGetMyProfile = () => {
  const { data: meData, isPending: isMePending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { data: onboardingMeData } = useQuery({
    queryKey: ["onboardingMe"],
    queryFn: getOnboardingMe,
  });

  const { categories } = useGetCategories("note_family");

  // 서버는 카테고리 id만 주므로 화면에 쓸 한글 라벨로 바꾼다
  const preferredScents = (onboardingMeData?.selected_categories ?? []).map(
    (id) => categories.find((category) => category.id === id)?.label ?? id,
  );

  return { me: meData, preferredScents, isMePending };
};
