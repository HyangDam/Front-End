import { API_ENDPOINTS } from "@/consts/api";

import { apiClient } from "./apiClient";

export type BrandT = {
  brand: string;
  count: number;
};

export type GetPopularBrandsResponseT = {
  brands: BrandT[];
};

export const getPopularBrands = (limit?: number) =>
  apiClient<GetPopularBrandsResponseT>(API_ENDPOINTS.brands.popular, {
    params: { limit },
  });
