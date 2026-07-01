import Reveal from "./Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative bg-paper px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* 헤더 */}
        <Reveal className="mb-14">
          <span className="sticker mb-2 inline-block rounded-md bg-brand-blue px-3 py-1 font-mono text-xs font-bold tracking-widest text-white">
            SELECTED
          </span>
          <h2 className="text-[clamp(2.75rem,8vw,6rem)] font-black leading-none tracking-tight text-ink">
            Projects
          </h2>
        </Reveal>

        {/* 카드 그리드 */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <a
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                className="group block"
              >
                {/* 커버 */}
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1.5"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${p.cover.from}, ${p.cover.to})`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:scale-105">
                    <div className="text-center">
                      {p.cover.emoji && (
                        <div className="mb-2 text-4xl drop-shadow-sm">{p.cover.emoji}</div>
                      )}
                      <div
                        className={`text-3xl font-black tracking-tight drop-shadow ${
                          p.cover.dark ? "text-white" : "text-ink"
                        }`}
                      >
                        {p.cover.label}
                      </div>
                    </div>
                  </div>
                  {/* 태그 */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-black/25 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* 화살표 */}
                  {p.href && (
                    <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/85 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ↗
                    </span>
                  )}
                </div>

                {/* 정보 */}
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold text-ink transition-colors group-hover:text-orange">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-ink-soft">{p.subtitle}</p>
                </div>
              </a>
            </Reveal>
          ))}

          {/* CTA 카드 */}
          <Reveal delay={projects.length * 90}>
            <a href="#contact" className="group block">
              <div className="grid aspect-[16/10] place-items-center rounded-3xl border-2 border-dashed border-ink/20 bg-paper-3/40 transition-colors group-hover:border-orange/60 group-hover:bg-orange/5">
                <div className="text-center text-ink-soft transition-colors group-hover:text-orange">
                  <div className="text-5xl font-thin leading-none">+</div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-extrabold text-ink">함께 만들어요</h3>
                <p className="mt-0.5 text-ink-soft">새 프로젝트를 준비 중입니다</p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
