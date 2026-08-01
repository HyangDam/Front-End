"use client";

import Link from "next/link";

import { PILL_BTN_VARIANT_CLASSES } from "./pillBtn.const";
import type { PillBtnVariant } from "./pillBtn.const";

type PillBtnProps = {
  label: string;
  variant?: PillBtnVariant;
  full?: boolean;
  disabled?: boolean;
  small?: boolean;
  href?: string;
  onClick?: () => void;
};

function PillBtn({
  label,
  variant = "primary",
  full = false,
  disabled = false,
  small = false,
  href,
  onClick,
}: PillBtnProps) {
  const className = `inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-opacity ${
    small ? "px-[18px] py-[9px] text-xs" : "px-[22px] py-[13px] text-sm"
  } ${full ? "w-full" : "w-auto"} ${
    disabled
      ? "cursor-default bg-ivory-200 text-muted-light"
      : `cursor-pointer ${PILL_BTN_VARIANT_CLASSES[variant]}`
  }`;

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      {label}
    </button>
  );
}

export default PillBtn;
