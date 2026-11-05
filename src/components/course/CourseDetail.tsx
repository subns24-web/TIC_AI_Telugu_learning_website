"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course } from "@/lib/types";
import { allLessons, lessonCount, runtime, totalMinutes } from "@/lib/courses";
import { inr, LANGUAGE_LABEL, LEVEL_LABEL } from "@/lib/format";
import { useLang } from "@/lib/lang";
import { useCourseProgress, useEnrolment } from "@/lib/progress";
import { Badge, Button, ButtonLink, Check, PlayIcon, ProgressBar } from "@/components/ui/Bits";

export function CourseDetail({ course }: { course: Course }) {
  const { t, lang } = useLang();
  const total = lessonCount(course);
  const { percent, done, isDone, reset, ready } = useCourseProgress(course.slug, total);
  const { isEnrolled, enrol, leave } = useEnrolment(course.slug);
  const [openModules, setOpenModules] = useState<string[]>([course.modules[0]?.id ?? ""]);

  const flat = allLessons(course);
  const firstUnfinished = flat.find((l) => !isDone(l.id)) ?? flat[0];
  const started = ready && done.length > 0;

  const toggleModule = (id: string) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      {/* ------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 grid-ink opacity-50" />
        <div className="container-tic relative py-14 md:py-20">
          <nav className="flex items-center gap-2 text-sm text-ink-400">
            <Link href="/courses" lang={lang} className="focus-ring rounded hover:text-white">
              {t("Courses", "కోర్సులు")}
            </Link>
            <span>/</span>
            <span className="truncate text-ink-200">{course.title}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="gold">
                  {t(LEVEL_LABEL[course.level].en, LEVEL_LABEL[course.level].te)}
                </Badge>
                <Badge tone="teal">
                  {t(LANGUAGE_LABEL[course.language].en, LANGUAGE_LABEL[course.language].te)}
                </Badge>
                {course.comingSoon && (
                  <Badge tone="ink" className="ring-1 ring-gold-400/40">
                    {t("Coming soon", "త్వరలో")}
                  </Badge>
                )}
              </div>

              <h1 className="mt-6 font-telugu text-balance text-[2rem] font-bold leading-[1.3] tracking-tight sm:text-[2.6rem]">
                {course.titleTe}
              </h1>
              <p className="mt-2 text-lg font-medium text-ink-300">{course.title}</p>

              <p lang={lang} className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-200">
                {t(course.tagline, course.taglineTe)}
              </p>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {(
                  [
                    [String(total), t("lessons", "పాఠాలు")],
                    [runtime(course), t("of video", "వీడియో")],
                    [String(course.modules.length), t("modules", "మాడ్యూల్స్")],
                    [`${Math.round(totalMinutes(course) / 60) || 1}`, t("hours to finish", "గంటలు")],
                  ] as const
                ).map(([n, label]) => (
                  <div key={label}>
                    <dt className="text-metal text-2xl font-bold">{n}</dt>
                    <dd lang={lang} className="mt-0.5 text-sm text-ink-400">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* enrol card */}
            <aside className="lg:pt-2">
              <div className="hairline rounded-2xl border bg-white/6 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,.9)] backdrop-blur-sm">
                {!course.comingSoon && (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white">
                      {course.priceInr === 0 ? t("Free", "ఉచితం") : inr(course.priceInr)}
                    </span>
                    {course.mrpInr && (
                      <span className="text-lg font-medium text-ink-400 line-through">
                        {inr(course.mrpInr)}
                      </span>
                    )}
                  </div>
                )}

                {started && (
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-300">
                      <span lang={lang}>{t("Your progress", "మీ ప్రగతి")}</span>
                      <span className="tabular-nums">
                        {done.length}/{total}
                      </span>
                    </div>
                    <ProgressBar percent={percent} />
                  </div>
                )}

                <div className="mt-6 space-y-2.5">
                  {course.comingSoon ? (
                    <Button variant="onDark" size="lg" disabled lang={lang} className="w-full">
                      {t("Opens soon", "త్వరలో తెరుచుకుంటుంది")}
                    </Button>
                  ) : (
                    <>
                      <ButtonLink
                        href={`/courses/${course.slug}/learn/${firstUnfinished.id}`}
                        size="lg"
                        lang={lang}
                        className="w-full"
                        onClick={() => enrol(course.slug)}
                      >
                        <PlayIcon />
                        {started
                          ? t("Continue learning", "కొనసాగించండి")
                          : t("Start learning", "నేర్చుకోవడం మొదలు")}
                      </ButtonLink>

                      {!isEnrolled ? (
                        <Button
                          variant="onDark"
                          size="md"
                          lang={lang}
                          onClick={() => enrol(course.slug)}
                          className="w-full"
                        >
                          {t("Save to my learning", "నా అభ్యాసంలో సేవ్ చేయండి")}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="md"
                          lang={lang}
                          onClick={() => leave(course.slug)}
                          className="w-full text-ink-300 hover:bg-white/8 hover:text-white"
                        >
                          {t("Remove from my learning", "నా అభ్యాసం నుంచి తీసేయండి")}
                        </Button>
                      )}
                    </>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-ink-200">
                  {(
                    [
                      ["Lifetime access to recordings", "రికార్డింగ్‌లకు జీవితకాల యాక్సెస్"],
                      ["Templates and prompt packs included", "టెంప్లేట్లు, ప్రాంప్ట్ ప్యాక్‌లు కలిపి"],
                      ["Watch on phone, tablet or laptop", "ఫోన్, టాబ్లెట్, ల్యాప్‌టాప్‌లో చూడండి"],
                    ] as const
                  ).map(([en, te]) => (
                    <li key={en} className="flex gap-2.5">
                      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" fill="currentColor">
                        <path d="M7.6 13.4L4.2 10l-1.2 1.2 4.6 4.6 9.4-9.4L15.8 5z" />
                      </svg>
                      <span lang={lang}>{t(en, te)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ body */}
      <div className="container-tic grid gap-14 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-14">
          {/* outcomes */}
          <section>
            <h2 lang={lang} className="text-2xl font-bold tracking-tight text-ink-900">
              {t("What you will be able to do", "మీరు ఏం చేయగలుగుతారు")}
            </h2>
            <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {course.outcomes.map((o, i) => (
                <li key={o} className="flex gap-3">
                  <Check />
                  <span lang={lang} className="text-[0.95rem] leading-relaxed text-ink-700">
                    {t(o, course.outcomesTe[i] ?? o)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* curriculum */}
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 lang={lang} className="text-2xl font-bold tracking-tight text-ink-900">
                {t("Curriculum", "పాఠ్యాంశాలు")}
              </h2>
              <p lang={lang} className="text-sm text-ink-400">
                {course.modules.length} {t("modules", "మాడ్యూల్స్")} · {total}{" "}
                {t("lessons", "పాఠాలు")} · {runtime(course)}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {course.modules.map((mod, mi) => {
                const open = openModules.includes(mod.id);
                const modMins = mod.lessons.reduce((n, l) => n + l.minutes, 0);
                return (
                  <div key={mod.id} className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      aria-expanded={open}
                      className="focus-ring flex w-full items-center gap-4 p-5 text-left transition hover:bg-ink-50/60"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-900/6 text-sm font-bold text-ink-600">
                        {mi + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-telugu font-bold leading-snug text-ink-900">
                          {mod.titleTe}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-400">
                          {mod.title} · {mod.lessons.length} {t("lessons", "పాఠాలు")} · {modMins} min
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        className={`h-5 w-5 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {open && (
                      <ul className="divide-y divide-ink-900/6 border-t border-ink-900/6">
                        {mod.lessons.map((lesson) => {
                          const complete = isDone(lesson.id);
                          const locked = course.comingSoon;
                          const inner = (
                            <>
                              <span className="grid h-7 w-7 shrink-0 place-items-center">
                                {complete ? (
                                  <Check className="h-5 w-5" />
                                ) : (
                                  <span className="grid h-6 w-6 place-items-center rounded-full border border-ink-900/15 text-ink-400">
                                    <PlayIcon className="h-2.5 w-2.5" />
                                  </span>
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-telugu text-[0.95rem] font-medium text-ink-800">
                                  {lesson.titleTe}
                                </span>
                                <span className="block truncate text-xs text-ink-400">
                                  {lesson.title}
                                </span>
                              </span>
                              {lesson.preview && !complete && (
                                <Badge tone="gold">{t("Free", "ఉచితం")}</Badge>
                              )}
                              <span className="shrink-0 text-xs tabular-nums text-ink-400">
                                {lesson.minutes} min
                              </span>
                            </>
                          );

                          return (
                            <li key={lesson.id}>
                              {locked ? (
                                <div className="flex items-center gap-3.5 px-5 py-3.5 opacity-55">{inner}</div>
                              ) : (
                                <Link
                                  href={`/courses/${course.slug}/learn/${lesson.id}`}
                                  onClick={() => enrol(course.slug)}
                                  className="focus-ring flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-gold-50"
                                >
                                  {inner}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {started && (
              <button
                type="button"
                onClick={reset}
                lang={lang}
                className="focus-ring mt-5 rounded-lg text-sm font-medium text-ink-400 underline-offset-4 hover:text-ink-700 hover:underline"
              >
                {t("Reset my progress for this course", "ఈ కోర్సు ప్రగతిని రీసెట్ చేయండి")}
              </button>
            )}
          </section>
        </div>

        {/* right rail */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h3 lang={lang} className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
              {t("Who this is for", "ఇది ఎవరికి")}
            </h3>
            <ul className="mt-4 space-y-3">
              {course.forWhom.map((w) => (
                <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500 ring-2 ring-gold-200" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h3 lang={lang} className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
              {t("Tools covered", "వాడే టూల్స్")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {course.tools.map((tool) => (
                <Badge key={tool} tone="neutral">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 lang={lang} className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
              {t("Your instructor", "మీ బోధకుడు")}
            </h3>
            <div className="mt-4 flex items-center gap-3.5">
              <span className="text-metal grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-sm font-bold">
                {course.instructor.initials}
              </span>
              <div>
                <p className="font-semibold text-ink-900">{course.instructor.name}</p>
                <p lang={lang} className="font-telugu text-xs leading-relaxed text-ink-500">
                  {t(course.instructor.role, course.instructor.roleTe)}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
