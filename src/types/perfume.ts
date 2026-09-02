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
  user: string;
  text: string;
  rating: number;
};

export type PerfumeDetailT = {
  perfume_id: number;
  name: string;
  brand: string;
  type: string;
  category: string;
  target_audience: string;
  longevity: string;
  notes: string;
  description: string;
  image_url: string;
  like_count: number;
  owned_count: number;
  review_count: number;
  average_rating: number;
  is_liked: boolean | null;
  is_owned: boolean | null;
  can_write_review: boolean | null;
  my_review_id: number | null;
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
