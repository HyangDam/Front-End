"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import type { PerspectiveCamera } from "three";

type FitCameraProps = {
  contentWidth: number;
  contentHeight: number;
};

/** 여백 비율. 1이면 진열장이 화면에 꽉 차 답답해 보인다 */
const MARGIN = 1.12;

/**
 * 진열장 전체가 화면에 들어오도록 카메라를 물린다.
 * 층이 늘어나면 위아래가 잘리기 때문에 개수에 따라 거리를 다시 계산한다.
 */
function FitCamera({ contentWidth, contentHeight }: FitCameraProps) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const controls = useThree((state) => state.controls) as {
    update?: () => void;
  } | null;

  useEffect(() => {
    // 레이아웃이 잡히기 전에는 크기가 0이라 비율을 계산할 수 없다
    if (!size.width || !size.height) return;

    const perspective = camera as PerspectiveCamera;
    const halfFov = (perspective.fov * Math.PI) / 360;
    const aspect = size.width / size.height;

    // 세로로 다 담기는 거리와 가로로 다 담기는 거리 중 더 먼 쪽을 쓴다
    const distanceForHeight = contentHeight / 2 / Math.tan(halfFov);
    const distanceForWidth = contentWidth / 2 / (Math.tan(halfFov) * aspect);

    /**
     * 완전히 정면이면 선반 위가 안 보여 반사가 드러나지 않는다.
     * 눈높이를 조금 올려 살짝 내려다보게 한다.
     */
    const distance = Math.max(distanceForHeight, distanceForWidth) * MARGIN;
    perspective.position.set(0, contentHeight * 0.13, distance);
    perspective.lookAt(0, 0, 0);
    perspective.updateProjectionMatrix();

    // 컨트롤이 예전 위치를 들고 있으면 카메라를 되돌려버린다
    controls?.update?.();
  }, [camera, controls, size, contentWidth, contentHeight]);

  return null;
}

export default FitCamera;
