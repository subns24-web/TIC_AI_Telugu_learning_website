"use client";

import { useMemo, useState } from "react";
import { courses, tracks } from "@/lib/courses";
import { LEVEL_LABEL } from "@/lib/format";
import { useLang } from "@/lib/lang";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseUnlock } from "@/components/auth/CourseUnlock";
import { SectionHead } from "@/components/ui/Bits";
import type { Level } from "@/lib/types";

type TrackFilter = "all" | string;
type LevelFilter = "all" | Level;

export default function CoursesPage() {
  const { t, lang } = useLang();
  const [track, setTrack] = useState<TrackFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (track !== "all" && c.track !== track) return false;
      if (level !== "all" && c.level !== level) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.titleTe.includes(query.trim()) ||
        c.tagline.toLowerCase().includes(q) ||
        c.tools.some((tool) => tool.toLowerCase().includes(q))
      );
    });
  }, [track, level, query]);

  const chip = (active: boolean) =>
    `focus-ring inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition ${
      active
        ? "border-ink-900 bg-ink-900 text-white"
        : "border-ink-900/15 bg-white text-ink-600 hover:border-ink-900/35"
    }`;

  return (
    <div className="container-tic py-14 md:py-20">
      <CourseUnlock />
      <SectionHead
        eyebrow={t("Catalogue", "కోర్సు జాబితా")}
        title={t("Every course, in Telugu", "అన్ని కోర్సులు, తెలుగులో")}
        blurb={t(
          "Six courses from absolute beginner to building production agents. Start with Foundations if you are unsure.",
          "పూర్తి ప్రారంభం నుంచి ప్రొడక్షన్ ఏజెంట్ల వరకు ఆరు కోర్సులు. సందేహం ఉంటే Foundations తో మొదలుపెట్టండి.",
        )}
        lang={lang}
      />

      {/* filters */}
      <div className="mt-10 space-y-4">
        <label className="relative block max-w-md">
          <span className="sr-only">{t("Search courses", "కోర్సుల్లో వెతకండి")}</span>
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14l4 4" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            lang={lang}
            placeholder={t("Search a topic or tool…", "టాపిక్ లేదా టూల్ వెతకండి…")}
            className="focus-ring w-full rounded-xl border border-ink-900/12 bg-white py-3 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setTrack("all")} className={chip(track === "all")} lang={lang}>
            {t("All paths", "అన్ని పాత్‌లు")}
          </button>
          {tracks.map((tr) => (
            <button
              key={tr.id}
              type="button"
              onClick={() => setTrack(tr.id)}
              className={chip(track === tr.id)}
              lang={lang}
            >
              {t(tr.title, tr.titleTe)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setLevel("all")} className={chip(level === "all")} lang={lang}>
            {t("All levels", "అన్ని స్థాయిలు")}
          </button>
          {(["beginner", "intermediate", "advanced"] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              className={chip(level === lv)}
              lang={lang}
            >
              {t(LEVEL_LABEL[lv].en, LEVEL_LABEL[lv].te)}
            </button>
          ))}
        </div>
      </div>

      <p lang={lang} className="mt-8 text-sm text-ink-400">
        {visible.length} {t(visible.length === 1 ? "course" : "courses", "కోర్సులు")}
      </p>

      {visible.length === 0 ? (
        <div className="card mt-6 p-12 text-center">
          <p lang={lang} className="text-ink-500">
            {t("Nothing matches that yet.", "దానికి సరిపోయేది ఇంకా లేదు.")}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
