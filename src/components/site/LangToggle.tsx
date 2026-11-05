"use client";

import { useLang } from "@/lib/lang";

export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-semibold ${
        dark ? "border-white/15 bg-white/5" : "border-ink-900/10 bg-ink-50"
      }`}
      role="group"
      aria-label="Language"
    >
      {(
        [
          ["te", "తెలుగు"],
          ["en", "English"],
        ] as const
      ).map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`focus-ring rounded-full px-2.5 py-1 transition ${
            lang === code
              ? "btn-gold"
              : dark
                ? "text-ink-200 hover:text-white"
                : "text-ink-500 hover:text-ink-900"
          } ${code === "te" ? "font-telugu" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
