"use client";

import { useEffect, useState } from "react";

/** 입력할 때마다 요청이 나가지 않도록 값이 멎을 때까지 기다린다 */
export const useDebouncedValue = <T>(value: T, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
};
