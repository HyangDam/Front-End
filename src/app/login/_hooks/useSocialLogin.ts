"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { postSocialLogin } from "@/apis/auth";
import { useAuthStore } from "@/hooks/useAuthStore";
import type { SocialProviderT } from "@/types/auth";

import { loginWithGoogle } from "../_utils/googleAuth";
import { loginWithKakao } from "../_utils/kakaoAuth";

// 네이버는 백엔드 소셜 로그인 API가 아직 kakao · google만 지원한다
const getProviderToken = (provider: SocialProviderT) => {
  if (provider === "kakao") return loginWithKakao();
  if (provider === "google") return loginWithGoogle();
  return Promise.reject(new Error("네이버 로그인은 준비 중이에요."));
};

export const useSocialLogin = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    mutate: postSocialLoginMutation,
    isPending: isPostSocialLoginPending,
    error: postSocialLoginError,
    variables: pendingProvider,
  } = useMutation({
    mutationFn: async (provider: SocialProviderT) => {
      const providerToken = await getProviderToken(provider);
      return postSocialLogin({ provider, provider_token: providerToken });
    },
    onSuccess: ({ access_token, refresh_token, user, is_new_user }) => {
      setSession({ accessToken: access_token, refreshToken: refresh_token, user });
      // 신규 가입자는 온보딩부터, 기존 회원은 바로 홈으로
      router.replace(is_new_user ? "/onboarding/step-1" : "/home");
    },
  });

  return {
    postSocialLoginMutation,
    isPostSocialLoginPending,
    postSocialLoginError,
    pendingProvider: isPostSocialLoginPending ? pendingProvider : undefined,
  };
};
