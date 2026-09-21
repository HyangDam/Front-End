import { API_ENDPOINTS } from "@/consts/api";
import { useAuthStore } from "@/hooks/useAuthStore";
import { isRecord } from "@/utils/isRecord";

import { ApiError, createApiError } from "./apiError";
import { sendRequest } from "./apiRequest";
import { parseResponseBody } from "./apiResponse";

// 재발급은 refresh token을 body로 보내고, 새 토큰 한 쌍을 돌려받는다
const requestNewAccessToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) throw new ApiError(401, "로그인이 필요해요.");

  const response = await sendRequest(
    API_ENDPOINTS.auth.refresh,
    { method: "POST", body: { refresh_token: refreshToken } },
    null,
  );
  const body = await parseResponseBody(response);

  if (!response.ok) throw createApiError(response.status, body);

  const accessToken = isRecord(body) ? body.access_token : null;
  const newRefreshToken = isRecord(body) ? body.refresh_token : null;

  if (typeof accessToken !== "string" || typeof newRefreshToken !== "string") {
    throw new ApiError(response.status, "토큰 재발급 응답이 올바르지 않습니다.");
  }

  useAuthStore.getState().setTokens({ accessToken, refreshToken: newRefreshToken });
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
