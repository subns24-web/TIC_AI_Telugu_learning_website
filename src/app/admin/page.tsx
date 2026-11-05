"use client";

import { useMemo, useState } from "react";
import { courses } from "@/lib/courses";
import { useLang } from "@/lib/lang";
import { parseVideoLink, VIDEO_HOST_LABEL } from "@/lib/video";
import { Badge, Button, SectionHead } from "@/components/ui/Bits";

/* The upload helper. Content lives in src/lib/courses.ts, so "uploading" a
 * recording means pasting one object into that file. This page writes that
 * object for you and warns when a link will not play inline. */

export default function AdminPage() {
  const { t, lang } = useLang();

  const [link, setLink] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [minutes, setMinutes] = useState("25");
  const [summaryTe, setSummaryTe] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [preview, setPreview] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseVideoLink(link), [link]);

  const snippet = useMemo(() => {
    if (!parsed) return "";

    let video: string;
    if (parsed.kind === "youtube") {
      video = `{ kind: "youtube", id: "${parsed.id}" }`;
    } else if (parsed.kind === "vimeo") {
      video = `{ kind: "vimeo", id: "${parsed.id}" }`;
    } else if (parsed.kind === "mp4") {
      video = `{ kind: "mp4", url: "${parsed.url}" }`;
    } else {
      const pass = passcode.trim() ? `, passcode: "${passcode.trim()}"` : "";
      video = `{ kind: "zoom", url: "${parsed.url}"${pass} }`;
    }

    const lines = [
      "{",
      `  id: "${lessonId || "lN"}",`,
      `  title: ${JSON.stringify(titleEn || "Untitled lesson")},`,
      `  titleTe: ${JSON.stringify(titleTe || "పేరు లేని పాఠం")},`,
      `  minutes: ${Number(minutes) || 0},`,
      `  video: ${video},`,
    ];
    if (summaryTe.trim()) lines.push(`  summaryTe: ${JSON.stringify(summaryTe.trim())},`);
    if (preview) lines.push("  preview: true,");
    lines.push("},");
    return lines.join("\n");
  }, [parsed, lessonId, titleEn, titleTe, minutes, summaryTe, preview, passcode]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "focus-ring w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400";
  const label = "block text-xs font-semibold uppercase tracking-[0.12em] text-ink-400";

  return (
    <div className="container-tic py-14 md:py-20">
      <SectionHead
        eyebrow={t("Upload helper", "అప్‌లోడ్ సహాయకం")}
        title={t("Add a recording as a lesson", "ఒక రికార్డింగ్‌ను పాఠంగా చేర్చండి")}
        blurb={t(
          "Paste the video link, fill the titles, copy the snippet and drop it into the right module in src/lib/courses.ts. No database needed yet.",
          "వీడియో లింక్ అతికించండి, పేర్లు నింపండి, స్నిప్పెట్ కాపీ చేసి src/lib/courses.ts లో సరైన మాడ్యూల్‌లో పెట్టండి. ఇంకా డేటాబేస్ అవసరం లేదు.",
        )}
        lang={lang}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* ------------------------------------------------- form */}
        <div className="card space-y-6 p-7">
          <div>
            <label className={label} htmlFor="link">
              {t("Video link", "వీడియో లింక్")}
            </label>
            <input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              className={`${field} mt-2`}
            />
            <div className="mt-3 min-h-6">
              {link.trim() === "" ? (
                <p lang={lang} className="text-xs text-ink-400">
                  {t(
                    "YouTube, Vimeo, a direct .mp4 URL, or a Zoom recording link.",
                    "YouTube, Vimeo, నేరుగా .mp4 URL, లేదా Zoom రికార్డింగ్ లింక్.",
                  )}
                </p>
              ) : parsed ? (
                <Badge tone={parsed.kind === "zoom" ? "gold" : "teal"}>
                  {VIDEO_HOST_LABEL[parsed.kind]}
                  {parsed.kind === "youtube" && ` · ${parsed.id}`}
                </Badge>
              ) : (
                <p lang={lang} className="text-xs font-medium text-rose-600">
                  {t("That link is not recognised.", "ఆ లింక్ గుర్తించలేదు.")}
                </p>
              )}
            </div>
          </div>

          {parsed?.kind === "zoom" && (
            <div className="rounded-xl border border-gold-300 bg-gold-50 p-4">
              <p lang={lang} className="text-sm font-semibold text-gold-900">
                {t("Zoom links cannot play inside the site", "Zoom లింక్‌లు సైట్‌లో ప్లే కావు")}
              </p>
              <p lang={lang} className="mt-2 text-sm leading-relaxed text-gold-800">
                {t(
                  "Zoom blocks embedding, so this lesson will show an 'Open the recording' button instead of a player. For a proper in-site experience, download the MP4 from Zoom and re-upload it to YouTube as unlisted, then paste that link here.",
                  "Zoom ఎంబెడ్ చేయడాన్ని అడ్డుకుంటుంది, అందుకే ఈ పాఠంలో ప్లేయర్ కాదు 'రికార్డింగ్ తెరవండి' బటన్ కనిపిస్తుంది. సైట్‌లోనే సరైన అనుభవం కోసం — Zoom నుంచి MP4 డౌన్‌లోడ్ చేసి YouTube లో unlisted గా అప్‌లోడ్ చేసి, ఆ లింక్ ఇక్కడ అతికించండి.",
                )}
              </p>
              <label className={`${label} mt-4`} htmlFor="passcode">
                {t("Recording passcode (optional)", "రికార్డింగ్ పాస్‌కోడ్ (ఐచ్ఛికం)")}
              </label>
              <input
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`${field} mt-2`}
              />
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="titleTe">
                {t("Title in Telugu", "తెలుగు పేరు")}
              </label>
              <input
                id="titleTe"
                value={titleTe}
                onChange={(e) => setTitleTe(e.target.value)}
                lang="te"
                placeholder="ప్రాంప్ట్ ఎలా రాయాలి"
                className={`${field} mt-2 font-telugu`}
              />
            </div>
            <div>
              <label className={label} htmlFor="titleEn">
                {t("Title in English", "ఇంగ్లీష్ పేరు")}
              </label>
              <input
                id="titleEn"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="How to write a prompt"
                className={`${field} mt-2`}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="lessonId">
                {t("Lesson id", "పాఠం id")}
              </label>
              <input
                id="lessonId"
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
                placeholder="l9"
                className={`${field} mt-2`}
              />
              <p lang={lang} className="mt-2 text-xs text-ink-400">
                {t(
                  "Unique within its course — the URL uses it.",
                  "కోర్సులో ఒక్కటే ఉండాలి — URL దీన్ని వాడుతుంది.",
                )}
              </p>
            </div>
            <div>
              <label className={label} htmlFor="minutes">
                {t("Length in minutes", "నిమిషాల్లో నిడివి")}
              </label>
              <input
                id="minutes"
                type="number"
                min={1}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className={`${field} mt-2`}
              />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="summaryTe">
              {t("Telugu summary (optional)", "తెలుగు సారాంశం (ఐచ్ఛికం)")}
            </label>
            <textarea
              id="summaryTe"
              value={summaryTe}
              onChange={(e) => setSummaryTe(e.target.value)}
              rows={3}
              lang="te"
              className={`${field} mt-2 font-telugu leading-relaxed`}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={preview}
              onChange={(e) => setPreview(e.target.checked)}
              className="focus-ring h-4 w-4 rounded border-ink-900/25 accent-gold-500"
            />
            <span lang={lang} className="text-sm text-ink-700">
              {t("Free preview lesson", "ఉచిత ప్రివ్యూ పాఠం")}
            </span>
          </label>
        </div>

        {/* ---------------------------------------------- output */}
        <div className="space-y-5">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-ink-900/8 px-5 py-4">
              <h3 lang={lang} className="text-sm font-semibold text-ink-900">
                {t("Paste this into courses.ts", "దీన్ని courses.ts లో అతికించండి")}
              </h3>
              <Button size="sm" variant="dark" onClick={copy} disabled={!snippet} lang={lang}>
                {copied ? t("Copied", "కాపీ అయింది") : t("Copy", "కాపీ")}
              </Button>
            </div>
            <pre className="thin-scroll max-h-96 overflow-auto bg-ink-950 p-5 text-[0.78rem] leading-relaxed text-ink-100">
              <code>
                {snippet ||
                  t(
                    "// Paste a video link to generate the lesson object.",
                    "// పాఠం ఆబ్జెక్ట్ తయారవడానికి వీడియో లింక్ అతికించండి.",
                  )}
              </code>
            </pre>
          </div>

          <div className="card p-6">
            <h3 lang={lang} className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-400">
              {t("Where it goes", "ఎక్కడ పెట్టాలి")}
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600">
              {(
                [
                  [
                    "Open src/lib/courses.ts",
                    "src/lib/courses.ts తెరవండి",
                  ],
                  [
                    "Find the course, then the module you want",
                    "కోర్సు, తరువాత మీకు కావాల్సిన మాడ్యూల్ కనుక్కోండి",
                  ],
                  [
                    "Paste the object into that module's lessons array",
                    "ఆ మాడ్యూల్ lessons శ్రేణిలో ఆబ్జెక్ట్ అతికించండి",
                  ],
                  [
                    "Save — the lesson appears with its own URL immediately",
                    "సేవ్ చేయండి — పాఠం దాని URL తో వెంటనే కనిపిస్తుంది",
                  ],
                ] as const
              ).map(([en, te], i) => (
                <li key={en} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-900/6 text-xs font-bold text-ink-600">
                    {i + 1}
                  </span>
                  <span lang={lang}>{t(en, te)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6">
            <h3 lang={lang} className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-400">
              {t("Courses and module ids", "కోర్సులు, మాడ్యూల్ ids")}
            </h3>
            <ul className="mt-4 space-y-4">
              {courses.map((c) => (
                <li key={c.slug}>
                  <p className="font-telugu text-sm font-semibold text-ink-900">{c.titleTe}</p>
                  <code className="text-[0.72rem] text-ink-400">{c.slug}</code>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.modules.map((m) => (
                      <Badge key={m.id} tone="neutral">
                        {m.id} · {m.lessons.length}
                      </Badge>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
