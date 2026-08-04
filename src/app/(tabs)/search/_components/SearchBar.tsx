"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-3 flex items-center gap-2.5 rounded-3xl bg-ivory-200 px-[15px] py-[9px]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#7d756c" strokeWidth="2" />
        <path
          d="M16.5 16.5L21 21"
          stroke="#7d756c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="향수명, 브랜드로 검색"
        className="flex-1 border-none bg-transparent font-sans text-[13px] text-charcoal outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="검색어 지우기"
          className="cursor-pointer border-none bg-transparent text-muted"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
