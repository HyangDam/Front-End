import { API_ENDPOINTS } from "@/consts/api";
import type { CategoryGroupT, CategoryT } from "@/types/onboarding";

import { apiClient } from "./apiClient";

export type GetCategoriesResponseT = {
  categories: Record<CategoryGroupT, CategoryT[]>;
};

export const getCategories = () =>
  apiClient<GetCategoriesResponseT>(API_ENDPOINTS.categories);
