"use client";

import { useMutation } from "@tanstack/react-query";

import { postSocialLogin } from "@/apis/auth";
import type { PostSocialLoginResponseT } from "@/apis/auth";
import type { SocialProviderT } from "@/types/auth";

import { loginWithGoogle } from "../_utils/googleAuth";
import { redirectToKakaoLogin } from "../_utils/kakaoAuth";
import { useLoginSession } from "./useLoginSession";

export const useSocialLogin = () => {
  const saveLoginSession = useLoginSession();

  const {
    mutate: postSocialLoginMutation,
    isPending: isPostSocialLoginPending,
    error: postSocialLoginError,
    variables: pendingProvider,
  } = useMutation({
    mutationFn: async (provider: SocialProviderT) => {
      // 네이버는 백엔드 소셜 로그인 API가 아직 kakao · google만 지원한다
      if (provider === "naver") throw new Error("네이버 로그인은 준비 중이에요.");

      if (provider === "kakao") {
        redirectToKakaoLogin();
        // 카카오 페이지로 떠나므로 이 요청은 끝나지 않는다.
        // 실제 로그인은 돌아온 뒤 /login/kakao/callback 에서 이어진다
        return new Promise<PostSocialLoginResponseT>(() => {});
      }

      const providerToken = await loginWithGoogle();
      return postSocialLogin({ provider: "google", provider_token: providerToken });
    },
    onSuccess: saveLoginSession,
  });

  return {
    postSocialLoginMutation,
    isPostSocialLoginPending,
    postSocialLoginError,
    pendingProvider: isPostSocialLoginPending ? pendingProvider : undefined,
  };
};
