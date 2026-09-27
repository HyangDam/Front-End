import { isRecord } from "@/utils/isRecord";

export type ApiFieldErrorT = {
  field: string;
  reason: string;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: ApiFieldErrorT[];

  constructor(
    status: number,
    message: string,
    options?: { code?: string; errors?: ApiFieldErrorT[] },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.errors = options?.errors;
  }
}

/**
 * FastAPI는 입력값 검증에 실패하면 detail을 배열로 내려준다.
 * [{ loc, msg, type }, ...] 형태라, 첫 항목의 msg가 사용자에게 보여줄 이유다.
 */
const getValidationMessage = (detail: unknown) => {
  if (!Array.isArray(detail)) return null;

  const firstMessage = detail.find(
    (item) => isRecord(item) && typeof item.msg === "string",
  );
  return isRecord(firstMessage) && typeof firstMessage.msg === "string"
    ? firstMessage.msg
    : null;
};

// 팀 규약은 detail, 일부 명세는 message, FastAPI 기본 오류도 detail을 쓴다
const getErrorMessage = (body: unknown, status: number) => {
  if (isRecord(body)) {
    if (typeof body.detail === "string") return body.detail;

    const validationMessage = getValidationMessage(body.detail);
    if (validationMessage) return validationMessage;

    if (typeof body.message === "string") return body.message;
  }
  if (status === 401) return "로그인이 필요해요.";
  return "요청 처리 중 오류가 발생했어요.";
};

/** 실패 응답 본문에서 message · code · errors를 뽑아 ApiError로 만든다 */
export const createApiError = (status: number, body: unknown) =>
  new ApiError(status, getErrorMessage(body, status), {
    code: isRecord(body) && typeof body.code === "string" ? body.code : undefined,
    errors:
      isRecord(body) && Array.isArray(body.errors)
        ? (body.errors as ApiFieldErrorT[])
        : undefined,
  });
