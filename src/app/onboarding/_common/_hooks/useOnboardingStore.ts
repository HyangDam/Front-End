import { create } from "zustand";

import type { OnboardingDraftT } from "../_types/onboardingDraft";

type OnboardingStoreT = OnboardingDraftT & {
  setGender: (gender: string) => void;
  setAge: (age: string) => void;
  toggleCurrentPerfume: (name: string) => void;
  toggleBrand: (name: string) => void;
  toggleScent: (name: string) => void;
};

const toggleInArray = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export const useOnboardingStore = create<OnboardingStoreT>((set) => ({
  gender: "",
  age: "",
  currentPerfumes: [],
  brands: [],
  scents: [],
  setGender: (gender) => set({ gender }),
  setAge: (age) => set({ age }),
  toggleCurrentPerfume: (name) =>
    set((state) => ({ currentPerfumes: toggleInArray(state.currentPerfumes, name) })),
  toggleBrand: (name) => set((state) => ({ brands: toggleInArray(state.brands, name) })),
  toggleScent: (name) => set((state) => ({ scents: toggleInArray(state.scents, name) })),
}));
