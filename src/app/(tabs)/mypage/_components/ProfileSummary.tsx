import Image from "next/image";

import profileIcon from "@/assets/icons/profile.svg";

function ProfileSummary() {
  return (
    <div className="flex items-center gap-3.5 px-4 pb-4">
      <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border border-border bg-ivory-200">
        <Image src={profileIcon} alt="" width={24} height={24} />
      </div>
      <div>
        <p className="mb-[3px] font-sans text-[15px] font-bold text-charcoal">
          향기로운 손님
        </p>
        <p className="font-sans text-[11px] text-muted">25세 · 플로럴, 우디 선호</p>
      </div>
    </div>
  );
}

export default ProfileSummary;
