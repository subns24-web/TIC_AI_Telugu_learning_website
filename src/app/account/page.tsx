"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase, useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { RequireLogin } from "@/components/auth/RequireLogin";
import { Button, ButtonLink } from "@/components/ui/Bits";

/* Change password (optional: the starting password keeps working). Reset-password email
 * links land here too, already signed in, so the student can pick a new one. */
function AccountInner() {
  const { t, lang } = useLang();
  const { email, recovery, signOut } = useAuth();
  const router = useRouter();

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onChange(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setDone(false);
    if (pw1.length < 8) { setError(t("Use at least 8 characters.", "కనీసం 8 అక్షరాలు ఉండాలి.")); return; }
    if (pw1 !== pw2) { setError(t("The two passwords don't match.", "రెండు passwords ఒకేలా లేవు.")); return; }
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw1 });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setPw1(""); setPw2(""); setDone(true);
  }

  return (
    <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
      <div className="w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink-900">{t("My account", "నా account")}</h1>
        <p className="mt-1 text-sm text-ink-500">
          {t("Logged in as", "Login అయిన email:")} <b className="text-ink-800">{email}</b>
        </p>

        {recovery && (
          <p className="mt-4 rounded-lg bg-gold-50 px-3 py-2 text-sm text-ink-800">
            {t("Choose a new password below.", "క్రింద కొత్త password ఎంచుకోండి.")}
          </p>
        )}

        <form onSubmit={onChange} className="mt-6">
          <h2 className="font-semibold text-ink-900">{t("Change password", "Password మార్చండి")}</h2>
          <p className="mt-1 text-xs text-ink-500">
            {t("Optional — you can keep using the password from your email.",
               "ఇష్టమైతేనే — email లో వచ్చిన password తోనే కొనసాగవచ్చు.")}
          </p>
          <input type="password" autoComplete="new-password" required value={pw1} onChange={(e) => setPw1(e.target.value)}
            placeholder={t("New password (min. 8 characters)", "కొత్త password (కనీసం 8 అక్షరాలు)")}
            className="focus-ring mt-3 w-full rounded-xl border border-ink-900/15 px-4 py-3 text-ink-900" />
          <input type="password" autoComplete="new-password" required value={pw2} onChange={(e) => setPw2(e.target.value)}
            placeholder={t("Type it again", "మళ్ళీ టైప్ చేయండి")}
            className="focus-ring mt-3 w-full rounded-xl border border-ink-900/15 px-4 py-3 text-ink-900" />
          {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
          {done && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800" role="status">
            {t("Password changed. Use the new one next time you log in.", "Password మారింది. తదుపరి login కి కొత్త password వాడండి.")}
          </p>}
          <Button type="submit" disabled={busy} className="mt-4 w-full justify-center">
            {busy ? t("Saving…", "Save అవుతోంది…") : t("Save new password", "కొత్త password save చేయండి")}
          </Button>
        </form>

        <div className="mt-6 flex gap-3 border-t border-ink-900/8 pt-5">
          <ButtonLink href="/my-learning" variant="outline" className="flex-1 justify-center">
            {t("My learning", "నా కోర్సులు")}
          </ButtonLink>
          <Button variant="ghost" className="flex-1 justify-center"
            onClick={async () => { await signOut(); router.replace("/"); }}>
            {t("Log out", "Logout")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return <RequireLogin><AccountInner /></RequireLogin>;
}
