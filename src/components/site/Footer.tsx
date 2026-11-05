"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import { Logo } from "./Logo";

export function Footer() {
  const { t, lang } = useLang();
  const pathname = usePathname();

  if (pathname.includes("/learn/")) return null;

  return (
    <footer className="mt-24 border-t border-ink-900/8 bg-ink-950 text-ink-200">
      <div className="container-tic grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p lang={lang} className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
            {t(
              "The Telugu International Council of AI for Business — a learning community for owners, teams and builders across Andhra Pradesh, Telangana and the Telugu diaspora.",
              "Telugu International Council of AI for Business — ఆంధ్రప్రదేశ్, తెలంగాణ, ప్రవాస తెలుగు వారి కోసం ఒక అభ్యాస కమ్యూనిటీ.",
            )}
          </p>
        </div>

        {(
          [
            {
              head: ["Learn", "నేర్చుకోండి"],
              links: [
                { href: "/courses", en: "All courses", te: "అన్ని కోర్సులు" },
                { href: "/tracks", en: "Learning paths", te: "లెర్నింగ్ పాత్‌లు" },
                { href: "/my-learning", en: "My learning", te: "నా అభ్యాసం" },
              ],
            },
            {
              head: ["Council", "కౌన్సిల్"],
              links: [
                { href: "/community", en: "Community board", te: "కమ్యూనిటీ బోర్డ్" },
                { href: "/community#board", en: "Members", te: "సభ్యులు" },
                { href: "/admin", en: "Upload a recording", te: "రికార్డింగ్ అప్‌లోడ్" },
              ],
            },
            {
              head: ["Contact", "సంప్రదించండి"],
              links: [
                { href: "mailto:hello@ticai.in", en: "hello@ticai.in", te: "hello@ticai.in" },
                { href: "https://www.linkedin.com/", en: "LinkedIn", te: "LinkedIn" },
              ],
            },
          ] as const
        ).map((col) => (
          <div key={col.head[0]}>
            <h3 lang={lang} className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              {t(col.head[0], col.head[1])}
            </h3>
            <ul className="mt-2 text-sm md:mt-4 md:space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    lang={lang}
                    className="tap focus-ring rounded text-ink-200 transition hover:text-gold-300"
                  >
                    {t(l.en, l.te)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8">
        <div className="container-tic flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TIC AI. Built by SN Trinetra Global AI &amp; IT Solutions.</p>
          <p lang={lang} className="font-telugu">
            తెలుగులో AI నేర్చుకోండి.
          </p>
        </div>
      </div>
    </footer>
  );
}
