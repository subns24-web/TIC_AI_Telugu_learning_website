export function inr(amount: number) {
  if (amount === 0) return "Free";
  return "₹" + amount.toLocaleString("en-IN");
}

export function mins(n: number) {
  return `${n} min`;
}

export const LEVEL_LABEL = {
  beginner: { en: "Beginner", te: "ప్రారంభం" },
  intermediate: { en: "Intermediate", te: "మధ్యస్థం" },
  advanced: { en: "Advanced", te: "ఉన్నతం" },
} as const;

export const LANGUAGE_LABEL = {
  telugu: { en: "Telugu", te: "తెలుగు" },
  "telugu-english": { en: "Telugu + English", te: "తెలుగు + ఇంగ్లీష్" },
} as const;
