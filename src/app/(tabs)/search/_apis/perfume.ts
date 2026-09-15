import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSearchT } from "@/types/perfume";

const SEARCH_RESULT_LIMIT = 30;

export const getPerfumeSearch = (keyword: string) =>
  apiClient<PerfumeSearchT>(API_ENDPOINTS.perfumes.search, {
    params: { keyword, limit: SEARCH_RESULT_LIMIT },
  });

export const useGetPerfumeSearch = (keyword: string) => {
  const {
    data: perfumeSearchData,
    isLoading: isPerfumeSearchLoading,
    error: perfumeSearchError,
  } = useQuery({
    queryKey: ["perfume-search", keyword],
    queryFn: () => getPerfumeSearch(keyword),
  });
  return { perfumeSearchData, isPerfumeSearchLoading, perfumeSearchError };
};
