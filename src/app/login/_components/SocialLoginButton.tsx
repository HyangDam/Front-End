"use client";

import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

const socialButtonStyles = cva(
  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-[22px] py-[13px] transition-opacity disabled:cursor-default disabled:opacity-50",
  {
    variants: {
      variant: {
        google: "border border-[#E5E7EB] bg-white",
        kakao: "bg-kakao",
        naver: "bg-naver",
      },
    },
  },
);

const labelStyles = cva("font-sans text-sm font-semibold", {
  variants: {
    variant: {
      google: "text-charcoal",
      kakao: "text-[#3A1D1D]",
      naver: "text-white",
    },
  },
});

type SocialLoginButtonProps = {
  variant: "google" | "kakao" | "naver";
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

function SocialLoginButton({
  variant,
  icon,
  label,
  onClick,
  className,
  disabled,
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(socialButtonStyles({ variant }), className)}
    >
      {icon}
      <span className={labelStyles({ variant })}>{label}</span>
    </button>
  );
}

export default SocialLoginButton;
