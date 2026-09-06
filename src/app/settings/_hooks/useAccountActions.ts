"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { postLogout } from "@/apis/auth";
import { deleteMe } from "@/apis/user";
import { useAuthStore } from "@/hooks/useAuthStore";

export const useAccountActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refreshToken, clearSession } = useAuthStore();

  /** 로그아웃·탈퇴 모두 세션과 캐시를 비우고 로그인 화면으로 돌려보낸다 */
  const endSession = () => {
    clearSession();
    queryClient.clear();
    router.replace("/login");
  };

  const {
    mutate: postLogoutMutation,
    isPending: isPostLogoutPending,
    error: postLogoutError,
  } = useMutation({
    mutationFn: () => postLogout({ refresh_token: refreshToken ?? "" }),
    // 서버 만료에 실패해도 이 기기에서는 로그아웃시키는 게 사용자 기대에 맞다
    onSettled: endSession,
  });

  const {
    mutate: deleteMeMutation,
    isPending: isDeleteMePending,
    error: deleteMeError,
  } = useMutation({
    mutationFn: () => deleteMe(),
    onSuccess: endSession,
  });

  return {
    postLogoutMutation,
    isPostLogoutPending,
    postLogoutError,
    deleteMeMutation,
    isDeleteMePending,
    deleteMeError,
  };
};
