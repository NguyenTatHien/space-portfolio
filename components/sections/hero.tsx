"use client";

import { ArrowDownTrayIcon, ArrowRightIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import { PROFILE, ROTATING_ROLES, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";

const PlanetScene = dynamic(() => import("@/components/three/planet-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-56 w-56 animate-pulse rounded-full bg-[radial-gradient(circle,#3b82f655,transparent_65%)]" />
    </div>
  ),
});

const item = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

function RotatingRole() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING_ROLES.length), 2800);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {t(ROTATING_ROLES[i])}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block w-[2px] animate-blink bg-accent-2" aria-hidden />
    </span>
  );
}

export function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const anim = reduced ? {} : { initial: "hidden", animate: "show" };

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 sm:px-8 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 pt-8 lg:pt-0">
          <motion.div {...anim} variants={item} custom={0} className="inline-flex items-center gap-2.5 rounded-full border border-ok/30 bg-ok/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ok" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok">{t(UI.hero.status)}</span>
            <span className="hidden items-center gap-1 border-l border-white/15 pl-2.5 font-mono text-[11px] text-ink-2 sm:inline-flex">
              <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
              {t(PROFILE.location)}
            </span>
          </motion.div>

          <motion.p {...anim} variants={item} custom={1} className="mt-8 font-mono text-sm text-dim">
            {t(UI.hero.greeting)}
          </motion.p>
          <motion.h1 {...anim} variants={item} custom={2} className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {PROFILE.name}
          </motion.h1>
          <motion.p {...anim} variants={item} custom={3} className="mt-4 font-display text-2xl font-medium text-ink sm:text-3xl">
            <RotatingRole />
          </motion.p>
          <motion.p {...anim} variants={item} custom={4} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            {t(UI.hero.headline)}
          </motion.p>

          <motion.div {...anim} variants={item} custom={5} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              {t(UI.hero.ctaProjects)}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a href={PROFILE.cv} download className="btn btn-ghost">
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
              {t(UI.hero.ctaCv)}
            </a>
          </motion.div>

          <motion.ul {...anim} variants={item} custom={6} className="mt-8 flex items-center gap-2">
            {[
              { href: PROFILE.github, label: "GitHub", Icon: SiGithub },
              { href: PROFILE.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
              { href: `mailto:${PROFILE.email}`, label: "Email", Icon: EnvelopeIcon },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-2 transition hover:-translate-y-0.5 hover:border-accent-2/60 hover:text-ink"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative h-[52svh] min-h-[360px] lg:h-[78svh]">
          <div className="absolute inset-0 [mask-image:radial-gradient(closest-side,black_72%,transparent)]">
            <PlanetScene />
          </div>
          <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim lg:block">
            lat 10.82 · lon 106.63
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-dim transition hover:text-ink md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t(UI.hero.scroll)}</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent-2"
            animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </a>
    </section>
  );
}
