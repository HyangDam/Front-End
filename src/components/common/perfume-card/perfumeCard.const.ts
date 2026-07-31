export type PerfumeCardVariant = "default" | "compact" | "hscroll";

export const PERFUME_CARD_IMAGE_HEIGHT: Record<PerfumeCardVariant, number> = {
  default: 140,
  compact: 96,
  hscroll: 116,
};

export const PERFUME_CARD_BOTTLE_HEIGHT: Record<PerfumeCardVariant, number> = {
  default: 140,
  compact: 76,
  hscroll: 92,
};

export const PERFUME_CARD_NAME_MAX_LENGTH: Partial<Record<PerfumeCardVariant, number>> = {
  compact: 8,
  hscroll: 7,
};