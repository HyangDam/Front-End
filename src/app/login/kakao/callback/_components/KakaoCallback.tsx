"use client";

import { useEffect } from "react";

import PillBtn from "@/components/pill-btn";

import { useKakaoLogin } from "../_hooks/useKakaoLogin";

type KakaoCallbackProps = {
  code?: string;
  error?: string;
};

function KakaoCallback({ code, error }: KakaoCallbackProps) {
  const { postKakaoLoginMutation, postKakaoLoginError } = useKakaoLogin();

  useEffect(() => {
    if (code) postKakaoLoginMutation(code);
  }, [code, postKakaoLoginMutation]);

  // 사용자가 동의를 취소하면 카카오가 code 대신 error를 붙여 돌려보낸다
  const failureMessage =
    postKakaoLoginError?.message ??
    (error || !code ? "카카오 로그인이 취소되었어요." : null);

  if (failureMessage) {
    return (
      <main className="flex h-full flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
        <p role="alert" className="font-sans text-[13px] leading-[1.9] text-error">
          {failureMessage}
        </p>
        <PillBtn label="로그인으로 돌아가기" href="/login" variant="primary" />
      </main>
    );
  }

  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
      <span className="font-serif text-4xl tracking-[2px] text-charcoal/85">香</span>
      <p className="font-sans text-[13px] text-muted">로그인 중이에요</p>
    </main>
  );
}

export default KakaoCallback;
