"use client";

import { useState } from "react";

import { cn } from "@/utils/cn";

import { addMonths, formatDateLabel, parseDateString } from "../_utils/calendar";
import CalendarGrid from "./CalendarGrid";
import YearGrid from "./YearGrid";

/** 값이 없을 때 달력이 열리는 기준 연도 (대략적인 사용자 나이) */
const DEFAULT_AGE = 25;

type BirthDateFieldProps = {
  value: string;
  minDate: string;
  maxDate: string;
  onChange: (value: string) => void;
};

function BirthDateField({ value, minDate, maxDate, onChange }: BirthDateFieldProps) {
  const parsed = parseDateString(value);
  const fallbackYear = new Date().getFullYear() - DEFAULT_AGE;

  const [isOpen, setIsOpen] = useState(false);
  const [isYearMode, setIsYearMode] = useState(false);
  const [view, setView] = useState({
    year: parsed?.year ?? fallbackYear,
    month: parsed?.month ?? 0,
  });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setIsYearMode(false);
  };

  const handleSelectDate = (selected: string) => {
    onChange(selected);
    setIsOpen(false);
  };

  const handleSelectYear = (year: number) => {
    setView((prev) => ({ ...prev, year }));
    setIsYearMode(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-paper px-4 py-3.5 transition-colors",
          isOpen ? "border-rose" : "border-border-dark",
        )}
      >
        <span
          className={cn(
            "font-serif text-[18px] tracking-[1px]",
            value ? "text-charcoal" : "text-muted-light",
          )}
        >
          {value ? formatDateLabel(value) : "YYYY . MM . DD"}
        </span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="3"
            stroke="#c4a090"
            strokeWidth="1.8"
          />
          <path
            d="M3 10h18M8 3v4M16 3v4"
            stroke="#c4a090"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2.5 rounded-2xl border border-border bg-paper p-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="이전 달"
              onClick={() => setView(addMonths(view.year, view.month, -1))}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full font-sans text-base text-muted transition-colors hover:bg-ivory-200"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => setIsYearMode((prev) => !prev)}
              className="cursor-pointer rounded-full px-3 py-1 font-serif text-[15px] text-charcoal transition-colors hover:bg-ivory-200"
            >
              {view.year}년 {view.month + 1}월
              <span className="ml-1.5 font-sans text-[9px] text-muted">▾</span>
            </button>

            <button
              type="button"
              aria-label="다음 달"
              onClick={() => setView(addMonths(view.year, view.month, 1))}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full font-sans text-base text-muted transition-colors hover:bg-ivory-200"
            >
              ›
            </button>
          </div>

          {isYearMode ? (
            <YearGrid
              minYear={Number(minDate.slice(0, 4))}
              maxYear={Number(maxDate.slice(0, 4))}
              viewYear={view.year}
              onSelect={handleSelectYear}
            />
          ) : (
            <CalendarGrid
              viewYear={view.year}
              viewMonth={view.month}
              selectedDate={value}
              minDate={minDate}
              maxDate={maxDate}
              onSelect={handleSelectDate}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BirthDateField;
