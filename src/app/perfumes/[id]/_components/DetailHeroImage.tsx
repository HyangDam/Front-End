"use client";

import Image from "next/image";
import { useState } from "react";

import EditorialBottle from "@/components/perfume-card/EditorialBottle";
import type { PerfumeT } from "@/types/perfume";

type DetailHeroImageProps = {
  perfume: PerfumeT;
};

function DetailHeroImage({ perfume }: DetailHeroImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex h-[260px] items-center justify-center border-b border-border bg-[#fafaf7]">
      {perfume.img && !imgError ? (
        // 백엔드 이미지 도메인이 아직 확정되지 않아 remotePatterns 없이 unoptimized로 사용
        <Image
          src={perfume.img}
          alt={perfume.name}
          fill
          unoptimized
          sizes="420px"
          className="object-contain p-10"
          onError={() => setImgError(true)}
        />
      ) : (
        <EditorialBottle brand={perfume.brand} height={260} />
      )}
    </div>
  );
}

export default DetailHeroImage;
