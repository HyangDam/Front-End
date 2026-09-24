"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/apis/category";
import type { CategoryGroupT } from "@/types/onboarding";

/** 온보딩에서 필요한 그룹만 골라 쓴다 */
export const useGetCategories = (group: CategoryGroupT) => {
  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    categories: categoriesData?.categories[group] ?? [],
    isCategoriesPending,
  };
};

/** 선호 계열을 나타낼 때 쓰는 그룹 순서. 뒤 그룹이 같은 id를 덮어쓴다 */
const LABEL_GROUPS: CategoryGroupT[] = ["situation", "mood", "note_family"];

/**
 * 카테고리 id를 한글 라벨로 바꾼다.
 * AI 추천 응답은 그룹 구분 없이 id만 주기 때문에 그룹을 가로질러 찾아야 한다.
 */
export const useGetCategoryLabel = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const findIn = (group: CategoryGroupT, id: string) =>
    categoriesData?.categories[group]?.find((category) => category.id === id)?.label;

  /** 라벨을 못 찾으면 id를 그대로 보여준다 — 빈 칸보다는 낫다 */
  const getCategoryLabel = (id: string) =>
    LABEL_GROUPS.reduce<string | undefined>(
      (found, group) => found ?? findIn(group, id),
      undefined,
    ) ?? id;

  /** "스파이시" 대신 "스파이시한 향"처럼 회피 표현이 따로 있어 우선 찾는다 */
  const getAvoidCategoryLabel = (id: string) => findIn("avoid", id) ?? getCategoryLabel(id);

  return { getCategoryLabel, getAvoidCategoryLabel };
};
