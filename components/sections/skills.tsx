"use client";

import { AcademicCapIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

import { Reveal, Section, SectionHeading, TechChip } from "@/components/ui/primitives";
import { CERTIFICATES, EDUCATION, SKILL_GROUPS, SOFT_SKILLS, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";

const SkillGlobe = dynamic(() => import("@/components/three/skill-globe"), { ssr: false });

const GLOBE_LABELS = [
  "React", "Next.js", "TypeScript", "Laravel", "NestJS", "Node.js", "Angular", "Tailwind CSS",
  "MySQL", "PostgreSQL", "MariaDB", "Docker", "Nginx", "Linux", "RAG", "Qdrant", "Claude API",
  "OpenAI API", "Python", "PHP", "Go", "GitHub Actions", "Playwright", "Vitest", "Zustand", "PrimeNG",
];

export function Skills() {
  const { t } = useLang();
  return (
    <Section id="skills">
      <SectionHeading index="04" eyebrow={UI.sections.skills} title={UI.sections.skillsTitle} />
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative order-2 h-[380px] sm:h-[460px] lg:order-1 lg:h-[540px]">
          <div className="absolute inset-[12%] rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <SkillGlobe labels={GLOBE_LABELS} />
        </Reveal>
        <div className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.05}>
              <div className="hud-panel h-full p-5">
                <h3 className="hud-label">{t(g.title)}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <TechChip key={s} name={s} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal className="sm:col-span-2">
            <ul className="hud-panel space-y-2 p-5 text-sm text-ink-2">
              {SOFT_SKILLS.map((s, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-beacon" aria-hidden />
                  {t(s)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Education() {
  const { t } = useLang();
  return (
    <Section id="education" className="pt-0 md:pt-0">
      <SectionHeading index="05" eyebrow={UI.sections.education} title={UI.sections.educationTitle} />
      <div className="grid gap-5 md:grid-cols-3">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.06}>
            <div className="hud-panel h-full p-6">
              <AcademicCapIcon className="h-7 w-7 text-accent-2" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{e.school}</h3>
              <p className="mt-1 text-ink-2">{t(e.degree)}</p>
              <p className="mt-3 font-mono text-xs text-beacon">{t(e.period)}</p>
              {e.note ? <p className="mt-3 text-sm text-dim">{t(e.note)}</p> : null}
            </div>
          </Reveal>
        ))}
        {CERTIFICATES.map((c) => (
          <Reveal key={c.issuer + c.date.en} delay={0.12}>
            <div className="hud-panel h-full p-6">
              <CheckBadgeIcon className="h-7 w-7 text-beacon" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{t(c.name)}</h3>
              <p className="mt-1 text-ink-2">{c.issuer}</p>
              <p className="mt-3 font-mono text-xs text-beacon">{t(c.date)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
