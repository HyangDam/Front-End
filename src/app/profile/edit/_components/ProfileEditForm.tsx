"use client";

import ErrorState from "@/components/error-state";

import { useEditProfile } from "../_hooks/useEditProfile";
import ProfileEditFields from "./ProfileEditFields";

function ProfileEditForm() {
  const {
    me,
    onboardingMe,
    isProfilePending,
    isProfileError,
    retryProfile,
    saveProfileMutation,
    isSaveProfilePending,
    saveProfileError,
  } = useEditProfile();

  if (isProfilePending) {
    return (
      <main className="flex-1 px-4 py-6">
        <p className="py-12 text-center font-sans text-[13px] text-muted">
          불러오는 중이에요
        </p>
      </main>
    );
  }

  // 현재 값을 못 읽은 채로 저장하면 기존 취향이 빈 값으로 덮어써진다
  if (isProfileError || !me || !onboardingMe) {
    return (
      <main className="flex-1 px-4 py-6">
        <ErrorState
          message="프로필 정보를 불러오지 못해 수정할 수 없어요."
          onRetry={retryProfile}
        />
      </main>
    );
  }

  return (
    <ProfileEditFields
      imageUrl={me.profile_image_url ?? null}
      initialValues={{
        nickname: me.nickname ?? me.name ?? "",
        selectedCategories: onboardingMe.selected_categories ?? [],
        preferredBrands: onboardingMe.preferred_brands ?? [],
      }}
      isSaving={isSaveProfilePending}
      errorMessage={saveProfileError?.message}
      onSave={saveProfileMutation}
    />
  );
}

export default ProfileEditForm;
