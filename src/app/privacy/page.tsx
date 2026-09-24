import LegalPage from "@/components/legal-page";

import { PRIVACY_EFFECTIVE_DATE, PRIVACY_SECTIONS } from "./_consts/privacy.const";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="개인정보 처리방침"
      effectiveDate={PRIVACY_EFFECTIVE_DATE}
      sections={PRIVACY_SECTIONS}
    />
  );
}
