/* ============================================================
   박서영 포트폴리오 — script.js
   - 포트폴리오 카드 렌더링 + 상세 모달
   - 햄버거 메뉴 / 스크롤 스파이(active) / 스크롤 진행바
   - 스크롤 리빌(IntersectionObserver)
   - 마우스 추적 파티클 (canvas, 60fps, 모바일/reduced-motion 비활성)
   - 연락처 폼 검증 + mailto 전송
   ============================================================ */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------------------------------------------------------
     1. 포트폴리오 데이터
  --------------------------------------------------------- */
  const PROJECTS = [
    {
      id: "pay-renewal",
      emoji: "💳",
      thumb: "linear-gradient(135deg,#6c5cff,#00d4ff)",
      category: "Product",
      title: "결제 플로우 리뉴얼",
      summary:
        "복잡한 결제 단계를 3스텝으로 단순화해 전환율과 응답성을 끌어올린 프로젝트.",
      role: "프론트엔드 리드",
      period: "2024.03 – 2024.08",
      team: "5명 (FE 2 · BE 2 · 디자이너 1)",
      tags: ["React", "TypeScript", "Zustand"],
      overview:
        "기존 7단계의 결제 과정에서 이탈률이 높다는 문제를 데이터로 확인하고, 사용성 테스트를 거쳐 3단계 흐름으로 재설계했습니다. 상태 관리를 단순화하고 낙관적 업데이트를 적용해 체감 속도를 크게 개선했습니다.",
      contributions: [
        "결제 상태 머신 설계 및 공통 훅(useCheckout) 구현",
        "낙관적 UI 업데이트로 평균 응답 체감 시간 1.2s → 0.3s",
        "에러/재시도 시나리오 12종 핸들링 및 e2e 테스트 작성",
      ],
      result: "결제 전환율 +18%, 결제 단계 이탈률 -23%",
      stack: ["React", "TypeScript", "Zustand", "React Query", "Playwright"],
      links: [{ label: "사례 보기 ↗", href: "#" }],
    },
    {
      id: "design-system",
      emoji: "🧩",
      thumb: "linear-gradient(135deg,#ff6ad5,#6c5cff)",
      category: "Platform",
      title: "디자인 시스템 구축",
      summary:
        "40+ 컴포넌트와 토큰 체계를 만들어 팀 전체의 개발 속도와 일관성을 높인 사내 라이브러리.",
      role: "코어 메인테이너",
      period: "2023.05 – 2024.01",
      team: "8명 협업",
      tags: ["React", "Storybook", "a11y"],
      overview:
        "제품별로 흩어져 있던 UI를 표준화하기 위해 디자인 토큰과 헤드리스 컴포넌트 기반의 시스템을 설계했습니다. 접근성을 기본값으로 내장하고, Storybook 문서를 통해 도입 장벽을 낮췄습니다.",
      contributions: [
        "디자인 토큰(color/space/type) 파이프라인 설계",
        "WAI-ARIA 준수 헤드리스 컴포넌트 40종 구현",
        "Storybook + 자동 시각 회귀 테스트 환경 구축",
      ],
      result: "신규 화면 개발 시간 평균 35% 단축, 접근성 점수 100",
      stack: ["React", "TypeScript", "Storybook", "Chromatic", "vanilla-extract"],
      links: [{ label: "스토리북 ↗", href: "#" }, { label: "GitHub ↗", href: "#" }],
    },
    {
      id: "realtime-chat",
      emoji: "💬",
      thumb: "linear-gradient(135deg,#00d4ff,#6c5cff)",
      category: "Web App",
      title: "실시간 채팅 성능 개선",
      summary:
        "대규모 메시지 렌더링 병목을 가상화와 메모이제이션으로 해결해 60fps를 회복.",
      role: "프론트엔드 개발",
      period: "2022.06 – 2022.11",
      team: "4명",
      tags: ["React", "WebSocket", "가상화"],
      overview:
        "메시지가 수천 개 쌓이면 스크롤이 끊기는 문제를 해결하기 위해 윈도잉(가상 리스트)을 도입하고 렌더 경로를 프로파일링해 불필요한 리렌더를 제거했습니다.",
      contributions: [
        "react-window 기반 가상 리스트 + 동적 높이 측정 구현",
        "메시지 그룹핑/메모이제이션으로 리렌더 70% 감소",
        "WebSocket 재연결·오프라인 큐잉 로직 설계",
      ],
      result: "긴 대화방 스크롤 프레임 22fps → 60fps",
      stack: ["React", "TypeScript", "WebSocket", "react-window"],
      links: [{ label: "회고 글 ↗", href: "#" }],
    },
  ];

  /* ---------------------------------------------------------
     2. 포트폴리오 카드 렌더링
  --------------------------------------------------------- */
  const grid = document.getElementById("portfolio-grid");
  if (grid) {
    const frag = document.createDocumentFragment();
    PROJECTS.forEach((p, i) => {
      const card = document.createElement("button");
      card.className = "pcard reveal";
      card.type = "button";
      card.setAttribute("data-reveal", "");
      card.style.setProperty("--reveal-delay", `${(i % 3) * 90}ms`);
      card.style.setProperty("--thumb", p.thumb);
      card.setAttribute("aria-label", `${p.title} 상세 보기`);
      card.dataset.project = p.id;
      card.innerHTML = `
        <div class="pcard__thumb">
          <span class="pcard__emoji">${p.emoji}</span>
        </div>
        <div class="pcard__body">
          <span class="pcard__cat">${p.category}</span>
          <h3 class="pcard__title">${p.title}</h3>
          <p class="pcard__summary">${p.summary}</p>
          <div class="pcard__tags">${p.tags
            .map((t) => `<span>${t}</span>`)
            .join("")}</div>
          <span class="pcard__more">자세히 보기 <span>→</span></span>
        </div>`;
      card.addEventListener("click", () => openModal(p.id));
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------
     3. 상세 모달
  --------------------------------------------------------- */
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  let lastFocused = null;

  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p || !modal) return;

    modalBody.innerHTML = `
      <div class="modal__hero" style="--thumb:${p.thumb}">${p.emoji}</div>
      <div class="modal__content">
        <span class="pcard__cat">${p.category}</span>
        <h3 id="modal-title">${p.title}</h3>
        <dl class="modal__meta">
          <div><dt>역할</dt><dd>${p.role}</dd></div>
          <div><dt>기간</dt><dd>${p.period}</dd></div>
          <div><dt>팀</dt><dd>${p.team}</dd></div>
        </dl>
        <p>${p.overview}</p>

        <h4 class="modal__section-title">주요 기여</h4>
        <ul class="modal__list">${p.contributions
          .map((c) => `<li>${c}</li>`)
          .join("")}</ul>

        <h4 class="modal__section-title">성과</h4>
        <p>📈 ${p.result}</p>

        <h4 class="modal__section-title">기술 스택</h4>
        <div class="modal__stack">${p.stack
          .map((s) => `<span>${s}</span>`)
          .join("")}</div>

        <div class="modal__links">${p.links
          .map(
            (l) =>
              `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
          )
          .join("")}</div>
      </div>`;

    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.setAttribute("aria-labelledby", "modal-title");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    // 포커스 트랩
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );
  }

  /* ---------------------------------------------------------
     4. 햄버거 메뉴
  --------------------------------------------------------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () =>
      setMenu(!menu.classList.contains("is-open"))
    );
    menu.querySelectorAll("[data-nav]").forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );
  }

  /* ---------------------------------------------------------
     5. GNB 스크롤 상태 + 진행바 + 스크롤 스파이
  --------------------------------------------------------- */
  const gnb = document.getElementById("gnb");
  const progress = document.getElementById("scroll-progress");
  const navLinks = Array.from(document.querySelectorAll(".nav__link[data-nav]"));
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;

    if (gnb) gnb.classList.toggle("is-scrolled", y > 10);

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? `${(y / h) * 100}%` : "0";
    }

    // 활성 섹션 판정 (뷰포트 상단 기준)
    const mark = y + window.innerHeight * 0.35;
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= mark) current = sec.id;
    }
    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === `#${current}`)
    );

    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------------------------------------------------------
     6. 스크롤 리빌 (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
            el.classList.add("is-visible");

            // 스킬 바 애니메이션 트리거
            el.querySelectorAll(".skill__bar").forEach((b) =>
              b.classList.add("is-shown")
            );
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    document
      .querySelectorAll(".skill__bar")
      .forEach((b) => b.classList.add("is-shown"));
  }

  /* ---------------------------------------------------------
     7. 마우스 추적 파티클 (canvas)
     - 데스크톱(hover 가능) + reduced-motion 미설정 시에만 동작
  --------------------------------------------------------- */
  const canvas = document.getElementById("particle-canvas");
  if (canvas && !isTouch && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d", { alpha: true });
    let w, h, dpr;
    const particles = [];
    const COLORS = ["#6c5cff", "#00d4ff", "#ff6ad5"];
    const mouse = { x: -100, y: -100, prevX: -100, prevY: -100 };
    let rafId = null;
    let idle = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function spawn(x, y, speed) {
      const count = Math.min(3, 1 + Math.floor(speed / 12));
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 - 0.4,
          life: 1,
          size: Math.random() * 3 + 1.5,
          color: COLORS[(particles.length + i) % COLORS.length],
        });
      }
      // 메모리 보호 상한
      if (particles.length > 240) particles.splice(0, particles.length - 240);
    }

    window.addEventListener(
      "pointermove",
      (e) => {
        if (e.pointerType === "touch") return;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const speed = Math.hypot(dx, dy);
        if (speed > 1.5) spawn(mouse.x, mouse.y, speed);
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        idle = 0;
      },
      { passive: true }
    );

    function tick() {
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // 약한 중력
        p.vx *= 0.98;
        p.life -= 0.022;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // 커서 글로우
      if (idle < 60) {
        ctx.globalAlpha = 0.16;
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          26
        );
        g.addColorStop(0, "#6c5cff");
        g.addColorStop(1, "rgba(108,92,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 26, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      idle++;

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }
    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      ctx.clearRect(0, 0, w, h);
    }
    // 탭이 보이지 않으면 멈춰서 성능/배터리 절약
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stop() : start()
    );
    start();
  }

  /* ---------------------------------------------------------
     8. 연락처 폼 검증 + mailto 전송
  --------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");

  function setError(name, msg) {
    const field = form.querySelector(`[name="${name}"]`).closest(".field");
    const errEl = form.querySelector(`[data-error-for="${name}"]`);
    field.classList.toggle("is-invalid", Boolean(msg));
    if (errEl) errEl.textContent = msg || "";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };
      let ok = true;

      if (!data.name) {
        setError("name", "이름을 입력해 주세요.");
        ok = false;
      } else setError("name", "");

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email) {
        setError("email", "이메일을 입력해 주세요.");
        ok = false;
      } else if (!emailRe.test(data.email)) {
        setError("email", "올바른 이메일 형식이 아닙니다.");
        ok = false;
      } else setError("email", "");

      if (!data.message) {
        setError("message", "메시지를 입력해 주세요.");
        ok = false;
      } else setError("message", "");

      if (!ok) {
        form.querySelector(".is-invalid input, .is-invalid textarea")?.focus();
        return;
      }

      // mailto로 메일 앱 열기
      const subject = encodeURIComponent(`[채용/협업 문의] ${data.name}님`);
      const body = encodeURIComponent(
        `보낸 사람: ${data.name} <${data.email}>\n\n${data.message}`
      );
      window.location.href = `mailto:staybomi@gmail.com?subject=${subject}&body=${body}`;

      if (success) {
        success.hidden = false;
        form.reset();
      }
    });

    // 입력 시 에러 해제
    ["name", "email", "message"].forEach((n) => {
      form[n].addEventListener("input", () => {
        form[n].closest(".field").classList.remove("is-invalid");
        const errEl = form.querySelector(`[data-error-for="${n}"]`);
        if (errEl) errEl.textContent = "";
        if (success) success.hidden = true;
      });
    });
  }

  /* ---------------------------------------------------------
     9. 푸터 연도
  --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
