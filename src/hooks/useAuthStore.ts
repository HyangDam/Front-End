import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserT } from "@/types/user";

type AuthStoreT = {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserT | null;
  setSession: (session: {
    accessToken: string;
    refreshToken: string;
    user: UserT;
  }) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: UserT) => void;
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
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    { name: "hyangdam-auth" },
  ),
);

export const useIsLoggedIn = () => useAuthStore((state) => state.accessToken !== null);
