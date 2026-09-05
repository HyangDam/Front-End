import { getApiBaseUrl } from "@/consts/api";

import { ApiError } from "./apiError";

/** 응답을 받지 못한 경우(서버 미기동 · 네트워크 끊김)를 나타내는 status */
export const NETWORK_ERROR_STATUS = 0;

export type ApiRequestOptionsT = Omit<RequestInit, "body"> & {
  /** JSON으로 직렬화할 요청 본문 */
  body?: unknown;
  /** Authorization 헤더 부착 여부 */
  auth?: boolean;
  /** 쿼리스트링. undefined · null · 빈 문자열인 값은 제외된다 */
  params?: Record<string, string | number | boolean | undefined | null>;
};

const buildUrl = (path: string, params: ApiRequestOptionsT["params"]) => {
  const url = new URL(`${getApiBaseUrl()}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

/** 옵션을 fetch 인자로 조립해 한 번 요청한다. 재시도 · 응답 처리는 apiClient 담당 */
export const sendRequest = async (
  path: string,
  { body, auth, params, headers, ...init }: ApiRequestOptionsT,
  accessToken: string | null,
) => {
  const requestHeaders = new Headers(headers);
  if (body !== undefined) requestHeaders.set("Content-Type", "application/json");
  if (auth && accessToken) requestHeaders.set("Authorization", `Bearer ${accessToken}`);

  try {
    return await fetch(buildUrl(path, params), {
      ...init,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    // 서버가 꺼져 있거나 네트워크가 끊기면 fetch 자체가 TypeError를 던진다.
    // 그대로 두면 "Failed to fetch" 원문이 사용자에게 노출된다.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(
      NETWORK_ERROR_STATUS,
      "서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
    );
  }
};
