"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import googleIcon from "@/assets/icons/social/google.svg";
import kakaoIcon from "@/assets/icons/social/kakao.svg";
import naverIcon from "@/assets/icons/social/naver.svg";

import SocialLoginButton from "./_components/SocialLoginButton";

export default function LoginPage() {
  const router = useRouter();

  const handleSocialLogin = () => {
    router.push("/onboarding/step-1");
  };

  return (
    <main className="flex h-full flex-1 flex-col items-center overflow-y-auto px-8 pt-[18vh]">
      <div className="flex flex-col items-center text-center">
        <p className="mb-[18px] font-mono text-[10px] uppercase tracking-[3px] text-muted">
          Perfume Finder
        </p>
        <h1 className="mb-4 font-serif text-[58px] leading-none tracking-[8px] text-charcoal">
          香談
        </h1>
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-7 bg-rose" />
          <p className="font-sans text-[10px] tracking-[2px] text-muted">
            나만의 향을 찾아서
          </p>
          <span className="h-px w-7 bg-rose" />
        </div>
      </div>

      <div className="mt-24 flex w-full flex-col gap-2.5">
        <SocialLoginButton
          variant="google"
          icon={<Image src={googleIcon} alt="" className="h-[18px] w-auto" />}
          label="Google로 시작하기"
          onClick={handleSocialLogin}
        />
        <SocialLoginButton
          variant="kakao"
          icon={<Image src={kakaoIcon} alt="" className="h-[18px] w-auto" />}
          label="카카오로 시작하기"
          onClick={handleSocialLogin}
        />
        <SocialLoginButton
          variant="naver"
          icon={<Image src={naverIcon} alt="" className="h-[18px] w-auto" />}
          label="네이버로 시작하기"
          onClick={handleSocialLogin}
        />
      </div>
    </main>
  );
}
