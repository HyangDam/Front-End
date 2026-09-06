"use client";

import Image from "next/image";
import { useState } from "react";

import profileIcon from "@/assets/icons/profile.svg";

type ProfileImageFieldProps = {
  imageUrl: string | null;
};

/**
 * 이미지 업로드 API가 아직 없어서 현재 사진만 보여준다.
 * 업로드 엔드포인트가 생기면 여기에 파일 선택을 붙인다.
 */
function ProfileImageField({ imageUrl }: ProfileImageFieldProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2.5 py-2">
      <div className="flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full border border-border bg-ivory-200">
        {imageUrl && !hasImageError ? (
          <Image
            src={imageUrl}
            alt=""
            width={76}
            height={76}
            unoptimized
            onError={() => setHasImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image src={profileIcon} alt="" width={34} height={34} />
        )}
      </div>
      <p className="font-sans text-[11px] text-muted-light">
        프로필 사진은 소셜 계정 사진을 사용해요
      </p>
    </div>
  );
}

export default ProfileImageField;
