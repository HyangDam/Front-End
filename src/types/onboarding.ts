/** /categories 가 돌려주는 선택지 하나 */
export type CategoryT = {
  id: string;
  label: string;
  sub_label: string;
  keywords: string[];
};

/** 선택지 묶음. 온보딩 화면별로 필요한 그룹만 골라 쓴다 */
export type CategoryGroupT = "situation" | "mood" | "note_family" | "avoid";

/** 사용자가 지금 쓰는 향수. 취향 저장 시 그대로 전송한다 */
export type CurrentPerfumeT = {
  perfume_id: number;
  name: string;
  brand: string;
};

export type PreferredTargetT = "male" | "female" | "unisex";
