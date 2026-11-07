"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";

/* Student sign-in, backed by Supabase Auth.
 *
 * Accounts are created by the workshop's payment script (Google Apps Script) when Razorpay
 * confirms a ₹199 payment; the student gets the academy link, their email and a starting
 * password by email. There is no public sign-up page. */

/* The academy's Supabase project. Both values are public (every browser sees them), so they
 * live in the code: the live site then needs no Vercel settings, and stale Vercel variables
 * from the old, expired project cannot override them. Never put the sb_secret_ key here. */
const URL = "https://xexcztrlcnqptlhjxqjg.supabase.co";
const ANON = "sb_publishable_1S606vRN1TYFhI7IkbcGwA_uQWnJ1nN";

export const authEnabled = Boolean(URL && ANON);

let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient | null {
  if (!authEnabled) return null;
  if (!client) {
    client = createClient(URL, ANON, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}

/* What the student paid for. Set only by the payment script (Supabase app_metadata, which
 * students cannot edit): "academy" = ₹199 workshop (academy site), "course" = ₹4999 (academy
 * + courses). */
export type Plan = "academy" | "course";

type AuthCtx = {
  enabled: boolean;
  plan: Plan;
  ready: boolean;          // first session check finished
  session: Session | null;
  email: string | null;
  recovery: boolean;       // arrived from a "reset password" email link
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  enabled: false, plan: "academy", ready: true, session: null, email: null, recovery: false, signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!authEnabled);
  const [session, setSession] = useState<Session | null>(null);
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    const sb = supabase();
    if (!sb) return;
    let alive = true;
    sb.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      setReady(true);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  const value = useMemo<AuthCtx>(() => ({
    enabled: authEnabled,
    plan: session?.user?.app_metadata?.plan === "course" ? "course" : "academy",
    ready,
    session,
    email: session?.user?.email ?? null,
    recovery,
    signOut: async () => { await supabase()?.auth.signOut(); setRecovery(false); },
  }), [ready, session, recovery]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
