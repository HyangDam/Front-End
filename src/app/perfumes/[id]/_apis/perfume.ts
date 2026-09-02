import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/apis/apiClient";
import { perfumeQueryKey } from "@/apis/perfume";
import { API_ENDPOINTS } from "@/consts/api";
import type {
  PerfumeAccordsT,
  PerfumeDetailT,
  PerfumeNotesVisualizationT,
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
    queryKey: perfumeQueryKey(perfumeId),
    queryFn: () => getPerfume(perfumeId),
  });
  return { perfumeData, isPerfumeLoading, perfumeError };
};

export const getPerfumeAccords = (perfumeId: number) =>
  apiClient<PerfumeAccordsT>(API_ENDPOINTS.perfumes.accords(perfumeId));

export const useGetPerfumeAccords = (perfumeId: number) => {
  const { data: perfumeAccordsData } = useQuery({
    queryKey: ["perfume", perfumeId, "accords"],
    queryFn: () => getPerfumeAccords(perfumeId),
  });
  return { perfumeAccordsData };
};

export const getPerfumeNotesVisualization = (perfumeId: number) =>
  apiClient<PerfumeNotesVisualizationT>(
    API_ENDPOINTS.perfumes.notesVisualization(perfumeId),
  );

export const useGetPerfumeNotesVisualization = (perfumeId: number) => {
  const { data: perfumeNotesData } = useQuery({
    queryKey: ["perfume", perfumeId, "notes-visualization"],
    queryFn: () => getPerfumeNotesVisualization(perfumeId),
  });
  return { perfumeNotesData };
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
