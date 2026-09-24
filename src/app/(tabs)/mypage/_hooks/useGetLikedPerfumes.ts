"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePerfumeLike } from "@/apis/perfume";
import { getLikedPerfumes } from "@/apis/user";
// 상세·검색에서 누른 좋아요와 같은 캐시를 보도록 키를 공유한다
import { LIKED_PERFUMES_KEY } from "@/hooks/usePerfumeLike";

export const useGetLikedPerfumes = () => {
  const queryClient = useQueryClient();

  const {
    data: likedPerfumesData,
    isPending: isLikedPerfumesPending,
    isError: isLikedPerfumesError,
    refetch: refetchLikedPerfumes,
  } = useQuery({
    queryKey: LIKED_PERFUMES_KEY,
    queryFn: getLikedPerfumes,
  });

  const { mutate: deletePerfumeLikeMutation } = useMutation({
    mutationFn: deletePerfumeLike,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LIKED_PERFUMES_KEY }),
  });

  return {
    /** 조회 실패와 "좋아요 없음"을 구분해야 하므로 실패 여부를 함께 반환한다 */
    likedPerfumes: likedPerfumesData?.results ?? [],
    isLikedPerfumesPending,
    isLikedPerfumesError,
    refetchLikedPerfumes,
    deletePerfumeLikeMutation,
  };
};
