"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Course } from "@/lib/types";
import { findLesson, lessonCount } from "@/lib/courses";
import { useLang } from "@/lib/lang";
import { useCourseProgress, useEnrolment } from "@/lib/progress";
import { Badge, Button, ButtonLink, Check, PlayIcon, ProgressBar } from "@/components/ui/Bits";
import { LangToggle } from "@/components/site/LangToggle";
import { VideoFrame } from "./VideoFrame";

const NOTE_KEY = "ticai.notes";

function readNote(slug: string, lessonId: string) {
  try {
    const all = JSON.parse(window.localStorage.getItem(NOTE_KEY) ?? "{}");
    return all?.[`${slug}:${lessonId}`] ?? "";
  } catch {
    return "";
  }
}

function writeNote(slug: string, lessonId: string, text: string) {
  try {
    const all = JSON.parse(window.localStorage.getItem(NOTE_KEY) ?? "{}");
    all[`${slug}:${lessonId}`] = text;
    window.localStorage.setItem(NOTE_KEY, JSON.stringify(all));
  } catch {
    /* storage blocked — notes just will not persist */
  }
}

type Tab = "overview" | "resources" | "notes";

export function LessonPlayer({ course, lessonId }: { course: Course; lessonId: string }) {
  const { t, lang } = useLang();
  const total = lessonCount(course);
  const { isDone, toggle, percent, done } = useCourseProgress(course.slug, total);
  const { enrol } = useEnrolment(course.slug);

  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [note, setNote] = useState("");

  const found = findLesson(course, lessonId);

  // Enrolling on first play is what makes My Learning fill up by itself.
  useEffect(() => {
    enrol(course.slug);
  }, [course.slug, enrol]);

  useEffect(() => {
    setNote(readNote(course.slug, lessonId));
    setTab("overview");
    setSidebarOpen(false);
  }, [course.slug, lessonId]);

  if (!found) return null;
  const { lesson, index, prev, next } = found;
  const complete = isDone(lesson.id);

  const onNoteChange = (text: string) => {
    setNote(text);
    writeNote(course.slug, lessonId, text);
  };

  const curriculum = (
    <div className="thin-scroll flex h-full flex-col">
      <div className="border-b border-ink-900/8 p-5">
        <Link
          href={`/courses/${course.slug}`}
          className="focus-ring block rounded font-telugu font-bold leading-snug text-ink-900 hover:text-gold-700"
        >
          {course.titleTe}
        </Link>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-ink-400">
          <span lang={lang}>{t("Progress", "ప్రగతి")}</span>
          <span className="tabular-nums">
            {done.length}/{total}
          </span>
        </div>
        <ProgressBar percent={percent} className="mt-2" />
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {course.modules.map((mod, mi) => (
          <div key={mod.id} className="mb-4">
            <p className="px-2 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
              {t(`Module ${mi + 1}`, `మాడ్యూల్ ${mi + 1}`)} · {mod.titleTe}
            </p>
            <ul className="space-y-0.5">
              {mod.lessons.map((l) => {
                const active = l.id === lesson.id;
                const ldone = isDone(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      href={`/courses/${course.slug}/learn/${l.id}`}
                      aria-current={active ? "page" : undefined}
                      className={`focus-ring flex items-start gap-2.5 rounded-xl px-2.5 py-2.5 transition ${
                        active
                          ? "bg-ink-900 text-white"
                          : "text-ink-600 hover:bg-gold-50 hover:text-ink-900"
                      }`}
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
                        {ldone ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <span
                            className={`grid h-4.5 w-4.5 place-items-center rounded-full border ${
                              active ? "border-white/40 text-white" : "border-ink-900/20 text-ink-400"
                            }`}
                          >
                            <PlayIcon className="h-2 w-2" />
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-telugu text-[0.86rem] font-medium leading-snug">
                          {l.titleTe}
                        </span>
                        <span
                          className={`mt-0.5 block text-[0.7rem] tabular-nums ${
                            active ? "text-ink-300" : "text-ink-400"
                          }`}
                        >
                          {l.minutes} min
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-dvh bg-paper-100">
      {/* ----------------------------------------------- slim top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-ink-950 text-white">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <Link
            href={`/courses/${course.slug}`}
            lang={lang}
            className="focus-ring flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-ink-200 transition hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">{t("Course", "కోర్సు")}</span>
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-telugu text-sm font-semibold">{lesson.titleTe}</p>
            <p className="truncate text-[0.68rem] text-ink-400">
              {t(`Lesson ${index + 1} of ${total}`, `పాఠం ${index + 1} / ${total}`)}
            </p>
          </div>

          <div className="hidden md:block">
            <LangToggle dark />
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            lang={lang}
            className="focus-ring rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-ink-100 transition hover:bg-white/8 lg:hidden"
          >
            {t("Lessons", "పాఠాలు")}
          </button>
        </div>
        <ProgressBar percent={percent} className="px-0" />
      </header>

      <div className="lg:grid lg:grid-cols-[1fr_22rem]">
        {/* ------------------------------------------------- main stage */}
        <div className="min-w-0 px-4 py-6 md:px-8 md:py-8">
          <VideoFrame video={lesson.video} title={lesson.title} />

          <div className="mt-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-telugu text-balance text-2xl font-bold leading-snug tracking-tight text-ink-900">
                  {lesson.titleTe}
                </h1>
                <p className="mt-1.5 text-sm font-medium text-ink-500">{lesson.title}</p>
              </div>

              <Button
                variant={complete ? "outline" : "primary"}
                size="md"
                lang={lang}
                onClick={() => toggle(lesson.id)}
                className="shrink-0"
              >
                {complete ? (
                  <>
                    <Check className="h-4 w-4" />
                    {t("Completed", "పూర్తయింది")}
                  </>
                ) : (
                  t("Mark complete", "పూర్తి అని గుర్తించండి")
                )}
              </Button>
            </div>

            {/* tabs */}
            <div className="mt-8 flex gap-1 border-b border-ink-900/10">
              {(
                [
                  ["overview", t("Overview", "సారాంశం")],
                  ["resources", t("Resources", "వనరులు")],
                  ["notes", t("My notes", "నా నోట్స్")],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  lang={lang}
                  className={`focus-ring -mb-px rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                    tab === id
                      ? "border-gold-500 text-ink-900"
                      : "border-transparent text-ink-400 hover:text-ink-700"
                  }`}
                >
                  {label}
                  {id === "resources" && lesson.resources?.length ? (
                    <span className="ml-1.5 text-xs text-gold-700">{lesson.resources.length}</span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="py-7">
              {tab === "overview" && (
                <div className="max-w-2xl">
                  {lesson.summaryTe || lesson.summary ? (
                    <p lang={lang} className="text-[1.02rem] leading-relaxed text-ink-600">
                      {t(lesson.summary ?? "", lesson.summaryTe ?? lesson.summary ?? "")}
                    </p>
                  ) : (
                    <p lang={lang} className="text-ink-400">
                      {t(
                        "No written summary for this lesson yet.",
                        "ఈ పాఠానికి ఇంకా వ్రాతపూర్వక సారాంశం లేదు.",
                      )}
                    </p>
                  )}

                  {lesson.preview && (
                    <div className="mt-6">
                      <Badge tone="gold">{t("Free preview lesson", "ఉచిత ప్రివ్యూ పాఠం")}</Badge>
                    </div>
                  )}
                </div>
              )}

              {tab === "resources" && (
                <div className="max-w-2xl">
                  {lesson.resources?.length ? (
                    <ul className="space-y-2.5">
                      {lesson.resources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card card-hover focus-ring flex items-center gap-4 p-4"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v8.6l2.3-2.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 11.6V3a1 1 0 011-1zM4 16a1 1 0 100 2h12a1 1 0 100-2H4z" />
                              </svg>
                            </span>
                            <span className="min-w-0 flex-1">
                              <span lang={lang} className="block truncate font-semibold text-ink-900">
                                {t(r.label, r.labelTe ?? r.label)}
                              </span>
                              <span className="block text-xs uppercase tracking-wide text-ink-400">
                                {r.type}
                              </span>
                            </span>
                            <span className="text-ink-300">↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p lang={lang} className="text-ink-400">
                      {t("No downloads for this lesson.", "ఈ పాఠానికి డౌన్‌లోడ్‌లు లేవు.")}
                    </p>
                  )}
                </div>
              )}

              {tab === "notes" && (
                <div className="max-w-2xl">
                  <label
                    lang={lang}
                    htmlFor="lesson-note"
                    className="block text-sm font-medium text-ink-600"
                  >
                    {t(
                      "Notes are saved on this device as you type.",
                      "మీరు టైప్ చేస్తుండగానే ఈ పరికరంలో నోట్స్ సేవ్ అవుతాయి.",
                    )}
                  </label>
                  <textarea
                    id="lesson-note"
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    rows={10}
                    lang={lang}
                    placeholder={t(
                      "What will you try in your own business after this lesson?",
                      "ఈ పాఠం తరువాత మీ వ్యాపారంలో ఏం ప్రయత్నిస్తారు?",
                    )}
                    className="focus-ring mt-3 w-full rounded-2xl border border-ink-900/12 bg-white p-4 font-telugu text-[0.95rem] leading-relaxed text-ink-900 placeholder:text-ink-400"
                  />
                </div>
              )}
            </div>

            {/* prev / next */}
            <div className="flex flex-col gap-3 border-t border-ink-900/10 pt-7 sm:flex-row sm:justify-between">
              {prev ? (
                <ButtonLink
                  href={`/courses/${course.slug}/learn/${prev.id}`}
                  variant="outline"
                  size="md"
                  className="justify-start text-left"
                >
                  <span className="shrink-0">←</span>
                  <span className="min-w-0">
                    <span lang={lang} className="block text-[0.68rem] uppercase tracking-wide text-ink-400">
                      {t("Previous", "ముందు")}
                    </span>
                    <span className="block truncate font-telugu">{prev.titleTe}</span>
                  </span>
                </ButtonLink>
              ) : (
                <span />
              )}

              {next ? (
                <ButtonLink
                  href={`/courses/${course.slug}/learn/${next.id}`}
                  variant="dark"
                  size="md"
                  className="justify-end text-right"
                  onClick={() => {
                    if (!complete) toggle(lesson.id);
                  }}
                >
                  <span className="min-w-0">
                    <span lang={lang} className="block text-[0.68rem] uppercase tracking-wide text-ink-300">
                      {t("Next lesson", "తరువాతి పాఠం")}
                    </span>
                    <span className="block truncate font-telugu">{next.titleTe}</span>
                  </span>
                  <span className="shrink-0">→</span>
                </ButtonLink>
              ) : (
                <ButtonLink href={`/courses/${course.slug}`} variant="primary" size="md" lang={lang}>
                  {t("Finish course", "కోర్సు పూర్తి చేయండి")} 🎉
                </ButtonLink>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------- sidebar (desktop) */}
        <aside className="hidden border-l border-ink-900/8 bg-white lg:sticky lg:top-14 lg:block lg:h-[calc(100dvh-3.5rem)]">
          {curriculum}
        </aside>
      </div>

      {/* ---------------------------------------------- sidebar (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[min(22rem,88vw)] bg-white shadow-2xl">
            {curriculum}
          </div>
        </div>
      )}
    </div>
  );
}
