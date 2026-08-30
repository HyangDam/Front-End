"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

import { ApiError } from "@/apis/apiError";

const RETRY_COUNT = 1;

// 400·401·404 같은 클라이언트 오류는 다시 시도해도 결과가 같다
const retry = (failureCount: number, error: Error) => {
  if (error instanceof ApiError && error.status < 500) return false;
  return failureCount < RETRY_COUNT;
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry,
      },
      mutations: { retry: false },
    },
  });

function Providers({ children }: { children: ReactNode }) {
  // 리렌더마다 클라이언트가 새로 만들어지지 않도록 state에 보관한다
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default Providers;
