"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { lessonCount, runtime } from "@/lib/courses";
import { inr, LANGUAGE_LABEL, LEVEL_LABEL } from "@/lib/format";
import { useLang } from "@/lib/lang";
import { useCourseProgress } from "@/lib/progress";
import { Badge, ProgressBar } from "@/components/ui/Bits";

/* Each course gets a metal-leaning gradient band. Two stops look flat at
   this size, so every one runs light -> mid -> deep. */
const ACCENT: Record<string, string> = {
  gold: "from-gold-300 via-gold-500 to-gold-700",
  indigo: "from-ink-400 via-ink-600 to-ink-900",
  teal: "from-teal-300 via-teal-500 to-teal-800",
  violet: "from-violet-300 via-violet-500 to-violet-800",
  rose: "from-rose-300 via-rose-500 to-rose-800",
  silver: "from-silver-200 via-silver-400 to-silver-700",
};

export function CourseCard({ course, showProgress = false }: { course: Course; showProgress?: boolean }) {
  const { t, lang } = useLang();
  const total = lessonCount(course);
  const { percent, ready } = useCourseProgress(course.slug, total);
  const started = ready && percent > 0;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card card-hover focus-ring group flex flex-col overflow-hidden"
    >
      <div
        className={`relative h-28 bg-gradient-to-br ${ACCENT[course.accent] ?? ACCENT.gold}`}
      >
        <div className="absolute inset-0 grid-ink opacity-50" />
        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
          <span className="font-telugu text-lg font-bold leading-tight text-white drop-shadow-sm">
            {course.titleTe}
          </span>
        </div>
        {course.comingSoon && (
          <span
            lang={lang}
            className="absolute right-4 top-4 rounded-full bg-ink-950/80 px-2.5 py-1 text-[0.68rem] font-semibold text-gold-200 backdrop-blur"
          >
            {t("Coming soon", "త్వరలో")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] font-bold leading-snug text-ink-900">{course.title}</h3>
        <p lang={lang} className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {t(course.tagline, course.taglineTe)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge tone="outline">{t(LEVEL_LABEL[course.level].en, LEVEL_LABEL[course.level].te)}</Badge>
          <Badge tone="outline">
            {t(LANGUAGE_LABEL[course.language].en, LANGUAGE_LABEL[course.language].te)}
          </Badge>
          <Badge tone="outline">
            {total} {t("lessons", "పాఠాలు")}
          </Badge>
          <Badge tone="outline">{runtime(course)}</Badge>
        </div>

        <div className="mt-auto pt-5">
          {showProgress || started ? (
            <ProgressBar percent={percent} showLabel />
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-[1.05rem] font-bold text-ink-900">
                {course.priceInr === 0 ? t("Free", "ఉచితం") : inr(course.priceInr)}
                {course.mrpInr && (
                  <span className="ml-2 text-sm font-medium text-ink-300 line-through">
                    {inr(course.mrpInr)}
                  </span>
                )}
              </span>
              <span
                lang={lang}
                className="text-sm font-semibold text-gold-700 transition group-hover:translate-x-0.5"
              >
                {t("View", "చూడండి")} →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
