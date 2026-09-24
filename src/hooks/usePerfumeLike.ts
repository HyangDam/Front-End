"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePerfumeLike, postPerfumeLike } from "@/apis/perfume";
import { getLikedPerfumes } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";

export const LIKED_PERFUMES_KEY = ["likedPerfumes"];

/**
 * 향수 좋아요 상태 조회 + 토글.
 * 상세·검색·홈이 모두 같은 서버 상태를 보도록 쿼리 키를 공유한다.
 * 서버 응답에 향수별 좋아요 여부가 없어서, 내 좋아요 목록으로 상태를 판단한다.
 */
export const usePerfumeLike = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data: likedPerfumesData } = useQuery({
    queryKey: LIKED_PERFUMES_KEY,
    queryFn: getLikedPerfumes,
    enabled: Boolean(accessToken),
  });

  const likedIds = new Set(
    (likedPerfumesData?.results ?? []).map((perfume) => perfume.perfume_id),
  );

  const {
    mutate: toggleLikeMutation,
    isPending: isToggleLikePending,
    variables: togglingPerfumeId,
  } = useMutation({
    mutationFn: (perfumeId: number) =>
      likedIds.has(perfumeId) ? deletePerfumeLike(perfumeId) : postPerfumeLike(perfumeId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LIKED_PERFUMES_KEY }),
  });

  /** 요청이 끝나기 전에도 눌린 버튼은 바로 반응해야 해서, 진행 중인 향수만 상태를 뒤집어 보여준다 */
  const isLiked = (perfumeId: number) => {
    const liked = likedIds.has(perfumeId);
    const isToggling = isToggleLikePending && togglingPerfumeId === perfumeId;
    return isToggling ? !liked : liked;
  };

  return { isLiked, toggleLikeMutation, isToggleLikePending };
};
