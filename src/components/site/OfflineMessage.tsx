"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

/* Body of /offline, in the chosen language only. */
export function OfflineMessage() {
  const { t, lang } = useLang();
  return (
    <>
      <h1 lang={lang} className="mt-7 font-telugu text-2xl font-bold tracking-tight text-ink-900">
        {t("No internet connection", "ఇంటర్నెట్ కనెక్షన్ లేదు")}
      </h1>
      <p lang={lang} className="mt-4 max-w-md font-telugu leading-relaxed text-ink-500">
        {t("Pages you have already opened work offline. Videos play once you are back online.",
           "మీరు ఇంతకు ముందు తెరిచిన పేజీలు ఆఫ్‌లైన్‌లో కూడా పని చేస్తాయి. వీడియోలు మాత్రం ఇంటర్నెట్ వచ్చాకే ప్లే అవుతాయి.")}
      </p>
      <Link
        href="/"
        lang={lang}
        className="btn-gold focus-ring mt-9 inline-flex min-h-12 items-center rounded-xl px-6 py-3.5 font-telugu font-semibold"
      >
        {t("Try again", "మళ్ళీ ప్రయత్నించండి")}
      </Link>
    </>
  );
}
