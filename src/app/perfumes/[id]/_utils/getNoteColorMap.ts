import type { PerfumeAccordT } from "@/types/perfume";

/**
 * 어코드의 matched_notes에 있는 원문 노트만 그 어코드 색으로 매칭된다.
 * 상위 어코드에 안 걸린 노트는 매칭되는 색이 없다.
 */
export const getNoteColorMap = (accords: PerfumeAccordT[]): Record<string, string> => {
  const map: Record<string, string> = {};
  accords.forEach((accord) => {
    accord.matched_notes.forEach((note) => {
      map[note.toLowerCase()] = accord.color;
    });
  });
  return map;
};
