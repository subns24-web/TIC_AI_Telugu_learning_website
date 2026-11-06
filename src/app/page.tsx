"use client";

import Link from "next/link";
import { courses, tracks } from "@/lib/courses";
import { useLang } from "@/lib/lang";
import { CourseCard } from "@/components/course/CourseCard";
import { Badge, ButtonLink, Check, SectionHead } from "@/components/ui/Bits";

export default function HomePage() {
  const { t, lang } = useLang();
  const featured = courses.filter((c) => c.featured);

  return (
    <>
      {/* ---------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 grid-ink opacity-60" />
        <div className="glow-gold pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-30" />

        <div className="container-tic relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span
              lang={lang}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/8 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_1px] shadow-gold-400/60" />
              {t(
                "Telugu International Council of AI for Business",
                "Telugu International Council of AI for Business",
              )}
            </span>

            <h1 className="mt-6 font-telugu text-balance text-[2.4rem] font-bold leading-[1.25] tracking-tight sm:text-5xl md:text-[3.4rem]">
              వ్యాపారం కోసం <span className="text-metal">AI</span>,
              <br />
              మన తెలుగులోనే.
            </h1>

            <p lang={lang} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              {t(
                "English tutorials leave most Telugu business owners behind. Here, every lesson, template and workflow is taught in Telugu — by people who run businesses here, for work you do tomorrow morning.",
                "ఇంగ్లీష్ ట్యుటోరియల్స్ వల్ల చాలా మంది తెలుగు వ్యాపారులు వెనుకబడిపోతున్నారు. ఇక్కడ ప్రతి పాఠం, టెంప్లేట్, వర్క్‌ఫ్లో తెలుగులోనే — ఇక్కడే వ్యాపారం నడిపే వారి నుంచి, రేపు ఉదయం మీరు చేసే పని కోసం.",
              )}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/courses" size="lg" lang={lang}>
                {t("Browse courses", "కోర్సులు చూడండి")}
              </ButtonLink>
              <ButtonLink
                href="/courses/ai-for-business-foundations"
                size="lg"
                variant="onDark"
                lang={lang}
              >
                {t("Start the free course", "ఉచిత కోర్సు మొదలుపెట్టండి")}
              </ButtonLink>
            </div>

            <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6">
              {(
                [
                  ["6", t("courses", "కోర్సులు"), ""],
                  ["40+", t("lessons", "పాఠాలు"), ""],
                  ["100%", t("in Telugu", "తెలుగులో"), ""],
                ] as const
              ).map(([n, label]) => (
                <div key={label}>
                  <dt className="text-metal text-3xl font-bold tracking-tight">{n}</dt>
                  <dd lang={lang} className="mt-1 text-sm text-ink-300">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ why Telugu */}
      <section className="container-tic py-20 md:py-24">
        <SectionHead
          eyebrow={t("Why this exists", "ఇది ఎందుకు")}
          title={t(
            "The AI gap is a language gap.",
            "AI అంతరం అంటే భాషా అంతరం.",
          )}
          blurb={t(
            "The tools are the same everywhere. What is missing is somebody explaining them in the language you think in, with examples from a shop in Guntur rather than a startup in San Francisco.",
            "టూల్స్ ప్రతిచోటా ఒకటే. లేనిది ఒక్కటే — మీరు ఆలోచించే భాషలో, శాన్ ఫ్రాన్సిస్కో స్టార్టప్ కాదు గుంటూరు షాప్ ఉదాహరణలతో చెప్పే మనిషి.",
          )}
          lang={lang}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {(
            [
              {
                en: ["Taught in Telugu, not translated", "Every lesson is recorded in Telugu from the start. No subtitles, no awkward dubbing, no English jargon left unexplained."],
                te: ["తెలుగులో బోధన, అనువాదం కాదు", "ప్రతి పాఠం మొదటి నుంచే తెలుగులో రికార్డ్ చేసింది. సబ్‌టైటిల్స్ లేవు, డబ్బింగ్ లేదు, వివరించని ఇంగ్లీష్ పదాలు లేవు."],
              },
              {
                en: ["Built around Indian business reality", "WhatsApp enquiries, cash books, GST, walk-in customers, ₹ budgets. The examples are the ones you actually face."],
                te: ["భారతీయ వ్యాపార వాస్తవికత చుట్టూ", "WhatsApp ఎంక్వైరీలు, క్యాష్ బుక్, GST, వాక్-ఇన్ కస్టమర్లు, ₹ బడ్జెట్‌లు. మీరు నిజంగా ఎదుర్కొనే ఉదాహరణలే."],
              },
              {
                en: ["Finish a lesson, use it today", "Each lesson ends with a template, a prompt or a workflow you can put to work before the day is over."],
                te: ["పాఠం అయ్యాక, ఈ రోజే వాడండి", "ప్రతి పాఠం చివర ఒక టెంప్లేట్, ప్రాంప్ట్ లేదా వర్క్‌ఫ్లో — రోజు ముగియక ముందే పనిలో పెట్టవచ్చు."],
              },
            ] as const
          ).map((item, i) => (
            <div key={i} className="card p-6">
              <span className="btn-gold grid h-10 w-10 place-items-center rounded-xl text-sm font-bold">
                {i + 1}
              </span>
              <h3 lang={lang} className="mt-5 text-lg font-bold leading-snug text-ink-900">
                {t(item.en[0], item.te[0])}
              </h3>
              <p lang={lang} className="mt-3 text-sm leading-relaxed text-ink-500">
                {t(item.en[1], item.te[1])}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------- featured courses */}
      <section className="bg-paper-200/60 py-20 md:py-24">
        <div className="container-tic">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow={t("Start here", "ఇక్కడ మొదలుపెట్టండి")}
              title={t("Featured courses", "ముఖ్య కోర్సులు")}
              lang={lang}
            />
            <Link
              href="/courses"
              lang={lang}
              className="tap focus-ring rounded-lg text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              {t("All courses", "అన్ని కోర్సులు")} →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Vyapar GPT */}
      <section className="container-tic py-20 md:py-24">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 text-white">
          <div className="absolute inset-0 grid-ink opacity-50" />
          <div className="glow-gold pointer-events-none absolute -right-20 -top-24 h-96 w-96 opacity-25" />

          <div className="relative grid gap-10 p-8 md:grid-cols-[1.15fr_1fr] md:items-center md:p-14">
            <div>
              <span
                lang={lang}
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/8 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_1px] shadow-gold-400/60" />
                {t("Only on TIC AI", "TIC AI లో మాత్రమే")}
              </span>

              <h2 className="mt-6 font-telugu text-balance text-3xl font-bold leading-[1.3] tracking-tight sm:text-[2.3rem]">
                <span className="text-metal">Vyapar GPT</span>
                <br />
                ప్రాంప్ట్ రాయడం మీ పని కాదు.
              </h2>

              <p lang={lang} className="mt-6 max-w-xl font-telugu leading-relaxed text-ink-200">
                {t(
                  "Most people fail with AI because they did not know what to give it, not because the wording was wrong. Pick your task — we name the exact file you need, show where it sits in Vyapar or Tally, and hand you a finished prompt in Telugu.",
                  "ప్రాంప్ట్ తప్పు కాబట్టి కాదు — AI కి ఏం ఇవ్వాలో తెలియక చాలామంది విఫలమవుతారు. మీ పని ఎంచుకోండి — ఏ ఫైల్ కావాలి, అది Vyapar లేదా Tally లో ఎక్కడ ఉందో చూపించి, తెలుగులో సిద్ధమైన ప్రాంప్ట్ ఇస్తాం.",
                )}
              </p>

              <div className="mt-8">
                <ButtonLink href="/vyapar-gpt" size="lg" lang={lang}>
                  {t("Open Vyapar GPT", "Vyapar GPT తెరవండి")}
                </ButtonLink>
              </div>
            </div>

            <ul className="space-y-3">
              {(
                [
                  ["Say what you want done", "మీకు ఏం కావాలో చెప్పండి", "\"Follow up with customers who stopped buying\"", "\"కొనడం ఆపేసిన కస్టమర్లకు ఫాలో-అప్\""],
                  ["We list what to bring", "ఏం తీసుకురావాలో చెబుతాం", "Your customer list — Vyapar → Parties → Export", "మీ కస్టమర్ల లిస్ట్ — Vyapar → Parties → Export"],
                  ["Copy the finished prompt", "సిద్ధమైన ప్రాంప్ట్ కాపీ చేయండి", "Written in Telugu, ready to paste", "తెలుగులో రాసినది, అతికించడానికి సిద్ధం"],
                ] as const
              ).map(([enT, teT, enS, teS], i) => (
                <li key={i} className="hairline flex gap-4 rounded-2xl border bg-white/4 p-5 backdrop-blur-sm">
                  <span className="btn-gold grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p lang={lang} className="font-telugu font-semibold leading-snug">
                      {t(enT, teT)}
                    </p>
                    <p lang={lang} className="mt-1.5 font-telugu text-sm leading-relaxed text-ink-300">
                      {t(enS, teS)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ learning paths */}
      <section className="container-tic py-20 md:py-24">
        <SectionHead
          eyebrow={t("Learning paths", "లెర్నింగ్ పాత్‌లు")}
          title={t("Four routes through the material", "నాలుగు దారులు")}
          blurb={t(
            "Pick the one that matches the problem in front of you. Each path stacks courses in the order that actually works.",
            "మీ ముందున్న సమస్యకు సరిపోయే దారి ఎంచుకోండి. ప్రతి పాత్‌లో కోర్సులు పని చేసే క్రమంలో ఉంటాయి.",
          )}
          lang={lang}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((track) => {
            const count = courses.filter((c) => c.track === track.id).length;
            return (
              <Link
                key={track.id}
                href={`/tracks#${track.id}`}
                className="card card-hover focus-ring flex flex-col p-6"
              >
                <h3 className="font-telugu text-lg font-bold leading-snug text-ink-900">
                  {track.titleTe}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {track.title}
                </p>
                <p lang={lang} className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                  {t(track.blurb, track.blurbTe)}
                </p>
                <span className="mt-5">
                  <Badge tone="gold">
                    {count} {t(count === 1 ? "course" : "courses", "కోర్సులు")}
                  </Badge>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- how it works */}
      <section className="bg-ink-950 py-20 text-white md:py-24">
        <div className="container-tic grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p
              lang={lang}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400"
            >
              {t("How it works", "ఎలా పని చేస్తుంది")}
            </p>
            <h2 lang={lang} className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-[2.1rem]">
              {t(
                "Watch, build, bring it to the community.",
                "చూడండి, తయారు చేయండి, కమ్యూనిటీకి తీసుకురండి.",
              )}
            </h2>
            <p lang={lang} className="mt-5 leading-relaxed text-ink-200">
              {t(
                "Recorded lessons give you the method. The live sessions and the community board are where your own messy, real situation gets sorted out.",
                "రికార్డ్ చేసిన పాఠాలు పద్ధతి ఇస్తాయి. లైవ్ సెషన్లు, కమ్యూనిటీ బోర్డ్ — మీ నిజమైన, గందరగోళ పరిస్థితి పరిష్కారమయ్యే చోటు.",
              )}
            </p>
            <ButtonLink href="/community" variant="primary" size="lg" className="mt-8" lang={lang}>
              {t("See the community board", "కమ్యూనిటీ బోర్డ్ చూడండి")}
            </ButtonLink>
          </div>

          <ol className="space-y-4">
            {(
              [
                {
                  en: ["Enrol and watch at your pace", "Lessons are short. Most are under 30 minutes, and your place is remembered on every device you use."],
                  te: ["చేరండి, మీ వేగంతో చూడండి", "పాఠాలు చిన్నవి. చాలా వరకు 30 నిమిషాల లోపే, మీ స్థానం గుర్తుంచుకుంటుంది."],
                },
                {
                  en: ["Build the thing in the lesson", "Every module ends with something you made — a prompt library, a workflow, a plan."],
                  te: ["పాఠంలోని దానిని తయారు చేయండి", "ప్రతి మాడ్యూల్ చివర మీరు తయారు చేసినది ఉంటుంది — ప్రాంప్ట్ లైబ్రరీ, వర్క్‌ఫ్లో, ప్లాన్."],
                },
                {
                  en: ["Bring it to the live session", "Join the weekly council call, show what broke, and leave with it fixed."],
                  te: ["లైవ్ సెషన్‌కు తీసుకురండి", "వారం కౌన్సిల్ కాల్‌లో చేరండి, ఏం పని చేయలేదో చూపండి, బాగు చేసుకుని వెళ్ళండి."],
                },
              ] as const
            ).map((step, i) => (
              <li
                key={i}
                className="hairline flex gap-4 rounded-2xl border bg-white/4 p-5 backdrop-blur-sm"
              >
                <span className="btn-gold grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 lang={lang} className="font-semibold leading-snug">
                    {t(step.en[0], step.te[0])}
                  </h3>
                  <p lang={lang} className="mt-1.5 text-sm leading-relaxed text-ink-300">
                    {t(step.en[1], step.te[1])}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------- instructor */}
      <section className="container-tic py-20 md:py-24">
        <div className="card overflow-hidden md:grid md:grid-cols-[auto_1fr]">
          <div className="flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-950 p-10 md:w-64">
            <span className="text-metal grid h-28 w-28 place-items-center rounded-full border border-gold-400/40 bg-gold-500/10 text-3xl font-bold shadow-[0_0_40px_-8px] shadow-gold-500/40">
              SN
            </span>
          </div>
          <div className="p-8 md:p-10">
            <p
              lang={lang}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700"
            >
              {t("Who teaches", "ఎవరు బోధిస్తారు")}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-900">
              Santhosh Nimmani
            </h2>
            <p lang={lang} className="mt-1 font-telugu text-sm text-ink-500">
              వ్యవస్థాపకుడు, SN Trinetra Global AI &amp; IT Solutions
            </p>
            <p lang={lang} className="mt-5 max-w-2xl leading-relaxed text-ink-600">
              {t(
                "I build AI agents and automation for Indian businesses — voice agents for clinics, lead engines for agencies, workflow automation for manufacturers. Everything taught here is something I have shipped for a paying client, explained the way I would explain it to a friend over coffee in Vijayawada.",
                "నేను భారతీయ వ్యాపారాల కోసం AI ఏజెంట్లు, ఆటోమేషన్ తయారు చేస్తాను — క్లినిక్‌లకు వాయిస్ ఏజెంట్లు, ఏజెన్సీలకు లీడ్ ఇంజిన్లు, తయారీ సంస్థలకు వర్క్‌ఫ్లో ఆటోమేషన్. ఇక్కడ బోధించేది అంతా నేను డబ్బు చెల్లించే క్లయింట్ కోసం నిజంగా చేసినదే — విజయవాడలో స్నేహితుడికి కాఫీ దగ్గర చెప్పినట్టు.",
              )}
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {(
                [
                  ["Realtime Telugu voice agents in production", "ప్రొడక్షన్‌లో రియల్‌టైమ్ తెలుగు వాయిస్ ఏజెంట్లు"],
                  ["MSME AI workshops across AP & Telangana", "AP, తెలంగాణలో MSME AI వర్క్‌షాప్‌లు"],
                  ["Automation for clinics, agencies, manufacturers", "క్లినిక్‌లు, ఏజెన్సీలు, తయారీ సంస్థలకు ఆటోమేషన్"],
                  ["Everything demonstrated live, never slides only", "అంతా లైవ్‌లో చూపిస్తాను, స్లైడ్లు మాత్రమే కాదు"],
                ] as const
              ).map(([en, te]) => (
                <li key={en} className="flex gap-2.5">
                  <Check />
                  <span lang={lang} className="text-sm leading-relaxed text-ink-600">
                    {t(en, te)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA */}
      <section className="container-tic pb-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 px-8 py-16 text-center text-white md:px-16 md:py-20">
          <div className="absolute inset-0 grid-ink opacity-50" />
          <div className="glow-gold pointer-events-none absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-telugu text-balance text-3xl font-bold leading-[1.35] sm:text-4xl">
              <span className="text-metal">మొదటి కోర్సు ఉచితం.</span> ఈ రోజే మొదలుపెట్టండి.
            </h2>
            <p lang={lang} className="mt-5 leading-relaxed text-ink-200">
              {t(
                "Six hours, no card, no catch. If it does not change how you look at your own business, nothing else here will either.",
                "ఆరు గంటలు, కార్డ్ అవసరం లేదు, దాగిన షరతులు లేవు. మీ వ్యాపారాన్ని చూసే విధానం మారకపోతే, ఇక్కడ మిగిలినవి కూడా మార్చవు.",
              )}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/courses/ai-for-business-foundations" size="lg" lang={lang}>
                {t("Start the free course", "ఉచిత కోర్సు మొదలుపెట్టండి")}
              </ButtonLink>
              <ButtonLink
                href="/courses"
                size="lg"
                variant="onDark"
                lang={lang}
              >
                {t("See everything", "అన్నీ చూడండి")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
