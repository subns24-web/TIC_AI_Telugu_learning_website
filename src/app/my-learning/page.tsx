"use client";

import Link from "next/link";
import { allLessons, courses, getCourse, lessonCount } from "@/lib/courses";
import { useLang } from "@/lib/lang";
import { useAllProgress, useEnrolment } from "@/lib/progress";
import { Badge, ButtonLink, PlayIcon, ProgressBar, SectionHead } from "@/components/ui/Bits";
import { RequireLogin } from "@/components/auth/RequireLogin";

export default function MyLearningPage() {
  return (
    <RequireLogin course>
      <MyLearning />
    </RequireLogin>
  );
}

function MyLearning() {
  const { t, lang } = useLang();
  const { enrolled, ready: enrolReady, leave } = useEnrolment();
  const { map, ready: progReady } = useAllProgress();

  const ready = enrolReady && progReady;

  // Anything with progress counts, even if the enrol flag never got set.
  const slugs = Array.from(new Set([...enrolled, ...Object.keys(map)])).filter((s) => getCourse(s));

  const rows = slugs.map((slug) => {
    const course = getCourse(slug)!;
    const total = lessonCount(course);
    const done = map[slug] ?? [];
    const flat = allLessons(course);
    const nextLesson = flat.find((l) => !done.includes(l.id)) ?? flat[0];
    return {
      course,
      total,
      doneCount: done.length,
      percent: total ? Math.round((done.length / total) * 100) : 0,
      nextLesson,
    };
  });

  const finished = rows.filter((r) => r.percent === 100).length;
  const minutesDone = rows.reduce((n, r) => {
    const done = map[r.course.slug] ?? [];
    return n + allLessons(r.course).filter((l) => done.includes(l.id)).reduce((s, l) => s + l.minutes, 0);
  }, 0);

  return (
    <div className="container-tic py-14 md:py-20">
      <SectionHead
        eyebrow={t("My learning", "నా కోర్సులు")}
        title={t("Pick up where you stopped", "ఆపిన దగ్గర నుంచి కొనసాగించండి")}
        blurb={t(
          "Progress is saved in this browser. Sign-in accounts arrive with paid enrolments — until then, use the same browser to keep your place.",
          "ప్రోగ్రెస్ ఈ బ్రౌజర్‌లో సేవ్ అవుతుంది. పెయిడ్ ఎన్‌రోల్‌మెంట్‌లతో పాటు లాగిన్ ఖాతాలు వస్తాయి — అప్పటి వరకు అదే బ్రౌజర్ వాడండి.",
        )}
        lang={lang}
      />

      {!ready ? (
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="card h-36 animate-pulse bg-white/60" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="card mt-12 p-12 text-center">
          <p lang={lang} className="text-lg font-semibold text-ink-900">
            {t("Nothing started yet.", "ఇంకా ఏదీ మొదలుపెట్టలేదు.")}
          </p>
          <p lang={lang} className="mx-auto mt-3 max-w-md leading-relaxed text-ink-500">
            {t(
              "The Foundations course is free and takes about six hours. It is the right place to begin.",
              "Foundations కోర్సు ఉచితం, సుమారు ఆరు గంటలు. మొదలుపెట్టడానికి సరైన చోటు.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/courses/ai-for-business-foundations" size="lg" lang={lang}>
              {t("Start the free course", "ఉచిత కోర్సు మొదలుపెట్టండి")}
            </ButtonLink>
            <ButtonLink href="/courses" size="lg" variant="outline" lang={lang}>
              {t("Browse all courses", "అన్ని కోర్సులు")}
            </ButtonLink>
          </div>
        </div>
      ) : (
        <>
          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {(
              [
                [String(rows.length), t("courses in progress", "కోర్సులు నడుస్తున్నాయి")],
                [String(finished), t("courses finished", "పూర్తయిన కోర్సులు")],
                [
                  `${Math.floor(minutesDone / 60)}h ${minutesDone % 60}m`,
                  t("of video watched", "వీడియో చూశారు"),
                ],
              ] as const
            ).map(([n, label]) => (
              <div key={label} className="card p-6">
                <dt className="text-3xl font-bold tracking-tight text-ink-900">{n}</dt>
                <dd lang={lang} className="mt-1.5 text-sm text-ink-500">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 space-y-4">
            {rows.map(({ course, total, doneCount, percent, nextLesson }) => (
              <li key={course.slug} className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="focus-ring rounded font-telugu text-lg font-bold leading-snug text-ink-900 hover:text-gold-700"
                    >
                      {course.titleTe}
                    </Link>
                    <p className="mt-1 text-sm text-ink-400">{course.title}</p>

                    <div className="mt-5 max-w-md">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-400">
                        <span lang={lang}>
                          {doneCount}/{total} {t("lessons", "పాఠాలు")}
                        </span>
                        {percent === 100 && <Badge tone="teal">{t("Finished", "పూర్తయింది")}</Badge>}
                      </div>
                      <ProgressBar percent={percent} showLabel />
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-stretch gap-2">
                    <ButtonLink
                      href={`/courses/${course.slug}/learn/${nextLesson.id}`}
                      size="md"
                      variant={percent === 100 ? "outline" : "primary"}
                      lang={lang}
                    >
                      <PlayIcon />
                      {percent === 100
                        ? t("Watch again", "మళ్ళీ చూడండి")
                        : percent === 0
                          ? t("Start", "మొదలు")
                          : t("Continue", "కొనసాగించండి")}
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={() => leave(course.slug)}
                      lang={lang}
                      className="focus-ring rounded-lg px-3 py-1.5 text-xs font-medium text-ink-400 hover:text-ink-700"
                    >
                      {t("Remove", "తీసేయండి")}
                    </button>
                  </div>
                </div>

                {percent < 100 && (
                  <p lang={lang} className="mt-5 border-t border-ink-900/8 pt-4 text-sm text-ink-500">
                    {t("Up next", "తరువాత")}:{" "}
                    <span className="font-telugu font-medium text-ink-800">{nextLesson.titleTe}</span>
                    <span className="text-ink-400"> · {nextLesson.minutes} min</span>
                  </p>
                )}
              </li>
            ))}
          </ul>

          {rows.length < courses.length && (
            <div className="mt-12">
              <ButtonLink href="/courses" variant="outline" size="lg" lang={lang}>
                {t("Find your next course", "తరువాతి కోర్సు కనుక్కోండి")}
              </ButtonLink>
            </div>
          )}
        </>
      )}
    </div>
  );
}
