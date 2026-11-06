"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Bits";

/* Every successful login lands on the AI for Business — Foundations course page. */
const AFTER_LOGIN = "/courses/ai-for-business-foundations";

export default function LoginPage() {
  const { t, lang } = useLang();
  const { enabled, ready, session } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (ready && session) router.replace(AFTER_LOGIN);
  }, [ready, session, router]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setInfo("");
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    setBusy(false);
    if (error) {
      setError(t(
        "That email and password don't match. Use the email you registered with and the password from our email.",
        "Email లేదా password సరిపోలలేదు. మీరు register చేసిన email మరియు మా email లోని password ఉపయోగించండి.",
      ));
      return;
    }
    router.replace(AFTER_LOGIN);
  }

  async function onForgot() {
    setError(""); setInfo("");
    const sb = supabase();
    if (!sb) return;
    if (!email.trim()) {
      setError(t("Type your registered email first, then tap “Forgot password”.",
                 "ముందుగా మీ registered email టైప్ చేసి, తర్వాత “Password మర్చిపోయారా?” నొక్కండి."));
      return;
    }
    setBusy(true);
    await sb.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/account`,
    });
    setBusy(false);
    // Same message whether or not the email exists, so nobody can probe for accounts.
    setInfo(t(
      "If that email is registered, a password-reset link is on its way. Check Spam / Promotions too.",
      "ఆ email registered అయితే, password reset link పంపాము. Spam / Promotions folder కూడా చూడండి.",
    ));
  }

  if (!enabled) {
    return (
      <div className="container-tic py-20 text-center text-ink-500" lang={lang}>
        {t("Student login is being set up. Please check back soon.", "Student login త్వరలో అందుబాటులోకి వస్తుంది.")}
      </div>
    );
  }

  return (
    <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
      <form onSubmit={onLogin} className="w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink-900">{t("Student login", "Student login")}</h1>
        <p className="mt-1 text-sm text-ink-500">
          {t("Use the email you registered with and the password we emailed you.",
             "మీరు register చేసిన email మరియు మేము email లో పంపిన password తో login అవ్వండి.")}
        </p>

        <label className="mt-6 block text-sm font-semibold text-ink-700" htmlFor="email">
          {t("Registered email", "Registered email")}
        </label>
        <input
          id="email" type="email" required autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink-900/15 px-4 py-3 text-ink-900"
          placeholder="you@example.com"
        />

        <label className="mt-4 block text-sm font-semibold text-ink-700" htmlFor="password">
          {t("Password", "Password")}
        </label>
        <div className="relative mt-1.5">
          <input
            id="password" type={show ? "text" : "password"} required autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="focus-ring w-full rounded-xl border border-ink-900/15 px-4 py-3 pr-20 text-ink-900"
          />
          <button type="button" onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-500 hover:text-ink-900">
            {show ? t("Hide", "దాచు") : t("Show", "చూపించు")}
          </button>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
        {info && <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800" role="status">{info}</p>}

        <Button type="submit" disabled={busy} className="mt-6 w-full justify-center">
          {busy ? t("Please wait…", "ఒక్క క్షణం…") : t("Log in", "Login అవ్వండి")}
        </Button>
        <button type="button" onClick={onForgot} disabled={busy}
          className="mt-3 w-full text-center text-sm font-medium text-ink-500 underline hover:text-ink-900">
          {t("Forgot password?", "Password మర్చిపోయారా?")}
        </button>

        <p className="mt-6 border-t border-ink-900/8 pt-4 text-center text-xs text-ink-400">
          {t("Not registered yet?", "ఇంకా register కాలేదా?")}{" "}
          <Link href="https://sntg-ai-workshop.vercel.app" className="font-semibold text-ink-700 underline">
            {t("Join the ₹199 workshop", "₹199 workshop లో join అవ్వండి")}
          </Link>
        </p>
      </form>
    </div>
  );
}
