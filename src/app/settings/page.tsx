import PageHeader from "@/components/page-header";

import SettingsContent from "./_components/SettingsContent";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <PageHeader title="설정" />
      <SettingsContent />
    </div>
  );
}
