export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

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
