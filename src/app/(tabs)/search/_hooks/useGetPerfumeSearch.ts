"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getPerfumeSearch } from "@/apis/perfume";

const SEARCH_PAGE_SIZE = 20;

type UseGetPerfumeSearchParams = {
  keyword: string;
  category?: string;
  sort: string;
};

export const useGetPerfumeSearch = ({
  keyword,
  category,
  sort,
}: UseGetPerfumeSearchParams) => {
  const {
    data,
    isPending: isPerfumeSearchPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["perfumeSearch", keyword, category, sort],
    queryFn: ({ pageParam }) =>
      getPerfumeSearch({
        keyword,
        category,
        sort,
        page: pageParam,
        size: SEARCH_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.has_next ? lastPage.page + 1 : undefined),
  });

  return {
    perfumes: data?.pages.flatMap((page) => page.results) ?? [],
    total: data?.pages[0]?.total ?? 0,
    isPerfumeSearchPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
