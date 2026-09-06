"use client";

import { cn } from "@/utils/cn";

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  isPending?: boolean;
  errorMessage?: string;
  /** 되돌릴 수 없는 동작이면 확인 버튼을 경고색으로 그린다 */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  title,
  description,
  confirmLabel,
  isPending = false,
  errorMessage,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-8">
      <button
        type="button"
        aria-label="닫기"
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-charcoal/35"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[320px] rounded-2xl border border-border bg-paper px-5 py-6"
      >
        <h2 className="mb-2 text-center font-serif text-base text-charcoal">{title}</h2>
        <p className="mb-5 whitespace-pre-line text-center font-sans text-xs leading-[1.7] text-muted">
          {description}
        </p>

        {errorMessage && (
          <p role="alert" className="mb-3 text-center font-sans text-xs text-error">
            {errorMessage}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 cursor-pointer rounded-full border border-border-dark py-3 font-sans text-[13px] text-charcoal transition-opacity disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={cn(
              "flex-1 cursor-pointer rounded-full py-3 font-sans text-[13px] font-semibold text-white transition-opacity disabled:opacity-50",
              destructive ? "bg-error" : "bg-sage",
            )}
          >
            {isPending ? "처리 중이에요" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
