"use client";

import { useEditProfile } from "../_hooks/useEditProfile";
import ProfileEditFields from "./ProfileEditFields";

function ProfileEditForm() {
  const {
    me,
    onboardingMe,
    isProfilePending,
    saveProfileMutation,
    isSaveProfilePending,
    saveProfileError,
  } = useEditProfile();

  // 폼 기본값을 초기 state로 넣기 위해, 값이 준비된 뒤에 입력 화면을 그린다
  if (isProfilePending) {
    return (
      <main className="flex-1 px-4 py-6">
        <p className="py-12 text-center font-sans text-[13px] text-muted">
          불러오는 중이에요
        </p>
      </main>
    );
  }

  return (
    <ProfileEditFields
      imageUrl={me?.profile_image_url ?? null}
      initialValues={{
        nickname: me?.nickname ?? me?.name ?? "",
        selectedCategories: onboardingMe?.selected_categories ?? [],
        preferredBrands: onboardingMe?.preferred_brands ?? [],
      }}
      isSaving={isSaveProfilePending}
      errorMessage={saveProfileError?.message}
      onSave={saveProfileMutation}
    />
  );
}

export default ProfileEditForm;
