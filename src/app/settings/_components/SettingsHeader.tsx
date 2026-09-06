"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import chevronLeftIcon from "@/assets/icons/chevron-left.svg";

function SettingsHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-11 flex-shrink-0 items-center justify-between border-b border-border bg-paper px-4">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent"
      >
        <Image src={chevronLeftIcon} alt="" width={16} height={16} />
      </button>
      <h1 className="font-serif text-base text-charcoal">설정</h1>
      <div className="w-8" />
    </header>
  );
}

export default SettingsHeader;
