"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";

const NAV = [
  { href: "/courses", en: "Courses", te: "కోర్సులు" },
  { href: "/vyapar-gpt", en: "Vyapar GPT", te: "Vyapar GPT" },
  { href: "/tracks", en: "Learning paths", te: "లెర్నింగ్ పాత్‌లు" },
  { href: "/my-learning", en: "My learning", te: "నా కోర్సులు" },
  { href: "/community", en: "Community", te: "కమ్యూనిటీ" },
] as const;

export function Header() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // The lesson player owns the whole screen — it renders its own slim bar.
  if (pathname.includes("/learn/")) return null;

  return (
    <header className="safe-top sticky top-0 z-50 border-b border-ink-900/8 bg-paper-100/85 backdrop-blur-md">
      <div className="container-tic flex h-16 items-center justify-between gap-4">
        <Link href="/" className="focus-ring rounded-lg" aria-label="TIC AI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                lang={lang}
                className={`focus-ring rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-ink-900/5 text-ink-900"
                    : "text-ink-500 hover:bg-ink-900/5 hover:text-ink-900"
                }`}
              >
                {t(item.en, item.te)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <Link
            href="/courses/ai-for-business-foundations"
            lang={lang}
            className="focus-ring hidden rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 sm:inline-flex"
          >
            {t("Start free", "ఉచితంగా మొదలుపెట్టండి")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-ink-900/10 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-900/8 bg-paper-100 md:hidden">
          <div className="container-tic flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                lang={lang}
                className="tap focus-ring rounded-lg px-3 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                {t(item.en, item.te)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-3">
              <LangToggle />
              <Link
                href="/courses/ai-for-business-foundations"
                lang={lang}
                className="focus-ring rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white"
              >
                {t("Start free", "ఉచితంగా")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
