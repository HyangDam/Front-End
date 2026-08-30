import { API_ENDPOINTS } from "@/consts/api";
import type { SocialProviderT } from "@/types/auth";
import type { UserT } from "@/types/user";

import { apiClient } from "./apiClient";

export type PostSocialLoginRequestT = {
  provider: SocialProviderT;
  provider_token: string;
};

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
