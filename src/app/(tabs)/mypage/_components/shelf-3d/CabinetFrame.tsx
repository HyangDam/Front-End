"use client";

import { BOARD_DEPTH, SHELF_COLORS } from "./shelf3d.const";

type CabinetFrameProps = {
  /** 선반 판의 가로 길이. 옆판이 여기에 정확히 맞물려야 틈이 안 생긴다 */
  width: number;
  top: number;
  bottom: number;
};

const SIDE_THICKNESS = 0.08;

/**
 * 선반만 떠 있으면 진열대처럼 보여서, 뒤와 옆을 막아 "장"으로 읽히게 한다.
 * 아래쪽은 맨 밑 선반이 바닥 역할을 하므로 따로 판을 두지 않는다.
 */
function CabinetFrame({ width, top, bottom }: CabinetFrameProps) {
  const height = top - bottom;
  const centerY = (top + bottom) / 2;
  const backZ = -BOARD_DEPTH / 2;

  return (
    <group position={[0, centerY, 0]}>
      <mesh position={[0, 0, backZ]}>
        <planeGeometry args={[width, height]} />
        <meshLambertMaterial color={SHELF_COLORS.backdrop} />
      </mesh>

      {/* 옆판 안쪽 면이 선반 끝과 맞닿도록 두께의 절반만큼 바깥에 둔다 */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[(side * (width + SIDE_THICKNESS)) / 2, 0, backZ + BOARD_DEPTH / 2]}
        >
          <boxGeometry args={[SIDE_THICKNESS, height, BOARD_DEPTH]} />
          <meshLambertMaterial color={SHELF_COLORS.board} />
        </mesh>
      ))}

      <mesh
        position={[0, (height + SIDE_THICKNESS) / 2, backZ + BOARD_DEPTH / 2]}
      >
        <boxGeometry
          args={[width + SIDE_THICKNESS * 2, SIDE_THICKNESS, BOARD_DEPTH]}
        />
        <meshLambertMaterial color={SHELF_COLORS.board} />
      </mesh>
    </group>
  );
}

export default CabinetFrame;
