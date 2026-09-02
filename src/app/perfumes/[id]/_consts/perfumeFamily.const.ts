type FragranceFamilyInfoT = {
  label: string;
  color: string;
};

// 백엔드는 category/accord를 영문 키(floral, woody ...)로 내려준다 — 팀 확정 계열 명칭은 SEARCH_FAMILY_FILTERS 참고
const FRAGRANCE_FAMILY_MAP: Record<string, FragranceFamilyInfoT> = {
  floral: { label: "플로럴", color: "#e0b8c0" },
  woody: { label: "우디", color: "#c8b89a" },
  citrus: { label: "시트러스", color: "#d0c8b8" },
  oriental: { label: "오리엔탈", color: "#e8c8a0" },
  musk: { label: "머스크", color: "#b8a898" },
  musky: { label: "머스크", color: "#b8a898" },
  spicy: { label: "스파이시", color: "#a8a880" },
  fresh: { label: "프레시", color: "#b8d0c8" },
  fruity: { label: "프루티", color: "#e0d0c0" },
  green: { label: "그린", color: "#c8d8c0" },
  aquatic: { label: "아쿠아틱", color: "#b8c8d8" },
  powdery: { label: "파우더리", color: "#e0d8d0" },
  gourmand: { label: "구르망", color: "#d8c0a8" },
  leather: { label: "레더", color: "#a89888" },
  aromatic: { label: "아로마틱", color: "#b8c8b0" },
  chypre: { label: "시프레", color: "#c0c0a8" },
};

const DEFAULT_FRAGRANCE_FAMILY_INFO: FragranceFamilyInfoT = {
  label: "",
  color: "#c8c0b0",
};

// 매핑에 없는 값은 색상만 기본값을 쓰고 라벨은 원문(영문) 그대로 노출한다
export const getFragranceFamilyInfo = (key: string): FragranceFamilyInfoT => {
  const info = FRAGRANCE_FAMILY_MAP[key.toLowerCase()];
  if (info) return info;
  return { ...DEFAULT_FRAGRANCE_FAMILY_INFO, label: key };
};
