"use client";

import {
  BOARD_DEPTH,
  BOARD_THICKNESS,
  SHELF_COLORS,
  SLOT_WIDTH,
} from "./shelf3d.const";

type ShelfBoardProps = {
  y: number;
  slots: number;
};

/** 향수가 올라가는 선반 판 한 장 */
function ShelfBoard({ y, slots }: ShelfBoardProps) {
  const width = slots * SLOT_WIDTH;

  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, -BOARD_THICKNESS / 2, 0]}>
        <boxGeometry args={[width, BOARD_THICKNESS, BOARD_DEPTH]} />
        <meshLambertMaterial color={SHELF_COLORS.board} />
      </mesh>

      {/* 앞면에 얇은 띠를 둬 판이 두꺼워 보이게 한다 */}
      <mesh position={[0, -BOARD_THICKNESS, BOARD_DEPTH / 2]}>
        <planeGeometry args={[width, BOARD_THICKNESS * 0.6]} />
        <meshBasicMaterial color={SHELF_COLORS.boardEdge} />
      </mesh>
    </group>
  );
}

export default ShelfBoard;
