import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSummaryT } from "@/types/perfume";

export const CHAT_MESSAGE_MAX_LENGTH = 500;

export type PostChatRecommendRequestT = {
  message: string;
  top_n?: number;
};

/** 추천 결과 한 건. 향수 정보에 순위와 유사도 점수가 얹혀 온다 */
export type ChatRecommendationT = PerfumeSummaryT & {
  rank: number;
  score: number;
};

/** AI가 문장에서 읽어낸 취향. 카테고리 id 배열로 온다 */
export type ChatPreferencesT = {
  selected_categories: string[];
  avoid_categories: string[];
  focus_categories: string[];
};

export type PostChatRecommendResponseT = {
  input_message: string;
  assistant_message: string;
  analysis_source?: string | null;
  preferences: ChatPreferencesT;
  top_n: number;
  results: ChatRecommendationT[];
};

export const postChatRecommend = (body: PostChatRecommendRequestT) =>
  apiClient<PostChatRecommendResponseT>(API_ENDPOINTS.chat.recommend, {
    method: "POST",
    body,
  });
