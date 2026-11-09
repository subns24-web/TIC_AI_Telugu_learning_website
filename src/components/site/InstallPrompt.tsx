"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import { Dice } from "./Dice";

/* Add-to-home-screen, the two ways it actually works:
 *
 *  - Chrome / Edge / Samsung fire `beforeinstallprompt`, which we hold on to
 *    and replay when the learner taps install.
 *  - iOS Safari fires nothing and has no API. The only route is Share →
 *    Add to Home Screen, so there we show the steps instead of a button.
 *
 * Either way the card stays out of the way: it waits, it can be dismissed,
 * and a dismissal is remembered. */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "ticai.installDismissed";
const SHOW_AFTER_MS = 12_000;

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari's own flag, not part of the standard
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports as Macintosh, so check for touch as well
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && typeof document !== "undefined" && "ontouchend" in document)
  );
}

export function InstallPrompt() {
  const { t, lang } = useLang();
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* storage blocked — it will simply ask again next visit */
    }
  }, []);

  useEffect(() => {
    if (isStandalone()) return;

    try {
      // Stay quiet for a month after a dismissal.
      const at = Number(window.localStorage.getItem(DISMISS_KEY) ?? 0);
      if (at && Date.now() - at < 30 * 24 * 60 * 60 * 1000) return;
    } catch {
      /* ignore */
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS gives us no event, so offer the manual route after a delay —
    // long enough that it never interrupts the first thing they came for.
    let timer: number | undefined;
    if (isIos()) {
      timer = window.setTimeout(() => {
        setShowIosHelp(true);
        setVisible(true);
      }, SHOW_AFTER_MS);
    }

    const onInstalled = () => setVisible(false);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") setVisible(false);
    else dismiss();
  };

  // /app is the full install page; the floating card would only repeat it.
  if (!visible || pathname === "/app") return null;

  return (
    <div
      role="dialog"
      aria-label={t("Install TIC AI", "TIC AI ఇన్‌స్టాల్ చేయండి")}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:left-auto sm:right-4 sm:w-96"
    >
      <div className="hairline flex gap-3.5 rounded-2xl border bg-ink-950/95 p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.8)] backdrop-blur-lg">
        <Dice id="install" className="h-11 w-11 shrink-0" />

        <div className="min-w-0 flex-1">
          <p lang={lang} className="font-semibold leading-snug">
            {t("Keep TIC AI on your phone", "TIC AI ని మీ ఫోన్‌లో ఉంచుకోండి")}
          </p>

          {showIosHelp ? (
            <p lang={lang} className="mt-1.5 text-sm leading-relaxed text-ink-300">
              {t(
                "Tap Share, then “Add to Home Screen”.",
                "Share నొక్కి, “Add to Home Screen” ఎంచుకోండి.",
              )}
            </p>
          ) : (
            <p lang={lang} className="mt-1.5 text-sm leading-relaxed text-ink-300">
              {t(
                "Opens like an app, and lessons you have read stay available offline.",
                "యాప్‌లా తెరుచుకుంటుంది, మీరు చదివిన పాఠాలు ఆఫ్‌లైన్‌లోనూ ఉంటాయి.",
              )}
            </p>
          )}

          <div className="mt-3.5 flex gap-2">
            {!showIosHelp && (
              <button
                type="button"
                onClick={install}
                lang={lang}
                className="btn-gold focus-ring min-h-11 rounded-xl px-4 text-sm font-semibold"
              >
                {t("Install", "ఇన్‌స్టాల్ చేయండి")}
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              lang={lang}
              className="focus-ring min-h-11 rounded-xl px-3 text-sm font-medium text-ink-300 transition hover:bg-white/8 hover:text-white"
            >
              {showIosHelp ? t("Got it", "సరే") : t("Not now", "ఇప్పుడు కాదు")}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t("Dismiss", "మూసివేయండి")}
          className="focus-ring -mr-1 -mt-1 h-9 w-9 shrink-0 rounded-lg text-ink-400 transition hover:bg-white/8 hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
