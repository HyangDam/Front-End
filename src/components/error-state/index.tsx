"use client";

import PillBtn from "@/components/pill-btn";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const DEFAULT_MESSAGE = "정보를 불러오지 못했어요.";

/** 조회 실패를 "데이터 없음"과 구분해 보여주고 다시 시도할 수 있게 한다 */
function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <p role="alert" className="font-sans text-[13px] leading-[1.8] text-error">
        {message ?? DEFAULT_MESSAGE}
      </p>
      {onRetry && <PillBtn label="다시 시도" onClick={onRetry} variant="ghost" small />}
    </div>
  );
}

export default ErrorState;
