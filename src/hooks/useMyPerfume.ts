"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { GetMyPerfumesResponseT } from "@/apis/user";
import { deleteMyPerfume, getMyPerfumes, postMyPerfume } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";

export const MY_PERFUMES_KEY = ["myPerfumes"];

/**
 * 처리 중인 향수 id. 훅 인스턴스마다 상태를 따로 갖기 때문에(상세 화면의 두 버튼 등)
 * 모듈 단위로 공유해야 같은 향수에 요청이 겹치지 않는다.
 */
const inFlightPerfumeIds = new Set<number>();

/**
 * 향수장 보유 상태 조회 + 토글.
 * 상세와 마이페이지가 같은 서버 상태를 보도록 쿼리 키를 공유한다.
 * 향수 응답에 보유 여부가 없어서, 내 향수장 목록으로 상태를 판단한다.
 */
export const useMyPerfume = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    data: myPerfumesData,
    isPending: isMyPerfumesPending,
    isError: isMyPerfumesError,
  } = useQuery({
    queryKey: MY_PERFUMES_KEY,
    queryFn: getMyPerfumes,
    enabled: Boolean(accessToken),
  });

  const ownedIds = new Set(
    (myPerfumesData?.results ?? []).map((myPerfume) => myPerfume.perfume_id),
  );

  const {
    mutate,
    isPending: isToggleOwnedPending,
    variables: togglingPerfumeId,
  } = useMutation({
    mutationFn: async (perfumeId: number) => {
      /**
       * 렌더 시점 스냅샷이 아니라 최신 캐시로 방향을 정한다.
       * 다른 화면에서 바뀐 결과가 이미 반영돼 있을 수 있기 때문이다.
       */
      const latest = queryClient.getQueryData<GetMyPerfumesResponseT>(MY_PERFUMES_KEY);
      const owned = (latest?.results ?? []).some(
        (myPerfume) => myPerfume.perfume_id === perfumeId,
      );

      if (owned) {
        await deleteMyPerfume(perfumeId);
        return;
      }
      await postMyPerfume({ perfume_id: perfumeId });
    },
    onSettled: (_data, _error, perfumeId) => {
      inFlightPerfumeIds.delete(perfumeId);
      queryClient.invalidateQueries({ queryKey: MY_PERFUMES_KEY });
    },
  });

  /** 목록을 못 읽은 상태에서는 POST와 DELETE 중 무엇을 보낼지 알 수 없다 */
  const canToggleOwned =
    Boolean(accessToken) && !isMyPerfumesPending && !isMyPerfumesError;

  const toggleOwnedMutation = (perfumeId: number) => {
    if (!canToggleOwned) return;
    // 응답 전에 다시 누르면 같은 방향으로 한 번 더 나가므로 막는다
    if (inFlightPerfumeIds.has(perfumeId)) return;

    inFlightPerfumeIds.add(perfumeId);
    mutate(perfumeId);
  };

  /** 요청이 끝나기 전에도 눌린 버튼은 바로 반응해야 해서, 진행 중인 향수만 상태를 뒤집어 보여준다 */
  const isOwned = (perfumeId: number) => {
    const owned = ownedIds.has(perfumeId);
    const isToggling = isToggleOwnedPending && togglingPerfumeId === perfumeId;
    return isToggling ? !owned : owned;
  };

  return { isOwned, toggleOwnedMutation, canToggleOwned, isToggleOwnedPending };
};
