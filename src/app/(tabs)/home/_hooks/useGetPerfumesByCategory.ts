"use client";

import { useQuery } from "@tanstack/react-query";

import { getPerfumeSearch } from "@/apis/perfume";

const MOOD_RESULT_SIZE = 8;

export const useGetPerfumesByCategory = (category: string | null) => {
  const { data, isPending: isPerfumesByCategoryPending } = useQuery({
    queryKey: ["perfumesByCategory", category],
    queryFn: () =>
      getPerfumeSearch({
        category: category ?? undefined,
        sort: "popular",
        size: MOOD_RESULT_SIZE,
      }),
    enabled: category !== null,
  });

  return {
    perfumesByCategory: data?.results ?? [],
    isPerfumesByCategoryPending,
  };
};
