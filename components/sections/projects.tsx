"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";

import { ProjectVisual } from "@/components/sections/project-visual";
import { Reveal, Section, SectionHeading, TechChip } from "@/components/ui/primitives";
import { PROJECTS, SUITE, UI, type Project } from "@/constants/profile";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Card that tilts toward the pointer and follows it with a soft spotlight. */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(34,211,238,0.12), transparent 60%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (reduced) return;
    rx.set((0.5 - py) * 6);
    ry.set((px - 0.5) * 8);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={cn("hud-panel group relative h-full overflow-hidden", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />
      {children}
    </motion.div>
  );
}

function ProjectCard({ p, large }: { p: Project; large?: boolean }) {
  const { t } = useLang();
  return (
    <TiltCard>
      <article className={cn("flex h-full flex-col", large && "lg:flex-row")}>
        <div className={cn("relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10", large && "lg:aspect-auto lg:w-[46%] lg:border-b-0 lg:border-r")}>
          {p.image ? (
            <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          ) : (
            <ProjectVisual kind={p.visual} />
          )}
          {p.production ? (
            <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ok backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              {t(UI.projects.production)}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-accent-2">{t(p.role)}</span>
            <span className="text-beacon">{t(p.period)}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">{p.name}</h3>
          <p className="mt-1 text-sm text-dim">{t(p.subtitle)}</p>
          <p className="mt-4 leading-relaxed text-ink-2">{t(p.summary)}</p>
          <ul className="mt-4 space-y-2">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-2" aria-hidden />
                <span>{t(h)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.stack.map((s) => (
              <TechChip key={s} name={s} />
            ))}
          </div>
          {p.link ? (
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 mt-5 inline-flex w-fit items-center gap-2 border border-accent-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-accent-2 transition-all hover:bg-accent-2/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
            >
              {t(p.link.label)}
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </article>
    </TiltCard>
  );
}

function SuiteCard() {
  const { t } = useLang();
  return (
    <TiltCard>
      <article className="p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent-2">CMC Global · Front-end</span>
            <h3 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">{SUITE.name}</h3>
            <p className="mt-2 max-w-2xl text-ink-2">{t(UI.projects.suiteIntro)}</p>
          </div>
          <span className="font-mono text-sm text-beacon">{t(SUITE.period)}</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUITE.modules.map((m, i) => (
            <div key={m.name} className="relative rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent-2/40">
              <span className="font-mono text-[10px] text-dim">MODULE {String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-2 font-display text-lg font-semibold text-ink">{m.name}</h4>
              <p className="text-xs text-accent-2">{t(m.title)}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{t(m.text)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {SUITE.stack.map((s) => (
            <TechChip key={s} name={s} />
          ))}
        </div>
      </article>
    </TiltCard>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="max-w-7xl">
      <SectionHeading index="03" eyebrow={UI.sections.projects} title={UI.sections.projectsTitle} />
      <div className="grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i === 0 ? 0 : ((i - 1) % 2) * 0.08} className={i === 0 ? "lg:col-span-2" : undefined}>
            <ProjectCard p={p} large={i === 0} />
          </Reveal>
        ))}
        <Reveal className="lg:col-span-2">
          <SuiteCard />
        </Reveal>
      </div>
    </Section>
  );
}
