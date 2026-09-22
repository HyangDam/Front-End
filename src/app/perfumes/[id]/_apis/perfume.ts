import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/apis/apiClient";
import { deletePerfumeLike, postPerfumeLike } from "@/apis/perfume";
import { deleteMyPerfume, postMyPerfume } from "@/apis/user";
import { API_ENDPOINTS } from "@/consts/api";
import type {
  PerfumeDetailT,
  PerfumePriceComparisonT,
  PerfumeReviewT,
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

export type PostReviewRequestT = {
  rating: number;
  content: string;
};

export const postReview = (perfumeId: number, body: PostReviewRequestT) =>
  apiClient<PerfumeReviewT>(API_ENDPOINTS.perfumes.reviews(perfumeId), {
    method: "POST",
    auth: true,
    body,
  });

/** 작성 성공 시 리뷰 목록·상세(can_write_review 등)를 함께 갱신한다 */
export const usePostReview = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: postReviewMutation,
    isPending: isPostReviewPending,
    error: postReviewError,
  } = useMutation({
    mutationFn: (body: PostReviewRequestT) => postReview(perfumeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId] });
    },
  });
  return { postReviewMutation, isPostReviewPending, postReviewError };
};

export type PatchReviewRequestT = {
  rating?: number;
  content?: string;
};

export const patchReview = (reviewId: number, body: PatchReviewRequestT) =>
  apiClient<PerfumeReviewT>(API_ENDPOINTS.reviews.detail(reviewId), {
    method: "PATCH",
    auth: true,
    body,
  });

export const usePatchReview = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: patchReviewMutation,
    isPending: isPatchReviewPending,
    error: patchReviewError,
  } = useMutation({
    mutationFn: ({ reviewId, body }: { reviewId: number; body: PatchReviewRequestT }) =>
      patchReview(reviewId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId, "reviews"] });
    },
  });
  return { patchReviewMutation, isPatchReviewPending, patchReviewError };
};

export type DeleteReviewResponseT = {
  review_id: number;
  deleted: boolean;
};

export const deleteReview = (reviewId: number) =>
  apiClient<DeleteReviewResponseT>(API_ENDPOINTS.reviews.detail(reviewId), {
    method: "DELETE",
    auth: true,
  });

export const useDeleteReview = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteReviewMutation, isPending: isDeleteReviewPending } = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId] });
    },
  });
  return { deleteReviewMutation, isDeleteReviewPending };
};

/** 좋아요는 응답에 최신 liked·like_count가 와서 캐시에 바로 반영한다 */
export const useTogglePerfumeLike = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const patchCache = (liked: boolean, likeCount: number) =>
    queryClient.setQueryData<PerfumeDetailT>(["perfume", perfumeId], (prev) =>
      prev ? { ...prev, is_liked: liked, like_count: likeCount } : prev,
    );

  const { mutate: postPerfumeLikeMutation, isPending: isPostPerfumeLikePending } =
    useMutation({
      mutationFn: () => postPerfumeLike(perfumeId),
      onSuccess: (data) => patchCache(data.liked, data.like_count),
    });
  const { mutate: deletePerfumeLikeMutation, isPending: isDeletePerfumeLikePending } =
    useMutation({
      mutationFn: () => deletePerfumeLike(perfumeId),
      onSuccess: (data) => patchCache(data.liked, data.like_count),
    });

  return {
    postPerfumeLikeMutation,
    deletePerfumeLikeMutation,
    isTogglingLike: isPostPerfumeLikePending || isDeletePerfumeLikePending,
  };
};

/** 향수장 보유 API는 개수를 안 줘서 캐시 패치 대신 상세를 다시 불러온다 */
export const useTogglePerfumeOwned = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId] });

  const { mutate: postMyPerfumeMutation, isPending: isPostMyPerfumePending } =
    useMutation({
      mutationFn: () => postMyPerfume({ perfume_id: perfumeId }),
      onSuccess: invalidate,
    });
  const { mutate: deleteMyPerfumeMutation, isPending: isDeleteMyPerfumePending } =
    useMutation({
      mutationFn: () => deleteMyPerfume(perfumeId),
      onSuccess: invalidate,
    });

  return {
    postMyPerfumeMutation,
    deleteMyPerfumeMutation,
    isTogglingOwned: isPostMyPerfumePending || isDeleteMyPerfumePending,
  };
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
