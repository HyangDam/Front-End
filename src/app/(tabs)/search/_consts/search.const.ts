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

export const SEARCH_SORT_OPTIONS = ["인기순", "최신순", "가격순"] as const;

export type SearchSortOptionT = (typeof SEARCH_SORT_OPTIONS)[number];
