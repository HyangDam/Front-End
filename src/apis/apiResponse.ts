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
