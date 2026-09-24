import LegalPage from "@/components/legal-page";

import { TERMS_EFFECTIVE_DATE, TERMS_SECTIONS } from "./_consts/terms.const";

export default function TermsPage() {
  return (
    <LegalPage
      title="이용약관"
      effectiveDate={TERMS_EFFECTIVE_DATE}
      sections={TERMS_SECTIONS}
    />
  );
}
