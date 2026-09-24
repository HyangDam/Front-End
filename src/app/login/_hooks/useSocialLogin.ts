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
