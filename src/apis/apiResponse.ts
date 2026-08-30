import { isRecord } from "@/utils/isRecord";

import { ApiError } from "./apiError";

/** 204나 빈 본문이면 null. JSON이 아니면 ApiError */
export const parseResponseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError(response.status, "서버 응답을 해석할 수 없습니다.");
  }
};

/**
 * 팀 응답 규약 `{ status, data, detail, code }` 형태면 data만 꺼내고,
 * 백엔드가 평평한 JSON을 그대로 주면 본문을 그대로 반환한다.
 */
export const unwrapEnvelope = (body: unknown) => {
  if (isRecord(body) && "data" in body && "status" in body && "code" in body) {
    return body.data;
  }
  return body;
};
