import { Suspense } from "react";

import SearchContent from "./_components/SearchContent";

export default function SearchPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
