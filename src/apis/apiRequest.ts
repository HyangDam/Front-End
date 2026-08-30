import { getApiBaseUrl } from "@/consts/api";

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

/** 옵션을 fetch 인자로 조립해 한 번 요청한다. 재시도 · 에러 처리는 apiClient 담당 */
export const sendRequest = (
  path: string,
  { body, auth, params, headers, ...init }: ApiRequestOptionsT,
  accessToken: string | null,
) => {
  const requestHeaders = new Headers(headers);
  if (body !== undefined) requestHeaders.set("Content-Type", "application/json");
  if (auth && accessToken) requestHeaders.set("Authorization", `Bearer ${accessToken}`);

  return fetch(buildUrl(path, params), {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
};
