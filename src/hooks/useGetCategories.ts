"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/apis/category";
import type { CategoryGroupT } from "@/types/onboarding";

/** 온보딩에서 필요한 그룹만 골라 쓴다 */
export const useGetCategories = (group: CategoryGroupT) => {
  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    categories: categoriesData?.categories[group] ?? [],
    isCategoriesPending,
  };
};
