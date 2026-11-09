"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendPasswordChangedEmail, supabase, useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Bits";

/* Where the "TIC-AI password reset" email link lands. Supabase signs the student in from the
 * link (tokens in the #fragment); they pick a new password, Supabase saves it and sends the
 * "password changed" email, then we sign them out and send them to /login to use it. */
export default function ResetPasswordPage() {
  const { t, lang } = useLang();
  const { ready, session, email } = useAuth();
  const router = useRouter();

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [linkError, setLinkError] = useState("");

  // An expired or already-used link comes back with #error=…&error_description=…
  useEffect(() => {
    const h = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    if (h.get("error")) setLinkError(h.get("error_description") || h.get("error") || "");
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (pw1.length < 8) { setError(t("Use at least 8 characters.", "కనీసం 8 అక్షరాలు ఉండాలి.")); return; }
    if (pw1 !== pw2) { setError(t("The two passwords don't match.", "రెండు passwords ఒకేలా లేవు.")); return; }
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw1 });
    if (error) {
      setBusy(false);
      setError(/different from the old/i.test(error.message)
        ? t("Choose a password different from your current one.", "ప్రస్తుత password కాకుండా వేరేది ఎంచుకోండి.")
        : error.message);
      return;
    }
    await sendPasswordChangedEmail();
    setDone(true);
    await sb.auth.signOut();
    setTimeout(() => router.replace("/login?reset=done"), 3000);
  }

  const card = "w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm";

  if (done) {
    return (
      <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
        <div className={`${card} text-center`} role="status">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-green-50 text-xl">✅</div>
          <h1 className="text-xl font-bold text-ink-900">{t("Password changed successfully", "Password విజయవంతంగా మారింది")}</h1>
          <p className="mt-2 text-sm text-ink-500">
            {t("We've also sent a confirmation to your email. Taking you to the login page — log in with your new password.",
               "మీ email కి confirmation కూడా పంపాము. Login page కి తీసుకెళ్తున్నాం — కొత్త password తో login అవ్వండి.")}
          </p>
          <Link href="/login?reset=done" className="mt-6 inline-block text-sm font-semibold text-ink-700 underline">
            {t("Go to login now", "ఇప్పుడే login page కి వెళ్ళండి")}
          </Link>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm text-ink-500" lang={lang}>
        {t("Checking your reset link…", "మీ reset link చెక్ చేస్తున్నాం…")}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
        <div className={`${card} text-center`}>
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-red-50 text-xl">⏱️</div>
          <h1 className="text-xl font-bold text-ink-900">{t("This reset link has expired", "ఈ reset link గడువు ముగిసింది")}</h1>
          <p className="mt-2 text-sm text-ink-500">
            {t("Reset links work once and only for a short time. Ask for a new one from the login page.",
               "Reset link ఒక్కసారే, కొద్ది సమయం మాత్రమే పనిచేస్తుంది. Login page నుండి కొత్తది అడగండి.")}
          </p>
          {linkError && <p className="mt-2 text-xs text-ink-400">{linkError}</p>}
          <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-ink-700 underline">
            {t("Back to login", "Login page కి వెళ్ళండి")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
      <form onSubmit={onSave} className={card}>
        <h1 className="text-2xl font-bold text-ink-900">{t("Set a new password", "కొత్త password పెట్టండి")}</h1>
        <p className="mt-1 text-sm text-ink-500">
          {t("For", "Account:")} <b className="text-ink-800">{email}</b>
        </p>

        <label className="mt-6 block text-sm font-semibold text-ink-700" htmlFor="pw1">
          {t("New password", "కొత్త password")}
        </label>
        <div className="relative mt-1.5">
          <input id="pw1" type={show ? "text" : "password"} autoComplete="new-password" required value={pw1}
            onChange={(e) => setPw1(e.target.value)}
            placeholder={t("At least 8 characters", "కనీసం 8 అక్షరాలు")}
            className="focus-ring w-full rounded-xl border border-ink-900/15 px-4 py-3 pr-20 text-ink-900" />
          <button type="button" onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-500 hover:text-ink-900">
            {show ? t("Hide", "దాచు") : t("Show", "చూపించు")}
          </button>
        </div>

        <label className="mt-4 block text-sm font-semibold text-ink-700" htmlFor="pw2">
          {t("Type it again", "మళ్ళీ టైప్ చేయండి")}
        </label>
        <input id="pw2" type={show ? "text" : "password"} autoComplete="new-password" required value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink-900/15 px-4 py-3 text-ink-900" />

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}

        <Button type="submit" disabled={busy} className="mt-6 w-full justify-center">
          {busy ? t("Saving…", "Save అవుతోంది…") : t("Save new password", "కొత్త password save చేయండి")}
        </Button>
      </form>
    </div>
  );
}
