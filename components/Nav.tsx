"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import { scrollToId } from "./SmoothScroll";
import { LogoCube, IconSoundOn, IconSoundOff } from "./Icons";

const SECTIONS = ["home", "about", "projects", "contact"] as const;

export default function Nav() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  // 스크롤 스파이: 뷰포트 상단 42% 지점에 걸리는 섹션을 활성으로
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const probe = window.innerHeight * 0.42;
      let current = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 네이비(About) 섹션 위에선 라이트 톤 내비
  const dark = active === "about";

  const playTone = (freq: number, dur = 0.07) => {
    try {
      let ctx = audioRef.current;
      if (!ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AC();
        audioRef.current = ctx;
      }
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.stop(ctx.currentTime + dur);
    } catch {
      /* 오디오 미지원 무시 */
    }
  };

  const blip = (freq: number) => {
    if (soundOn) playTone(freq);
  };

  const go = (id: string) => {
    scrollToId(id);
    setMenuOpen(false);
    blip(560);
  };

  const toggleSound = () => {
    setSoundOn((s) => {
      const next = !s;
      if (next) playTone(680, 0.09);
      return next;
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* 좌: 로고 큐브 (스크롤 후 등장) */}
        <button
          onClick={() => go("home")}
          aria-label="맨 위로"
          className={`grid size-11 place-items-center rounded-xl transition-all duration-500 ${
            scrolled ? "scale-100 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          } ${dark ? "text-white" : "text-ink"}`}
        >
          <LogoCube className="size-7" />
        </button>

        {/* 중앙: 플로팅 pill 내비 (md+) */}
        <div
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-md transition-colors duration-500 md:flex ${
            dark
              ? "border-white/15 bg-white/10"
              : "border-black/5 bg-[color-mix(in_srgb,var(--color-paper-2)_80%,transparent)] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }`}
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className={`rounded-full px-5 py-2 text-[13px] font-bold tracking-wide transition-colors ${
                  isActive
                    ? dark
                      ? "bg-holo/90 text-navy-deep"
                      : "bg-orange text-white"
                    : dark
                      ? "text-white/75 hover:text-white"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* 우: GET IN TOUCH + 사운드 토글 + 모바일 메뉴 */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-orange px-5 py-2.5 text-[13px] font-extrabold tracking-wide text-white shadow-[0_8px_24px_rgba(245,148,43,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-orange-dark sm:block"
          >
            GET IN TOUCH
          </button>

          <button
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "소리 끄기" : "소리 켜기"}
            className={`grid size-11 place-items-center rounded-full transition-colors ${
              dark ? "bg-white/15 text-white hover:bg-white/25" : "bg-ink text-paper hover:bg-ink/85"
            }`}
          >
            {soundOn ? <IconSoundOn className="size-5" /> : <IconSoundOff className="size-5" />}
          </button>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="메뉴"
            aria-expanded={menuOpen}
            className={`grid size-11 place-items-center rounded-full md:hidden ${
              dark ? "bg-white/15 text-white" : "bg-ink text-paper"
            }`}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* 모바일 오버레이 메뉴 */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-paper/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              go(item.id);
            }}
            className="text-4xl font-extrabold tracking-tight text-ink"
          >
            {item.label}
          </a>
        ))}
        <button
          onClick={() => go("contact")}
          className="mt-4 rounded-full bg-orange px-7 py-3 text-sm font-extrabold text-white"
        >
          GET IN TOUCH
        </button>
      </div>
    </header>
  );
}
