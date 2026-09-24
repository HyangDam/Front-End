"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

import { cutOutWhiteBackground } from "./cutout";
import { BOTTLE_HEIGHT, BOTTLE_WIDTH, SHELF_COLORS } from "./shelf3d.const";

type PerfumeBottleProps = {
  imageUrl: string;
  position: [number, number, number];
  onSelect: () => void;
};

/** 반사가 선명하면 실제 병처럼 안 보이고 사진을 뒤집어 붙인 티가 난다 */
const REFLECTION_OPACITY = 0.22;
const REFLECTION_SCALE = 0.45;

/**
 * 제품 사진을 세워 놓은 형태로 진열한다.
 * 병 모델을 향수마다 만들 수 없으니, 흰 배경으로 촬영된 제품 사진을 그대로 세운다.
 */
function PerfumeBottle({ imageUrl, position, onSelect }: PerfumeBottleProps) {
  const loadedTexture = useTexture(imageUrl);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * 흰 배경을 지운 텍스처. 그대로 쓰면 병이 흰 카드처럼 보인다.
   * 픽셀을 못 읽는 경우(CORS 등)에는 원본을 그대로 쓴다.
   */
  const texture = useMemo(() => {
    const image = loadedTexture.image;
    if (!(image instanceof HTMLImageElement)) return loadedTexture;

    const canvas = cutOutWhiteBackground(image);
    if (!canvas) return loadedTexture;

    const cutout = new THREE.CanvasTexture(canvas);
    cutout.colorSpace = loadedTexture.colorSpace;
    return cutout;
  }, [loadedTexture]);

  // 배경을 지운 텍스처는 우리가 만든 것이라 직접 정리한다
  useEffect(() => {
    if (texture === loadedTexture) return;
    return () => texture.dispose();
  }, [texture, loadedTexture]);

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

      {/*
        선반 위에 눕혀 깐 반사. 세워서 그리면 판 안쪽에 묻혀 보이지 않는다.
        위에서 살짝 내려다보는 시점이라 바닥에 비친 것처럼 읽힌다.
      */}
      <mesh
        position={[0, 0.006, (height * REFLECTION_SCALE) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, -1, 1]}
        raycast={() => null}
      >
        <planeGeometry args={[width, height * REFLECTION_SCALE]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={REFLECTION_OPACITY}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* 바닥에 닿는 지점을 어둡게 해 떠 있어 보이지 않게 한다 */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <circleGeometry args={[width * 0.36, 24]} />
        <meshBasicMaterial
          color={isHovered ? SHELF_COLORS.highlight : "#9c8f7d"}
          transparent
          opacity={isHovered ? 0.4 : 0.22}
        />
      </mesh>
    </group>
  );
}

export default PerfumeBottle;
