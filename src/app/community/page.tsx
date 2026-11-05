"use client";

import { useLang } from "@/lib/lang";
import { Badge, ButtonLink, SectionHead } from "@/components/ui/Bits";

const BOARD = [
  {
    role: ["Council Chair", "కౌన్సిల్ ఛైర్"],
    name: "Santhosh Nimmani",
    org: ["SN Trinetra Global AI & IT Solutions", "SN Trinetra Global AI & IT Solutions"],
    initials: "SN",
  },
  {
    role: ["Open seat — Education", "ఖాళీ స్థానం — విద్య"],
    name: ["Nominations open", "నామినేషన్లు తెరిచి ఉన్నాయి"],
    org: ["For a college or training institute leader", "కళాశాల లేదా శిక్షణ సంస్థ నాయకుడి కోసం"],
    initials: "—",
    open: true,
  },
  {
    role: ["Open seat — MSME", "ఖాళీ స్థానం — MSME"],
    name: ["Nominations open", "నామినేషన్లు తెరిచి ఉన్నాయి"],
    org: ["For a manufacturing or retail owner", "తయారీ లేదా రిటైల్ యజమాని కోసం"],
    initials: "—",
    open: true,
  },
  {
    role: ["Open seat — Healthcare", "ఖాళీ స్థానం — ఆరోగ్య సంరక్షణ"],
    name: ["Nominations open", "నామినేషన్లు తెరిచి ఉన్నాయి"],
    org: ["For a clinic or hospital administrator", "క్లినిక్ లేదా ఆసుపత్రి నిర్వాహకుడి కోసం"],
    initials: "—",
    open: true,
  },
] as const;

const RITUALS = [
  {
    when: ["Every Sunday, 8 pm IST", "ప్రతి ఆదివారం, రాత్రి 8 గంటలు"],
    title: ["Council call", "కౌన్సిల్ కాల్"],
    body: [
      "Ninety minutes on Zoom. You bring a real problem from your business, we build the solution on screen, and the recording becomes a lesson here.",
      "Zoom లో తొంభై నిమిషాలు. మీ వ్యాపారం నుంచి ఒక నిజమైన సమస్య తీసుకురండి, స్క్రీన్ మీదే పరిష్కారం తయారు చేస్తాం, ఆ రికార్డింగ్ ఇక్కడ పాఠం అవుతుంది.",
    ],
  },
  {
    when: ["First Saturday monthly", "నెల మొదటి శనివారం"],
    title: ["Build day", "బిల్డ్ డే"],
    body: [
      "One workflow, start to finish, together. Everyone leaves with the same automation running in their own account.",
      "ఒక వర్క్‌ఫ్లో, మొదలు నుంచి చివరి వరకు, కలిసి. అందరూ తమ ఖాతాలో అదే ఆటోమేషన్ నడుస్తూ వెళ్తారు.",
    ],
  },
  {
    when: ["Always open", "ఎప్పుడూ తెరిచి ఉంది"],
    title: ["WhatsApp group", "WhatsApp గ్రూప్"],
    body: [
      "Stuck at 11 pm with a broken prompt? Ask there. Most answers come inside an hour, from people who hit the same wall last month.",
      "రాత్రి 11 గంటలకు ప్రాంప్ట్ పని చేయలేదా? అక్కడ అడగండి. గత నెల అదే గోడకు కొట్టుకున్న వారి నుంచి గంటలోపే సమాధానాలు.",
    ],
  },
] as const;

export default function CommunityPage() {
  const { t, lang } = useLang();

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 grid-ink opacity-50" />
        <div className="container-tic relative py-16 md:py-20">
          <p lang={lang} className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
            {t("Community board", "కమ్యూనిటీ బోర్డ్")}
          </p>
          <h1 className="mt-4 max-w-3xl font-telugu text-balance text-[2.1rem] font-bold leading-[1.3] tracking-tight sm:text-[2.7rem]">
            ఒక కౌన్సిల్, ఒక కమ్యూనిటీ — తెలుగు వ్యాపారాల కోసం.
          </h1>
          <p lang={lang} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
            {t(
              "TIC AI is not a course shop. It is a council: business owners, trainers and builders who meet every week, solve each other's problems in public, and turn those sessions into the lessons on this site.",
              "TIC AI ఒక కోర్సు దుకాణం కాదు. ఇది ఒక కౌన్సిల్ — వ్యాపారులు, శిక్షకులు, బిల్డర్లు ప్రతి వారం కలిసి, ఒకరి సమస్యలు మరొకరు బహిరంగంగా పరిష్కరించి, ఆ సెషన్లను ఈ సైట్‌లో పాఠాలుగా మారుస్తారు.",
            )}
          </p>
          <div className="mt-9">
            <ButtonLink href="/courses/ai-for-business-foundations" size="lg" lang={lang}>
              {t("Join with the free course", "ఉచిత కోర్సుతో చేరండి")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* rituals */}
      <section className="container-tic py-20">
        <SectionHead
          eyebrow={t("How we meet", "ఎలా కలుస్తాం")}
          title={t("Three standing commitments", "మూడు స్థిర నిబద్ధతలు")}
          lang={lang}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {RITUALS.map((r) => (
            <div key={r.title[0]} className="card flex flex-col p-6">
              <Badge tone="gold">{t(r.when[0], r.when[1])}</Badge>
              <h3 lang={lang} className="mt-5 text-lg font-bold leading-snug text-ink-900">
                {t(r.title[0], r.title[1])}
              </h3>
              <p lang={lang} className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                {t(r.body[0], r.body[1])}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* board */}
      <section id="board" className="bg-paper-200/60 py-20 scroll-mt-20">
        <div className="container-tic">
          <SectionHead
            eyebrow={t("The board", "బోర్డ్")}
            title={t("Who sits on the council", "కౌన్సిల్‌లో ఎవరు ఉన్నారు")}
            blurb={t(
              "Four seats, each representing a sector that AI is changing fastest in our region. Three are open — if that is your world, write in.",
              "నాలుగు స్థానాలు, మన ప్రాంతంలో AI వేగంగా మారుస్తున్న ఒక్కో రంగానికి ఒకటి. మూడు ఖాళీగా ఉన్నాయి — అది మీ రంగమైతే, రాయండి.",
            )}
            lang={lang}
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BOARD.map((m) => {
              const name = typeof m.name === "string" ? m.name : t(m.name[0], m.name[1]);
              return (
                <li key={m.role[0]} className={`card p-6 ${"open" in m && m.open ? "border-dashed" : ""}`}>
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-full text-base font-bold ${
                      "open" in m && m.open
                        ? "bg-ink-900/5 text-ink-300"
                        : "text-metal bg-ink-900"
                    }`}
                  >
                    {m.initials}
                  </span>
                  <p
                    lang={lang}
                    className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold-700"
                  >
                    {t(m.role[0], m.role[1])}
                  </p>
                  <p lang={lang} className="mt-2 font-semibold leading-snug text-ink-900">
                    {name}
                  </p>
                  <p lang={lang} className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {t(m.org[0], m.org[1])}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="card mt-10 flex flex-wrap items-center justify-between gap-6 p-7">
            <div>
              <h3 lang={lang} className="text-lg font-bold text-ink-900">
                {t("Want a seat?", "ఒక స్థానం కావాలా?")}
              </h3>
              <p lang={lang} className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
                {t(
                  "Board members host one session a quarter and help shape the curriculum. Tell us which sector you represent and what you would teach.",
                  "బోర్డ్ సభ్యులు క్వార్టర్‌కు ఒక సెషన్ నిర్వహిస్తారు, పాఠ్యాంశాలు రూపొందించడంలో సహాయం చేస్తారు. మీరు ఏ రంగానికి ప్రాతినిధ్యం వహిస్తారు, ఏం బోధిస్తారో చెప్పండి.",
                )}
              </p>
            </div>
            <ButtonLink href="mailto:hello@ticai.in?subject=TIC%20AI%20board%20nomination" size="lg" lang={lang}>
              {t("Write to the council", "కౌన్సిల్‌కు రాయండి")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
