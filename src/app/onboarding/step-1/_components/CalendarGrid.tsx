"use client";

import { cn } from "@/utils/cn";

import { buildMonthGrid, toDateString, WEEKDAY_LABELS } from "../_utils/calendar";

type CalendarGridProps = {
  viewYear: number;
  viewMonth: number;
  selectedDate: string;
  minDate: string;
  maxDate: string;
  onSelect: (value: string) => void;
};

function CalendarGrid({
  viewYear,
  viewMonth,
  selectedDate,
  minDate,
  maxDate,
  onSelect,
}: CalendarGridProps) {
  return (
    <>
      <div className="mb-1 grid grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="py-1 text-center font-mono text-[10px] text-muted-light"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {buildMonthGrid(viewYear, viewMonth).map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} />;

          const value = toDateString(viewYear, viewMonth, day);
          const disabled = value < minDate || value > maxDate;
          const selected = value === selectedDate;

          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onSelect(value)}
              className={cn(
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full font-sans text-[13px] transition-colors",
                disabled && "cursor-default text-muted-light/40",
                !disabled &&
                  !selected &&
                  "cursor-pointer text-charcoal hover:bg-ivory-200",
                selected && "cursor-pointer bg-rose font-semibold text-white",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;
