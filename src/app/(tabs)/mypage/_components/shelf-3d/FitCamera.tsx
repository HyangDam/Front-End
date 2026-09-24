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

  useEffect(() => {
    const perspective = camera as PerspectiveCamera;
    const halfFov = (perspective.fov * Math.PI) / 360;
    const aspect = size.width / size.height;

    // 세로로 다 담기는 거리와 가로로 다 담기는 거리 중 더 먼 쪽을 쓴다
    const distanceForHeight = contentHeight / 2 / Math.tan(halfFov);
    const distanceForWidth = contentWidth / 2 / (Math.tan(halfFov) * aspect);

    perspective.position.set(
      0,
      0,
      Math.max(distanceForHeight, distanceForWidth) * MARGIN,
    );
    perspective.updateProjectionMatrix();
  }, [camera, size, contentWidth, contentHeight]);

  return null;
}

export default FitCamera;
