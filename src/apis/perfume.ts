import { API_ENDPOINTS } from "@/consts/api";

import { apiClient } from "./apiClient";

export type PerfumeSearchResultT = {
  perfume_id: number;
  name: string;
  brand: string;
  notes: string | null;
  image_url: string | null;
  like_count: number;
  category: string | null;
};

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
