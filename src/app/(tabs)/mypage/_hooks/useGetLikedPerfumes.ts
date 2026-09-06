"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePerfumeLike } from "@/apis/perfume";
import { getLikedPerfumes } from "@/apis/user";

const LIKED_PERFUMES_KEY = ["likedPerfumes"];

export const useGetLikedPerfumes = () => {
  const queryClient = useQueryClient();

  const { data: likedPerfumesData, isPending: isLikedPerfumesPending } = useQuery({
    queryKey: LIKED_PERFUMES_KEY,
    queryFn: getLikedPerfumes,
  });

  const { mutate: deletePerfumeLikeMutation } = useMutation({
    mutationFn: deletePerfumeLike,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LIKED_PERFUMES_KEY }),
  });

  return {
    likedPerfumes: likedPerfumesData?.results ?? [],
    isLikedPerfumesPending,
    deletePerfumeLikeMutation,
  };
};
