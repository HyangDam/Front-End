"use client";

import { useRouter } from "next/navigation";

function DetailHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-11 flex-shrink-0 items-center justify-between border-b border-border bg-paper px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="cursor-pointer border-none bg-transparent py-1 pr-2"
        aria-label="뒤로가기"
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
      <div className="font-serif text-base tracking-[4px] text-charcoal">香談</div>
      <div className="w-8" />
    </header>
  );
}

export default DetailHeader;
