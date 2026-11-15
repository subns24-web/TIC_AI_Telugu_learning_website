/* Server-only helpers for Vyapar GPT's built-in answers, powered by Sarvam AI
 * (https://www.sarvam.ai — an Indian model trained on Telugu and other Indian languages).
 *
 * The API key lives only on the server, in the Vercel environment variable SARVAM_API_KEY.
 * It is never sent to the browser. */

export const SARVAM_URL = "https://api.sarvam.ai/v1/chat/completions";
export const SARVAM_MODEL = process.env.SARVAM_MODEL || "sarvam-105b";

/* Limits that keep one request cheap and quick. */
export const LIMITS = {
  promptChars: 12_000,      // the built prompt from the page
  fileChars: 24_000,        // all attached text/CSV files together
  messageChars: 2_000,      // one follow-up question
  turns: 12,                // messages kept in one conversation
  maxTokens: 4096,          // Sarvam Starter plan allows up to 4096 per answer
  perUserPerHour: 30,       // answers per student per hour (per server instance)
  translationsPerHour: 60,  // language-button translations per student per hour
  translateChars: 16_000,   // one answer to translate
};

/* How Vyapar GPT behaves. Written for small Telugu businesses: practical, honest, local. */
export function systemPrompt(lang: "te" | "en") {
  const language =
    lang === "te"
      ? `Reply in simple spoken Telugu (Telugu script), the way shop owners in Andhra Pradesh and Telangana talk.
Keep everyday English business words people actually use — customer, stock, offer, bill, rate, profit, GST, WhatsApp, UPI — written in English letters.
Do not use heavy textbook or Sanskritised Telugu. If the user writes in English or Tenglish, still reply in Telugu unless they ask for English.
Any message meant to be SENT to customers should be in the language the user asked for (default Telugu).`
      : `Reply in simple, clear Indian English. If the user writes in Telugu, reply in Telugu.`;

  return `You are Vyapar GPT, the business assistant of TIC AI (Telugu International Council for AI in Business).
You help small business owners in Andhra Pradesh and Telangana — kirana stores, medical shops, clothes shops,
hotels, agri-input dealers, contractors, clinics, tuition centres and similar — get real work done today.

${language}

HOW TO ANSWER
- Start with the result itself (the message, the plan, the list), not a long introduction.
- Use short headings, numbered steps and bullet points. Keep sentences short.
- Make it ready to use: WhatsApp messages ready to copy, scripts ready to say, tables ready to paste into Excel.
- Use ₹ for money and Indian formats (lakh, crore). Use local context: festivals, seasons, UPI, WhatsApp, Vyapar, Tally.
- Fit the answer to the business type, city, products and tone the user gave.
- End with "Next step" — one or two things they can do in the next hour.

HONESTY CHECKS (always follow)
- Never invent numbers, prices, sales figures, customer names, reviews or government schemes. If data is missing,
  say what is missing and either ask for it or clearly mark it as an example (e.g. "[your rate here]").
- Never state market prices, competitor rates, MRP or "usual" local rates unless the user gave them.
  If a comparison would help, tell them to check it themselves.
- If the user attached data (CSV/text): first count the rows and add up the totals carefully, then show those
  totals so the user can check them. Base every number on that data and name the columns you used.
  If the data is missing something (dates, cost/profit, stock), say exactly which column to add — do not guess it.
- If the message contains "CHECKED FACTS", those counts, totals and rankings are exact: use them as given.
- Do not promise a specific extra profit or sales figure ("you will earn ₹7,000 more") unless it is worked out
  from the user's own numbers, with the working shown.
- Do the maths step by step; round money to whole rupees.
- Suggest offers that protect margin. Avoid giveaways like "buy 2 get 1 free" on low-margin staples
  (rice, oil, sugar, dal) unless the user's numbers show it is affordable.
- Without cost price or margin data you do NOT know which item is profitable — say so before suggesting any
  discount or free item, and ask for the cost price.
- If you are not sure, say so plainly. Do not guess laws, tax rates or deadlines; tell them to confirm with their
  CA / auditor or the official site.

SAFETY AND COMPLIANCE CHECKS (always follow)
- GST, income tax, loans, legal notices: give general guidance only and advise confirming with a CA or lawyer.
- Medical shops and clinics: never suggest medicines, doses or cures, and no "guaranteed cure" claims in ads.
  Prescription medicines must not be advertised. Point health questions to a doctor.
- Marketing: no false claims, fake discounts, fake reviews or copying competitors' brand names.
  Bulk WhatsApp/SMS only to customers who agreed to receive messages; include a way to stop messages.
- Never ask for or repeat passwords, OTPs, full card numbers, Aadhaar or bank account numbers.
  If the user shares them, tell them to remove them.
- Refuse anything illegal, harmful or deceptive (e.g. adulteration, tax evasion, harassment of borrowers),
  and offer an honest alternative.

If the request is unclear, give your best useful answer first, then ask at most two short questions to improve it.`;
}

/* For the language button: turn an answer already on the page into the other language. */
export function translatePrompt(lang: "te" | "en") {
  const target = lang === "te"
    ? `simple spoken Telugu (Telugu script), the way shop owners in Andhra Pradesh and Telangana talk. Keep everyday
English business words people use — customer, stock, offer, bill, rate, profit, GST, WhatsApp, UPI — in English letters`
    : "simple, clear Indian English";
  return `You translate business answers for TIC AI's Vyapar GPT. Translate the user's text into ${target}.
Rules:
- Output ONLY the translation — no preface, no notes, no quotation marks around it.
- Keep exactly the same structure: headings, numbered lists, bullets, bold (**…**), blank lines and separators.
- Keep every number, ₹ amount, date, percentage, phone number, name, brand, product and file name exactly as written.
- Keep placeholders in square brackets like [Customer Name] — translate only the words inside them.
- Do not add, remove or change any advice. If part of the text is already in the target language, keep it as it is.`;
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

/* Friendly errors the page can show, in both languages. */
export const ERRORS = {
  notConfigured: {
    en: "Vyapar GPT answers are not switched on yet. You can still copy the prompt and use ChatGPT.",
    te: "Vyapar GPT సమాధానాలు ఇంకా on చేయలేదు. Prompt copy చేసి ChatGPT లో వాడుకోవచ్చు.",
  },
  notSignedIn: {
    en: "Please log in again to use Vyapar GPT.",
    te: "Vyapar GPT వాడటానికి మళ్ళీ login అవ్వండి.",
  },
  tooMany: {
    en: "You have asked a lot in the last hour. Please wait a little and try again.",
    te: "గత గంటలో చాలా ప్రశ్నలు అడిగారు. కాసేపు ఆగి మళ్ళీ ప్రయత్నించండి.",
  },
  tooLong: {
    en: "That is too long. Shorten the question or attach a smaller file.",
    te: "ఇది చాలా పెద్దగా ఉంది. ప్రశ్న చిన్నది చేయండి లేదా చిన్న file పెట్టండి.",
  },
  busy: {
    en: "Sarvam AI is busy right now. Please try again in a minute.",
    te: "Sarvam AI ఇప్పుడు busy గా ఉంది. ఒక నిమిషం తర్వాత మళ్ళీ ప్రయత్నించండి.",
  },
  failed: {
    en: "Could not get an answer. Please try again.",
    te: "సమాధానం రాలేదు. మళ్ళీ ప్రయత్నించండి.",
  },
  sensitive: {
    en: "Please remove passwords, OTPs, card, Aadhaar or bank account numbers before asking.",
    te: "అడిగే ముందు password, OTP, card, Aadhaar లేదా bank account నంబర్లు తీసేయండి.",
  },
} as const;

/* Very likely secrets: Aadhaar (12 digits), card numbers (13–19 digits), OTP/password lines. */
export function looksSensitive(text: string) {
  const digits = text.replace(/[ -]/g, "");
  if (/(?<!\d)\d{12}(?!\d)/.test(digits) && /aadhaar|aadhar|ఆధార్/i.test(text)) return true;
  if (/(?<!\d)(?:\d{13,19})(?!\d)/.test(digits) && /card|కార్డ్|debit|credit/i.test(text)) return true;
  if (/\b(otp|password|passcode|upi pin)\b\s*(?:[:=]|is)\s*\S{4,}/i.test(text)) return true;
  return false;
}

/* ---------------------------------------------------------------- data facts
 * Language models are weak at counting and adding. For CSV/TSV files we work the basic
 * numbers out here, exactly, and give them to the model as facts to use. */

function splitRow(line: string, sep: string) {
  const out: string[] = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === sep && !q) { out.push(cur.trim()); cur = ""; }
    else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

const num = (s: string) => {
  const v = s.replace(/[₹,\s]|rs\.?|inr/gi, "");
  return /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : NaN;
};
const fmt = (n: number) => (Number.isInteger(n) ? n : Math.round(n * 100) / 100).toLocaleString("en-IN");

export function csvFacts(name: string, text: string): string {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return "";
  const sep = (lines[0].match(/\t/g) || []).length > (lines[0].match(/,/g) || []).length ? "\t"
            : (lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length ? ";" : ",";
  const head = splitRow(lines[0], sep);
  const rows = lines.slice(1).map((l) => splitRow(l, sep)).filter((r) => r.some((c) => c));
  if (head.length < 2 || rows.length === 0) return "";

  const numeric = head.map((_, c) => {
    const vals = rows.map((r) => num(r[c] ?? ""));
    const ok = vals.filter((v) => !Number.isNaN(v));
    return ok.length >= Math.max(1, rows.length * 0.8) ? vals : null;
  });
  const labelCol = head.findIndex((_, c) => !numeric[c]);
  const label = (r: string[]) => (labelCol >= 0 ? r[labelCol] : r[0]) || "(blank)";

  const out: string[] = [];
  out.push(`File "${name}": ${rows.length} data rows (not counting the header).`);
  out.push(`Columns: ${head.join(" | ")}`);
  const empties = head.filter((_, c) => rows.every((r) => !(r[c] ?? "").trim()));
  if (empties.length) out.push(`Completely empty columns: ${empties.join(", ")}`);
  head.forEach((h, c) => {
    const vals = numeric[c];
    if (!vals) return;
    const ok = vals.filter((v) => !Number.isNaN(v));
    const sum = ok.reduce((a, b) => a + b, 0);
    out.push(`Column "${h}": total ${fmt(sum)}, average ${fmt(sum / ok.length)}, lowest ${fmt(Math.min(...ok))}, highest ${fmt(Math.max(...ok))}.`);
    const ranked = rows.map((r, i) => ({ l: label(r), v: vals[i] })).filter((x) => !Number.isNaN(x.v)).sort((a, b) => b.v - a.v);
    const top = ranked.slice(0, 10).map((x, i) => `${i + 1}. ${x.l} = ${fmt(x.v)}`).join("; ");
    out.push(`  Ranked by "${h}" (highest first): ${top}${ranked.length > 10 ? "; …" : ""}`);
    if (ranked.length > 3) {
      const bottom = ranked.slice(-3).reverse().map((x) => `${x.l} = ${fmt(x.v)}`).join("; ");
      out.push(`  Lowest by "${h}": ${bottom}`);
    }
  });
  const has = (re: RegExp) => head.some((h) => re.test(h));
  const missing: string[] = [];
  if (!has(/date|day|month|week|తేదీ|నెల/i)) missing.push("date (so trends by week/month cannot be worked out)");
  if (!has(/cost|purchase|profit|margin|లాభం/i)) missing.push("cost price or profit (so profit cannot be worked out)");
  if (!has(/stock|closing|balance|qty_in_hand|స్టాక్/i)) missing.push("stock in hand (so dead stock cannot be worked out)");
  if (missing.length) out.push(`This file has NO column for: ${missing.join("; ")}.`);
  return out.join("\n");
}
