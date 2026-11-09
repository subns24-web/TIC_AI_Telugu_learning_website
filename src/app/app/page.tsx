"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { Dice } from "@/components/site/Dice";

/* /app — the link we email to students: "install the TIC AI app".
 *
 * TIC AI is a web app (manifest + service worker), so installing it adds an icon to the home
 * screen that opens full-screen like any other app. There is no Play Store listing; this page
 * is the install link.
 *
 *  - Android Chrome / Edge / Samsung: one "Install" button (beforeinstallprompt).
 *  - Opened inside Gmail / WhatsApp / Instagram's own browser: those can't install, so on
 *    Android we offer "Open in Chrome" (an intent link) and say why.
 *  - iPhone / iPad: Safari has no install API — show the Share → Add to Home Screen steps. */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Platform = "android" | "ios" | "desktop";

function detect() {
  const ua = navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && "ontouchend" in document);
  const android = /Android/i.test(ua);
  const inApp = /; wv\)|FBAN|FBAV|Instagram|Line\/|GSA\/|WhatsApp|Snapchat/i.test(ua);
  const iosNotSafari = ios && /CriOS|FxiOS|EdgiOS|GSA\//.test(ua);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const platform: Platform = ios ? "ios" : android ? "android" : "desktop";
  return { platform, inApp, iosNotSafari, standalone };
}

export default function InstallAppPage() {
  const { t, lang } = useLang();
  const [env, setEnv] = useState<ReturnType<typeof detect> | null>(null);
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setEnv(detect());
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as InstallEvent); };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") setInstalled(true);
  }

  const chromeIntent =
    "intent://tic-ai-academy.vercel.app/app#Intent;scheme=https;package=com.android.chrome;end";

  const step = (n: number, en: string, te: string) => (
    <li className="flex gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-100 text-sm font-bold text-ink-900">{n}</span>
      <span className="pt-0.5">{t(en, te)}</span>
    </li>
  );

  let body: React.ReactNode = null;
  if (!env) {
    body = null;
  } else if (env.standalone || installed) {
    body = (
      <>
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800" role="status">
          {t("TIC AI is installed on this device. Open it from your home screen.",
             "TIC AI ఈ device లో install అయింది. Home screen నుండి తెరవండి.")}
        </p>
        <Link href="/login" className="btn-gold focus-ring mt-5 flex min-h-12 items-center justify-center rounded-xl font-semibold">
          {t("Log in", "Login అవ్వండి")}
        </Link>
      </>
    );
  } else if (env.platform === "ios") {
    body = (
      <>
        {env.iosNotSafari && (
          <p className="mb-4 rounded-lg bg-gold-50 px-3 py-2 text-sm text-ink-800">
            {t("On iPhone, apps can only be added from Safari. Copy this page's link and open it in Safari first.",
               "iPhone లో Safari నుండి మాత్రమే app add చేయగలరు. ఈ page link ని copy చేసి ముందుగా Safari లో తెరవండి.")}
          </p>
        )}
        <ol className="space-y-3 text-ink-800">
          {step(1, "Tap the Share button (square with an arrow) at the bottom of Safari.",
                   "Safari క్రింద ఉన్న Share button (బాణం ఉన్న చతురస్రం) నొక్కండి.")}
          {step(2, "Scroll down and tap “Add to Home Screen”.", "క్రిందికి scroll చేసి “Add to Home Screen” నొక్కండి.")}
          {step(3, "Tap “Add”. The TIC AI icon appears on your home screen.",
                   "“Add” నొక్కండి. మీ home screen పై TIC AI icon వస్తుంది.")}
        </ol>
      </>
    );
  } else if (deferred) {
    body = (
      <button type="button" onClick={install}
        className="btn-gold focus-ring flex min-h-12 w-full items-center justify-center rounded-xl text-base font-semibold">
        {t("Install the TIC AI app", "TIC AI app install చేయండి")}
      </button>
    );
  } else if (env.platform === "android" && env.inApp) {
    body = (
      <>
        <p className="text-sm text-ink-600">
          {t("This page opened inside another app (like Gmail or WhatsApp), which can't install apps. Open it in Chrome:",
             "ఈ page వేరే app (Gmail / WhatsApp లాంటి) లో తెరుచుకుంది, అక్కడ install కుదరదు. Chrome లో తెరవండి:")}
        </p>
        <a href={chromeIntent}
          className="btn-gold focus-ring mt-4 flex min-h-12 items-center justify-center rounded-xl text-base font-semibold">
          {t("Open in Chrome", "Chrome లో తెరవండి")}
        </a>
        <p className="mt-3 text-xs text-ink-500">
          {t("Or tap ⋮ at the top right and choose “Open in Chrome” / “Open in browser”.",
             "లేదా పైన కుడివైపు ⋮ నొక్కి “Open in Chrome” / “Open in browser” ఎంచుకోండి.")}
        </p>
      </>
    );
  } else {
    body = (
      <>
        <p className="mb-3 text-sm text-ink-600">
          {t("If no Install button appears in a few seconds, install it from the browser menu:",
             "కొన్ని సెకన్లలో Install button రాకపోతే, browser menu నుండి install చేయండి:")}
        </p>
        <ol className="space-y-3 text-ink-800">
          {step(1, "Open this page in Chrome.", "ఈ page ని Chrome లో తెరవండి.")}
          {step(2, "Tap ⋮ (top right).", "పైన కుడివైపు ⋮ నొక్కండి.")}
          {step(3, "Tap “Install app” or “Add to Home screen”, then “Install”.",
                   "“Install app” లేదా “Add to Home screen” నొక్కి, “Install” నొక్కండి.")}
        </ol>
      </>
    );
  }

  return (
    <div className="container-tic grid min-h-[75vh] place-items-center py-14" lang={lang}>
      <div className="w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <Dice id="app-page" className="h-14 w-14 shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-ink-900">{t("Get the TIC AI app", "TIC AI app పొందండి")}</h1>
            <p className="text-sm text-ink-500">{t("Free · Android & iPhone", "ఉచితం · Android & iPhone")}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink-600">
          {t("Install it once and open your courses straight from your home screen, full screen, like any app.",
             "ఒక్కసారి install చేస్తే, మీ courses ని home screen నుండే నేరుగా, ఒక app లాగా తెరవవచ్చు.")}
        </p>
        <div className="mt-6">{body}</div>
      </div>
    </div>
  );
}
