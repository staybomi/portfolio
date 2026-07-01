"use client";

import { useRef } from "react";
import { profile, keywords } from "@/lib/data";
import { scrollToId } from "./SmoothScroll";

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);

  // 마우스 패럴랙스: 컨테이너 CSS 변수(--px/--py)만 갱신 (리렌더 없음)
  const onMove = (e: React.MouseEvent) => {
    const el = sceneRef.current;
    if (!el) return;
    const px = (e.clientX / window.innerWidth - 0.5) * 34;
    const py = (e.clientY / window.innerHeight - 0.5) * 34;
    el.style.setProperty("--px", `${px}px`);
    el.style.setProperty("--py", `${py}px`);
  };

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0px) * ${depth}), calc(var(--py, 0px) * ${depth}), 0)`,
  });

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-paper"
    >
      {/* 배경 블러 오브 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -left-24 top-24 size-[380px] rounded-full bg-orange/25 blur-[90px]" />
        <span className="absolute right-10 top-40 size-[320px] rounded-full bg-brand-blue/20 blur-[90px]" />
        <span className="absolute bottom-0 left-1/3 size-[300px] rounded-full bg-orange/15 blur-[80px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* ── 좌: 타이틀 ── */}
        <div>
          <p className="reveal is-visible mb-5 font-mono text-sm font-bold tracking-[0.2em] text-brand-blue">
            👋 {profile.nameEn.toUpperCase()} · PORTFOLIO
          </p>

          <h1 className="text-[clamp(3.5rem,11vw,8.5rem)] font-black leading-[0.9] tracking-tight text-ink">
            박서영
          </h1>

          <div className="mt-5">
            <span className="sticker inline-block rounded-[10px] bg-brand-blue px-4 py-2 font-mono text-lg font-bold tracking-widest text-white shadow-[0_10px_24px_rgba(47,87,230,0.35)] sm:text-2xl">
              {profile.role}
            </span>
          </div>

          <p className="mt-8 max-w-md whitespace-pre-line text-lg leading-relaxed text-ink-soft">
            {profile.tagline}
          </p>

          {/* 키워드 칩 */}
          <ul className="mt-7 flex flex-wrap gap-2">
            {keywords.map((k) => (
              <li
                key={k}
                className="rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-sm font-semibold text-ink/75"
              >
                {k}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("projects")}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-extrabold text-paper transition-transform hover:-translate-y-0.5"
            >
              프로젝트 보기
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="rounded-full border-2 border-ink/15 px-7 py-3.5 text-sm font-extrabold text-ink transition-colors hover:border-ink/40"
            >
              연락하기
            </button>
          </div>
        </div>

        {/* ── 우: CSS 워크스페이스 씬 ── */}
        <div ref={sceneRef} className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[460px]">
          {/* 오렌지 러그 */}
          <div
            style={layer(0.3)}
            className="absolute bottom-6 left-1/2 h-40 w-[86%] -translate-x-1/2 rounded-[50%] bg-linear-to-br from-orange/70 to-orange/30 blur-[2px]"
            aria-hidden="true"
          />

          {/* 코드 윈도우(모니터) */}
          <div style={layer(0.7)} className="absolute right-2 top-6 w-[74%] max-w-sm">
            <div className="animate-[floaty_7s_ease-in-out_infinite] rounded-2xl bg-[#20232e] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <div className="mb-3 flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="space-y-2">
                {[
                  ["w-3/5", "bg-[#c678dd]"],
                  ["w-4/5", "bg-[#61afef]"],
                  ["w-2/5", "bg-[#98c379]"],
                  ["w-3/4", "bg-[#e5c07b]"],
                  ["w-1/2", "bg-[#61afef]"],
                  ["w-2/3", "bg-[#c678dd]"],
                ].map(([w, c], i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-2 w-4 rounded bg-white/10" />
                    <span
                      className={`h-2 rounded ${w} ${c}`}
                      style={{ animation: `blink ${2 + i}s ease-in-out infinite` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 보조 모니터(뒤) */}
          <div
            style={layer(1)}
            className="absolute left-0 top-24 w-[42%] animate-[floaty_9s_ease-in-out_infinite] rounded-xl bg-[#2a2e3a] p-2.5 shadow-2xl ring-1 ring-white/10"
          >
            <div className="mb-2 flex gap-1">
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/20" />
            </div>
            <div className="space-y-1.5">
              <span className="block h-1.5 w-3/4 rounded bg-brand-blue/60" />
              <span className="block h-1.5 w-1/2 rounded bg-white/20" />
              <span className="block h-1.5 w-2/3 rounded bg-holo/50" />
            </div>
          </div>

          {/* 떠다니는 액센트들 */}
          <div
            style={layer(1.4)}
            className="absolute -left-2 top-6 grid size-16 place-items-center rounded-2xl bg-white text-3xl shadow-xl animate-[floaty_6s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            🐧
          </div>
          <div
            style={layer(1.6)}
            className="absolute -right-2 bottom-16 grid size-16 place-items-center rounded-2xl bg-white text-3xl shadow-xl animate-[floaty_8s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            🪴
          </div>
          <div
            style={layer(1.2)}
            className="absolute bottom-2 left-6 rounded-xl bg-brand-blue px-3 py-2 font-mono text-xs font-bold text-white shadow-lg animate-[floaty_7.5s_ease-in-out_infinite]"
          >
            {"<React/>"}
          </div>
          <div
            style={layer(1.3)}
            className="absolute right-16 top-0 rounded-xl bg-ink px-3 py-2 font-mono text-xs font-bold text-paper shadow-lg animate-[floaty_6.5s_ease-in-out_infinite]"
          >
            Next.js
          </div>
        </div>
      </div>

      {/* 스크롤 큐 */}
      <button
        onClick={() => scrollToId("about")}
        aria-label="아래로 스크롤"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-soft sm:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-ink/25 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-ink/40" />
        </span>
        <span className="font-mono text-[11px] tracking-widest">SCROLL</span>
      </button>
    </section>
  );
}
