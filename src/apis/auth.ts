import { API_ENDPOINTS } from "@/consts/api";
import type { UserT } from "@/types/user";

import { apiClient } from "./apiClient";

/**
 * 구글은 브라우저에서 access token을 바로 받을 수 있어 provider_token을 보내지만,
 * 카카오는 JS SDK v2가 인가 코드만 주므로 code를 보내고 교환은 백엔드가 한다.
 */
export type PostSocialLoginRequestT =
  | { provider: "google"; provider_token: string }
  | { provider: "kakao"; code: string; redirect_uri: string };

export type PostSocialLoginResponseT = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  is_new_user: boolean;
  user: UserT;
};

export const postSocialLogin = (body: PostSocialLoginRequestT) =>
  apiClient<PostSocialLoginResponseT>(API_ENDPOINTS.auth.socialLogin, {
    method: "POST",
    body,
  });

export type PostLogoutRequestT = {
  refresh_token: string;
};

export type PostLogoutResponseT = {
  message: string;
};

export const postLogout = (body: PostLogoutRequestT) =>
  apiClient<PostLogoutResponseT>(API_ENDPOINTS.auth.logout, {
    method: "POST",
    auth: true,
    body,
  });
