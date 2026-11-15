"use client";

import { useEffect } from "react";

/* Registers the worker in production only. In dev it would cache the HMR
 * shell and make every edit look like it did not apply.
 *
 * It also has to UPDATE itself. Registering once and walking away is how a
 * phone ends up a version behind for days: the browser only re-checks
 * /sw.js on its own schedule, and an installed app that is never fully
 * closed may not re-check at all. So we ask on every load and whenever the
 * tab comes back to the foreground, and when a new worker takes control we
 * reload once so the page is not left running the old shell.
 */

const RELOAD_GUARD = "ticai.swReloaded";

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;

    const askForUpdate = () => {
      if (document.visibilityState === "visible") {
        registration?.update().catch(() => {
          /* offline, or the check failed — try again next time */
        });
      }
    };

    const onControllerChange = () => {
      /* The new worker has taken over, so this page is still showing the
         old shell. Reload once — the guard stops a loop if anything about
         the activation misbehaves. */
      try {
        if (sessionStorage.getItem(RELOAD_GUARD)) return;
        sessionStorage.setItem(RELOAD_GUARD, "1");
      } catch {
        /* storage blocked: skip the reload rather than risk a loop */
        return;
      }
      window.location.reload();
    };

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register("/sw.js");
        navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
        askForUpdate();
        document.addEventListener("visibilitychange", askForUpdate);
      } catch {
        /* unsupported, blocked, or private browsing — the site still works */
      }
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      document.removeEventListener("visibilitychange", askForUpdate);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return null;
}
