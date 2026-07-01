"use client";

import { useEffect, useRef, useState } from "react";
import { profile, aboutSkills, aboutParagraphs } from "@/lib/data";

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const dur = 1600;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return { value, ref };
}

/** 카드 공통 — 글래스모피즘 + 시안 테두리 */
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-holo/40 bg-holo/5 p-5 backdrop-blur-sm ${className}`}
    >
      <span className="absolute -left-1.5 top-6 size-3 rounded-full bg-holo shadow-[0_0_10px_2px_rgba(87,183,255,0.8)]" />
      {children}
    </div>
  );
}

export default function About() {
  const { value, ref } = useCountUp(100);

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-b from-navy to-navy-deep py-28 text-white"
    >
      {/* 홀로그램 그리드 바닥 */}
      <div className="holo-grid pointer-events-none absolute inset-x-0 bottom-0 top-1/2" aria-hidden="true" />
      {/* 상단 글로우 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 rounded-full bg-holo/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* ── 좌: 이름 + 소개 ── */}
        <div className="order-2 space-y-4 lg:order-1">
          <GlassCard>
            <p className="font-mono text-2xl font-bold">{profile.name}</p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-sm text-holo">
              <span aria-hidden="true">📍</span> {profile.location}
            </p>
          </GlassCard>
          <GlassCard>
            <div className="space-y-3 text-sm leading-relaxed text-white/80">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* ── 중앙: 홀로그램 아바타 ── */}
        <div ref={ref} className="order-1 flex flex-col items-center lg:order-2">
          <span className="mb-4 font-mono text-xs tracking-[0.35em] text-holo/70">— ABOUT —</span>

          <div className="relative grid place-items-center">
            {/* 펄스 링 */}
            <span
              className="absolute bottom-2 size-40 rounded-full border border-holo/50"
              style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
              aria-hidden="true"
            />
            {/* 홀로그램 피규어 */}
            <div className="relative">
              <svg
                viewBox="0 0 120 210"
                className="w-36 drop-shadow-[0_0_28px_rgba(87,183,255,0.65)] sm:w-44"
                role="img"
                aria-label="박서영 홀로그램 아바타"
              >
                <defs>
                  <linearGradient id="holo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9bd6ff" />
                    <stop offset="100%" stopColor="#2f8fe0" />
                  </linearGradient>
                </defs>
                <g fill="url(#holo)" fillOpacity="0.22" stroke="#7fc6ff" strokeWidth="1.6">
                  <circle cx="60" cy="36" r="24" />
                  <path d="M30 78c0-8 8-14 18-14h24c10 0 18 6 18 14v46c0 6-6 10-14 10H44c-8 0-14-4-14-10V78Z" />
                  <rect x="18" y="72" width="12" height="52" rx="6" />
                  <rect x="90" y="72" width="12" height="52" rx="6" />
                  <rect x="45" y="128" width="12" height="60" rx="6" />
                  <rect x="63" y="128" width="12" height="60" rx="6" />
                </g>
                {/* 홀로그램 리브(가로선) */}
                <g stroke="#bfe4ff" strokeWidth="1" strokeOpacity="0.3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={i} x1="20" x2="100" y1={30 + i * 20} y2={30 + i * 20} />
                  ))}
                </g>
              </svg>
              {/* 스캔 라인 */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-b from-transparent via-holo/50 to-transparent"
                style={{ animation: "holo-scan 2.8s linear infinite" }}
                aria-hidden="true"
              />
            </div>

            {/* 발판 */}
            <div className="relative -mt-2 h-6 w-44 rounded-[50%] bg-holo/25 blur-[1px]" aria-hidden="true" />
          </div>

          {/* 카운터 */}
          <div className="mt-3 rounded-lg bg-navy-deep/80 px-5 py-1.5 font-mono text-2xl font-bold tabular-nums text-holo ring-1 ring-holo/40">
            {String(value).padStart(3, "0")}
          </div>
        </div>

        {/* ── 우: Skills ── */}
        <div className="order-3 space-y-4">
          <GlassCard>
            <p className="mb-3 font-mono text-lg font-bold text-white">Skills</p>
            <ul className="space-y-2 font-mono text-sm text-white/80">
              {aboutSkills.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1 text-holo">▹</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <p className="font-mono text-sm leading-relaxed text-white/80">{profile.aboutShort}</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
