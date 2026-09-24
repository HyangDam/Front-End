/** 한 선반에 올리는 향수 개수. 모바일 가로폭에서 병이 겹치지 않는 최대치 */
export const PERFUMES_PER_SHELF = 3;

/** 선반 한 칸의 가로·세로 간격 (3D 단위) */
export const SLOT_WIDTH = 1.15;
export const SHELF_HEIGHT = 1.5;

/** 병 하나의 크기. 제품 사진이 세로로 길어 세로를 크게 잡는다 */
export const BOTTLE_WIDTH = 0.85;
export const BOTTLE_HEIGHT = 1.05;

/** 선반 판의 두께와 깊이 */
export const BOARD_THICKNESS = 0.07;
export const BOARD_DEPTH = 0.9;

export const SHELF_COLORS = {
  board: "#d8cdbd",
  boardEdge: "#c0b3a0",
  backdrop: "#f5efe3",
  highlight: "#c4a090",
} as const;
