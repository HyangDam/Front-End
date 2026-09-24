import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSummaryT } from "@/types/perfume";

export type PostRecommendationsRequestT = {
  selected_categories: string[];
  avoid_categories?: string[];
  focus_categories?: string[];
  top_n?: number;
};

export type PostRecommendationsResponseT = {
  results: PerfumeSummaryT[];
};

export const postRecommendations = (body: PostRecommendationsRequestT) =>
  apiClient<PostRecommendationsResponseT>(API_ENDPOINTS.recommendations, {
    method: "POST",
    auth: true,
    body,
  });
