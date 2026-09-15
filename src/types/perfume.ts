/** 서버가 목록에서 돌려주는 향수 요약. 검색 · 좋아요 · 향수장이 공유한다 */
export type PerfumeSummaryT = {
  perfume_id: number;
  name: string;
  brand: string;
  notes?: string | null;
  image_url?: string | null;
  like_count?: number;
  category?: string | null;
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

export type PerfumeFamilyT = {
  name: string;
  color: string;
};

export type PerfumeAccordT = {
  name: string;
  percent: number;
};

export type PerfumeNoteT = {
  name: string;
  emoji: string;
};

export type PerfumeReviewT = {
  user: string;
  text: string;
  rating: number;
};

export type PerfumeDetailT = PerfumeT & {
  description: string;
  families: PerfumeFamilyT[];
  accords: PerfumeAccordT[];
  topNotes: PerfumeNoteT[];
  middleNotes: PerfumeNoteT[];
  baseNotes: PerfumeNoteT[];
  rating: number;
  reviewCount: number;
  ownedCount: number;
  likeCount: number;
};
