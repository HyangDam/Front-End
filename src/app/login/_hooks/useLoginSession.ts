"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { PostSocialLoginResponseT } from "@/apis/auth";
import { getOnboardingMe } from "@/apis/onboarding";
import { getMe } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";

const STEP_PROFILE = "/onboarding/step-1";
const STEP_PREFERENCES = "/onboarding/step-2";
const HOME = "/home";

/**
 * 로그인 후 어디로 보낼지 정한다.
 *
 * 응답의 profile_required · onboarding_completed만 믿으면, 서버가 그 값을 갱신하지
 * 못했을 때 이미 온보딩을 마친 회원이 매번 다시 끌려간다. 그래서 실제로 저장된
 * 프로필과 취향을 확인해 판단한다.
 */
const resolveNextPath = async (response: PostSocialLoginResponseT) => {
  // 신규 가입자는 조회할 것이 없으니 바로 시작한다
  if (response.is_new_user) return STEP_PROFILE;

  const [me, onboardingMe] = await Promise.allSettled([getMe(), getOnboardingMe()]);

  // 조회에 실패하면 판단할 근거가 없어, 응답 값으로 물러선다
  if (me.status === "rejected") {
    return response.profile_required ? STEP_PROFILE : HOME;
  }

  const hasProfile = Boolean(me.value.gender && me.value.birth_date);
  if (!hasProfile) return STEP_PROFILE;

  /**
   * 취향 조회는 아직 저장한 적이 없으면 404로 실패한다.
   * 실패도 "아직 안 함"으로 보고 취향 단계부터 이어간다.
   */
  const hasPreferences =
    onboardingMe.status === "fulfilled" &&
    ((onboardingMe.value.selected_categories?.length ?? 0) > 0 ||
      (onboardingMe.value.preferred_brands?.length ?? 0) > 0);

  return hasPreferences ? HOME : STEP_PREFERENCES;
};

/** 로그인 성공 응답을 세션에 저장하고 다음 화면으로 보낸다 (구글 · 카카오 공용) */
export const useLoginSession = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useCallback(
    async (response: PostSocialLoginResponseT) => {
      const { access_token, refresh_token, user } = response;

      // 아래 조회가 이 토큰을 쓰므로 먼저 저장한다
      setSession({ accessToken: access_token, refreshToken: refresh_token, user });
      router.replace(await resolveNextPath(response));
    },
    [router, setSession],
  );
};
