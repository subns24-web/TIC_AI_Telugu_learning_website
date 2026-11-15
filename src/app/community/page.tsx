"use client";

import { useLang } from "@/lib/lang";

/* The workshop's WhatsApp community (same link as the payment emails). */
const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/KUMcVB1BMy64Pvjbu79zj0";

const POINTS = [
  {
    icon: "🙌",
    en: "Please be active in the community — say hello, share what you are working on, and help others when you can.",
    te: "దయచేసి community లో active గా ఉండండి — పలకరించండి, మీరు ఏం చేస్తున్నారో పంచుకోండి, వీలైనప్పుడు ఇతరులకు సహాయం చేయండి.",
  },
  {
    icon: "💬",
    en: "Ask any question in the WhatsApp community and get it answered — about AI, prompts or your business.",
    te: "WhatsApp community లో ఏ ప్రశ్న అయినా అడగండి, సమాధానం పొందండి — AI, prompts లేదా మీ వ్యాపారం గురించి.",
  },
  {
    icon: "✨",
    en: "Learn new prompts with the help of the community — see what works for other business owners and try it in yours.",
    te: "Community సహాయంతో కొత్త prompts నేర్చుకోండి — ఇతర వ్యాపారులకు ఏది పని చేసిందో చూసి, మీ వ్యాపారంలో ప్రయత్నించండి.",
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
          <h1 lang={lang} className="mt-4 max-w-3xl font-telugu text-balance text-[2.1rem] font-bold leading-[1.3] tracking-tight sm:text-[2.7rem]">
            {t("One council, one community — for Telugu businesses.", "ఒక కౌన్సిల్, ఒక కమ్యూనిటీ — తెలుగు వ్యాపారాల కోసం.")}
          </h1>
          <p lang={lang} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
            {t(
              "TIC AI is not a course shop. It is a council: business owners, trainers and builders who meet regularly and solve each other's problems together.",
              "TIC AI ఒక కోర్సు దుకాణం కాదు. ఇది ఒక కౌన్సిల్ — వ్యాపారులు, శిక్షకులు, బిల్డర్లు తరచూ కలిసి, ఒకరి సమస్యలు మరొకరు కలిసి పరిష్కరిస్తారు.",
            )}
          </p>
          <div className="mt-9">
            <a
              href={WHATSAPP_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              lang={lang}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#1ebe5a]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2s.2-1.1.1-1.2-.2-.2-.5-.3z"/>
              </svg>
              {t("Join the WhatsApp community", "WhatsApp community లో join అవ్వండి")}
            </a>
          </div>
        </div>
      </section>

      {/* how to use the community */}
      <section className="container-tic py-16">
        <div className="card mx-auto max-w-3xl p-6 sm:p-8">
          <h2 lang={lang} className="font-telugu text-xl font-bold leading-snug text-ink-900 sm:text-2xl">
            {t("Make the most of the community", "Community ని పూర్తిగా ఉపయోగించుకోండి")}
          </h2>
          <ul className="mt-6 space-y-4">
            {POINTS.map((p) => (
              <li key={p.en} className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-lg" aria-hidden="true">
                  {p.icon}
                </span>
                <p lang={lang} className="pt-1.5 font-telugu leading-relaxed text-ink-700">
                  {t(p.en, p.te)}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            lang={lang}
            className="focus-ring mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#1ebe5a]"
          >
            {t("Open the WhatsApp community", "WhatsApp community తెరవండి")} ↗
          </a>
        </div>
      </section>
    </div>
  );
}
