import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-config";
import {
  ERRORS, LIMITS, SARVAM_MODEL, SARVAM_URL, csvFacts, looksSensitive, systemPrompt, type ChatMessage,
} from "@/lib/sarvam";

/* POST /api/vyapar — Vyapar GPT answers, from Sarvam AI.
 *
 * Checks, in order:
 *  1. Sarvam is configured (SARVAM_API_KEY on Vercel).
 *  2. A logged-in TIC-AI student is asking (Supabase checks their token).
 *  3. Per-student limit per hour.
 *  4. Input shape and size; no passwords / OTPs / card or Aadhaar numbers.
 *  5. Sarvam's own errors become plain-language messages.
 * The answer streams back as plain text so the page can show it while it is written.
 * The last line may be "\n[[TRUNCATED]]" when the answer hit the length limit, or "[[ERROR]]"
 * when Sarvam stopped without (or part-way through) an answer. */

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = { messages?: unknown; files?: unknown; lang?: unknown };

const hits = new Map<string, number[]>();   // user id → request times (this server instance)

function fail(key: keyof typeof ERRORS, lang: "te" | "en", status: number) {
  return Response.json({ error: ERRORS[key][lang], code: key }, { status });
}

export async function POST(request: Request) {
  let body: Body;
  try { body = (await request.json()) as Body; } catch { body = {}; }
  const lang: "te" | "en" = body.lang === "en" ? "en" : "te";

  // 1. configured?
  const key = process.env.SARVAM_API_KEY;
  if (!key) return fail("notConfigured", lang, 503);

  // 2. who is asking?
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return fail("notSignedIn", lang, 401);
  let userId = "";
  // Local testing only (never on Vercel): skip the Supabase check.
  const devSkip = process.env.NODE_ENV === "development" && process.env.VYAPAR_DEV_SKIP_AUTH === "1";
  if (devSkip) userId = "dev";
  else try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return fail("notSignedIn", lang, 401);
    userId = ((await res.json()) as { id?: string }).id || "";
  } catch {
    return fail("failed", lang, 502);
  }
  if (!userId) return fail("notSignedIn", lang, 401);

  // 3. rate limit
  const now = Date.now();
  const recent = (hits.get(userId) || []).filter((t) => now - t < 3_600_000);
  if (recent.length >= LIMITS.perUserPerHour) return fail("tooMany", lang, 429);
  recent.push(now);
  hits.set(userId, recent);

  // 4. validate input
  if (!Array.isArray(body.messages) || body.messages.length === 0) return fail("failed", lang, 400);
  const messages: ChatMessage[] = [];
  for (const m of body.messages.slice(-LIMITS.turns)) {
    const role = (m as ChatMessage)?.role;
    const content = (m as ChatMessage)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) {
      return fail("failed", lang, 400);
    }
    messages.push({ role, content });
  }
  if (messages[messages.length - 1].role !== "user") return fail("failed", lang, 400);
  // The first question is the built prompt (long); later questions are short follow-ups.
  const firstUser = messages.findIndex((m) => m.role === "user");
  for (const [i, m] of messages.entries()) {
    if (m.role !== "user") continue;
    const max = i === firstUser ? LIMITS.promptChars : LIMITS.messageChars;
    if (m.content.length > max) return fail("tooLong", lang, 413);
    if (looksSensitive(m.content)) return fail("sensitive", lang, 422);
  }

  // Attached text files (CSV, TXT) go in with the first question.
  let fileText = "";
  let facts = "";
  if (Array.isArray(body.files)) {
    for (const f of body.files) {
      const name = String((f as { name?: unknown })?.name || "file").slice(0, 120);
      const text = String((f as { text?: unknown })?.text || "");
      if (!text.trim()) continue;
      fileText += `\n\n--- File: ${name} ---\n${text}`;
      if (/\.(csv|tsv)$/i.test(name)) facts += `\n${csvFacts(name, text)}`;
    }
  }
  if (fileText.length > LIMITS.fileChars) return fail("tooLong", lang, 413);
  if (fileText && looksSensitive(fileText)) return fail("sensitive", lang, 422);
  if (fileText) {
    messages[firstUser] = {
      role: "user",
      content: `${messages[firstUser].content}\n\nAttached data (use only this for any numbers):${fileText}` +
        (facts.trim()
          ? `\n\nCHECKED FACTS — worked out exactly by the TIC-AI system from the file. Use these numbers as they are; ` +
            `do not recount or recalculate them, and do not contradict them:${facts}`
          : ""),
    };
  }

  // 5. ask Sarvam
  let upstream: Response;
  try {
    upstream = await fetch(SARVAM_URL, {
      method: "POST",
      headers: { "api-subscription-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: SARVAM_MODEL,
        messages: [{ role: "system", content: systemPrompt(lang) }, ...messages],
        stream: true,
        // Straight answers: fast (~5 s), and the whole token budget goes to the reply.
        // (Thinking mode was tried: slower and often failed upstream.)
        reasoning_effort: null,
        temperature: 0.3,
        max_tokens: LIMITS.maxTokens,
      }),
    });
  } catch (err) {
    console.error("sarvam fetch failed:", err);
    return fail("busy", lang, 502);
  }
  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("sarvam error", upstream.status, detail.slice(0, 500));
    if (upstream.status === 403 || upstream.status === 401) return fail("notConfigured", lang, 503);
    if (upstream.status === 429 || upstream.status === 503) return fail("busy", lang, 503);
    if (upstream.status === 400 && /context|token/i.test(detail)) return fail("tooLong", lang, 413);
    return fail("failed", lang, 502);
  }

  // Turn Sarvam's server-sent events into plain text for the page.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      let finish = "";
      let sent = 0;
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const data = line.replace(/^data:\s?/, "").trim();
            if (!line.startsWith("data:") || !data || data === "[DONE]") continue;
            try {
              const chunk = JSON.parse(data);
              const choice = chunk.choices?.[0];
              const text: string = choice?.delta?.content || "";
              if (choice?.finish_reason) finish = choice.finish_reason;
              if (text) { sent += text.length; controller.enqueue(encoder.encode(text)); }
            } catch { /* ignore a malformed line */ }
          }
        }
        if (!sent) controller.enqueue(encoder.encode("[[ERROR]]"));
        if (finish === "length") controller.enqueue(encoder.encode("\n[[TRUNCATED]]"));
      } catch (err) {
        console.error("sarvam stream broke:", err);
        controller.enqueue(encoder.encode("\n[[ERROR]]"));
      } finally {
        controller.close();
      }
    },
    cancel() { reader.cancel().catch(() => {}); },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
