function ProfileSummary() {
  return (
    <div className="flex items-center gap-3.5 px-4 pb-4">
      <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border border-border bg-ivory-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#7d756c" strokeWidth="1.6" />
          <path
            d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
            stroke="#7d756c"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
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
