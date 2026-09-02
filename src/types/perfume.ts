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
  // 배포 서버에 아직 데이터/필드가 채워지지 않아 응답에서 빠질 수 있음
  type?: string;
  category?: string;
  target_audience?: string;
  longevity?: string;
  average_rating?: number;
  is_liked?: boolean | null;
  is_owned?: boolean | null;
  can_write_review?: boolean | null;
  my_review_id?: number | null;
};

export type PerfumeAccordT = {
  name: string;
  value: number;
};

export type PerfumeAccordsT = {
  perfume_id: number;
  accords: PerfumeAccordT[];
};

export type PerfumeNotesT = {
  top: string[];
  middle: string[];
  base: string[];
};

export type PerfumeNotesVisualizationT = {
  perfume_id: number;
  notes: PerfumeNotesT;
};
