import SettingsContent from "./_components/SettingsContent";
import SettingsHeader from "./_components/SettingsHeader";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <SettingsHeader />
      <SettingsContent />
    </div>
  );
}
