import { API_ENDPOINTS } from "@/consts/api";
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
