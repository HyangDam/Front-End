"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { SOCIAL_PROVIDERS } from "../_consts/socialProviders.const";
import { useSocialLogin } from "../_hooks/useSocialLogin";
import { GOOGLE_SDK_URL } from "../_utils/googleAuth";
import SocialLoginButton from "./SocialLoginButton";

function SocialLoginSection() {
  const {
    postSocialLoginMutation,
    isPostSocialLoginPending,
    postSocialLoginError,
    pendingProvider,
  } = useSocialLogin();

  return (
    <>
      <Script src={GOOGLE_SDK_URL} strategy="afterInteractive" />

      <div className="mt-24 flex w-full flex-col gap-2.5">
        {SOCIAL_PROVIDERS.map(({ id, label, icon }) => (
          <SocialLoginButton
            key={id}
            variant={id}
            icon={<Image src={icon} alt="" className="h-[18px] w-auto" />}
            label={pendingProvider === id ? "로그인 중이에요" : label}
            onClick={() => postSocialLoginMutation(id)}
            disabled={isPostSocialLoginPending}
          />
        ))}
      </div>

      {postSocialLoginError && (
        <p role="alert" className="mt-4 text-center font-sans text-xs text-error">
          {postSocialLoginError.message}
        </p>
      )}

      <p className="mt-6 text-center font-sans text-[11px] leading-[1.8] text-muted-light">
        가입 시{" "}
        <Link href="/terms" className="cursor-pointer underline">
          이용약관
        </Link>
        {" 및 "}
        <Link href="/privacy" className="cursor-pointer underline">
          개인정보 처리방침
        </Link>
        에 동의하게 됩니다.
      </p>
    </>
  );
}

export default SocialLoginSection;
