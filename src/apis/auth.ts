import { API_ENDPOINTS } from "@/consts/api";
import type { AuthUserT } from "@/types/user";

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
  token_type?: string;
  user_id: number;
  email: string | null;
  is_new_user: boolean;
  /** 이름 · 성별 · 생년월일 등 기본 정보를 아직 입력하지 않은 상태 */
  profile_required: boolean;
  user: AuthUserT;
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
    body,
  });
