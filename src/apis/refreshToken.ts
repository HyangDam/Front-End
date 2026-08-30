import { API_BASE_URL, API_ENDPOINTS } from "@/consts/api";
import { useAuthStore } from "@/hooks/useAuthStore";
import { isRecord } from "@/utils/isRecord";

import { ApiError, createApiError } from "./apiError";
import { parseResponseBody } from "./apiResponse";

// 재발급은 access token이 아니라 refresh token을 Bearer로 보낸다
const requestNewAccessToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) throw new ApiError(401, "로그인이 필요해요.");

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.refresh}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  const body = await parseResponseBody(response);

  if (!response.ok) throw createApiError(response.status, body);

  // 명세는 accessToken, 다른 응답은 snake_case라 양쪽을 모두 허용한다
  const accessToken = isRecord(body) ? (body.accessToken ?? body.access_token) : null;
  if (typeof accessToken !== "string") {
    throw new ApiError(response.status, "토큰 재발급 응답이 올바르지 않습니다.");
  }

  useAuthStore.getState().setAccessToken(accessToken);
  return accessToken;
};

/** 동시에 여러 요청이 401을 받아도 재발급은 한 번만 수행하도록 promise를 공유한다 */
let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = () => {
  refreshPromise ??= requestNewAccessToken().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
};

/** 재발급까지 실패하면 세션을 비우고 로그인 화면으로 되돌린다 */
export const handleRefreshFailure = () => {
  useAuthStore.getState().clearSession();
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};
