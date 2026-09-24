import PageHeader from "@/components/page-header";

import type { LegalSectionT } from "./legalPage.const";

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  sections: LegalSectionT[];
};

/** 이용약관 · 개인정보처리방침처럼 제목과 조항만 나열하는 문서 화면 */
function LegalPage({ title, effectiveDate, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader title={title} />

      <main className="flex-1 overflow-y-auto px-5 py-6">
        <p className="mb-6 font-sans text-[11px] text-muted">시행일자 {effectiveDate}</p>

        {sections.map(({ heading, paragraphs }) => (
          <section key={heading} className="mb-6 last:mb-0">
            <h2 className="mb-2 font-serif text-[15px] text-charcoal">{heading}</h2>
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-1.5 whitespace-pre-line font-sans text-[13px] leading-[1.75] text-muted last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </main>
    </>
  );
}

export default LegalPage;
