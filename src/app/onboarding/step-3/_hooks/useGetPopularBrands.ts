"use client";

import { useQuery } from "@tanstack/react-query";

import { getPopularBrands } from "@/apis/brand";

/** 브랜드 검색 API가 따로 없어서, 넉넉히 받아두고 화면에서 걸러 쓴다 */
const BRAND_LIMIT = 60;

export const useGetPopularBrands = () => {
  const { data: popularBrandsData, isPending: isPopularBrandsPending } = useQuery({
    queryKey: ["popularBrands", BRAND_LIMIT],
    queryFn: () => getPopularBrands(BRAND_LIMIT),
  });

  return {
    brands: popularBrandsData?.brands ?? [],
    isPopularBrandsPending,
  };
};
