import { API_ENDPOINTS } from "@/consts/api";
import type { CurrentPerfumeT, PreferredTargetT } from "@/types/onboarding";

import { apiClient } from "./apiClient";

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

export type GetOnboardingMeResponseT = PostOnboardingPreferencesResponseT & {
  user_vector?: Record<string, number>;
};

export const getOnboardingMe = () =>
  apiClient<GetOnboardingMeResponseT>(API_ENDPOINTS.onboarding.me, { auth: true });
