import PageHeader from "@/components/page-header";

import ProfileEditForm from "./_components/ProfileEditForm";

export default function ProfileEditPage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <PageHeader title="프로필 수정" />
      <ProfileEditForm />
    </div>
  );
}
