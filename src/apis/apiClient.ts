import { useAuthStore } from "@/hooks/useAuthStore";

import { createApiError } from "./apiError";
import { sendRequest } from "./apiRequest";
import type { ApiRequestOptionsT } from "./apiRequest";
import { parseResponseBody } from "./apiResponse";
import { handleRefreshFailure, refreshAccessToken } from "./refreshToken";

/**
 * 모든 API 함수가 사용하는 요청 진입점.
 * 인증 요청이 401이면 access token을 한 번 재발급받아 재시도한다.
 */
export const apiClient = async <T>(
  path: string,
  options: ApiRequestOptionsT = {},
): Promise<T> => {
  const { auth = false } = options;
  const { accessToken, refreshToken } = useAuthStore.getState();

  let response = await sendRequest(path, options, auth ? accessToken : null);

  if (response.status === 401 && auth && refreshToken) {
    let newAccessToken: string;
    try {
      newAccessToken = await refreshAccessToken();
    } catch (error) {
      handleRefreshFailure();
      throw error;
    }
    // 재시도 요청의 실패(취소·네트워크 오류)는 세션 문제가 아니므로 그대로 전파한다
    response = await sendRequest(path, options, newAccessToken);
  }

  const body = await parseResponseBody(response);
  if (!response.ok) throw createApiError(response.status, body);

  return body as T;
};
