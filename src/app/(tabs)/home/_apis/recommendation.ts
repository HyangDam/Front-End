import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSummaryT } from "@/types/perfume";

export type PostRecommendationsRequestT = {
  selected_categories: string[];
  avoid_categories?: string[];
  focus_categories?: string[];
  top_n?: number;
};

/** rank·score는 추천 결과에만 있는 필드라 공용 PerfumeSummaryT에는 안 넣는다 */
export type PerfumeRecommendationT = PerfumeSummaryT & {
  rank: number;
  score: number;
};

export type PostRecommendationsResponseT = {
  results: PerfumeRecommendationT[];
};

export const postRecommendations = (body: PostRecommendationsRequestT) =>
  apiClient<PostRecommendationsResponseT>(API_ENDPOINTS.recommendations, {
    method: "POST",
    auth: true,
    body,
  });
