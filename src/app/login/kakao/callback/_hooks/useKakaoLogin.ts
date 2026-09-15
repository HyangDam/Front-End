"use client";

import { useMutation } from "@tanstack/react-query";

import { postSocialLogin } from "@/apis/auth";

import { useLoginSession } from "../../../_hooks/useLoginSession";
import { getKakaoRedirectUri } from "../../../_utils/kakaoAuth";

/** 카카오가 돌려준 인가 코드를 백엔드로 넘겨 로그인을 마무리한다 */
export const useKakaoLogin = () => {
  const saveLoginSession = useLoginSession();

  const { mutate: postKakaoLoginMutation, error: postKakaoLoginError } = useMutation({
    mutationFn: (code: string) =>
      postSocialLogin({
        provider: "kakao",
        code,
        // 백엔드가 카카오에 토큰 교환을 요청할 때 인가 요청과 같은 값이어야 한다
        redirect_uri: getKakaoRedirectUri(),
      }),
    onSuccess: saveLoginSession,
  });

  return { postKakaoLoginMutation, postKakaoLoginError };
};
