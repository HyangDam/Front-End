"use client";

import { useState } from "react";

import { useAuthStore } from "@/hooks/useAuthStore";

import { useAccountActions } from "../_hooks/useAccountActions";
import ConfirmDialog from "./ConfirmDialog";

type OpenDialogT = "logout" | "withdraw" | null;

function SettingsContent() {
  const [openDialog, setOpenDialog] = useState<OpenDialogT>(null);
  const user = useAuthStore((state) => state.user);

  const {
    postLogoutMutation,
    isPostLogoutPending,
    postLogoutError,
    deleteMeMutation,
    isDeleteMePending,
    deleteMeError,
  } = useAccountActions();

  const closeDialog = () => setOpenDialog(null);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-5">
      <section className="mb-6">
        <h2 className="mb-2.5 font-mono text-[10px] uppercase tracking-[1.2px] text-muted">
          Account
        </h2>
        <div className="rounded-xl border border-border bg-paper px-4 py-3.5">
          <p className="mb-0.5 font-sans text-[11px] text-muted">로그인한 계정</p>
          <p className="font-sans text-[13px] text-charcoal">{user?.email ?? "-"}</p>
        </div>
      </section>

      <section>
        <h2 className="mb-2.5 font-mono text-[10px] uppercase tracking-[1.2px] text-muted">
          Manage
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-paper">
          <button
            type="button"
            onClick={() => setOpenDialog("logout")}
            className="flex w-full cursor-pointer items-center justify-between border-b border-border px-4 py-3.5 text-left font-sans text-[13px] text-charcoal"
          >
            로그아웃
            <span className="font-sans text-[11px] text-muted-light">›</span>
          </button>
          <button
            type="button"
            onClick={() => setOpenDialog("withdraw")}
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left font-sans text-[13px] text-error"
          >
            회원 탈퇴
            <span className="font-sans text-[11px] text-muted-light">›</span>
          </button>
        </div>
      </section>

      {openDialog === "logout" && (
        <ConfirmDialog
          title="로그아웃 할까요?"
          description="다시 이용하시려면 로그인이 필요해요."
          confirmLabel="로그아웃"
          isPending={isPostLogoutPending}
          errorMessage={postLogoutError?.message}
          onConfirm={() => postLogoutMutation()}
          onCancel={closeDialog}
        />
      )}

      {openDialog === "withdraw" && (
        <ConfirmDialog
          title="정말 탈퇴하시겠어요?"
          description={
            "향수장과 좋아요, 취향 분석 결과가 모두 사라져요.\n되돌릴 수 없어요."
          }
          confirmLabel="탈퇴하기"
          destructive
          isPending={isDeleteMePending}
          errorMessage={deleteMeError?.message}
          onConfirm={() => deleteMeMutation()}
          onCancel={closeDialog}
        />
      )}
    </main>
  );
}

export default SettingsContent;
