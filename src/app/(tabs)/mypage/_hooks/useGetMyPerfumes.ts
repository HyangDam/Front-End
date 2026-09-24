"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyPerfumes } from "@/apis/user";
// 상세 화면에서 담은 결과와 같은 캐시를 보도록 키를 공유한다
import { MY_PERFUMES_KEY } from "@/hooks/useMyPerfume";

export const useGetMyPerfumes = () => {
  const {
    data: myPerfumesData,
    isPending: isMyPerfumesPending,
    isError: isMyPerfumesError,
    refetch: refetchMyPerfumes,
  } = useQuery({
    queryKey: MY_PERFUMES_KEY,
    queryFn: getMyPerfumes,
  });

  return {
    /** 조회 실패와 "향수장 비어 있음"을 구분해야 하므로 실패 여부를 함께 반환한다 */
    myPerfumes: myPerfumesData?.results ?? [],
    isMyPerfumesPending,
    isMyPerfumesError,
    refetchMyPerfumes,
  };
};
