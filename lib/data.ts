// ============================================================
// 사이트 콘텐츠 데이터 — 여기만 고치면 전체 사이트에 반영됩니다.
// ============================================================

export const profile = {
  name: "박서영",
  nameEn: "Seoyoung Park",
  role: "FRONTEND DEVELOPER",
  location: "Seoul, Korea",
  tagline: "사용자 경험을 코드로 구현하는\n프론트엔드 개발자",
  aboutShort: "빠르고, 반응성 좋고, 쓰는 재미가 있는 웹 경험을 만듭니다.",
  email: "staybomi@gmail.com",
};

// 히어로에 흐르는 키워드 칩
export const keywords = ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"];

// About 홀로그램 카드의 Skills 목록
export const aboutSkills = [
  "React & Next.js",
  "TypeScript & JavaScript",
  "반응형 · 웹 접근성",
  "컴포넌트 · 디자인 시스템",
  "성능 최적화",
];

// About 본문
export const aboutParagraphs = [
  "안녕하세요. 프론트엔드 개발자 박서영입니다.",
  "“보이지 않는 디테일이 신뢰를 만든다”고 믿습니다. 0.1초의 응답성, 1px의 정렬, 키보드만으로도 완결되는 흐름까지 챙깁니다.",
  "복잡한 요구사항을 구조화하고, 재사용 가능한 컴포넌트와 디자인 시스템으로 팀의 개발 속도를 끌어올리는 일에 가장 큰 보람을 느낍니다.",
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  href?: string;
  // 카드 커버(3D 이미지 대신 CSS 그라데이션 + 로고 텍스트/이모지)
  cover: {
    from: string;
    to: string;
    label: string; // 커버에 크게 보일 로고 텍스트
    emoji?: string;
    dark?: boolean; // 어두운 커버면 흰 텍스트
  };
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "energy-meal",
    title: "에너지밀",
    subtitle: "사주 기반 오늘의 메뉴 추천 서비스",
    href: "https://energy-meal-hybrid.vercel.app/today",
    cover: { from: "#ff8a3d", to: "#ffcf6b", label: "에너지밀", emoji: "🍙" },
    tags: ["Next.js", "TypeScript", "추천 알고리즘"],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "인터랙티브 포트폴리오 사이트",
    href: "https://github.com/staybomi",
    cover: { from: "#1b1b1b", to: "#3a3a3a", label: "PORTFOLIO", emoji: "✦", dark: true },
    tags: ["Next.js", "GSAP", "Lenis"],
  },
];

// 소셜 링크
export const socials = [
  { label: "Email", href: "mailto:staybomi@gmail.com", icon: "mail" as const },
  { label: "GitHub", href: "https://github.com/staybomi", icon: "github" as const },
  { label: "Blog", href: "https://seokachu.tistory.com", icon: "blog" as const },
];

// 내비게이션 항목
export const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];
