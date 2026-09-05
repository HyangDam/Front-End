export const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const pad = (value: number) => String(value).padStart(2, "0");

/** month는 0부터 시작하는 값 */
export const toDateString = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

export const parseDateString = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month: month - 1, day };
};

export const formatDateLabel = (value: string) => value.split("-").join(" . ");

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

/** 해당 월 1일의 요일 (0=일요일). 그만큼 앞을 비워 그린다 */
export const getFirstWeekday = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

export const addMonths = (year: number, month: number, diff: number) => {
  const next = new Date(year, month + diff, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
};

/** 캘린더에 채울 칸. 앞쪽 빈칸은 null */
export const buildMonthGrid = (year: number, month: number) => [
  ...Array.from({ length: getFirstWeekday(year, month) }, () => null),
  ...Array.from({ length: getDaysInMonth(year, month) }, (_, index) => index + 1),
];
