"use client";

import { scrollToId } from "./SmoothScroll";
import { IconArrowUp } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-paper px-6 pb-12 pt-6 text-center">
      <button
        onClick={() => scrollToId("home")}
        aria-label="맨 위로"
        className="mx-auto grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform hover:-translate-y-1"
      >
        <IconArrowUp className="size-5" />
      </button>
      <p className="mt-6 font-mono text-xs tracking-wide text-ink-soft">
        © 2026 박서영 · Built with Next.js · GSAP · Lenis
      </p>
    </footer>
  );
}
