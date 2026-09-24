"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

import type { MyPerfumeT } from "@/apis/user";
import ErrorState from "@/components/error-state";

import PerfumeShelfGrid from "./PerfumeShelfGrid";
import ShelfViewToggle from "./ShelfViewToggle";
import type { ShelfViewT } from "./ShelfViewToggle";
import ShelfErrorBoundary from "./shelf-3d/ShelfErrorBoundary";

/** three.js는 무거워서 마이페이지를 열 때만 내려받는다 */
const Shelf3DScene = dynamic(() => import("./shelf-3d/Shelf3DScene"), {
  ssr: false,
  loading: () => (
    <p className="py-12 text-center font-sans text-[13px] text-muted">
      진열장을 준비하고 있어요
    </p>
  ),
});

type PerfumeShelf3DProps = {
  myPerfumes: MyPerfumeT[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
};

/** WebGL을 못 쓰는 기기에서는 3D를 아예 시도하지 않는다. 확인 비용이 있어 한 번만 재본다 */
let webGLSupport: boolean | null = null;

const canUseWebGL = () => {
  if (webGLSupport !== null) return webGLSupport;

  try {
    const canvas = document.createElement("canvas");
    webGLSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webGLSupport = false;
  }
  return webGLSupport;
};

const subscribeNever = () => () => {};

/** 서버에서는 WebGL을 판단할 수 없어, 클라이언트로 넘어온 뒤에만 3D를 켠다 */
const useIsClient = () =>
  useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

function PerfumeShelf3D({
  myPerfumes,
  isPending,
  isError,
  onRetry,
}: PerfumeShelf3DProps) {
  const isClient = useIsClient();
  const [view, setView] = useState<ShelfViewT>("shelf3d");

  if (isPending) {
    return (
      <p className="py-12 text-center font-sans text-[13px] text-muted">
        불러오는 중이에요
      </p>
    );
  }

  // 조회 실패를 "향수장이 비어 있어요"로 보여주지 않는다
  if (isError) {
    return <ErrorState message="향수장을 불러오지 못했어요." onRetry={onRetry} />;
  }

  if (myPerfumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-paper px-6 py-16 text-center">
        <span className="text-3xl">🧴</span>
        <p className="font-serif text-sm text-charcoal">향수장이 비어 있어요</p>
        <p className="font-sans text-xs text-muted">
          마음에 드는 향수를 향수장에 담아보세요
        </p>
      </div>
    );
  }

  // 3D를 못 그리는 기기에서는 전환할 것이 없어 목록만 보여준다
  const canShow3D = isClient && canUseWebGL();
  if (!canShow3D) return <PerfumeShelfGrid myPerfumes={myPerfumes} />;

  return (
    <>
      <ShelfViewToggle view={view} onChange={setView} />

      {view === "grid" ? (
        <PerfumeShelfGrid myPerfumes={myPerfumes} />
      ) : (
        <ShelfErrorBoundary fallback={<PerfumeShelfGrid myPerfumes={myPerfumes} />}>
          {/* 프로필·탭·하단 네비를 뺀 나머지를 채워, 진열장 아래에 빈 공간이 남지 않게 한다 */}
          <div className="h-[calc(100dvh-350px)] min-h-[280px] w-full overflow-hidden rounded-2xl border border-border bg-white">
            <Shelf3DScene myPerfumes={myPerfumes} />
          </div>
          <p className="mt-2 text-center font-sans text-[11px] text-muted-light">
            드래그해 둘러보고 두 손가락으로 확대할 수 있어요
          </p>
        </ShelfErrorBoundary>
      )}
    </>
  );
}

export default PerfumeShelf3D;
