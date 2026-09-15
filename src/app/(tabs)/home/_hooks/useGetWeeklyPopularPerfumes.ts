"use client";

import { useQuery } from "@tanstack/react-query";

import { getPerfumeSearch } from "@/apis/perfume";

const WEEKLY_POPULAR_SIZE = 6;

export const useGetWeeklyPopularPerfumes = () => {
  const { data, isPending: isWeeklyPopularPerfumesPending } = useQuery({
    queryKey: ["weeklyPopularPerfumes"],
    queryFn: () =>
      getPerfumeSearch({ sort: "weekly_popular", size: WEEKLY_POPULAR_SIZE }),
  });

  return {
    weeklyPopularPerfumes: data?.results ?? [],
    isWeeklyPopularPerfumesPending,
  };
};
