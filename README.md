## 기술 스택

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS 기반 `@theme` 토큰)
- **Lenis** — 부드러운 스크롤 · **GSAP** — 모션
- 폰트: Poppins(라틴) + Noto Sans KR(한글) + Space Mono(모노)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과 실행
```

## 구조

```
app/
  layout.tsx        폰트 · 메타데이터 · 전역 셸(SmoothScroll/Nav/Footer)
  page.tsx          섹션 조립(Hero → About → Projects → Contact)
  globals.css       디자인 토큰 · 리빌 · 키프레임
components/
  Nav.tsx           플로팅 pill 내비(스크롤 스파이 · 라이트/다크 전환 · 사운드 토글 · 모바일 메뉴)
  Hero.tsx          크림 히어로 · 이름 · 스티커 뱃지 · CSS 워크스페이스 씬(마우스 패럴랙스)
  About.tsx         네이비 홀로그램 · CSS 아바타 · 카운터 · 글래스 카드
  Projects.tsx      프로젝트 카드 그리드
  Contact.tsx       연락 · 소셜 · CSS 박스 씬
  SmoothScroll.tsx  Lenis 프로바이더
  Reveal.tsx        스크롤 등장 래퍼
  Icons.tsx         인라인 SVG 아이콘
lib/data.ts         ← 사이트 콘텐츠(프로필 · 스킬 · 프로젝트 · 소셜). 내용 수정은 여기서.
docs/reference/     참고 사이트 스크린샷
legacy/             이전 바닐라 HTML/CSS/JS 버전(보관)
```

## 콘텐츠 수정

프로젝트 추가, 스킬/소개 문구 변경 등 대부분의 내용은 **`lib/data.ts`** 한 파일에서 수정하면 전체에 반영됩니다.
