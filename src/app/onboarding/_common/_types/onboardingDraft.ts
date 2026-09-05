import type { CurrentPerfumeT } from "@/types/onboarding";
import type { GenderT } from "@/types/user";

/**
 * 온보딩 진행 중 임시로 들고 있는 값.
 * 마지막 단계에서 프로필(PATCH /users/me)과 취향(POST /onboarding/preferences)으로 나뉘어 전송된다.
 */
export type OnboardingDraftT = {
  gender: GenderT | "";
  /** YYYY-MM-DD */
  birthDate: string;
  currentPerfumes: CurrentPerfumeT[];
  /** 브랜드는 서버가 이름 문자열 배열로 받는다 */
  brands: string[];
  /** 향 계열 카테고리 id (라벨이 아님) */
  scents: string[];
};
