"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import chevronLeftIcon from "@/assets/icons/chevron-left.svg";

type PageHeaderProps = {
  title: string;
};

/** 뒤로가기 + 제목만 있는 하위 화면용 헤더 (설정 · 프로필 수정 등) */
function PageHeader({ title }: PageHeaderProps) {
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
      <h1 className="font-serif text-base text-charcoal">{title}</h1>
      <div className="w-8" />
    </header>
  );
}

export default PageHeader;
