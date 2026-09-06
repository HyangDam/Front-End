"use client";

import { useRouter } from "next/navigation";

function SettingsHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-11 flex-shrink-0 items-center justify-between border-b border-border bg-paper px-4">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="cursor-pointer border-none bg-transparent py-1 pr-2"
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path
            d="M8 1L1 7.5L8 14"
            stroke="#1a1814"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="font-serif text-base text-charcoal">설정</h1>
      <div className="w-8" />
    </header>
  );
}

export default SettingsHeader;
