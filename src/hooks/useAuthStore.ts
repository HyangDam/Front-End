import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthUserT } from "@/types/user";

type AuthStoreT = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUserT | null;
  setSession: (session: {
    accessToken: string;
    refreshToken: string;
    user: AuthUserT;
  }) => void;
  /** 재발급 응답으로 토큰만 갱신한다 (사용자 정보는 그대로 둔다) */
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: AuthUserT) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStoreT>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setSession: ({ accessToken, refreshToken, user }) =>
        set({ accessToken, refreshToken, user }),
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    { name: "hyangdam-auth" },
  ),
);

export const useIsLoggedIn = () => useAuthStore((state) => state.accessToken !== null);
