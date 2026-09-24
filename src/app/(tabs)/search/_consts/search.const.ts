/**
 * 향 계열 필터. GET /perfumes/search의 category 파라미터 값(백엔드
 * note_family 계열 id)을 그대로 매핑한다. 여러 계열을 comma로 함께
 * 보내면 교집합(AND)으로 필터링된다 — 향이 같이 나는 향수를 찾는
 * 용도라 자연스러운 동작이라 그대로 사용한다.
 */
export const SEARCH_FAMILY_TO_CATEGORY = {
  플로럴: "floral",
  우디: "woody",
  시트러스: "citrus",
  오리엔탈: "oriental",
  머스크: "musk",
  스파이시: "spicy",
  아쿠아틱: "aquatic",
  그린: "green",
  파우더리: "powdery",
  구르망: "gourmand",
  프레시: "fresh",
  어시: "earthy",
} as const;

export type SearchNonAllFamilyFilterT = keyof typeof SEARCH_FAMILY_TO_CATEGORY;

const CATEGORY_TO_SEARCH_FAMILY = Object.fromEntries(
  Object.entries(SEARCH_FAMILY_TO_CATEGORY).map(([label, category]) => [category, label]),
) as Record<string, SearchNonAllFamilyFilterT>;

/** 매거진 등에서 /search?category=floral,woody로 들어올 때 초기 필터로 변환한다 */
export const parseCategoryParam = (
  categoryParam: string | null,
): SearchNonAllFamilyFilterT[] => {
  if (!categoryParam) return [];
  return categoryParam
    .split(",")
    .map((category) => CATEGORY_TO_SEARCH_FAMILY[category.trim()])
    .filter((label): label is SearchNonAllFamilyFilterT => Boolean(label));
};

export const SEARCH_SORT_OPTIONS = ["인기순", "최신순"] as const;

export type SearchSortOptionT = (typeof SEARCH_SORT_OPTIONS)[number];

/** 백엔드는 popular · weekly_popular · name만 지원 — 최신순 대응값이 없어 비활성화 처리 */
export const SEARCH_UNSUPPORTED_SORTS: readonly SearchSortOptionT[] = ["최신순"];

/** GET /perfumes/search의 sort 파라미터 값 */
export const SEARCH_SORT_TO_PARAM: Record<SearchSortOptionT, string> = {
  인기순: "popular",
  최신순: "popular",
};
