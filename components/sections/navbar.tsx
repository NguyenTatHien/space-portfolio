"use client";

import { ArrowDownTrayIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/logo";
import { PROFILE, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: UI.nav.about },
  { href: "#experience", label: UI.nav.experience },
  { href: "#projects", label: UI.nav.projects },
  { href: "#skills", label: UI.nav.skills },
  { href: "#contact", label: UI.nav.contact },
];

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t(UI.nav.lang)}
      className={cn("relative flex h-9 items-center rounded-full border border-white/15 bg-white/5 p-0.5 font-mono text-xs", className)}
    >
      {(["en", "vi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "relative z-10 h-8 min-w-11 rounded-full px-3 uppercase tracking-wider transition-colors",
            lang === code ? "text-black" : "text-ink-2 hover:text-ink",
          )}
        >
          {lang === code ? (
            <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-accent-2" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
          ) : null}
          {code}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-space/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8" aria-label="Main">
        <Link href="#top" className="group flex items-center gap-3" aria-label={PROFILE.name}>
          <Logo className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[24deg]" />
          <span className="hidden font-display text-sm font-semibold tracking-wide text-ink sm:block">
            {PROFILE.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 backdrop-blur md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-white/5 hover:text-ink">
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle />
          <a href={PROFILE.cv} download className="btn btn-primary hidden h-9 min-h-9 px-4 lg:inline-flex">
            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
            {t(UI.nav.cv)}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? UI.nav.close : UI.nav.menu)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="border-t border-white/10 bg-space/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-white/5 text-base text-ink-2 hover:text-ink">
                    {t(l.label)}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a href={PROFILE.cv} download className="btn btn-primary w-full">
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
                  {t(UI.nav.cv)}
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
