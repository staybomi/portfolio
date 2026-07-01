import Reveal from "./Reveal";
import { profile, socials } from "@/lib/data";
import { IconMail, IconGithub, IconBlog } from "./Icons";

const iconMap = {
  mail: IconMail,
  github: IconGithub,
  blog: IconBlog,
};

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper px-6 pt-28 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* ── 좌: 텍스트 + 소셜 ── */}
        <Reveal>
          <span className="mb-3 inline-block font-mono text-sm font-bold tracking-[0.25em] text-brand-blue">
            CONTACT
          </span>
          <h2 className="text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-ink">
            함께 <br className="hidden sm:block" />
            <span className="text-grad-orange">만들어요!</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            채용 제안이나 협업 문의 언제든 환영합니다. 편하게 연락 주세요.
          </p>

          {/* 소셜 버튼 */}
          <div className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="grid size-12 place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition-transform hover:-translate-y-1 hover:text-orange"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>

          {/* 이메일 CTA */}
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-extrabold text-paper transition-transform hover:-translate-y-0.5"
          >
            <IconMail className="size-5" />
            {profile.email}
          </a>
        </Reveal>

        {/* ── 우: CSS 박스 씬 ── */}
        <Reveal delay={120}>
          <div className="relative mx-auto h-72 w-full max-w-md sm:h-80" aria-hidden="true">
            <span className="absolute left-1/2 top-4 size-56 -translate-x-1/2 rounded-full bg-orange/15 blur-[70px]" />

            {/* 박스들 */}
            <div className="absolute bottom-8 left-6 h-28 w-32 rotate-[-6deg] rounded-2xl bg-linear-to-br from-[#d9b98a] to-[#c19b6a] shadow-xl ring-1 ring-black/10 animate-[floaty_7s_ease-in-out_infinite]">
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-black/10" />
            </div>
            <div className="absolute bottom-16 left-1/2 h-32 w-36 rotate-[4deg] rounded-2xl bg-linear-to-br from-[#e6cba0] to-[#cda877] shadow-xl ring-1 ring-black/10 animate-[floaty_9s_ease-in-out_infinite]">
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-black/10" />
              <span className="absolute right-3 top-3 text-lg">♻️</span>
            </div>
            <div className="absolute bottom-4 right-8 h-24 w-28 rotate-[8deg] rounded-2xl bg-linear-to-br from-[#dcbf94] to-[#c6a06f] shadow-xl ring-1 ring-black/10 animate-[floaty_8s_ease-in-out_infinite]">
              <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-black/10" />
            </div>

            {/* 떠다니는 편지 */}
            <div className="absolute right-4 top-2 grid size-16 place-items-center rounded-2xl bg-white text-3xl shadow-xl animate-[floaty_6s_ease-in-out_infinite]">
              ✉️
            </div>
            <div className="absolute left-2 top-10 grid size-14 place-items-center rounded-2xl bg-white text-2xl shadow-lg animate-[floaty_7.5s_ease-in-out_infinite]">
              👋
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
