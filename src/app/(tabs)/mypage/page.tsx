import Image from "next/image";
import Link from "next/link";

import settingsIcon from "@/assets/icons/settings.svg";

import MypageContent from "./_components/MypageContent";
import ProfileSummary from "./_components/ProfileSummary";

export default function MyPage() {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <header className="flex flex-shrink-0 items-center justify-between border-b border-border bg-ivory px-4 py-3">
        <h1 className="font-serif text-lg text-charcoal">마이</h1>
        <Link
          href="/settings"
          aria-label="설정"
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          <Image src={settingsIcon} alt="" width={20} height={20} />
        </Link>
      </header>

      <main className="flex min-h-0 flex-1 flex-col pt-4">
        <ProfileSummary />
        <MypageContent />
      </main>
    </div>
  );
}
