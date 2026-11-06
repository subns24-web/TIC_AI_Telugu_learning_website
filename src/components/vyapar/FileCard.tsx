"use client";

import { useState } from "react";
import type { RequiredFile } from "@/lib/vyapar-types";
import { useLang } from "@/lib/lang";
import { Badge } from "@/components/ui/Bits";

/* The input checklist. A prompt is useless to a shop owner who does not
 * know what to attach, so every file says what it is, why it matters, what
 * should be in it, and the exact taps to produce it in the app they use. */

export function FileCard({
  file,
  checked,
  onToggle,
}: {
  file: RequiredFile;
  checked: boolean;
  onToggle: () => void;
}) {
  const { t, lang } = useLang();
  const [openSource, setOpenSource] = useState<number | null>(null);
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div
      className={`card overflow-hidden transition ${
        checked ? "border-teal-300 bg-teal-50/40" : ""
      }`}
    >
      <div className="flex gap-3.5 p-4 sm:p-5">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={onToggle}
          aria-label={t("I have this ready", "ఇది నా దగ్గర సిద్ధంగా ఉంది")}
          /* The box stays 28px, but the button around it is a full 44px
             so a thumb can actually land on it. */
          className="focus-ring -m-2 grid h-11 w-11 shrink-0 place-items-center rounded-xl"
        >
          <span
            className={`grid h-7 w-7 place-items-center rounded-lg border-2 transition ${
              checked
                ? "border-teal-500 bg-teal-500 text-white"
                : "border-ink-900/20 bg-white hover:border-gold-500"
            }`}
          >
            {checked && (
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 10.5l3.5 3.5L15 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 lang={lang} className="font-telugu font-bold leading-snug text-ink-900">
              {t(file.name, file.nameTe)}
            </h4>
            {file.optional && (
              <Badge tone="silver">{t("Optional", "ఐచ్ఛికం")}</Badge>
            )}
          </div>

          <p lang={lang} className="mt-1 text-sm text-ink-400">
            {t(file.format, file.formatTe)}
          </p>

          {/* Why it matters — folded away, because the checklist should read
              as a short list first and a lesson only on demand. */}
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            lang={lang}
            className="focus-ring mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-gold-700 hover:text-gold-800"
          >
            {t("Why is this needed?", "ఇది ఎందుకు కావాలి?")}
            <svg
              viewBox="0 0 20 20"
              className={`h-4 w-4 transition-transform ${showWhy ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showWhy && (
            <p lang={lang} className="mt-2 rounded-xl bg-ink-900/4 p-3.5 text-sm leading-relaxed text-ink-600">
              {t(file.why, file.whyTe)}
            </p>
          )}

          {file.contains && (
            <div className="mt-4">
              <p lang={lang} className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                {t("It should contain", "ఇందులో ఉండాల్సినవి")}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(lang === "en" ? file.contains : (file.containsTe ?? file.contains)).map((c) => (
                  <span
                    key={c}
                    lang={lang}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-ink-600 ring-1 ring-ink-900/10"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {file.howToGet && file.howToGet.length > 0 && (
            <div className="mt-5">
              <p lang={lang} className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                {t("How do I get this?", "ఇది ఎలా తీసుకోవాలి?")}
              </p>

              <div className="mt-2.5 space-y-2">
                {file.howToGet.map((how, i) => {
                  const open = openSource === i;
                  return (
                    <div key={how.source} className="overflow-hidden rounded-xl ring-1 ring-ink-900/10">
                      <button
                        type="button"
                        onClick={() => setOpenSource(open ? null : i)}
                        aria-expanded={open}
                        lang={lang}
                        className="focus-ring flex min-h-11 w-full items-center justify-between gap-3 bg-white px-3.5 text-left text-sm font-semibold text-ink-800 transition hover:bg-gold-50"
                      >
                        <span className="font-telugu">{t(how.source, how.sourceTe)}</span>
                        <svg
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {open && (
                        <ol className="space-y-2.5 border-t border-ink-900/8 bg-paper-100 p-4">
                          {(lang === "en" ? how.steps : how.stepsTe).map((step, si) => (
                            <li key={si} className="flex gap-3">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-gold-300">
                                {si + 1}
                              </span>
                              <span lang={lang} className="font-telugu text-sm leading-relaxed text-ink-700">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
