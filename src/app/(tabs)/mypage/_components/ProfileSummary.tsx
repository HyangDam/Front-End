"use client";

import Image from "next/image";
import { useState } from "react";

import profileIcon from "@/assets/icons/profile.svg";

import { useGetMyProfile } from "../_hooks/useGetMyProfile";

const FALLBACK_NAME = "향기로운 손님";

/** "25세 · 플로럴, 우디 선호" 처럼, 있는 정보만 모아 한 줄로 만든다 */
const buildSubLabel = (age: number | null, preferredScents: string[]) => {
  const parts = [];
  if (age !== null) parts.push(`${age}세`);
  if (preferredScents.length > 0) parts.push(`${preferredScents.join(", ")} 선호`);
  return parts.join(" · ");
};

function ProfileSummary() {
  const { me, preferredScents, isMePending } = useGetMyProfile();

  // 소셜 프로필 이미지는 차단 확장 프로그램 등으로 실패할 수 있어 기본 아이콘으로 떨어뜨린다
  const [hasImageError, setHasImageError] = useState(false);

  const displayName = me?.nickname || me?.name || FALLBACK_NAME;
  const subLabel = buildSubLabel(me?.age ?? null, preferredScents);

  return (
    <div className="flex items-center gap-3.5 px-4 pb-4">
      <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-ivory-200">
        {me?.profile_image_url && !hasImageError ? (
          <Image
            src={me.profile_image_url}
            alt=""
            width={52}
            height={52}
            unoptimized
            onError={() => setHasImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image src={profileIcon} alt="" width={24} height={24} />
        )}
      </div>
      <div>
        <p className="mb-[3px] font-sans text-[15px] font-bold text-charcoal">
          {isMePending ? " " : displayName}
        </p>
        <p className="font-sans text-[11px] text-muted">{subLabel}</p>
      </div>
    </div>
  );
}

export default ProfileSummary;
