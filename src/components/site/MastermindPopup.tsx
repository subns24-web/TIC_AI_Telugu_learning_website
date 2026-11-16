"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/lang";

/* Shown when a ₹99 (workshop) student taps a tab that only TICAI Mastermind (₹4999) members can open. */
export function MastermindPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;
  // Rendered on <body>: the header's blur would otherwise pin it to the header.
  return createPortal(
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink-950/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mastermind-title"
        lang={lang}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-xl" aria-hidden="true">🔒</div>
        <h2 id="mastermind-title" className="mt-4 font-telugu text-lg font-bold text-ink-900">
          {t("TICAI Mastermind has access to this", "ఇది TICAI Mastermind వారికి మాత్రమే అందుబాటులో ఉంది")}
        </h2>
        <p className="mt-2 font-telugu text-sm leading-relaxed text-ink-500">
          {t(
            "Your ₹99 workshop access includes Vyapar GPT and the Community.",
            "మీ ₹99 workshop access లో Vyapar GPT, Community ఉన్నాయి.",
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="btn-gold focus-ring mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          {t("OK", "సరే")}
        </button>
      </div>
    </div>,
    document.body,
  );
}
