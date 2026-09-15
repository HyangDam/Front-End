export const SEARCH_FAMILY_FILTERS = [
  "전체",
  "플로럴",
  "우디",
  "시트러스",
  "오리엔탈",
  "머스크",
  "스파이시",
] as const;

export type SearchFamilyFilterT = (typeof SEARCH_FAMILY_FILTERS)[number];

/** GET /perfumes/search의 category 파라미터 값 (백엔드 note_family 계열 id) */
export const SEARCH_FAMILY_TO_CATEGORY: Record<
  Exclude<SearchFamilyFilterT, "전체">,
  string
> = {
  플로럴: "floral",
  우디: "woody",
  시트러스: "citrus",
  오리엔탈: "oriental",
  머스크: "musk",
  스파이시: "spicy",
};

export const SEARCH_SORT_OPTIONS = ["인기순", "최신순", "가격순"] as const;

export type SearchSortOptionT = (typeof SEARCH_SORT_OPTIONS)[number];

/** 백엔드는 popular · weekly_popular · name만 지원 — 최신순 · 가격순 대응값이 없어 비활성화 처리 */
export const SEARCH_UNSUPPORTED_SORTS: readonly SearchSortOptionT[] = [
  "최신순",
  "가격순",
];

/** GET /perfumes/search의 sort 파라미터 값 */
export const SEARCH_SORT_TO_PARAM: Record<SearchSortOptionT, string> = {
  인기순: "popular",
  최신순: "popular",
  가격순: "popular",
};
