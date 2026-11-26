"use client";

import { ArrowDownTrayIcon, ArrowUpIcon, CheckIcon, ClipboardDocumentIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import { Logo } from "@/components/ui/logo";
import { Reveal, Section } from "@/components/ui/primitives";
import { PROFILE, UI } from "@/constants/profile";
import { useLang } from "@/lib/i18n";

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  return (
    <Section id="contact">
      <Reveal>
        <div className="hud-panel relative overflow-hidden px-6 py-14 text-center sm:px-12 md:py-20">
          <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
          <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[100px]" aria-hidden />
          <div className="relative">
            <span className="hud-label">06 · {t(UI.sections.contact)}</span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              {t(UI.sections.contactTitle)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-ink-2">{t(UI.contact.body)}</p>

            <div className="mx-auto mt-9 flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-black/40 p-1.5 pl-5 backdrop-blur">
              <EnvelopeIcon className="h-5 w-5 shrink-0 text-accent-2" aria-hidden />
              <span className="flex-1 truncate text-left font-mono text-sm text-ink">{PROFILE.email}</span>
              <button type="button" onClick={copy} className="btn btn-primary h-10 min-h-10 px-4" aria-live="polite">
                {copied ? <CheckIcon className="h-4 w-4" aria-hidden /> : <ClipboardDocumentIcon className="h-4 w-4" aria-hidden />}
                {t(copied ? UI.contact.copied : UI.contact.copy)}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">
                <EnvelopeIcon className="h-4 w-4" aria-hidden />
                {t(UI.contact.send)}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                <FaLinkedinIn className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                <SiGithub className="h-4 w-4" aria-hidden />
                GitHub
              </a>
              <a href={PROFILE.cv} download className="btn btn-ghost">
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
                {t(UI.nav.cv)}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-dim sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <span>
            © {new Date().getFullYear()} · {t(UI.footer.built)}
          </span>
        </div>
        <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 hover:text-ink">
          <ArrowUpIcon className="h-4 w-4" aria-hidden />
          {t(UI.footer.top)}
        </a>
      </div>
    </footer>
  );
}
