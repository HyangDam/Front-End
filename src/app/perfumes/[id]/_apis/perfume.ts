import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type {
  PerfumeDetailT,
  PerfumePriceComparisonT,
  PerfumeReviewsT,
} from "@/types/perfume";

export const getPerfume = (perfumeId: number) =>
  apiClient<PerfumeDetailT>(API_ENDPOINTS.perfumes.detail(perfumeId), { auth: true });

export const useGetPerfume = (perfumeId: number) => {
  const {
    data: perfumeData,
    isLoading: isPerfumeLoading,
    error: perfumeError,
  } = useQuery({
    queryKey: ["perfume", perfumeId],
    queryFn: () => getPerfume(perfumeId),
  });
  return { perfumeData, isPerfumeLoading, perfumeError };
};

export const getPerfumeReviews = (perfumeId: number) =>
  apiClient<PerfumeReviewsT>(API_ENDPOINTS.perfumes.reviews(perfumeId));

export const useGetPerfumeReviews = (perfumeId: number) => {
  const { data: perfumeReviewsData } = useQuery({
    queryKey: ["perfume", perfumeId, "reviews"],
    queryFn: () => getPerfumeReviews(perfumeId),
  });
  return { perfumeReviewsData };
};

export const getPerfumePriceComparison = (perfumeId: number) =>
  apiClient<PerfumePriceComparisonT>(API_ENDPOINTS.perfumes.priceComparison(perfumeId));

/** 가격 비교 시트를 열 때만 조회한다 — 상세 진입 시 바로 부를 필요는 없음 */
export const useGetPerfumePriceComparison = (perfumeId: number, enabled: boolean) => {
  const { data: perfumePriceComparisonData, isLoading: isPerfumePriceComparisonLoading } =
    useQuery({
      queryKey: ["perfume", perfumeId, "price-comparison"],
      queryFn: () => getPerfumePriceComparison(perfumeId),
      enabled,
    });
  return { perfumePriceComparisonData, isPerfumePriceComparisonLoading };
};
