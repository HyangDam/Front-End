import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";

import { apiClient } from "@/apis/apiClient";
import { API_ENDPOINTS } from "@/consts/api";
import type { PerfumeDetailT } from "@/types/perfume";

export const perfumeQueryKey = (perfumeId: number) => ["perfume", perfumeId] as const;

export type PostLikeResponseT = {
  perfume_id: number;
  liked: boolean;
  like_count: number;
};

export const postLike = (perfumeId: number) =>
  apiClient<PostLikeResponseT>(API_ENDPOINTS.perfumes.likes(perfumeId), {
    method: "POST",
    auth: true,
  });

export const deleteLike = (perfumeId: number) =>
  apiClient<PostLikeResponseT>(API_ENDPOINTS.perfumes.likes(perfumeId), {
    method: "DELETE",
    auth: true,
  });

const patchPerfumeLikeCache = (
  queryClient: QueryClient,
  perfumeId: number,
  response: PostLikeResponseT,
) => {
  queryClient.setQueryData<PerfumeDetailT>(perfumeQueryKey(perfumeId), (prev) =>
    prev ? { ...prev, is_liked: response.liked, like_count: response.like_count } : prev,
  );
};

export const usePostLike = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const { mutate: postLikeMutation, isPending: isPostLikePending } = useMutation({
    mutationFn: () => postLike(perfumeId),
    onSuccess: (data) => patchPerfumeLikeCache(queryClient, perfumeId, data),
  });
  return { postLikeMutation, isPostLikePending };
};

export const useDeleteLike = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteLikeMutation, isPending: isDeleteLikePending } = useMutation({
    mutationFn: () => deleteLike(perfumeId),
    onSuccess: (data) => patchPerfumeLikeCache(queryClient, perfumeId, data),
  });
  return { deleteLikeMutation, isDeleteLikePending };
};

export type PostOwnedPerfumeRequestT = {
  perfume_id: number;
};

export type PostOwnedPerfumeResponseT = {
  perfume_id: number;
  owned: boolean;
  owned_count: number;
};

export const postOwnedPerfume = (body: PostOwnedPerfumeRequestT) =>
  apiClient<PostOwnedPerfumeResponseT>(API_ENDPOINTS.users.perfumes, {
    method: "POST",
    auth: true,
    body,
  });

export const deleteOwnedPerfume = (perfumeId: number) =>
  apiClient<PostOwnedPerfumeResponseT>(API_ENDPOINTS.users.ownedPerfume(perfumeId), {
    method: "DELETE",
    auth: true,
  });

const patchPerfumeOwnedCache = (
  queryClient: QueryClient,
  perfumeId: number,
  response: PostOwnedPerfumeResponseT,
) => {
  queryClient.setQueryData<PerfumeDetailT>(perfumeQueryKey(perfumeId), (prev) =>
    prev
      ? { ...prev, is_owned: response.owned, owned_count: response.owned_count }
      : prev,
  );
};

export const usePostOwnedPerfume = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const { mutate: postOwnedPerfumeMutation, isPending: isPostOwnedPerfumePending } =
    useMutation({
      mutationFn: () => postOwnedPerfume({ perfume_id: perfumeId }),
      onSuccess: (data) => patchPerfumeOwnedCache(queryClient, perfumeId, data),
    });
  return { postOwnedPerfumeMutation, isPostOwnedPerfumePending };
};

export const useDeleteOwnedPerfume = (perfumeId: number) => {
  const queryClient = useQueryClient();
  const { mutate: deleteOwnedPerfumeMutation, isPending: isDeleteOwnedPerfumePending } =
    useMutation({
      mutationFn: () => deleteOwnedPerfume(perfumeId),
      onSuccess: (data) => patchPerfumeOwnedCache(queryClient, perfumeId, data),
    });
  return { deleteOwnedPerfumeMutation, isDeleteOwnedPerfumePending };
};
