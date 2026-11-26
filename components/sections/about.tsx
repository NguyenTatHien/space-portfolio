"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { ABOUT, PROFILE, STATS, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";

export function Stats() {
  const { t } = useLang();
  return (
    <div className="relative border-y border-white/10 bg-space-2/60 backdrop-blur">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-white/10 px-5 sm:px-8 md:grid-cols-4 md:divide-x">
        {STATS.map((s, i) => (
          <Reveal key={s.value + i} delay={i * 0.08} className="px-2 py-8 md:px-6">
            <dt className="sr-only">{t(s.label)}</dt>
            <dd>
              <span className="block font-display text-4xl font-bold text-gradient md:text-5xl">{s.value}</span>
              <span className="mt-2 block text-sm leading-snug text-dim">{t(s.label)}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow={UI.sections.about} title={UI.sections.aboutTitle} />
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[320px]">
          <div className="relative aspect-square">
            <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-accent-2/40" aria-hidden />
            <div className="absolute inset-4 rounded-full border border-accent/30" aria-hidden />
            <div className="absolute -right-1 top-10 h-3 w-3 rounded-full bg-beacon shadow-[0_0_18px_4px_#fbbf2488]" aria-hidden />
            <div className="absolute inset-8 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image src={PROFILE.avatar} alt={PROFILE.name} fill sizes="(min-width: 1024px) 256px, 70vw" className="object-cover" priority={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-space/50 via-transparent to-transparent" />
            </div>
          </div>
          <div className="hud-panel mt-6 p-4 font-mono text-xs text-ink-2">
            <div className="flex justify-between"><span className="text-dim">ID</span><span>{PROFILE.shortName}</span></div>
            <div className="mt-2 flex justify-between"><span className="text-dim">ROLE</span><span>{t(PROFILE.role)}</span></div>
            <div className="mt-2 flex justify-between"><span className="text-dim">BASE</span><span>HCMC · VN</span></div>
            <div className="mt-2 flex justify-between"><span className="text-dim">LANG</span><span>VI · EN (B2)</span></div>
          </div>
        </Reveal>

        <div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-2">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-2xl leading-snug text-ink" : undefined}>{t(p)}</p>
              </Reveal>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {ABOUT.values.map((v, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <li className="hud-panel flex h-full items-start gap-3 p-4 text-sm text-ink-2">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-2" aria-hidden />
                  {t(v)}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
