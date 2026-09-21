import type { PerfumeNoteT } from "@/types/perfume";

/** note_pyramid가 비어있을 때(TOP/MIDDLE/BASE 구분 없는 향수) notes 원문 문자열로 대체한다 */
export const toFallbackNotes = (rawNotes: string): PerfumeNoteT[] =>
  rawNotes
    .split(",")
    .map((note) => note.trim())
    .filter(Boolean)
    .map((note) => ({
      id: note,
      label_ko: note,
      label_en: note,
      icon_key: note,
      raw_note: note,
    }));
