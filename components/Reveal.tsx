"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 등장 지연(ms) */
  delay?: number;
};

/**
 * 뷰포트에 들어오면 .is-visible 을 붙여 CSS 트랜지션으로 등장시키는 래퍼.
 * (globals.css 의 .reveal / .is-visible 참고)
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
