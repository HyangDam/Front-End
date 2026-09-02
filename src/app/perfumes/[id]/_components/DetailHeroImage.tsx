"use client";

import Image from "next/image";
import { useState } from "react";

import EditorialBottle from "@/components/perfume-card/EditorialBottle";

type DetailHeroImageProps = {
  name: string;
  brand: string;
  imageUrl: string;
};

function DetailHeroImage({ name, brand, imageUrl }: DetailHeroImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex h-[260px] items-center justify-center border-b border-border bg-[#fafaf7]">
      {imageUrl && !imgError ? (
        // 백엔드 이미지 도메인이 아직 확정되지 않아 remotePatterns 없이 unoptimized로 사용
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          sizes="420px"
          className="object-contain p-10"
          onError={() => setImgError(true)}
        />
      ) : (
        <EditorialBottle brand={brand} height={260} />
      )}
    </div>
  );
}

export default DetailHeroImage;
