import type { StaticImageData } from "next/image";

import googleIcon from "@/assets/icons/social/google.svg";
import kakaoIcon from "@/assets/icons/social/kakao.svg";
import type { SocialProviderT } from "@/types/auth";

type SocialProviderOptionT = {
  id: SocialProviderT;
  label: string;
  icon: StaticImageData;
};

export const SOCIAL_PROVIDERS: SocialProviderOptionT[] = [
  { id: "google", label: "Google로 시작하기", icon: googleIcon },
  { id: "kakao", label: "카카오로 시작하기", icon: kakaoIcon },
];
