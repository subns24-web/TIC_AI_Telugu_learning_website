"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/* Telugu is the default. The toggle is for the English words that have no
 * settled Telugu equivalent yet, not for abandoning Telugu. */

export type Lang = "te" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (en: string, te: string) => string };

const LangContext = createContext<Ctx>({ lang: "te", setLang: () => {}, t: (_en, te) => te });

const KEY = "ticai.lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("te");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as Lang | null;
      if (saved === "te" || saved === "en") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  // Tag the whole page with the chosen language (screen readers, fonts, browser translate).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((en: string, te: string) => (lang === "en" ? en : te), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
