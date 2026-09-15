import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeSummaryT } from "@/types/perfume";
import type { GenderT, UserT } from "@/types/user";

import { apiClient } from "./apiClient";

export const getMe = () => apiClient<UserT>(API_ENDPOINTS.users.me, { auth: true });

/** 모든 항목이 선택이라, 온보딩처럼 일부만 채워 보낼 때도 쓴다 */
export type PatchMeRequestT = {
  name?: string;
  nickname?: string;
  gender?: GenderT;
  /** YYYY-MM-DD */
  birth_date?: string;
  profile_image_url?: string;
};

export const patchMe = (body: PatchMeRequestT) =>
  apiClient<UserT>(API_ENDPOINTS.users.me, {
    method: "PATCH",
    auth: true,
    body,
  });

export type GetLikedPerfumesResponseT = {
  user_id: number;
  results: PerfumeSummaryT[];
};

export const getLikedPerfumes = () =>
  apiClient<GetLikedPerfumesResponseT>(API_ENDPOINTS.users.likedPerfumes, {
    auth: true,
  });

/** 향수장에 담긴 한 칸. 향수 정보는 perfume에 중첩돼 온다 */
export type MyPerfumeT = {
  id: number;
  user_id: number;
  perfume_id: number;
  status: string;
  perfume: PerfumeSummaryT;
  created_at: string | null;
};

export type GetMyPerfumesResponseT = {
  user_id: number;
  results: MyPerfumeT[];
};

export const getMyPerfumes = () =>
  apiClient<GetMyPerfumesResponseT>(API_ENDPOINTS.users.myPerfumes, { auth: true });

export type PostMyPerfumeRequestT = {
  perfume_id: number;
  status?: string;
};

export const postMyPerfume = (body: PostMyPerfumeRequestT) =>
  apiClient<MyPerfumeT>(API_ENDPOINTS.users.myPerfumes, {
    method: "POST",
    auth: true,
    body,
  });

export const deleteMyPerfume = (perfumeId: number) =>
  apiClient<void>(API_ENDPOINTS.users.myPerfume(perfumeId), {
    method: "DELETE",
    auth: true,
  });

export type DeleteMeRequestT = {
  reason?: string;
};

export type DeleteMeResponseT = {
  user_id: number;
  deleted: boolean;
  message: string;
};

export const deleteMe = (body: DeleteMeRequestT = {}) =>
  apiClient<DeleteMeResponseT>(API_ENDPOINTS.users.me, {
    method: "DELETE",
    auth: true,
    body,
  });
