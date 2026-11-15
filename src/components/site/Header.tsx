"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { useAuth } from "@/lib/auth";
import { canOpen } from "@/lib/access";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";

/* The ₹99 workshop registration page (landing site). */
const REGISTER_URL = "https://sntg-ai-workshop.vercel.app/";

const NAV = [
  { href: "/courses", en: "Courses", te: "కోర్సులు" },
  { href: "/vyapar-gpt", en: "Vyapar GPT", te: "Vyapar GPT" },
  { href: "/tracks", en: "Learning paths", te: "లెర్నింగ్ పాత్‌లు" },
  { href: "/my-learning", en: "My learning", te: "నా కోర్సులు" },
  { href: "/community", en: "Community", te: "కమ్యూనిటీ" },
] as const;

export function Header() {
  const { t, lang } = useLang();
  const { enabled: authOn, session, plan, signOut } = useAuth();
  const router = useRouter();
  // Only the tabs this person may open (none when logged out).
  const nav = NAV.filter((item) => !authOn || canOpen(item.href, !!session, plan));
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Black button: "Want to register?" on the login page (→ the ₹99 workshop page), "Logout" once
  // logged in, nothing elsewhere. The outline Login button is not repeated on the login page.
  const onLogin = pathname === "/login";
  const showRegister = authOn && !session && onLogin;
  const showLogout = authOn && !!session;
  const showLoginLink = authOn && (!!session || !onLogin);
  const logout = async () => { await signOut(); setOpen(false); router.replace("/login"); };

  useEffect(() => setOpen(false), [pathname]);

  // The lesson player owns the whole screen — it renders its own slim bar.
  if (pathname.includes("/learn/")) return null;

  return (
    <header className="safe-top sticky top-0 z-50 border-b border-ink-900/8 bg-paper-100/85 backdrop-blur-md">
      <div className="container-tic flex min-h-16 items-center justify-between gap-4 py-2">
        <Link href="/" className="focus-ring rounded-lg" aria-label="TIC AI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
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
          {showLoginLink && (
            <Link
              href={session ? "/account" : "/login"}
              lang={lang}
              className="focus-ring hidden rounded-xl border border-ink-900/15 px-4 py-2.5 text-sm font-semibold text-ink-800 transition hover:border-gold-500/50 hover:bg-gold-50 sm:inline-flex"
            >
              {session ? t("My account", "నా account") : t("Log in", "Login")}
            </Link>
          )}
          {showRegister && (
            <a
              href={REGISTER_URL}
              lang={lang}
              className="focus-ring hidden rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 sm:inline-flex"
            >
              {t("Want to register?", "Register అవ్వాలా?")}
            </a>
          )}
          {showLogout && (
            <button
              type="button"
              onClick={logout}
              lang={lang}
              className="focus-ring hidden rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 sm:inline-flex"
            >
              {t("Logout", "Logout")}
            </button>
          )}

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
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                lang={lang}
                className="tap focus-ring rounded-lg px-3 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                {t(item.en, item.te)}
              </Link>
            ))}
            {showLoginLink && (
              <Link
                href={session ? "/account" : "/login"}
                lang={lang}
                className="tap focus-ring rounded-lg px-3 text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
              >
                {session ? t("My account", "నా account") : t("Log in", "Login")}
              </Link>
            )}
            <div className="mt-2 flex items-center justify-between gap-3 px-3">
              <LangToggle />
              {showRegister && (
                <a href={REGISTER_URL} lang={lang}
                  className="focus-ring rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white">
                  {t("Want to register?", "Register అవ్వాలా?")}
                </a>
              )}
              {showLogout && (
                <button type="button" onClick={logout} lang={lang}
                  className="focus-ring rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white">
                  {t("Logout", "Logout")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
