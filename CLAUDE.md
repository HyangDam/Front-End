# 향담 (香談) — Front-End

이 문서는 Claude Code가 프로젝트 작업 시 반드시 따라야 할 규칙 및 컨텍스트를 정의합니다. 모든 코드 생성/리팩토링은 이 규약을 따릅니다.

## 🎯 프로젝트 컨텍스트

### 한 줄 정의

취향 데이터를 기반으로 나에게 맞는 향수를 추천하고, AI 조향사와 대화하며 향을 탐색하는 향수 파인더 웹앱

### 타겟 유저

향수를 처음 접했거나 자신의 취향을 언어로 표현하기 어려운 20~30대. 구매 전 취향·노트를 편하게 탐색하고 싶은 모바일 웹 사용자.

### 핵심 기능

- **온보딩 취향 분석** — 성별/나이 → 보유 향수 → 선호 브랜드 → 선호 향 계열, 4단계
- **홈 피드** — 매거진 아티클, AI 픽(개인화 추천), 무드 기반 탐색, 주간 인기, 신상
- **검색/탐색** — 향 계열 필터 · 정렬(인기/최신/가격)
- **향수 상세** — 메인 어코드, TOP/MIDDLE/BASE 노트, 리뷰, 향수장 추가
- **마이페이지** — 3D 향수장(진열장) UI, 좋아요 목록, 향수장 공유
- **AI 조향사** — 채팅 기반 향수 추천 (WOW 포인트)

### 플랫폼 전략

**Next.js 기반 모바일 우선 반응형 웹앱, 단일 레포.** React Native/네이티브 래퍼나 모노레포 구조는 사용하지 않습니다 — 이 레포(`Front-End`)는 웹앱 그 자체입니다. 백엔드는 별도 레포에서 API로 통신합니다.

## 💻 기술 스택

- **패키지 매니저**: npm
- **언어**: TypeScript 5
- **프레임워크**: Next.js (App Router), React 19
- **상태관리**: Zustand — 세션(로그인), 좋아요/보유 향수, 온보딩 임시 데이터 등 전역 상태
- **스타일링**: Tailwind CSS v3 — `tailwind.config.ts`에 디자인 토큰(컬러: ivory/sage/rose 계열, 폰트: Noto Serif KR + Plus Jakarta Sans + Courier New) 정의. (Tailwind v4의 CSS-first 설정 대신 v3의 `tailwind.config.ts`를 의도적으로 사용 — 팀 전체가 토큰을 한 파일에서 보기 위함)
- **API 통신**: TanStack Query (`@tanstack/react-query`) — 도입 시
- **스키마 검증**: Zod — 도입 시
- **API 모킹**: MSW (필요 시)
- **아이콘**: `src/assets/icons` (inline SVG) — 별도 아이콘 라이브러리 사용 안 함, 프로토타입의 손그림 SVG 스타일 유지
- **배포**: Vercel

### CI/CD

- GitHub Actions: PR 단위 빌드 검사 (`lint` → `check-types` → `build`)
- 필수 통과 조건: `npm ci`

## 📁 프로젝트 구조

```
Front-End/
├── src/
│   ├── app/                       # Next.js App Router — 화면 라우팅 + 페이지별 코드
│   │   ├── layout.tsx
│   │   ├── page.tsx               # "/" → /login 리다이렉트
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── _components/       # login 페이지 전용
│   │   ├── onboarding/
│   │   │   ├── _common/           # step-1~4 공유 (OnboardShell, ProgressDots 등)
│   │   │   │   └── _components/
│   │   │   ├── step-1/ .. step-4/
│   │   │   │   └── page.tsx
│   │   ├── loading/
│   │   │   └── page.tsx
│   │   ├── (tabs)/                # 하단 탭 4개 (BottomNav 공유 레이아웃)
│   │   │   ├── layout.tsx
│   │   │   ├── home/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/   # home 페이지 전용 (ArticleHero 등)
│   │   │   ├── search/
│   │   │   ├── ai/
│   │   │   └── mypage/
│   │   │       └── _components/   # AcrylicWall, ShelfBottle 등
│   │   ├── perfumes/[id]/         # 향수 상세 (모달형)
│   │   │   ├── page.tsx
│   │   │   └── _components/
│   │   └── settings/              # 설정 (모달형)
│   │       ├── page.tsx
│   │       └── _components/
│   │
│   ├── components/
│   │   └── common/                 # 2개 이상 top-level 라우트에서 공유되는 범용 UI
│   │       ├── perfume-card/       # 홈·검색·AI 채팅에서 공유
│   │       ├── chip/
│   │       ├── pill-btn/
│   │       └── bottom-nav/         # kebab-case 폴더, index.tsx 본체
│   │
│   ├── apis/                       # 2개 이상 페이지에서 공유하는 API 함수
│   ├── hooks/                      # 공통 커스텀 훅 (useAppStore 등 Zustand 스토어 포함)
│   ├── utils/                      # 공통 유틸리티
│   ├── types/                      # 공통 도메인 타입 (T suffix)
│   ├── assets/                     # 아이콘 · 이미지
│   └── styles/                     # globals.css (Tailwind 진입점)
│
├── tailwind.config.ts
├── eslint.config.mjs
├── .prettierrc.json
└── package.json
```

> **역할 분담은 폴더 구조가 아니라 작업 분담 가이드입니다.** 코드는 항상 페이지(라우트) 단위로 colocate하고, 폴더 이름에 담당자 이름을 넣지 않습니다. 담당자별 작업 라우트:
>
> | 담당 | 담당 라우트                                                                        |
> | ---- | ---------------------------------------------------------------------------------- |
> | 소영 | `login`, `onboarding/*`(소셜 로그인 포함), `loading`, `(tabs)/mypage`, `(tabs)/ai` |
> | 서현 | `(tabs)/home`, `(tabs)/search`, `perfumes/[id]`                                    |
>
> `settings`는 아직 담당 미배정 — 배정되면 위 표 업데이트할 것.

### Colocation 배치 (한 단계씩 레벨업)

코드는 가장 가까운 사용처에 둔다. 재사용 범위가 넓어질 때만 부모로 한 단계 끌어올린다. 처음부터 `components/common/`에 두지 않는다.

| 재사용 범위                                         | 배치 위치                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 단일 `page.tsx` 전용                                | 해당 라우트 폴더의 `_components/` (또는 `_hooks/`, `_apis/`, `_consts/`, `_types/`) |
| 같은 부모 아래 2개 이상 하위 라우트에서 공유        | 부모 라우트의 `_common/_components/` 등으로 끌어올림                                |
| `app/` top-level 라우트 간 공유 (예: home ↔ search) | `components/common/{component-name}/` — App Router 밖으로 이동                      |
| 2개 이상 라우트 또는 앱 전역에서 쓰는 API/훅/유틸   | `src/apis/`, `hooks/`, `utils/`, `types/`                                           |

- 한 라우트 전용 → `_components/` 등을 라우트 폴더에 직접 둔다
- `app/` 내부 레벨업(형제 라우트 간 공유) → 부모에 `_common/`을 만들고 그 안에 `_components/`, `_hooks/`, `_consts/`, `_types/` 배치
- top-level 라우트를 넘나들면 `_common/`을 더 쌓지 않고 `src/components/common/`(또는 `hooks/`, `utils/` 등)으로 이동
- `app/_common/`, `app/_components/` ❌ — top-level 간 공유는 App Router 밖에서 관리
- 필요한 폴더만 생성 — 빈 폴더는 만들지 않음

`components/common/` 내부 파일명:

| 파일 종류     | 규칙                         | 예시                     |
| ------------- | ---------------------------- | ------------------------ |
| 대표 컴포넌트 | `index.tsx` (default export) | `perfume-card/index.tsx` |
| 보조 컴포넌트 | PascalCase                   | `EditorialBottle.tsx`    |
| 스타일 (cva)  | camelCase + `.style.ts`      | `perfumeCard.style.ts`   |
| 상수/타입     | camelCase + `.const.ts`      | `perfumeCard.const.ts`   |

```ts
// ✅ Good
import PerfumeCard from "@/components/common/perfume-card";
import BottomNav from "@/components/common/bottom-nav";

// ❌ Bad — common 바로 아래 파일, PascalCase 폴더, 중복 경로
import PerfumeCard from "@/components/common/PerfumeCard";
import PerfumeCard from "@/components/common/PerfumeCard/PerfumeCard";
```

### Path Alias

`@/*` → `src/*`

## 📝 네이밍 컨벤션

| 대상                 | 규칙                            | 예시                                                   |
| -------------------- | ------------------------------- | ------------------------------------------------------ |
| 폴더                 | kebab-case                      | `perfume-card/`, `bottom-nav/`                         |
| 공통 컴포넌트 본체   | `index.tsx`                     | `components/common/perfume-card/index.tsx`             |
| 보조 컴포넌트 파일   | PascalCase                      | `EditorialBottle.tsx`, `ThinkingDots.tsx`              |
| 스타일/상수 파일     | camelCase                       | `perfumeCard.style.ts`, `onboarding.const.ts`          |
| 일반 파일 (훅, 유틸) | camelCase                       | `useAppStore.ts`, `formatPrice.ts`                     |
| 타입                 | T suffix                        | `PerfumeT`, `OnboardingDraftT`                         |
| API 함수             | HTTP 메서드 prefix              | `getPerfume`, `postLike`, `patchProfile`, `deleteLike` |
| API 요청/응답 타입   | 함수명 + `RequestT`/`ResponseT` | `PostLikeRequestT`, `PostLikeResponseT`                |
| API 훅               | `use` + 함수명                  | `usePostLike`, `useGetPerfume`                         |
| 공통 객체 타입       | `src/types/`에 위치, T suffix   | `PerfumeT`, `UserT`, `OnboardingDraftT`                |

## 🌐 API 컨벤션

- 요청/응답 타입: 함수명을 PascalCase로 한 뒤 `RequestT` / `ResponseT` 접미
- API 훅: `use` + 함수명
- API endpoint: `src/consts/api.ts`에 상수로 모아서 관리
- 공통 객체 타입(향수/사용자/온보딩 등 도메인 모델): `src/types/<domain>.ts`
  - 예: `src/types/perfume.ts` → `PerfumeT`, `src/types/user.ts` → `UserT`
- API 함수 위치:
  - 단일 페이지 전용 → `app/<page>/_apis/`
  - 2개 이상 페이지에서 공유 → `src/apis/`

## 🎨 코딩 컨벤션

### 컴포넌트

`function` 키워드 + default export

```tsx
function PerfumeCard({ children }: PerfumeCardProps) {
  return <div>{children}</div>;
}

export default PerfumeCard;
```

### 유틸 함수

화살표 함수 사용

```ts
const formatPrice = (won: number) => `₩${won.toLocaleString()}`;
```

### 타입 선언

- `type` 사용 (`interface` 대신)
- T suffix
- Props 타입명: `{ComponentName}Props`

```ts
type PerfumeT = {
  id: number;
  name: string;
};

type PerfumeCardProps = {
  perfume: PerfumeT;
};
```

### Props 네이밍

- 내부 핸들러: `handle-` (예: `handleClick`, `handleSubmit`)
- 외부에서 받는 props: `on-` (예: `onClick`, `onLike`)

```tsx
function LikeButton({ onClick }: LikeButtonProps) {
  const handleClick = () => {
    // 내부 로직
    onClick?.();
  };
  return <button onClick={handleClick}>...</button>;
}
```

### API 훅 반환값 네이밍 (TanStack Query)

훅 내부에서 의미 있는 이름으로 rename 후 반환 — 호출하는 쪽에서 매번 `data: xxx`처럼 rename하지 않도록.

- Query: `data` → `{도메인}Data`
- Mutation: `mutate` → `{HTTP 메서드 prefix + 도메인}Mutation`, `isPending` → `is{HTTP 메서드 prefix + 도메인}Pending`

```ts
// ✅ Query
export const useGetPerfume = (id: number) => {
  const { data: perfumeData } = useQuery({
    queryKey: ["perfume", id],
    queryFn: () => getPerfume(id),
  });
  return { perfumeData };
};

// ✅ Mutation
export const usePostLike = () => {
  const { mutate: postLikeMutation, isPending: isPostLikePending } = useMutation({
    mutationFn: postLike,
  });
  return { postLikeMutation, isPostLikePending };
};
```

### 기타

- 세미콜론: 사용 (`semi: true`)
- 따옴표: `doubleQuote` (`singleQuote: false`)
- `printWidth`: 90
- `trailingComma`: `all`
- `arrowParens`: 인자 1개 시 괄호 생략은 강제하지 않음 (Prettier 기본값 `always`)

## 🧩 RSC / UI / Next 가이드

- `page.tsx`는 가능하면 RSC — `'use client'`는 상호작용이 필요한 자식 컴포넌트로 내림
- 고정 width 지양 — 모바일은 `w-full` + `px-*` 패턴, 상한은 `max-w-*`로 (전체 앱은 `max-w-md` 모바일 뷰포트 기준)
- Semantic tag — 컨테이너는 `<main>`, 타이틀은 `<h1>`/`<h2>`
- 클릭 요소엔 `cursor-pointer` 명시
- Next 기능 우선 — `<Link>`, `<Image>`, `next/font` 등. `router.push`는 부수 작업(모달 닫기, API 후 처리)이 있을 때만

## 📦 Import 규칙

정렬 순서:

1. 외부 라이브러리
2. 절대경로 (`^@/`)
3. 상대경로 (`^./`)

```ts
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getPerfume } from "@/apis/perfume";
import type { PerfumeT } from "@/types/perfume";

import { formatPrice } from "./utils";
```

## 🚨 ESLint 주요 규칙

- `no-console`: warn/error만 허용 (`console.log` 금지)
- `no-nested-ternary`: error (중첩 삼항 금지)
- `@typescript-eslint/consistent-type-imports`: error (`import type` 강제)
- `@typescript-eslint/no-explicit-any`: error (`any` 금지)
- `unused-imports/no-unused-imports`: error (`_` prefix 변수/인자는 unused 허용)

## 🔀 Git 전략

### 브랜치 구조

`main` ← `dev` ← `{type}/{issue-number}-{description}`

### 브랜치 네이밍

- 패턴: `{type}/{issue-number}-{description}`
- 예시: `feat/1-login-page`, `chore/3-web-setup`, `fix/5-onboarding-validation`
- 타입: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`

### 커밋 메시지

- 형식: `{type}: {한글 설명}`
- 예시: `feat: 로그인 페이지 구현`, `chore: Tailwind 디자인 토큰 추가`, `fix: 온보딩 다음 버튼 활성화 조건 수정`

### 머지 방식

- Squash Merge 사용 — PR 제목이 그대로 `dev`의 커밋 메시지가 됨 → PR 제목 신중히 작성

### PR 컨벤션

- base 브랜치: `dev` (`main` 아님)
- 템플릿 (`.github/PULL_REQUEST_TEMPLATE.md`, PR 생성 시 자동 삽입):

```
## 작업 요약

해당 PR에서 작업한 내용을 정리해주세요. Slack 요약에는 1단계 불릿만 반영됩니다. 예) - 로그인 API를 연동합니다

## 작업 세부 내용

## 스크린샷

## 연관 이슈

이 PR과 연관된 이슈 번호를 작성하세요. 예) closes #10
```

- PR 제목/브랜치명에 `feat`/`fix`/`refactor`/`chore`/`docs`/`style`이 포함되면 `.github/workflows/auto-label.yml`(Renato66/auto-label 사용, 설정: `.github/auto-label.yml`)이 자동으로 라벨을 붙입니다. 이슈 제목에도 동일하게 적용됩니다.

### 코드 리뷰 — PN 룰

- P1 (Request changes): 꼭 반영 — 중대한 오류 가능성
- P2 (Request changes): 적극 고려 — 수용 or 토론
- P3 (Comment): 웬만하면 반영 — 미반영 시 사유 설명
- P4 (Approve): 반영해도/안해도 OK — 고민 정도
- P5 (Approve): 사소한 의견 — 무시 가능

### 리뷰 규칙

랜덤 1명 승인 시 머지 가능 (리뷰 자동 배정 워크플로우 사용)

## 🌐 API 통신 — Response Schema 규약

### 기본 원칙

- HTTP Status Code는 REST 의미대로 사용 (200, 201, 400, 401, 403, 404, 500)
- 성공/실패 Body 구조 통일
- fetch는 4xx/5xx에서 자동 throw 안 함 → 반드시 `response.ok` 확인
- `success` 필드 사용 안 함 (`response.ok`와 중복)

### 응답 구조

```json
{
  "status": 200,
  "data": {},
  "detail": "요청이 정상적으로 처리되었습니다.",
  "code": "COMMON_SUCCESS"
}
```

| 필드     | 설명                                     |
| -------- | ---------------------------------------- |
| `status` | HTTP Status Code와 동일                  |
| `data`   | 실제 비즈니스 응답 데이터 (실패 시 null) |
| `detail` | 응답 메시지 (사용자 표시용)              |
| `code`   | 서버 정의 Enum 코드 (세부 분기용)        |

### 검증 오류 응답 (400)

```json
{
  "status": 400,
  "data": null,
  "detail": "입력값이 올바르지 않습니다.",
  "code": "INVALID_INPUT",
  "errors": [{ "field": "age", "reason": "나이는 숫자만 입력 가능합니다." }]
}
```

### 페이지 응답 구조

```json
{
  "status": 200,
  "data": [{ "perfumeId": 1, "name": "상탈 33" }],
  "detail": "요청이 정상적으로 처리되었습니다.",
  "code": "COMMON_SUCCESS",
  "pageInfo": { "nextCursor": "abc123", "hasNext": true }
}
```

### 프론트엔드 fetch 처리 표준

```ts
export async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error("서버 응답을 해석할 수 없습니다.");
  }

  if (response.ok) {
    return body.data;
  }

  throw new Error(body.detail || "요청 처리 중 오류가 발생했습니다.");
}
```

### 검증 오류 세부 처리

```ts
if (response.status === 400 && body.errors) {
  return body.errors;
}
```

### 분기 처리 (세부 에러)

```ts
if (body.code === "PERFUME_NOT_FOUND") {
  // 특정 에러 처리
}
```

### HTTP Status 사용 기준

| 상황        | HTTP Status               |
| ----------- | ------------------------- |
| 조회 성공   | 200 OK                    |
| 생성 성공   | 201 Created               |
| 잘못된 요청 | 400 Bad Request           |
| 인증 실패   | 401 Unauthorized          |
| 권한 없음   | 403 Forbidden             |
| 리소스 없음 | 404 Not Found             |
| 서버 오류   | 500 Internal Server Error |

## 🤖 Claude 작업 지침

### 코드 생성 시

- 위 컨벤션을 반드시 준수
- 신규 컴포넌트: `function` 키워드 + PascalCase 파일명 + default export
- 신규 훅: 화살표 함수 + camelCase 파일명
- 신규 타입: `type` 키워드 + T suffix
- API 함수: HTTP 메서드 prefix (`getPerfume`, `postLike` 등)
- 경로는 `@/*` 절대경로 우선, 같은 디렉토리는 상대경로

### 커밋 메시지 제안 시

- `{type}: {한글 설명}` 형식 사용
- type: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`

### PR 작성 시

- 제목: `{type}: {한글 설명}` 형식
- 본문에 `closes #이슈번호` 포함
- base 브랜치는 `dev`

### 리뷰 코멘트 작성 시

- PN 태그 (P1~P5) 사용
- 이유 명확히 설명

### API 관련 코드 생성 시

- HTTP status 기반 분기 (`response.ok`)
- body 구조: `{ status, data, detail, code }` 가정
- fetch 래퍼 함수 활용 패턴

### 의심스러울 때

1. 기존 코드 패턴 확인
2. 팀 컨벤션 우선 (이 문서)
3. 판단 어려우면 사용자에게 확인
