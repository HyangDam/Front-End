type OnboardSearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function OnboardSearchField({ value, onChange, placeholder }: OnboardSearchFieldProps) {
  return (
    <div className="mb-4 flex items-center gap-2.5 rounded-full bg-ivory-200 px-[15px] py-[9px]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        placeholder={placeholder}
        className="flex-1 border-0 bg-transparent font-sans text-[13px] text-charcoal outline-none placeholder:text-muted-light"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="cursor-pointer text-base text-muted"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default OnboardSearchField;
