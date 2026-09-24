"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import chevronLeftIcon from "@/assets/icons/chevron-left.svg";

type PageHeaderProps = {
  title: string;
  /** 새 탭으로 바로 열려 돌아갈 기록이 없을 때 이동할 경로 */
  fallbackHref?: string;
};

/** 뒤로가기 + 제목만 있는 하위 화면용 헤더 (설정 · 프로필 수정 등) */
function PageHeader({ title, fallbackHref = "/home" }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    // 링크로 바로 진입하면 back()이 아무 동작도 하지 않아 갇히게 된다
    if (typeof window !== "undefined" && window.history.length <= 1) {
      router.replace(fallbackHref);
      return;
    }
    router.back();
  };

  return (
    <header className="sticky top-0 z-10 flex h-11 flex-shrink-0 items-center justify-between border-b border-border bg-paper px-4">
      <button
        type="button"
        onClick={handleBack}
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
