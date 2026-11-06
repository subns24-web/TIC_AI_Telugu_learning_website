"use client";

import { useEffect, useState } from "react";
import { businessTypes } from "@/lib/vyapar";
import { useLang } from "@/lib/lang";
import { EMPTY_PROFILE, useBusinessProfile, type BusinessProfile } from "@/lib/profile";
import { Button } from "@/components/ui/Bits";

const TONES = [
  { value: "warm and respectful", label: "Warm and respectful", labelTe: "ఆప్యాయంగా, గౌరవంగా" },
  { value: "short and direct", label: "Short and direct", labelTe: "చిన్నగా, నేరుగా" },
  { value: "friendly and casual", label: "Friendly and casual", labelTe: "స్నేహంగా, మామూలుగా" },
  { value: "formal and professional", label: "Formal and professional", labelTe: "అధికారికంగా" },
];

export function ProfileForm({ onDone }: { onDone?: () => void }) {
  const { t, lang } = useLang();
  const { profile, save, ready } = useBusinessProfile();
  const [draft, setDraft] = useState<BusinessProfile>(EMPTY_PROFILE);

  useEffect(() => {
    if (ready) setDraft(profile);
  }, [ready, profile]);

  const set = (k: keyof BusinessProfile, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  const field =
    "focus-ring w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400";
  const label = "block text-sm font-semibold text-ink-700";

  const complete = Boolean(draft.businessName.trim() && draft.sells.trim());

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(draft);
        onDone?.();
      }}
      className="space-y-6"
    >
      <div>
        <label lang={lang} className={label} htmlFor="p-name">
          {t("What is your business called?", "మీ వ్యాపారం పేరు ఏమిటి?")}
        </label>
        <input
          id="p-name"
          value={draft.businessName}
          onChange={(e) => set("businessName", e.target.value)}
          lang={lang}
          placeholder={t("Sri Lakshmi Traders", "శ్రీ లక్ష్మీ ట్రేడర్స్")}
          className={`${field} mt-2 font-telugu`}
        />
      </div>

      <div>
        <p lang={lang} className={label}>
          {t("What kind of business is it?", "ఇది ఏ రకమైన వ్యాపారం?")}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {businessTypes.map((bt) => {
            const active = draft.businessType === bt.id;
            return (
              <button
                key={bt.id}
                type="button"
                onClick={() => set("businessType", active ? "" : bt.id)}
                aria-pressed={active}
                lang={lang}
                className={`focus-ring flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border p-2 text-center transition ${
                  active
                    ? "border-gold-500 bg-gold-50 ring-1 ring-gold-400"
                    : "border-ink-900/12 bg-white hover:border-gold-400"
                }`}
              >
                <span className="text-xl" aria-hidden="true">
                  {bt.emoji}
                </span>
                <span className="font-telugu text-xs font-semibold leading-tight text-ink-700">
                  {t(bt.label, bt.labelTe)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label lang={lang} className={label} htmlFor="p-sells">
            {t("What do you sell?", "మీరు ఏం అమ్ముతారు?")}
          </label>
          <input
            id="p-sells"
            value={draft.sells}
            onChange={(e) => set("sells", e.target.value)}
            lang={lang}
            placeholder={t("Electrical fittings and wiring", "ఎలక్ట్రికల్ ఫిట్టింగ్స్, వైరింగ్")}
            className={`${field} mt-2 font-telugu`}
          />
        </div>
        <div>
          <label lang={lang} className={label} htmlFor="p-city">
            {t("Your city or area", "మీ ఊరు లేదా ప్రాంతం")}
          </label>
          <input
            id="p-city"
            value={draft.city}
            onChange={(e) => set("city", e.target.value)}
            lang={lang}
            placeholder={t("Vijayawada", "విజయవాడ")}
            className={`${field} mt-2 font-telugu`}
          />
        </div>
      </div>

      <div>
        <label lang={lang} className={label} htmlFor="p-tone">
          {t("How should your messages sound?", "మీ సందేశాలు ఎలా అనిపించాలి?")}
        </label>
        <select
          id="p-tone"
          value={draft.tone}
          onChange={(e) => set("tone", e.target.value)}
          lang={lang}
          className={`${field} mt-2 font-telugu`}
        >
          {TONES.map((tn) => (
            <option key={tn.value} value={tn.value}>
              {t(tn.label, tn.labelTe)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg" disabled={!complete} lang={lang}>
          {t("Save and continue", "సేవ్ చేసి కొనసాగండి")}
        </Button>
        <p lang={lang} className="text-sm text-ink-400">
          {t(
            "Saved on this device only. Filled in for you on every prompt.",
            "ఈ ఫోన్‌లో మాత్రమే సేవ్ అవుతుంది. ప్రతి ప్రాంప్ట్‌లో దానంతట అదే నిండుతుంది.",
          )}
        </p>
      </div>
    </form>
  );
}
