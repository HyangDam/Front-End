"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

import { ApiError } from "@/apis/apiError";
import { NETWORK_ERROR_STATUS } from "@/apis/apiRequest";

const RETRY_COUNT = 1;

// 400·401·404 같은 클라이언트 오류는 다시 시도해도 결과가 같다.
// 다만 응답을 못 받은 경우(status 0)는 일시적인 끊김일 수 있어 재시도한다.
const retry = (failureCount: number, error: Error) => {
  const isClientError =
    error instanceof ApiError &&
    error.status !== NETWORK_ERROR_STATUS &&
    error.status < 500;

  if (isClientError) return false;
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
