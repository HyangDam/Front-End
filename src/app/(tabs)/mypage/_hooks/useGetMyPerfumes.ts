"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyPerfumes } from "@/apis/user";

export const useGetMyPerfumes = () => {
  const { data: myPerfumesData, isPending: isMyPerfumesPending } = useQuery({
    queryKey: ["myPerfumes"],
    queryFn: getMyPerfumes,
  });

  return {
    myPerfumes: myPerfumesData?.results ?? [],
    isMyPerfumesPending,
  };
};
