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
