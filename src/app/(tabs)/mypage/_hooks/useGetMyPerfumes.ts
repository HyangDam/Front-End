"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyPerfumes } from "@/apis/user";

export const useGetMyPerfumes = () => {
  const {
    data: myPerfumesData,
    isPending: isMyPerfumesPending,
    isError: isMyPerfumesError,
    refetch: refetchMyPerfumes,
  } = useQuery({
    queryKey: ["myPerfumes"],
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
