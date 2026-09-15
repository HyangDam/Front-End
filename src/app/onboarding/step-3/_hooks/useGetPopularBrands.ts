"use client";

import { useQuery } from "@tanstack/react-query";

import { getPopularBrands } from "@/apis/brand";

/**
 * 브랜드 검색 API가 따로 없어서 받아둔 목록을 화면에서 걸러 쓴다.
 * 서버가 허용하는 최댓값이 30이라 그 이상은 422가 난다.
 */
const BRAND_LIMIT = 30;

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
