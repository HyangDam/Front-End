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
    ({ access_token, refresh_token, user, is_new_user }: PostSocialLoginResponseT) => {
      setSession({ accessToken: access_token, refreshToken: refresh_token, user });
      // 신규 가입자는 온보딩부터, 기존 회원은 바로 홈으로
      router.replace(is_new_user ? "/onboarding/step-1" : "/home");
    },
    [router, setSession],
  );
};
