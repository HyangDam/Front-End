"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { PostSocialLoginResponseT } from "@/apis/auth";
import { useAuthStore } from "@/hooks/useAuthStore";

/** 로그인 성공 응답을 세션에 저장하고 다음 화면으로 보낸다 (구글 · 카카오 공용) */
export const useLoginSession = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useCallback(
    ({
      access_token,
      refresh_token,
      user,
      is_new_user,
      profile_required,
    }: PostSocialLoginResponseT) => {
      setSession({ accessToken: access_token, refreshToken: refresh_token, user });
      // 신규 가입자나 기본 정보가 비어 있는 회원은 온보딩부터, 나머지는 바로 홈으로
      const needsOnboarding = is_new_user || profile_required;
      router.replace(needsOnboarding ? "/onboarding/step-1" : "/home");
    },
    [router, setSession],
  );
};
