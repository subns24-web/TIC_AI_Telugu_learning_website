"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { VyaparPrompt } from "@/lib/vyapar-types";
import { buildPrompt, getCategory, missingFields, TOOL_LABEL } from "@/lib/vyapar";
import { useLang } from "@/lib/lang";
import { useBusinessProfile } from "@/lib/profile";
import { Badge, Button, ButtonLink } from "@/components/ui/Bits";
import { FileCard } from "./FileCard";
import { ProfileForm } from "./ProfileForm";

/* Four steps, always in the same order: what to bring, what to tell it,
 * the finished prompt, what to do with it. A shop owner should never have
 * to guess which part they are on or what comes next. */

function Step({
  n,
  title,
  titleTe,
  done,
  children,
}: {
  n: number;
  title: string;
  titleTe: string;
  done?: boolean;
  children: React.ReactNode;
}) {
  const { t, lang } = useLang();
  return (
    <section className="relative pl-12 sm:pl-14">
      {/* the rail connecting the steps */}
      <span
        aria-hidden="true"
        className="absolute left-[15px] top-10 h-[calc(100%-1rem)] w-0.5 bg-ink-900/10 sm:left-[19px]"
      />
      <span
        className={`absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-xl text-sm font-bold sm:h-10 sm:w-10 ${
          done ? "bg-teal-500 text-white" : "btn-gold"
        }`}
      >
        {done ? (
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 10.5l3.5 3.5L15 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          n
        )}
      </span>
      <h2 lang={lang} className="font-telugu text-xl font-bold leading-snug text-ink-900">
        {t(title, titleTe)}
      </h2>
      <div className="mt-5 pb-12">{children}</div>
    </section>
  );
}

export function PromptBuilder({ prompt }: { prompt: VyaparPrompt }) {
  const { t, lang } = useLang();
  const { profile, isSet, ready } = useBusinessProfile();

  const [values, setValues] = useState<Record<string, string>>({});
  const [haveFiles, setHaveFiles] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const category = getCategory(prompt.category);

  /* Seed from the saved profile, and from each select's first option so the
     prompt is never built around a silently empty choice. */
  useEffect(() => {
    if (!ready) return;
    setValues((prev) => {
      const next = { ...prev };
      for (const f of prompt.fields) {
        if (next[f.id]) continue;
        if (f.fromProfile && profile[f.fromProfile]) next[f.id] = profile[f.fromProfile];
        else if (f.type === "select" && f.options?.length) next[f.id] = f.options[0].value;
      }
      return next;
    });
  }, [ready, profile, prompt.fields]);

  const missing = useMemo(() => missingFields(prompt, values), [prompt, values]);
  const built = useMemo(() => buildPrompt(prompt, values), [prompt, values]);

  const requiredFiles = prompt.files.filter((f) => !f.optional);
  const filesDone =
    requiredFiles.length === 0 || requiredFiles.every((f) => haveFiles.includes(f.id));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(built);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "focus-ring w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400";

  return (
    <>
      {/* ---------------------------------------------------- header */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 grid-ink opacity-50" />
        <div className="container-tic relative py-12 md:py-16">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-400">
            <Link href="/vyapar-gpt" lang={lang} className="tap focus-ring rounded hover:text-white">
              Vyapar GPT
            </Link>
            <span>/</span>
            <span lang={lang} className="text-ink-200">
              {category && t(category.title, category.titleTe)}
            </span>
          </nav>

          <h1 className="mt-6 max-w-3xl font-telugu text-balance text-[1.7rem] font-bold leading-[1.35] tracking-tight sm:text-[2.2rem]">
            {t(prompt.title, prompt.titleTe)}
          </h1>

          <div className="mt-6 max-w-2xl rounded-2xl border border-gold-400/25 bg-gold-400/8 p-4">
            <p lang={lang} className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">
              {t("What you will get", "మీకు ఏం వస్తుంది")}
            </p>
            <p lang={lang} className="mt-2 font-telugu leading-relaxed text-ink-100">
              {t(prompt.outcome, prompt.outcomeTe)}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone="ink" className="ring-1 ring-white/15">
              ⏱ {prompt.minutes} {t("minutes", "నిమిషాలు")}
            </Badge>
            {prompt.bestWith.map((b) => (
              <Badge key={b} tone="ink" className="ring-1 ring-white/15">
                {t("Best with", "దీనితో బాగా")} {TOOL_LABEL[b].name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- steps */}
      <div className="container-tic max-w-3xl py-14">
        {/* 1 — what to bring */}
        <Step
          n={1}
          done={filesDone && prompt.files.length > 0}
          title="What you need to bring"
          titleTe="మీరు తీసుకురావాల్సినవి"
        >
          {prompt.files.length === 0 ? (
            <div className="card flex items-start gap-3 p-5">
              <span className="text-xl" aria-hidden="true">
                ✅
              </span>
              <p lang={lang} className="font-telugu leading-relaxed text-ink-600">
                {t(
                  "Nothing to attach for this one. Just answer the questions below.",
                  "దీనికి ఏ ఫైల్ అవసరం లేదు. కింది ప్రశ్నలకు సమాధానం ఇస్తే చాలు.",
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {prompt.files.map((f) => (
                <FileCard
                  key={f.id}
                  file={f}
                  checked={haveFiles.includes(f.id)}
                  onToggle={() =>
                    setHaveFiles((prev) =>
                      prev.includes(f.id) ? prev.filter((x) => x !== f.id) : [...prev, f.id],
                    )
                  }
                />
              ))}
            </div>
          )}
        </Step>

        {/* 2 — details */}
        <Step
          n={2}
          done={missing.length === 0}
          title="Tell it about your business"
          titleTe="మీ వ్యాపారం గురించి చెప్పండి"
        >
          {ready && !isSet && !editProfile && (
            <div className="card mb-5 border-gold-300 bg-gold-50/60 p-5">
              <p lang={lang} className="font-telugu font-semibold text-ink-900">
                {t(
                  "Save your business details once and they fill in here every time.",
                  "మీ వ్యాపార వివరాలు ఒకసారి సేవ్ చేస్తే, ప్రతిసారీ ఇక్కడ దానంతట అవే నిండుతాయి.",
                )}
              </p>
              <Button
                size="md"
                className="mt-4"
                lang={lang}
                onClick={() => setEditProfile(true)}
              >
                {t("Set up my business", "నా వ్యాపారం సెటప్ చేయండి")}
              </Button>
            </div>
          )}

          {editProfile && (
            <div className="card mb-5 p-5">
              <ProfileForm onDone={() => setEditProfile(false)} />
            </div>
          )}

          <div className="space-y-5">
            {prompt.fields.map((f) => {
              const val = values[f.id] ?? "";
              const empty = f.required && !val.trim();
              return (
                <div key={f.id}>
                  <label
                    lang={lang}
                    htmlFor={`f-${f.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-ink-700"
                  >
                    <span className="font-telugu">{t(f.label, f.labelTe)}</span>
                    {f.required && <span className="text-rose-500">*</span>}
                    {f.fromProfile && val && (
                      <Badge tone="silver">{t("from your profile", "మీ ప్రొఫైల్ నుంచి")}</Badge>
                    )}
                  </label>

                  {f.type === "textarea" ? (
                    <textarea
                      id={`f-${f.id}`}
                      rows={3}
                      value={val}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                      lang={lang}
                      placeholder={t(f.placeholder ?? "", f.placeholderTe ?? f.placeholder ?? "")}
                      className={`${field} mt-2 font-telugu leading-relaxed ${
                        empty ? "border-rose-200" : ""
                      }`}
                    />
                  ) : f.type === "select" ? (
                    <select
                      id={`f-${f.id}`}
                      value={val}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                      lang={lang}
                      className={`${field} mt-2 font-telugu`}
                    >
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {t(o.label, o.labelTe)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`f-${f.id}`}
                      type={f.type === "number" ? "number" : "text"}
                      value={val}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                      lang={lang}
                      placeholder={t(f.placeholder ?? "", f.placeholderTe ?? f.placeholder ?? "")}
                      className={`${field} mt-2 font-telugu ${empty ? "border-rose-200" : ""}`}
                    />
                  )}

                  {f.help && (
                    <p lang={lang} className="mt-1.5 font-telugu text-sm text-ink-400">
                      {t(f.help, f.helpTe ?? f.help)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Step>

        {/* 3 — the prompt */}
        <Step n={3} done={missing.length === 0} title="Your prompt is ready" titleTe="మీ ప్రాంప్ట్ సిద్ధం">
          {missing.length > 0 && (
            <p lang={lang} className="mb-4 rounded-xl bg-rose-50 p-3.5 font-telugu text-sm text-rose-800">
              {t(
                `Fill ${missing.length} more field${missing.length > 1 ? "s" : ""} above and the blanks here will fill in.`,
                `పైన ఇంకా ${missing.length} ఖాళీలు నింపితే ఇక్కడి ఖాళీలు నిండుతాయి.`,
              )}
            </p>
          )}

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-ink-900/8 px-4 py-3">
              <span lang={lang} className="text-sm font-semibold text-ink-500">
                {built.length} {t("characters", "అక్షరాలు")}
              </span>
              <Button size="sm" variant="dark" onClick={copy} lang={lang} className="min-h-10">
                {copied ? t("Copied ✓", "కాపీ అయింది ✓") : t("Copy prompt", "ప్రాంప్ట్ కాపీ")}
              </Button>
            </div>
            <pre className="thin-scroll max-h-[28rem] overflow-auto bg-ink-950 p-5 text-[0.82rem] leading-relaxed text-ink-100">
              <code className="whitespace-pre-wrap">{built}</code>
            </pre>
          </div>

          <Button size="lg" onClick={copy} lang={lang} className="mt-4 w-full sm:w-auto">
            {copied ? t("Copied ✓", "కాపీ అయింది ✓") : t("Copy the whole prompt", "మొత్తం ప్రాంప్ట్ కాపీ చేయండి")}
          </Button>
        </Step>

        {/* 4 — what to do */}
        <Step n={4} title="Now do this" titleTe="ఇప్పుడు ఇది చేయండి">
          <ol className="space-y-3">
            {[
              [
                "Copy the prompt above.",
                "పైన ఉన్న ప్రాంప్ట్ కాపీ చేయండి.",
              ],
              [
                `Open ${prompt.bestWith.map((b) => TOOL_LABEL[b].name).join(" or ")} and start a new chat.`,
                `${prompt.bestWith.map((b) => TOOL_LABEL[b].name).join(" లేదా ")} తెరిచి కొత్త చాట్ మొదలుపెట్టండి.`,
              ],
              prompt.files.length > 0
                ? [
                    "Attach the file(s) from step 1 using the paperclip, THEN paste the prompt.",
                    "స్టెప్ 1 లోని ఫైల్‌(ల)ను పిన్ గుర్తుతో జత చేసి, ఆ తరువాత ప్రాంప్ట్ అతికించండి.",
                  ]
                : [
                    "Paste the prompt and press enter.",
                    "ప్రాంప్ట్ అతికించి ఎంటర్ నొక్కండి.",
                  ],
              [
                "Read the answer. If something feels wrong, say so in the same chat and ask again — do not start over.",
                "సమాధానం చదవండి. ఏదైనా తప్పుగా అనిపిస్తే అదే చాట్‌లో చెప్పి మళ్ళీ అడగండి — కొత్తగా మొదలుపెట్టకండి.",
              ],
            ].map(([en, te], i) => (
              <li key={i} className="flex gap-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-900 text-xs font-bold text-gold-300">
                  {i + 1}
                </span>
                <span lang={lang} className="font-telugu leading-relaxed text-ink-700">
                  {en && te ? t(en, te) : ""}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {prompt.bestWith.map((b) => (
              <ButtonLink
                key={b}
                href={TOOL_LABEL[b].url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                lang={lang}
              >
                {t("Open", "తెరవండి")} {TOOL_LABEL[b].name} ↗
              </ButtonLink>
            ))}
          </div>

          {/* tips */}
          <div className="mt-10 rounded-2xl border border-gold-300 bg-gold-50/60 p-5">
            <p lang={lang} className="font-telugu font-bold text-ink-900">
              {t("Worth knowing", "తెలుసుకోవాల్సినవి")}
            </p>
            <ul className="mt-3.5 space-y-2.5">
              {(lang === "en" ? prompt.tips : prompt.tipsTe).map((tip, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                  <span lang={lang} className="font-telugu text-sm leading-relaxed text-ink-700">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Step>
      </div>
    </>
  );
}
