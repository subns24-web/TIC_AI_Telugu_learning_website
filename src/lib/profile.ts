"use client";

import { useCallback, useEffect, useState } from "react";

/* The business profile is answered once and then fills itself into every
 * prompt. Asking a shop owner to retype their name, city and trade for the
 * twentieth time is how a tool like this gets abandoned. */

export type BusinessProfile = {
  businessName: string;
  businessType: string;
  city: string;
  sells: string;
  tone: string;
  /** Which assistant they actually pay for; remembered across prompts. */
  tool: string;
};

const KEY = "ticai.business";

export const EMPTY_PROFILE: BusinessProfile = {
  businessName: "",
  businessType: "",
  city: "",
  sells: "",
  tone: "warm and respectful",
  tool: "chatgpt",
};

function read(): BusinessProfile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY_PROFILE, ...JSON.parse(raw) } : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

export function useBusinessProfile() {
  const [profile, setProfile] = useState<BusinessProfile>(EMPTY_PROFILE);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setProfile(read());
    setReady(true);
  }, []);

  useEffect(() => {
    load();
    const onChange = () => load();
    window.addEventListener("ticai:profile", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("ticai:profile", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [load]);

  const save = useCallback((next: Partial<BusinessProfile>) => {
    const merged = { ...read(), ...next };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event("ticai:profile"));
    } catch {
      /* storage blocked — the form still works, it just will not remember */
    }
    setProfile(merged);
  }, []);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY);
      window.dispatchEvent(new Event("ticai:profile"));
    } catch {
      /* ignore */
    }
    setProfile(EMPTY_PROFILE);
  }, []);

  /** Enough filled in to be worth auto-filling from. */
  const isSet = Boolean(profile.businessName && profile.sells);

  return { profile, ready, save, clear, isSet };
}
