import { create } from "zustand";

import type { CurrentPerfumeT } from "@/types/onboarding";
import type { GenderT } from "@/types/user";

import type { OnboardingDraftT } from "../_types/onboardingDraft";

type OnboardingStoreT = OnboardingDraftT & {
  setGender: (gender: GenderT) => void;
  setBirthDate: (birthDate: string) => void;
  toggleCurrentPerfume: (perfume: CurrentPerfumeT) => void;
  toggleBrand: (brand: string) => void;
  toggleScent: (categoryId: string) => void;
  reset: () => void;
};

const toggleInArray = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const INITIAL_DRAFT: OnboardingDraftT = {
  gender: "",
  birthDate: "",
  currentPerfumes: [],
  brands: [],
  scents: [],
};

export const useOnboardingStore = create<OnboardingStoreT>((set) => ({
  ...INITIAL_DRAFT,
  setGender: (gender) => set({ gender }),
  setBirthDate: (birthDate) => set({ birthDate }),
  toggleCurrentPerfume: (perfume) =>
    set((state) => ({
      currentPerfumes: state.currentPerfumes.some(
        (item) => item.perfume_id === perfume.perfume_id,
      )
        ? state.currentPerfumes.filter((item) => item.perfume_id !== perfume.perfume_id)
        : [...state.currentPerfumes, perfume],
    })),
  toggleBrand: (brand) =>
    set((state) => ({ brands: toggleInArray(state.brands, brand) })),
  toggleScent: (categoryId) =>
    set((state) => ({ scents: toggleInArray(state.scents, categoryId) })),
  reset: () => set(INITIAL_DRAFT),
}));
