"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import {
  addMonths,
  formatDateLabel,
  getTodayString,
  parseDateString,
} from "../_utils/calendar";
import CalendarGrid from "./CalendarGrid";
import YearGrid from "./YearGrid";

type BirthDateFieldProps = {
  value: string;
  minDate: string;
  maxDate: string;
  onChange: (value: string) => void;
};

function BirthDateField({ value, minDate, maxDate, onChange }: BirthDateFieldProps) {
  const today = getTodayString();
  const parsed = parseDateString(value || today);

  const [isOpen, setIsOpen] = useState(false);
  const [isYearMode, setIsYearMode] = useState(false);
  const [view, setView] = useState({
    year: parsed?.year ?? 0,
    month: parsed?.month ?? 0,
  });

  const fieldRef = useRef<HTMLDivElement>(null);

  // 달력 바깥을 누르면 닫는다
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (fieldRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsYearMode(false);

    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // 처음 열 때는 오늘 날짜를 선택해두고 그 달을 보여준다
    if (!value) {
      onChange(today);
      const todayParts = parseDateString(today);
      if (todayParts) setView({ year: todayParts.year, month: todayParts.month });
    }
    setIsOpen(true);
  };

  const handleSelectDate = (selected: string) => {
    onChange(selected);
  };

  const handleSelectYear = (year: number) => {
    setView((prev) => ({ ...prev, year }));
    setIsYearMode(false);
  };

  return (
    <div ref={fieldRef}>
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
