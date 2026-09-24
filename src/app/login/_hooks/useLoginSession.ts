"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { PostSocialLoginResponseT } from "@/apis/auth";
import { useAuthStore } from "@/hooks/useAuthStore";

/**
 * 로그인 후 어디로 보낼지 정한다.
 *
 * 기본 정보와 취향은 따로 저장되므로, 둘을 나눠 봐야 이미 마친 단계를 다시 묻지 않는다.
 * 예전에는 is_new_user만 보고 판단해서, 로그아웃 후 다시 들어오면 온보딩이 또 나왔다.
 */
const getNextPath = ({
  profile_required,
  onboarding_completed,
}: PostSocialLoginResponseT) => {
  if (profile_required) return "/onboarding/step-1";
  if (!onboarding_completed) return "/onboarding/step-2";
  return "/home";
};

/** 로그인 성공 응답을 세션에 저장하고 다음 화면으로 보낸다 (구글 · 카카오 공용) */
export const useLoginSession = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useCallback(
    (response: PostSocialLoginResponseT) => {
      const { access_token, refresh_token, user } = response;

      setSession({ accessToken: access_token, refreshToken: refresh_token, user });
      router.replace(getNextPath(response));
    },
    [router, setSession],
  );
};
