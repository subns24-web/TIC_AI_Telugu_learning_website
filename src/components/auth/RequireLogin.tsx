"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { ButtonLink } from "@/components/ui/Bits";

/* Wrap anything only registered students may see. Before sign-in is configured
 * (no Supabase keys), it shows the page as before. */
export function RequireLogin({ children }: { children: React.ReactNode }) {
  const { enabled, ready, session } = useAuth();
  const { t, lang } = useLang();
  const pathname = usePathname();

  if (!enabled) return <>{children}</>;
  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm text-ink-500" lang={lang}>
        {t("Checking your sign-in…", "మీ login చెక్ చేస్తున్నాం…")}
      </div>
    );
  }
  if (session) return <>{children}</>;

  return (
    <div className="container-tic grid min-h-[70vh] place-items-center py-16" lang={lang}>
      <div className="w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-xl">🔒</div>
        <h1 className="text-xl font-bold text-ink-900">
          {t("Please log in to continue", "కొనసాగించడానికి login అవ్వండి")}
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          {t(
            "Lessons are for registered students. Use the email you registered with and the password we emailed you.",
            "Lessons registered students కోసం. మీరు register చేసిన email మరియు మేము email లో పంపిన password తో login అవ్వండి.",
          )}
        </p>
        <ButtonLink href={`/login?next=${encodeURIComponent(pathname)}`} className="mt-6 w-full justify-center">
          {t("Log in", "Login అవ్వండి")}
        </ButtonLink>
      </div>
    </div>
  );
}
