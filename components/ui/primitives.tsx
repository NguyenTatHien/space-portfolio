"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import type { T } from "@/constants/profile";
import { useLang } from "@/lib/i18n";
import { techIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

/** Fades and lifts children into view once, on scroll. Final state immediately when reduced motion is on. */
export function Reveal({
  children,
  delay = 0,
  className,
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, index }: { eyebrow: T; title: T; index: string }) {
  const { t } = useLang();
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-beacon">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent-2 to-transparent" />
        <span className="hud-label">{t(eyebrow)}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {t(title)}
      </h2>
    </Reveal>
  );
}

export function Section({ id, children, className }: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32", className)}>
      {children}
    </section>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="chip">
      {techIcon(name, "h-3.5 w-3.5 text-accent-2")}
      {name}
    </span>
  );
}
