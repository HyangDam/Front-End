"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import type { MyPerfumeT } from "@/apis/user";

import CabinetFrame from "./CabinetFrame";
import FitCamera from "./FitCamera";
import PerfumeBottle from "./PerfumeBottle";
import ShelfBoard from "./ShelfBoard";
import {
  BOARD_THICKNESS,
  BOTTLE_HEIGHT,
  PERFUMES_PER_SHELF,
  SHELF_HEIGHT,
  SLOT_WIDTH,
} from "./shelf3d.const";

type Shelf3DSceneProps = {
  myPerfumes: MyPerfumeT[];
};

/** 맨 위 병과 천장 사이 여유. 0이면 병이 천장에 닿아 답답하다 */
const TOP_HEADROOM = 0.18;

/** 천장 마감판 두께. 화면에 담을 때도 중심을 잡을 때도 포함해야 한다 */
const FRAME_CAP = 0.1;

const chunk = <T,>(items: T[], size: number) =>
  items.reduce<T[][]>((rows, item, index) => {
    if (index % size === 0) rows.push([]);
    rows[rows.length - 1].push(item);
    return rows;
  }, []);

function Shelf3DScene({ myPerfumes }: Shelf3DSceneProps) {
  const router = useRouter();

  const rows = chunk(myPerfumes, PERFUMES_PER_SHELF);

  /**
   * 선반 판이 아니라 "병 꼭대기부터 맨 아래 판까지"를 기준으로 가운데를 맞춘다.
   * 판만 기준으로 삼으면 병 높이만큼 위로 쏠려 아래에 빈 공간이 남는다.
   */
  const contentTop = BOTTLE_HEIGHT;
  const contentBottom = -(rows.length - 1) * SHELF_HEIGHT - BOARD_THICKNESS;

  /**
   * 중심은 천장판까지 포함한 전체 높이로 잡는다.
   * 병과 선반만으로 잡으면 그 위의 천장이 화면 밖으로 밀려난다.
   */
  const frameTop = contentTop + TOP_HEADROOM + FRAME_CAP;
  const offsetY = -(frameTop + contentBottom) / 2;

  // 카메라가 얼마나 물러나야 전부 보이는지 계산할 기준
  const contentHeight = frameTop - contentBottom;
  const contentWidth = PERFUMES_PER_SHELF * SLOT_WIDTH;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      // 캔버스 위에서 손가락으로 회전할 수 있어야 해서 세로 스크롤을 넘기지 않는다
      style={{ touchAction: "none" }}
    >
      <FitCamera contentWidth={contentWidth} contentHeight={contentHeight} />

      {/* 전체를 밝히되, 위에서 내려오는 빛을 더해 선반마다 명암이 생기게 한다 */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[1.5, 5, 4]} intensity={0.55} />
      {rows.map((_row, rowIndex) => (
        <pointLight
          key={`light-${rowIndex}`}
          position={[0, offsetY - rowIndex * SHELF_HEIGHT + SHELF_HEIGHT * 0.8, 1.2]}
          intensity={2.2}
          distance={3.4}
          decay={2}
          color="#fff6ea"
        />
      ))}

      <group position={[0, offsetY, 0]}>
        {/* 선반 판과 같은 좌표계에 둬야 옆판이 판 끝에 정확히 맞물린다 */}
        <CabinetFrame
          width={contentWidth}
          top={contentTop + TOP_HEADROOM}
          bottom={contentBottom}
        />

        {rows.map((row, rowIndex) => {
          const boardY = -rowIndex * SHELF_HEIGHT;
          // 한 줄에 놓인 개수만큼만 가로로 펼쳐 가운데 정렬한다
          const startX = -((row.length - 1) * SLOT_WIDTH) / 2;

          return (
            <group key={rowIndex}>
              <ShelfBoard y={boardY} slots={PERFUMES_PER_SHELF} />
              {row.map(({ id, perfume }, slotIndex) =>
                perfume.image_url ? (
                  <Suspense key={id} fallback={null}>
                    <PerfumeBottle
                      imageUrl={perfume.image_url}
                      position={[startX + slotIndex * SLOT_WIDTH, boardY, 0]}
                      onSelect={() => router.push(`/perfumes/${perfume.perfume_id}`)}
                    />
                  </Suspense>
                ) : (
                  <mesh
                    key={id}
                    position={[
                      startX + slotIndex * SLOT_WIDTH,
                      boardY + BOTTLE_HEIGHT / 2,
                      0,
                    ]}
                    onClick={() => router.push(`/perfumes/${perfume.perfume_id}`)}
                  >
                    <boxGeometry args={[0.45, BOTTLE_HEIGHT, 0.3]} />
                    <meshLambertMaterial color="#e4dbcd" />
                  </mesh>
                ),
              )}
            </group>
          );
        })}
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        // 층이 많으면 직접 당겨서 보고 싶을 수 있어 확대·축소를 연다
        enableZoom
        zoomSpeed={0.6}
        minDistance={2.2}
        maxDistance={14}
        // 진열장을 정면 기준으로 좌우로만 살짝 돌려본다
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}

export default Shelf3DScene;
