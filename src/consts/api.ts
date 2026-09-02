const DEV_API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * NEXT_PUBLIC_* 는 빌드 시점에 인라인된다. 운영 빌드에 값이 없으면 모든 요청이
 * 사용자 PC의 localhost로 나가므로, 조용히 넘어가지 않고 요청 시점에 막는다.
 * (모듈 로드 시점에 던지면 환경변수 없는 CI 빌드가 깨진다)
 */
export const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (baseUrl) return baseUrl;

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }
  return DEV_API_BASE_URL;
};

export const API_ENDPOINTS = {
  health: "/health",

  auth: {
    socialLogin: "/auth/social-login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },

  users: {
    me: "/users/me",
    profile: "/users/me/profile",
    perfumes: "/users/me/perfumes",
    ownedPerfume: (perfumeId: number) => `/users/me/perfumes/${perfumeId}`,
  },

  perfumes: {
    detail: (perfumeId: number) => `/perfumes/${perfumeId}`,
    accords: (perfumeId: number) => `/perfumes/${perfumeId}/accords`,
    notesVisualization: (perfumeId: number) =>
      `/perfumes/${perfumeId}/notes-visualization`,
    likes: (perfumeId: number) => `/perfumes/${perfumeId}/likes`,
  },

  onboarding: {
    // TODO(#28): 향수 검색 · 브랜드 목록은 API 문서에 URL이 없어 추정값. 백엔드 확인 후 확정
    perfumes: "/onboarding/perfumes",
    brands: "/onboarding/brands",
    categories: "/categories",
    preferences: "/onboarding/preferences",
    me: "/onboarding/me",
  },
} as const;
