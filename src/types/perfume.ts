/** 서버가 목록에서 돌려주는 향수 요약. 검색 · 좋아요 · 향수장이 공유한다 */
export type PerfumeSummaryT = {
  perfume_id: number;
  name: string;
  brand: string;
  notes?: string | null;
  image_url?: string | null;
  like_count?: number;
  category?: string | null;
  /** 서버가 한글 표기를 따로 내려주는 필드. 노트는 이쪽만 한글이라 우선 사용한다 */
  display_name?: string | null;
  display_brand?: string | null;
  display_notes?: string | null;
};

export type PerfumeT = {
  id: number;
  name: string;
  brand: string;
  brandKr: string;
  price: string;
  img?: string;
  familyNames?: string[];
  popularity?: number;
  releasedAt?: string;
};

export type PerfumeReviewT = {
  review_id: number;
  user_id: number;
  perfume_id: number;
  rating: number;
  content: string;
  created_at: string | null;
  updated_at: string | null;
  // 백엔드에 닉네임 필드 추가 예정 — 배포 전까지는 응답에 없을 수 있음
  nickname?: string | null;
};

export type PerfumeReviewsT = {
  perfume_id: number;
  review_count: number;
  results: PerfumeReviewT[];
};

export type PerfumeAccordT = {
  id: string;
  label: string;
  color: string;
  score: number;
  matched_notes: string[];
  percentage: number;
};

export type PerfumeNoteT = {
  id: string;
  label_ko: string;
  label_en: string;
  icon_key: string;
  raw_note: string;
};

export type PerfumeNotePyramidT = {
  source: string;
  message: string;
  top: PerfumeNoteT[];
  middle: PerfumeNoteT[];
  base: PerfumeNoteT[];
};

export type PerfumeNoteVisualizationT = {
  source: string;
  message: string;
  main_accords: PerfumeAccordT[];
  accord_bars: PerfumeAccordT[];
  featured_notes: PerfumeNoteT[];
  note_pyramid: PerfumeNotePyramidT;
};

export type PerfumeDetailT = {
  perfume_id: number;
  name: string;
  brand: string;
  notes: string;
  description: string;
  image_url: string;
  like_count: number;
  owned_count: number;
  review_count: number;
  representative_price: number | null;
  released_at: string | null;
  category: string;
  categories: string[];
  /** 서버가 한글 표기를 따로 내려주는 필드. 노트는 이쪽만 한글이라 우선 사용한다 */
  display_name?: string | null;
  display_brand?: string | null;
  display_notes?: string | null;
  // 배포 서버에 아직 데이터/필드가 채워지지 않아 응답에서 빠질 수 있음
  description_ko?: string;
  note_visualization?: PerfumeNoteVisualizationT;
  type?: string;
  target_audience?: string;
  longevity?: string;
  average_rating?: number;
  is_liked?: boolean | null;
  is_owned?: boolean | null;
  can_write_review?: boolean | null;
  my_review_id?: number | null;
};

export type PerfumePriceLinkT = {
  retailer: string;
  url: string;
  type: string;
};

export type PerfumePriceComparisonT = {
  perfume_id: number;
  query: string;
  price_status: string;
  message: string;
  // 실제 값이 채워진 사례를 아직 못 봐서 형태 미확정 — 현재는 항상 빈 배열
  offers: unknown[];
  links: PerfumePriceLinkT[];
};
