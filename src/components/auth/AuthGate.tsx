"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { canOpen, homeFor, isPublicPath } from "@/lib/access";
import { ButtonLink } from "@/components/ui/Bits";
import { UpgradeToCourse } from "./UpgradeToCourse";
import { CourseUnlock } from "./CourseUnlock";

/* Wraps every page. Logged out → /login (then back here). ₹99 students may open Vyapar GPT,
 * Community and their account: the home page sends them to Vyapar GPT, and any other page
 * (courses, learning paths, My learning) shows the ₹4999 upgrade box instead. */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { enabled, ready, session, plan } = useAuth();
  const { t, lang } = useLang();
  const path = usePathname();
  const router = useRouter();
  const open = !enabled || isPublicPath(path);

  // ₹99 students have no home page of their own: send them to Vyapar GPT.
  useEffect(() => {
    if (!open && ready && session && path === "/" && plan !== "course") router.replace(homeFor(plan));
  }, [open, ready, session, path, plan, router]);

  // No saved login at all → go now; don't wait for Supabase to answer.
  const noSavedLogin = () => {
    try { return !Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k)); } catch { return false; }
  };

  useEffect(() => {
    if (open || session) return;
    if (!ready && !noSavedLogin()) return;
    // Coming back from the ₹4999 payment: remember it so /courses can unlock after login.
    const q = new URLSearchParams(window.location.search);
    if (q.get("razorpay_payment_id") || q.get("paid") === "1") {
      try { sessionStorage.setItem("ticai.coursePaid", q.get("razorpay_payment_id") || "1"); } catch { /* ignore */ }
    }
    router.replace(path === "/" ? "/login" : `/login?next=${encodeURIComponent(path)}`);
  }, [open, ready, session, path, router]);

  if (open) return <>{children}</>;
  if (!ready || !session) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm text-ink-500" lang={lang}>
        {null}
      </div>
    );
  }
  if (path === "/" && plan !== "course") return null;
  if (!canOpen(path, true, plan)) {
    return (
      <div className="container-tic grid min-h-[70vh] place-items-center py-16" lang={lang}>
        <div className="w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-xl">🔒</div>
          {/* Just paid ₹4999 and sent here: this keeps checking and opens the page once unlocked. */}
          <CourseUnlock />
          <h1 className="text-xl font-bold text-ink-900">
            {t("TICAI Mastermind has access to this", "ఇది TICAI Mastermind వారికి మాత్రమే అందుబాటులో ఉంది")}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {t("Your ₹99 workshop access includes Vyapar GPT and the Community. Courses, Learning paths and My learning are for TICAI Mastermind (₹4999) members.",
               "మీ ₹99 workshop access లో Vyapar GPT, Community ఉన్నాయి. కోర్సులు, లెర్నింగ్ పాత్‌లు, నా కోర్సులు TICAI Mastermind (₹4999) సభ్యులకు మాత్రమే.")}
          </p>
          <UpgradeToCourse />
          <ButtonLink href="/vyapar-gpt" variant="ghost" className="mt-3 w-full justify-center">
            {t("Go to Vyapar GPT", "Vyapar GPT కి వెళ్ళండి")}
          </ButtonLink>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
