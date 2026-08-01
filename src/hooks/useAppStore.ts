import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppStoreT = {
  likes: number[];
  owned: number[];
  toggleLike: (perfumeId: number) => void;
  toggleOwned: (perfumeId: number) => void;
};

const toggleInArray = (list: number[], value: number) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export const useAppStore = create<AppStoreT>()(
  persist(
    (set) => ({
      likes: [],
      owned: [],
      toggleLike: (perfumeId) =>
        set((state) => ({ likes: toggleInArray(state.likes, perfumeId) })),
      toggleOwned: (perfumeId) =>
        set((state) => ({ owned: toggleInArray(state.owned, perfumeId) })),
    }),
    { name: "hyangdam-app-store" },
  ),
);
