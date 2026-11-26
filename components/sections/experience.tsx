"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { Reveal, Section, SectionHeading, TechChip } from "@/components/ui/primitives";
import { EXPERIENCE, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";

export function Experience() {
  const { t } = useLang();
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience">
      <SectionHeading index="02" eyebrow={UI.sections.experience} title={UI.sections.experienceTitle} />
      <ol ref={list} className="relative ml-3 space-y-14 md:ml-6">
        <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-white/10" aria-hidden />
        <motion.span
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent-2 via-accent to-beacon"
          style={{ scaleY: progress }}
          aria-hidden
        />
        {EXPERIENCE.map((job, i) => (
          <li key={job.company} className="relative pl-8 md:pl-12">
            <span className="absolute -left-[7px] top-2 flex h-3.5 w-3.5 items-center justify-center" aria-hidden>
              <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-accent-2/60" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-space bg-accent-2" />
            </span>
            <Reveal delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {t(job.role)} <span className="text-accent-2">@ {job.company}</span>
                </h3>
                <span className="font-mono text-sm text-beacon">{t(job.period)}</span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-dim">{t(job.type)}</p>
              <div className="hud-panel mt-5 p-6">
                <p className="text-ink">{t(job.summary)}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-ink-2">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <TechChip key={s} name={s} />
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
