import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSummaryT } from "@/types/perfume";

import { apiClient } from "./apiClient";

export type PerfumeSearchResultT = PerfumeSummaryT;

export type GetPerfumeSearchRequestT = {
  keyword?: string;
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
};

export type GetPerfumeSearchResponseT = {
  keyword: string;
  categories: string[];
  sort: string;
  page: number;
  size: number;
  total: number;
  has_next: boolean;
  results: PerfumeSearchResultT[];
};

export const getPerfumeSearch = (params: GetPerfumeSearchRequestT) =>
  apiClient<GetPerfumeSearchResponseT>(API_ENDPOINTS.perfumes.search, { params });

export type PerfumeLikeResponseT = {
  perfume_id: number;
  liked: boolean;
  like_count: number;
};

export const postPerfumeLike = (perfumeId: number) =>
  apiClient<PerfumeLikeResponseT>(API_ENDPOINTS.perfumes.likes(perfumeId), {
    method: "POST",
    auth: true,
  });

export const deletePerfumeLike = (perfumeId: number) =>
  apiClient<PerfumeLikeResponseT>(API_ENDPOINTS.perfumes.likes(perfumeId), {
    method: "DELETE",
    auth: true,
  });
