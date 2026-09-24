import type { PerfumeSummaryT } from "@/types/perfume";

/** 서버 문자열 앞뒤에 공백이 섞여 오는 경우가 있어 다듬는다 */
const clean = (value?: string | null) => value?.trim() || null;

/**
 * 화면에 보여줄 향수 표기를 고른다.
 * display_* 가 한글 표기라 우선하고, 없으면 원본 필드로 떨어진다.
 */
export const getPerfumeDisplay = (perfume: PerfumeSummaryT) => ({
  name: clean(perfume.display_name) ?? clean(perfume.name) ?? "",
  brand: clean(perfume.display_brand) ?? clean(perfume.brand) ?? "",
  notes: clean(perfume.display_notes) ?? clean(perfume.notes),
});
