"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase, useAuth } from "@/lib/auth";
import { PAYMENT_SCRIPT_URL } from "@/lib/payments";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Bits";

/* ₹4999 Razorpay payment page, opened in the same tab. Razorpay then sends the buyer back to
 * /courses?razorpay_payment_id=… (the page's redirect URL), where CourseUnlock gets the payment
 * checked and the courses unlocked. "I've paid — refresh my access" does the same from here: it
 * asks the payment script to check Razorpay now, keeps checking for up to a minute, and once the
 * course plan arrives sends the student to /courses, where every course is open. */
export const COURSE_PAYMENT_LINK = "https://rzp.io/rzp/rA9h7TtB";

export function UpgradeToCourse() {
  const { t } = useLang();
  const { email, plan } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  if (plan === "course") return null;

  async function refresh() {
    setBusy(true); setNote("");
    // Ask the script to check recent Razorpay payments now (it trusts only Razorpay's answer).
    try {
      navigator.sendBeacon(PAYMENT_SCRIPT_URL, new Blob([JSON.stringify({ type: "paid", payment_id: "" })], { type: "text/plain" }));
    } catch { /* ignore */ }
    // Then check our access for up to a minute; the upgrade usually lands within seconds.
    for (let i = 0; i < 12; i++) {
      const { data } = (await supabase()?.auth.refreshSession()) ?? { data: null };
      if (data?.session?.user?.app_metadata?.plan === "course") {
        router.push("/courses?paid=1");   // shows "your ₹4999 course is unlocked" there
        return;
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
    setBusy(false);
    setNote(t(
      "Not unlocked yet. It can take up to 5 minutes after payment — please try again shortly. Make sure you paid with this same email.",
      "ఇంకా unlock కాలేదు. Payment తర్వాత 5 నిమిషాల వరకు పట్టవచ్చు — కాసేపు ఆగి మళ్ళీ ప్రయత్నించండి. ఇదే email తో pay చేశారో చూసుకోండి.",
    ));
  }

  return (
    <div className="mt-6 rounded-xl border border-gold-300 bg-gold-50 p-4 text-left">
      <p className="text-sm font-semibold text-ink-900">
        {t("Unlock the full course — ₹4999", "పూర్తి course unlock చేయండి — ₹4999")}
      </p>
      <p className="mt-1 text-xs text-ink-500">
        {t("Pay with the same email you log in with", "మీరు login అయ్యే email తోనే pay చేయండి")}
        {email ? <>: <b className="text-ink-700">{email}</b></> : null}
      </p>
      <a
        href={COURSE_PAYMENT_LINK}
        className="btn-gold focus-ring mt-3 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold"
      >
        {t("Pay ₹4999 and unlock the course →", "₹4999 pay చేసి course unlock చేయండి →")}
      </a>
      <Button variant="outline" disabled={busy} onClick={refresh} className="mt-2 w-full justify-center">
        {busy ? t("Checking your payment…", "మీ payment చెక్ చేస్తున్నాం…") : t("I've paid — refresh my access", "Pay చేశాను — access refresh చేయండి")}
      </Button>
      {note && <p className="mt-2 text-xs text-ink-600" role="status">{note}</p>}
    </div>
  );
}
