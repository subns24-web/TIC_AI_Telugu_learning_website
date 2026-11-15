"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/Bits";
import type { Attachment } from "./ReferenceFiles";

/* "Ask Vyapar GPT" — sends the finished prompt to /api/vyapar (Sarvam AI) and shows the
 * answer here as it is written. Follow-up questions continue the same conversation. */

type Msg = { role: "user" | "assistant"; content: string };
const TRUNC = "\n[[TRUNCATED]]";

/* Just enough Markdown for readable answers: headings, bold, bullets, numbered lists. */
function Rich({ text }: { text: string }) {
  const inline = (s: string, k: string) =>
    s.replace(/`([^`]+)`/g, "$1").split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4
        ? <strong key={`${k}-${i}`} className="font-semibold text-ink-900">{part.slice(2, -2)}</strong>
        : part,
    );
  return (
    <div className="space-y-1.5">
      {text.split("\n").map((line, i) => {
        const h = line.match(/^#{1,4}\s+(.*)/);
        if (h) return <p key={i} className="pt-2 font-bold text-ink-900">{inline(h[1], String(i))}</p>;
        const b = line.match(/^\s*[-*•]\s+(.*)/);
        if (b) return <p key={i} className="flex gap-2 pl-1"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" /><span>{inline(b[1], String(i))}</span></p>;
        if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) return <hr key={i} className="my-2 border-ink-900/10" />;
        if (!line.trim()) return <div key={i} className="h-1" />;
        return <p key={i}>{inline(line, String(i))}</p>;
      })}
    </div>
  );
}

export function AskVyapar({
  prompt,
  attachments,
  ready,
}: {
  prompt: string;
  attachments: Attachment[];
  ready: boolean;          // all required fields filled
}) {
  const { t, lang } = useLang();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [copied, setCopied] = useState(-1);
  const abort = useRef<AbortController | null>(null);

  const textFiles = attachments.filter((a) => a.text);
  const otherFiles = attachments.filter((a) => !a.text);

  async function send(history: Msg[]) {
    setError(""); setBusy(true);
    setMsgs([...history, { role: "assistant", content: "" }]);
    const ctrl = new AbortController();
    abort.current = ctrl;
    try {
      const { data } = (await supabase()?.auth.getSession()) ?? { data: { session: null } };
      const token = data.session?.access_token;
      const res = await fetch("/api/vyapar", {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          lang,
          // The model never sees our "[[TRUNCATED]]" marker.
          messages: history.map((m) => ({ ...m, content: m.content.replace(TRUNC, "") })),
          files: textFiles.map((f) => ({ name: f.name, text: f.text })),
        }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error((j as { error?: string }).error || t("Could not get an answer. Please try again.", "సమాధానం రాలేదు. మళ్ళీ ప్రయత్నించండి."));
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let answer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += dec.decode(value, { stream: true });
        setMsgs([...history, { role: "assistant", content: answer.replace(/\n?\[\[ERROR\]\]$/, "") }]);
      }
      if (answer.endsWith("[[ERROR]]")) {
        const partial = answer.replace(/\n?\[\[ERROR\]\]$/, "").trim();
        if (!partial) setMsgs(history.length > 1 ? history : []);
        throw new Error(t("Sarvam AI could not finish the answer. Please try again.",
                          "Sarvam AI సమాధానం పూర్తి చేయలేకపోయింది. మళ్ళీ ప్రయత్నించండి."));
      }
    } catch (e) {
      const stopped = (e as Error).name === "AbortError";
      setMsgs((m) => {
        const last = m[m.length - 1];
        return last?.role === "assistant" && !last.content ? m.slice(0, -1) : m;
      });
      if (!stopped) setError((e as Error).message || t("Could not get an answer.", "సమాధానం రాలేదు."));
    } finally {
      setBusy(false);
      abort.current = null;
    }
  }

  const start = () => send([{ role: "user", content: prompt }]);
  const ask = () => {
    const q = followUp.trim();
    if (!q || busy) return;
    setFollowUp("");
    send([...msgs, { role: "user", content: q }]);
  };
  const cont = () =>
    send([...msgs, { role: "user", content: lang === "te" ? "ఆగిన చోట నుంచి కొనసాగించండి." : "Continue from where you stopped." }]);

  const copy = async (i: number, text: string) => {
    try { await navigator.clipboard.writeText(text.replace(TRUNC, "")); setCopied(i); setTimeout(() => setCopied(-1), 2000); } catch { /* ignore */ }
  };

  const last = msgs[msgs.length - 1];
  const truncated = !busy && last?.role === "assistant" && last.content.endsWith(TRUNC);

  return (
    <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50/50 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-white">
          {t("New", "కొత్తది")}
        </span>
        <p lang={lang} className="font-telugu font-bold text-ink-900">
          {t("Get the answer right here", "సమాధానం ఇక్కడే పొందండి")}
        </p>
      </div>
      <p lang={lang} className="mt-1.5 font-telugu text-sm leading-relaxed text-ink-600">
        {t(
          "Vyapar GPT answers with Sarvam AI — an Indian AI that understands Telugu. No ChatGPT account needed.",
          "Vyapar GPT, Sarvam AI తో సమాధానం ఇస్తుంది — తెలుగు అర్థం చేసుకునే భారతీయ AI. ChatGPT account అవసరం లేదు.",
        )}
      </p>

      {(textFiles.length > 0 || otherFiles.length > 0) && msgs.length === 0 && (
        <ul lang={lang} className="mt-3 space-y-1 font-telugu text-xs text-ink-500">
          {textFiles.length > 0 && (
            <li>✅ {t("It will read:", "ఇది చదువుతుంది:")} {textFiles.map((f) => f.name).join(", ")}</li>
          )}
          {otherFiles.length > 0 && (
            <li>
              ⚠️ {t(
                "Photos, PDFs and Excel files can't be read here yet — save Excel as CSV, or use ChatGPT for photos:",
                "Photos, PDF, Excel ఇక్కడ ఇంకా చదవలేదు — Excel ని CSV గా save చేయండి, photos కి ChatGPT వాడండి:",
              )}{" "}
              {otherFiles.map((f) => f.name).join(", ")}
            </li>
          )}
        </ul>
      )}

      {msgs.length === 0 && (
        <Button size="lg" onClick={start} disabled={!ready || busy} lang={lang} className="mt-4 w-full sm:w-auto">
          ✨ {t("Ask Vyapar GPT", "Vyapar GPT ని అడగండి")}
        </Button>
      )}
      {!ready && msgs.length === 0 && (
        <p lang={lang} className="mt-2 font-telugu text-xs text-rose-700">
          {t("Fill the required fields above first.", "ముందు పైన అవసరమైన ఖాళీలు నింపండి.")}
        </p>
      )}

      {msgs.length > 0 && (
        <div className="mt-5 space-y-4">
          {msgs.map((m, i) =>
            i === 0 ? null : m.role === "user" ? (
              <div key={i} lang={lang} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-4 py-2.5 font-telugu text-sm text-white">
                {m.content}
              </div>
            ) : (
              <div key={i} className="card p-5" lang={lang}>
                {m.content ? (
                  <div className="font-telugu text-[0.95rem] leading-relaxed text-ink-700">
                    <Rich text={m.content.replace(TRUNC, "")} />
                  </div>
                ) : (
                  <p className="animate-pulse font-telugu text-sm text-ink-500">
                    {t("Vyapar GPT is thinking…", "Vyapar GPT ఆలోచిస్తోంది…")}
                  </p>
                )}
                {m.content && !(busy && i === msgs.length - 1) && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-900/8 pt-3">
                    <Button size="sm" variant="outline" onClick={() => copy(i, m.content)} lang={lang}>
                      {copied === i ? t("Copied ✓", "కాపీ అయింది ✓") : t("Copy answer", "సమాధానం కాపీ")}
                    </Button>
                  </div>
                )}
              </div>
            ),
          )}

          {busy && (
            <Button size="sm" variant="outline" onClick={() => abort.current?.abort()} lang={lang}>
              ■ {t("Stop", "ఆపండి")}
            </Button>
          )}
          {truncated && (
            <Button size="sm" variant="dark" onClick={cont} lang={lang}>
              {t("The answer was cut short — continue", "సమాధానం మధ్యలో ఆగింది — కొనసాగించండి")} →
            </Button>
          )}

          {!busy && (
            <div>
              <label htmlFor="vyapar-follow" lang={lang} className="font-telugu text-sm font-semibold text-ink-700">
                {t("Want changes? Ask here", "మార్పులు కావాలా? ఇక్కడ అడగండి")}
              </label>
              <div className="mt-2 flex gap-2">
                <textarea
                  id="vyapar-follow"
                  rows={2}
                  value={followUp}
                  maxLength={2000}
                  onChange={(e) => setFollowUp(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
                  lang={lang}
                  placeholder={t("e.g. Make it shorter, add a Diwali offer", "ఉదా: ఇంకా చిన్నగా చేయండి, దీపావళి offer జోడించండి")}
                  className="focus-ring w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 font-telugu text-ink-900 placeholder:text-ink-400"
                />
                <Button onClick={ask} disabled={!followUp.trim()} lang={lang} className="shrink-0 self-end">
                  {t("Send", "పంపండి")}
                </Button>
              </div>
              <button type="button" onClick={() => { setMsgs([]); setError(""); }} lang={lang}
                className="mt-3 text-xs font-medium text-ink-500 underline hover:text-ink-900">
                {t("Start over", "మళ్ళీ మొదటి నుంచి")}
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p role="alert" lang={lang} className="mt-4 rounded-xl bg-rose-50 p-3 font-telugu text-sm text-rose-800">{error}</p>
      )}

      <p lang={lang} className="mt-4 font-telugu text-[0.72rem] leading-relaxed text-ink-400">
        {t(
          "AI can make mistakes — check numbers, prices and anything about tax or law before you use it. Your question and any CSV/text files you attached are sent to Sarvam AI to get the answer; don't include passwords, OTPs, Aadhaar or bank details.",
          "AI తప్పులు చేయవచ్చు — నంబర్లు, రేట్లు, tax లేదా law విషయాలు వాడే ముందు చెక్ చేయండి. సమాధానం కోసం మీ ప్రశ్న, మీరు పెట్టిన CSV/text files Sarvam AI కి వెళ్తాయి; password, OTP, Aadhaar, bank వివరాలు పెట్టకండి.",
        )}
      </p>
    </div>
  );
}
