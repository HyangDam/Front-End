import { API_ENDPOINTS } from "@/consts/api";

import { apiClient } from "./apiClient";

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
