"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { Lang, T } from "@/constants/profile";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (text: T) => string;
};

const STORAGE_KEY = "lang";
const LangContext = createContext<LangContextValue | null>(null);

function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "vi" || fromUrl === "en") return fromUrl;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "vi" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  // English on the server render (what crawlers and link previews see), then the visitor's choice after hydration.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const detected = detectLang();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only state once after hydration
    if (detected !== "en") setLangState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "vi" : "en"),
      t: (text: T) => text[lang],
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
