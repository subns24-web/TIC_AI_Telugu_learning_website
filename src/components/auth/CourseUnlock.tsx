"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { ButtonLink } from "@/components/ui/Bits";
import { PAYMENT_SCRIPT_URL } from "@/lib/payments";

/* Shown on /courses when Razorpay sends a buyer back after the ₹4999 payment.
 *
 * 1. Tells the payment script about the payment so it is checked with Razorpay now (it then
 *    upgrades the account to the course plan and sends the "₹4999 received" email).
 * 2. Keeps refreshing the student's session until the course plan shows up, then says so —
 *    every course opens without asking to pay again. Not logged in: asks them to log in.
 * The "just paid" flag lives in sessionStorage so it survives the trip through /login. */

const FLAG = "ticai.coursePaid";
const POLL_MS = 6000;
const GIVE_UP_MS = 6 * 60 * 1000;

export function CourseUnlock() {
  const { t, lang } = useLang();
  const { enabled, ready, session, plan, email } = useAuth();
  const [active, setActive] = useState(false);
  const [slow, setSlow] = useState(false);
  const started = useRef(0);

  // Arrival from Razorpay: remember it, report the payment once, tidy the address bar.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pid = q.get("razorpay_payment_id") || q.get("payment_id") || "";
    // Razorpay doesn't always add the payment ID, so arriving straight from Razorpay counts too.
    const fromRazorpay = /(^|\.)razorpay\.com$/.test((() => { try { return new URL(document.referrer).hostname; } catch { return ""; } })());
    const paid = !!pid || q.get("paid") === "1" || fromRazorpay;
    if (paid) {
      try { sessionStorage.setItem(FLAG, pid || "1"); } catch { /* private mode */ }
      if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
    }
    let flag = "";
    try { flag = sessionStorage.getItem(FLAG) || ""; } catch { /* ignore */ }
    if (!flag) return;
    setActive(true);
    let reported = "";
    try { reported = sessionStorage.getItem(FLAG + ".reported") || ""; } catch { /* ignore */ }
    if (reported !== flag) {
      const body = JSON.stringify({ type: "paid", payment_id: flag.startsWith("pay_") ? flag : "" });
      try { navigator.sendBeacon(PAYMENT_SCRIPT_URL, new Blob([body], { type: "text/plain" })); } catch { /* ignore */ }
      try { sessionStorage.setItem(FLAG + ".reported", flag); } catch { /* ignore */ }
    }
  }, []);

  // Logged in but not unlocked yet: refresh the session until the course plan arrives.
  useEffect(() => {
    if (!active || !ready || !session || plan === "course") return;
    if (!started.current) started.current = Date.now();
    const id = window.setInterval(async () => {
      await supabase()?.auth.refreshSession();
      if (Date.now() - started.current > GIVE_UP_MS) { setSlow(true); window.clearInterval(id); }
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [active, ready, session, plan]);

  // Unlocked: clear the flag so the banner only greets them this once.
  useEffect(() => {
    if (active && session && plan === "course") {
      try { sessionStorage.removeItem(FLAG); sessionStorage.removeItem(FLAG + ".reported"); } catch { /* ignore */ }
    }
  }, [active, session, plan]);

  if (!active || !enabled || !ready) return null;

  const box = "mb-8 rounded-2xl border p-5 text-sm";

  if (!session) {
    return (
      <div className={`${box} border-gold-300 bg-gold-50`} lang={lang} role="status">
        <p className="font-semibold text-ink-900">{t("🎉 Payment received!", "🎉 Payment అందింది!")}</p>
        <p className="mt-1 text-ink-600">
          {t("Log in with the email you paid with to open all courses.",
             "అన్ని courses open చేయడానికి మీరు pay చేసిన email తో login అవ్వండి.")}
        </p>
        <ButtonLink href="/login?next=/courses" className="mt-3">{t("Log in", "Login అవ్వండి")}</ButtonLink>
      </div>
    );
  }

  if (plan === "course") {
    return (
      <div className={`${box} border-green-200 bg-green-50`} lang={lang} role="status">
        <p className="font-semibold text-green-900">
          {t("🎉 Your ₹4999 course is unlocked — every course below is open for you.",
             "🎉 మీ ₹4999 course unlock అయింది — క్రింద ఉన్న అన్ని courses మీకు open.")}
        </p>
        <p className="mt-1 text-green-800">
          {t("Unlock the potential of your business with AI — your transformation starts now.",
             "AI తో మీ business సామర్థ్యాన్ని వెలికితీయండి — మీ transformation ఇప్పుడే మొదలవుతుంది.")}
        </p>
      </div>
    );
  }

  return (
    <div className={`${box} border-gold-300 bg-gold-50`} lang={lang} role="status">
      <p className="font-semibold text-ink-900">
        {t("🎉 Payment received — unlocking all your courses…", "🎉 Payment అందింది — మీ courses అన్నీ unlock చేస్తున్నాం…")}
      </p>
      <p className="mt-1 text-ink-600">
        {slow
          ? t(`This is taking longer than usual. It can take up to 5 minutes — refresh this page in a little while. Make sure you paid with ${email}.`,
              `సాధారణం కంటే ఎక్కువ సమయం పడుతోంది. 5 నిమిషాల వరకు పట్టవచ్చు — కాసేపటి తర్వాత page refresh చేయండి. ${email} తోనే pay చేశారో చూసుకోండి.`)
          : t("This usually takes under a minute. This page updates by itself — no need to do anything.",
              "సాధారణంగా ఒక్క నిమిషం లోపే అవుతుంది. ఈ page తనంతట తానే update అవుతుంది — మీరు ఏమీ చేయనక్కర్లేదు.")}
      </p>
    </div>
  );
}
