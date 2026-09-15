import { API_ENDPOINTS } from "@/consts/api";
import type { CurrentPerfumeT, PreferredTargetT } from "@/types/onboarding";

import { apiClient } from "./apiClient";
import { ApiError } from "./apiError";

export type PostOnboardingPreferencesRequestT = {
  current_perfumes?: CurrentPerfumeT[];
  preferred_target?: PreferredTargetT | null;
  selected_categories: string[];
  avoid_categories?: string[];
  focus_categories?: string[];
  preferred_brands?: string[];
};

export type PostOnboardingPreferencesResponseT = {
  onboarding_id: number;
  user_id: number;
  current_perfumes: CurrentPerfumeT[] | null;
  preferred_target: PreferredTargetT | null;
  selected_categories: string[];
  avoid_categories: string[];
  focus_categories: string[];
  preferred_brands: string[];
  created_at: string | null;
  updated_at: string | null;
};

export const postOnboardingPreferences = (body: PostOnboardingPreferencesRequestT) =>
  apiClient<PostOnboardingPreferencesResponseT>(API_ENDPOINTS.onboarding.preferences, {
    method: "POST",
    auth: true,
    body,
  });

export const patchOnboardingPreferences = (body: PostOnboardingPreferencesRequestT) =>
  apiClient<PostOnboardingPreferencesResponseT>(API_ENDPOINTS.onboarding.preferences, {
    method: "PATCH",
    auth: true,
    body,
  });

/**
 * 이미 온보딩을 저장한 계정은 POST가 409로 거절되므로 수정으로 넘긴다.
 * (온보딩을 다시 진행하는 경우가 있어 저장/수정을 호출부에서 구분하지 않는다)
 */
export const saveOnboardingPreferences = async (
  body: PostOnboardingPreferencesRequestT,
) => {
  try {
    return await postOnboardingPreferences(body);
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) {
      return patchOnboardingPreferences(body);
    }
    throw error;
  }
};

export type GetOnboardingMeResponseT = PostOnboardingPreferencesResponseT & {
  user_vector?: Record<string, number>;
};

export const getOnboardingMe = () =>
  apiClient<GetOnboardingMeResponseT>(API_ENDPOINTS.onboarding.me, { auth: true });
