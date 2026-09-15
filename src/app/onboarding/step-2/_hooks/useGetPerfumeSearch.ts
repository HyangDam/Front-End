"use client";

import { useQuery } from "@tanstack/react-query";

import { getPerfumeSearch } from "@/apis/perfume";

const SEARCH_SIZE = 20;

/**
 * 검색어가 없으면 인기순 상위 목록을 그대로 보여준다.
 * (keyword를 비워 보내면 서버가 인기순 전체를 돌려준다)
 */
export const useGetPerfumeSearch = (keyword: string) => {
  const { data: perfumeSearchData, isPending: isPerfumeSearchPending } = useQuery({
    queryKey: ["perfumeSearch", keyword],
    queryFn: () => getPerfumeSearch({ keyword, size: SEARCH_SIZE }),
  });

  return {
    perfumes: perfumeSearchData?.results ?? [],
    isPerfumeSearchPending,
  };
};
