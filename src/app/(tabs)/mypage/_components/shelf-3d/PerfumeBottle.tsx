"use client";

import { useTexture } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

import { BOTTLE_HEIGHT, BOTTLE_WIDTH, SHELF_COLORS } from "./shelf3d.const";

type PerfumeBottleProps = {
  imageUrl: string;
  position: [number, number, number];
  onSelect: () => void;
};

/**
 * 제품 사진을 세워 놓은 형태로 진열한다.
 * 병 모델을 향수마다 만들 수 없으니, 흰 배경으로 촬영된 제품 사진을 그대로 세운다.
 */
function PerfumeBottle({ imageUrl, position, onSelect }: PerfumeBottleProps) {
  const texture = useTexture(imageUrl);
  const [isHovered, setIsHovered] = useState(false);

  // 사진 비율을 지켜야 병이 찌그러지지 않는다
  const image = texture.image as { width: number; height: number } | undefined;
  const ratio = image?.width && image?.height ? image.width / image.height : 0.8;
  const height = BOTTLE_HEIGHT;
  const width = Math.min(BOTTLE_WIDTH, height * ratio);

  return (
    <group position={position}>
      <mesh
        position={[0, height / 2, 0]}
        scale={isHovered ? 1.06 : 1}
        onClick={onSelect}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* 바닥에 비치는 그림자 대신 얇은 타원으로 무게감만 준다 */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[width * 0.38, 24]} />
        <meshBasicMaterial
          color={isHovered ? SHELF_COLORS.highlight : "#b9ac99"}
          transparent
          opacity={isHovered ? 0.35 : 0.18}
        />
      </mesh>
    </group>
  );
}

export default PerfumeBottle;
