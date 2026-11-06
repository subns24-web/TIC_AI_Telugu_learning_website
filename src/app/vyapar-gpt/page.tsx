"use client";

import Link from "next/link";
import { useState } from "react";
import { businessTypes, categories, promptsFor } from "@/lib/vyapar";
import type { VyaparPrompt } from "@/lib/vyapar-types";
import { useLang } from "@/lib/lang";
import { useBusinessProfile } from "@/lib/profile";
import { ProfileForm } from "@/components/vyapar/ProfileForm";
import { Badge, Button, SectionHead } from "@/components/ui/Bits";

const ACCENT: Record<string, string> = {
  gold: "from-gold-300 via-gold-500 to-gold-700",
  teal: "from-teal-300 via-teal-500 to-teal-800",
  violet: "from-violet-300 via-violet-500 to-violet-800",
  indigo: "from-ink-400 via-ink-600 to-ink-900",
  silver: "from-silver-200 via-silver-400 to-silver-700",
  rose: "from-rose-300 via-rose-500 to-rose-800",
};

function PromptCard({ prompt }: { prompt: VyaparPrompt }) {
  const { t, lang } = useLang();
  const needed = prompt.files.filter((f) => !f.optional).length;

  return (
    <Link
      href={`/vyapar-gpt/${prompt.slug}`}
      className="card card-hover focus-ring flex flex-col p-5"
    >
      <h3 lang={lang} className="font-telugu text-[1.02rem] font-bold leading-snug text-ink-900">
        {t(prompt.title, prompt.titleTe)}
      </h3>
      <p lang={lang} className="mt-2.5 line-clamp-3 font-telugu text-sm leading-relaxed text-ink-500">
        {t(prompt.outcome, prompt.outcomeTe)}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        <Badge tone="outline">
          ⏱ {prompt.minutes} {t("min", "ని")}
        </Badge>
        {needed > 0 ? (
          <Badge tone="gold">
            📎 {needed} {t(needed === 1 ? "file needed" : "files needed", "ఫైల్స్ కావాలి")}
          </Badge>
        ) : (
          <Badge tone="teal">{t("No files needed", "ఫైల్స్ అవసరం లేదు")}</Badge>
        )}
      </div>
    </Link>
  );
}

export default function VyaparGptPage() {
  const { t, lang } = useLang();
  const { profile, isSet, ready, clear } = useBusinessProfile();
  const [filter, setFilter] = useState<string>("all");
  const [editing, setEditing] = useState(false);

  const active = filter === "all" ? profile.businessType || "all" : filter;
  const visible = promptsFor(active === "all" ? undefined : active);

  return (
    <>
      {/* ------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 grid-ink opacity-60" />
        <div className="glow-gold pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] opacity-25" />

        <div className="container-tic relative py-16 md:py-20">
          <span
            lang={lang}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/8 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_1px] shadow-gold-400/60" />
            {t("Only on TIC AI", "TIC AI లో మాత్రమే")}
          </span>

          <h1 className="mt-6 max-w-3xl font-telugu text-balance text-[2.1rem] font-bold leading-[1.3] tracking-tight sm:text-[2.8rem]">
            <span className="text-metal">Vyapar GPT</span>
            <br />
            ప్రాంప్ట్ రాయడం మీ పని కాదు.
          </h1>

          <p lang={lang} className="mt-6 max-w-2xl font-telugu text-lg leading-relaxed text-ink-200">
            {t(
              "Most people fail with AI not because the prompt was wrong, but because they did not know what to give it. Pick your task. We tell you exactly which file to bring, where to find it in Vyapar or Tally, and hand you a finished prompt in Telugu.",
              "ప్రాంప్ట్ తప్పు కాబట్టి కాదు — AI కి ఏం ఇవ్వాలో తెలియక చాలామంది విఫలమవుతారు. మీ పని ఎంచుకోండి. ఏ ఫైల్ కావాలి, అది Vyapar లేదా Tally లో ఎక్కడ ఉంది — చెప్పి, తెలుగులో సిద్ధమైన ప్రాంప్ట్ ఇస్తాం.",
            )}
          </p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {(
              [
                [String(categories.length), t("categories", "విభాగాలు")],
                [String(promptsFor().length), t("ready prompts", "సిద్ధ ప్రాంప్ట్‌లు")],
                ["0", t("tech knowledge needed", "టెక్ పరిజ్ఞానం అవసరం")],
              ] as const
            ).map(([n, label]) => (
              <div key={label}>
                <dt className="text-metal text-2xl font-bold sm:text-3xl">{n}</dt>
                <dd lang={lang} className="mt-1 font-telugu text-xs text-ink-300 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-tic py-14">
        {/* ------------------------------------------------ profile */}
        {ready && (!isSet || editing) ? (
          <div className="card border-gold-300 p-6 sm:p-8">
            <h2 lang={lang} className="font-telugu text-xl font-bold text-ink-900">
              {t("First, tell us about your business", "ముందుగా, మీ వ్యాపారం గురించి చెప్పండి")}
            </h2>
            <p lang={lang} className="mt-2 font-telugu leading-relaxed text-ink-500">
              {t(
                "Answer once. Every prompt on this page fills itself in from these answers, so you never type them again.",
                "ఒకసారి సమాధానం ఇవ్వండి. ఈ పేజీలోని ప్రతి ప్రాంప్ట్ వీటితో దానంతట అదే నిండుతుంది — మళ్ళీ టైప్ చేయక్కర్లేదు.",
              )}
            </p>
            <div className="mt-7">
              <ProfileForm onDone={() => setEditing(false)} />
            </div>
          </div>
        ) : ready && isSet ? (
          <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <p lang={lang} className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                {t("Prompts are being filled in for", "ప్రాంప్ట్‌లు వీటితో నిండుతున్నాయి")}
              </p>
              <p lang={lang} className="mt-1.5 font-telugu font-bold text-ink-900">
                {profile.businessName}
                {profile.city && <span className="font-medium text-ink-400"> · {profile.city}</span>}
              </p>
              <p lang={lang} className="font-telugu text-sm text-ink-500">
                {profile.sells}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="md" lang={lang} onClick={() => setEditing(true)}>
                {t("Change", "మార్చండి")}
              </Button>
              <Button variant="ghost" size="md" lang={lang} onClick={clear}>
                {t("Clear", "తీసేయండి")}
              </Button>
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------ filter */}
        <div className="mt-12">
          <p lang={lang} className="font-telugu text-sm font-semibold text-ink-600">
            {t("Show prompts for", "వీటికి ప్రాంప్ట్‌లు చూపించు")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              lang={lang}
              className={`focus-ring inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition ${
                active === "all"
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-900/15 bg-white text-ink-600 hover:border-ink-900/35"
              }`}
            >
              {t("Every business", "అన్ని వ్యాపారాలు")}
            </button>
            {businessTypes.map((bt) => (
              <button
                key={bt.id}
                type="button"
                onClick={() => setFilter(bt.id)}
                lang={lang}
                className={`focus-ring inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition ${
                  active === bt.id
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-900/15 bg-white text-ink-600 hover:border-ink-900/35"
                }`}
              >
                <span aria-hidden="true">{bt.emoji}</span>
                <span className="font-telugu">{t(bt.label, bt.labelTe)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------ categories */}
        <div className="mt-16 space-y-16">
          {categories.map((cat) => {
            const list = visible.filter((p) => p.category === cat.id);
            if (list.length === 0) return null;
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-start gap-4">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${
                      ACCENT[cat.accent] ?? ACCENT.gold
                    } text-white`}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={cat.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h2 lang={lang} className="font-telugu text-2xl font-bold tracking-tight text-ink-900">
                      {t(cat.title, cat.titleTe)}
                    </h2>
                    <p lang={lang} className="mt-1.5 max-w-2xl font-telugu leading-relaxed text-ink-500">
                      {t(cat.blurb, cat.blurbTe)}
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <PromptCard key={p.slug} prompt={p} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* more coming */}
        <div className="mt-20 rounded-2xl border border-dashed border-ink-900/20 p-8 text-center">
          <p lang={lang} className="font-telugu text-lg font-bold text-ink-900">
            {t("More prompts are added every week", "ప్రతి వారం కొత్త ప్రాంప్ట్‌లు వస్తాయి")}
          </p>
          <p lang={lang} className="mx-auto mt-2.5 max-w-lg font-telugu leading-relaxed text-ink-500">
            {t(
              "Stuck on something this list does not cover? Bring it to the Sunday council call and it usually becomes a prompt here.",
              "ఈ లిస్ట్‌లో లేని సమస్య ఉందా? ఆదివారం కౌన్సిల్ కాల్‌కు తీసుకురండి — సాధారణంగా అది ఇక్కడ ప్రాంప్ట్ అవుతుంది.",
            )}
          </p>
        </div>
      </div>
    </>
  );
}
