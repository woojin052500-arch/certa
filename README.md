# Certa

자격증 비교·추천 + 문제풀이 + 커뮤니티를 한 곳에서 제공하는 서비스 MVP.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 테이블 생성 (최초 1회, 필수)

`.env.local`에 이미 Supabase URL/anon key가 들어있지만, anon key로는 테이블을
새로 만들 수 없습니다(REST API 특성상 DDL 불가). 아래 순서로 최초 1회만
직접 실행해주세요.

1. https://supabase.com/dashboard 에서 해당 프로젝트로 이동
2. 왼쪽 메뉴에서 **SQL Editor** 클릭
3. 이 저장소의 `supabase/schema.sql` 내용을 전체 복사해서 붙여넣고 **Run**

이 스크립트는 `certifications`, `community_posts`, `community_comments`,
`quiz_questions` 4개 테이블과 RLS 정책, 시드 데이터를 만듭니다. 이전에 이미
schema.sql을 실행한 적이 있어도 안전하게 다시 실행할 수 있도록 만들어져
있습니다 (컬럼/제약조건 보강 후 중복 없이 재삽입).

**시드 데이터 구성**
- 자격증 108개 (실존하는 이름·분류·주관기관). 이 중 8개는 `verified = true`로
  응시료·합격률을 실제 검색으로 확인했고, 나머지 100개는 `verified = false`로
  이름/분류는 정확하지만 응시료·합격률 수치는 아직 확인하지 못해 화면에
  "통계 확인 중"으로 표시됩니다. 추천 기능은 통계가 확인된 8개 중에서만
  추천합니다.
- 연습문제 48개 (8개 주요 자격증 × 6문제). **실제 기출문제가 아닙니다.**
  Q-net 등 시행기관은 시험문제를 저작권으로 보호하고 무단 복제·배포를
  금지하고 있어서, 일반 지식 기반으로 자체 제작했습니다. 화면에도
  "연습문제" 라벨이 표시됩니다.

### 3. 로컬 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인.

## 폴더 구조

- `app/` – 페이지 (홈, 비교, 추천, 문제풀이, 커뮤니티)
- `components/` – UI 컴포넌트 (광고 슬롯 포함)
- `lib/` – Supabase 클라이언트, 타입 정의
- `supabase/schema.sql` – DB 스키마 + 시드 데이터

## 광고 연동

- `components/AdBanner.tsx` – 배너 광고 자리표시자. Google AdSense 등 실제
  스크립트로 교체하면 됩니다. (`app/layout.tsx`의 `<head>`에 AdSense 스크립트
  추가 필요)
- `components/RewardedAdButton.tsx` – 리워드형 광고 버튼. 지금은 3초 타이머로
  시뮬레이션만 하고 있고, 실제 리워드 광고 SDK 연동 지점이 주석으로 표시돼
  있습니다. 모바일 앱으로 확장 시 AdMob Rewarded Ad 연동을 권장합니다.

## 모의고사 · 첨삭

`/quiz/[certId]/mock` 경로에서 여러 문제를 한 번에 묶어 실제 시험처럼 풀고
제출 후 채점합니다. 문제별 첨삭(정답·해설)은 보상형 광고 시청 후 열람할 수
있습니다. (`components/MockExamPlayer.tsx`)

## 보안 참고

- `.env.local`에는 **anon key만** 넣었습니다. anon key는 RLS 정책 안에서만
  동작하도록 설계돼 있어 클라이언트에 노출돼도 괜찮습니다.
- **service_role key는 앱 어디에도 넣지 않았습니다.** 이 키는 RLS를 완전히
  우회하는 관리자 키라 클라이언트 코드에 절대 넣으면 안 됩니다. 채팅 등에
  노출된 적이 있다면 Supabase 대시보드 Settings > API에서 재발급(rotate)
  하시길 권합니다.

## 참고 (정직성 관련)

- 자격증 108개 중 100개는 이름·분류·주관기관만 실존하고, 응시료·합격률
  수치는 아직 확인하지 못해 "통계 확인 중"으로 표시됩니다. 숫자를 임의로
  지어내지 않았습니다.
- `quiz_questions`에 들어있는 문제 48개는 자체 제작한 **연습문제**이며
  실제 기출문제가 아닙니다. Q-net 등 시행기관 공지에 따르면 실제 시험문제는
  저작권법으로 보호되어 무단 복제·배포·출판이 금지되어 있어, 대량으로
  긁어와 상업 서비스에 넣는 것은 저작권 위반 소지가 있습니다.
- 커뮤니티 글쓰기/댓글은 로그인 없이 누구나 작성 가능하도록 되어 있습니다
  (MVP 단계). 스팸/어뷰징 방지를 위해 정식 서비스 전에는 로그인 붙이는 걸
  권장합니다.

## 다음 단계 제안

- 로그인(Supabase Auth) 붙여서 커뮤니티 어뷰징 방지
- 나머지 자격증의 응시료·합격률을 하나씩 검색해 verified=true로 전환
- 실제 기출문제가 필요하면: (1) Q-net이 무료 공개하는 공식 PDF로 딥링크만
  제공하거나, (2) 콘텐츠 라이선스를 보유한 업체(해커스·에듀윌 등)와 제휴,
  (3) 사용자가 본인이 정리한 자료를 업로드하는 방식 중 하나를 검토

## Android 앱 전환 (Capacitor)

웹앱을 그대로 재사용해 Android 앱으로 감싸는 방식을 사용합니다 (Next.js가
Server Component에서 Supabase를 직접 조회하는 구조라 정적 export 대신
WebView가 배포된 웹사이트 URL을 그대로 불러오는 방식). `capacitor.config.ts`,
`package.json`에 필요한 설정을 미리 넣어뒀습니다. 아래는 **본인 컴퓨터에서
직접** 진행해야 하는 단계입니다 (Android Studio·Android SDK가 필요해서
이 대화형 환경에서는 실행할 수 없습니다).

1. 먼저 웹앱을 Vercel 등에 배포하고, `capacitor.config.ts`의
   `server.url` 값을 실제 배포 도메인으로 교체
2. `npm install` (package.json에 `@capacitor/core`, `@capacitor/cli`,
   `@capacitor/android`가 이미 추가되어 있음)
3. `npx cap add android` — Android 네이티브 프로젝트(`android/` 폴더) 생성
4. `npx cap sync android`
5. Android Studio로 `android/` 폴더 열어서 빌드·실행
6. AdMob 리워드/배너 광고를 붙이려면 `@capacitor-community/admob` 같은
   커뮤니티 플러그인을 추가하고, `RewardedAdButton.tsx`의 시뮬레이션 로직을
   실제 AdMob 리워드 광고 호출로 교체
7. 패키지명은 `com.wjedulab.certa`로 설정되어 있음 (Play Console 등록 시 동일하게 사용)

**주의**: 단순히 웹사이트를 WebView로 감싸기만 하면 Google Play "최소 기능"
정책 위반으로 반려될 수 있습니다. AdMob 네이티브 연동, 푸시 알림, 오프라인
지원 등 네이티브다운 부가 기능을 추가하는 것을 권장합니다.
