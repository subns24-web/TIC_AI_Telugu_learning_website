"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/lang";
import {
  addLiveSession, deleteLiveSession, listLiveSessions, playable,
  type LiveKind, type LiveSession,
} from "@/lib/live";
import { Button } from "@/components/ui/Bits";

/* Live sessions — the recorded-sessions library (TICAI Mastermind). Recordings are rows in the
 * Supabase table `live_sessions`; admins add them with the form on this page. */

type Filter = "all" | LiveKind;

const fmtDate = (iso: string, lang: "te" | "en") =>
  new Date(iso).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmtWhen = (iso: string, lang: "te" | "en") =>
  new Date(iso).toLocaleString(lang === "te" ? "te-IN" : "en-IN", {
    weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata",
  }) + " IST";

export default function LivePage() {
  const { t, lang } = useLang();
  const { isAdmin, ready } = useAuth();
  const [rows, setRows] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<LiveSession | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { rows, error } = await listLiveSessions();
    setRows(rows);
    setLoadError(error ?? "");
    setLoading(false);
  }, []);
  useEffect(() => { if (ready) load(); }, [ready, load]);

  const now = Date.now();
  const recorded = rows.filter((r) => r.video_url);
  const upcoming = rows
    .filter((r) => !r.video_url && new Date(r.session_date).getTime() > now - 3 * 3600_000)
    .sort((a, b) => a.session_date.localeCompare(b.session_date))[0];
  const since = recorded.length ? recorded[recorded.length - 1].session_date : null;
  const count = (k: Filter) => (k === "all" ? recorded.length : recorded.filter((r) => r.kind === k).length);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return recorded
      .filter((r) => filter === "all" || r.kind === filter)
      .filter((r) => !s || r.title.toLowerCase().includes(s) || (r.title_te ?? "").includes(q.trim()));
  }, [recorded, filter, q]);

  const title = (r: LiveSession) => (lang === "te" && r.title_te ? r.title_te : r.title);
  const titleLang = (r: LiveSession) => (lang === "te" && r.title_te ? "te" : "en");

  return (
    <div className="container-tic py-12 md:py-16">
      {/* ------------------------------------------------ header */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 lang={lang} className="font-telugu text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            {t("Live Learning", "Live లెర్నింగ్")}
          </h1>
          <p lang={lang} className="mt-2 text-lg font-semibold text-gold-700">
            {t("Recorded sessions library", "రికార్డ్ చేసిన సెషన్ల లైబ్రరీ")}
          </p>
          <p lang={lang} className="mt-3 max-w-xl font-telugu leading-relaxed text-ink-500">
            {t("Watch all past live sessions and Q&A calls — anytime, anywhere.",
               "గత live సెషన్లు, Q&A calls అన్నీ — ఎప్పుడైనా, ఎక్కడైనా చూడండి.")}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-100 text-xl" aria-hidden="true">🎥</span>
              <div>
                <p className="text-2xl font-bold text-ink-900">{recorded.length}</p>
                <p lang={lang} className="text-sm text-ink-500">{t("Sessions recorded", "రికార్డ్ అయిన సెషన్లు")}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-100 text-xl" aria-hidden="true">📅</span>
              <div>
                <p className="text-2xl font-bold text-ink-900">
                  {since ? new Date(since).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { month: "short", year: "numeric" }) : "—"}
                </p>
                <p lang={lang} className="text-sm text-ink-500">{t("Recording since", "రికార్డింగ్ మొదలైనది")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* upcoming */}
        <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-6 text-white">
          <div className="absolute inset-0 grid-ink opacity-40" />
          <div className="relative flex h-full flex-col">
            <p lang={lang} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-300">
              <span className="h-2 w-2 rounded-full bg-rose-400" /> {t("Upcoming live session", "రాబోయే live సెషన్")}
            </p>
            {upcoming ? (
              <>
                <p lang={titleLang(upcoming)} className="mt-3 font-telugu text-xl font-bold leading-snug">{title(upcoming)}</p>
                <p lang={lang} className="mt-1 text-sm text-ink-300">{fmtWhen(upcoming.session_date, lang)}</p>
                <div className="mt-auto pt-5">
                  {upcoming.join_url ? (
                    <a href={upcoming.join_url} target="_blank" rel="noopener noreferrer" lang={lang}
                      className="btn-gold focus-ring flex min-h-12 items-center justify-center rounded-xl px-4 text-center text-sm font-semibold">
                      {t("Join the live session", "Live సెషన్ లో join అవ్వండి")} ↗
                    </a>
                  ) : (
                    <p lang={lang} className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-gold-200">
                      {t("Session starts at", "సెషన్ మొదలయ్యే సమయం")} {fmtWhen(upcoming.session_date, lang)}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p lang={lang} className="mt-3 font-telugu leading-relaxed text-ink-300">
                {t("The next live session will be announced here and in the WhatsApp community.",
                   "తదుపరి live సెషన్ ఇక్కడ, WhatsApp community లో ప్రకటిస్తాం.")}
              </p>
            )}
          </div>
        </div>
      </div>

      {isAdmin && <AdminForm onAdded={load} />}

      {/* ------------------------------------------------ library */}
      <section className="card mt-10 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          {([
            ["all", "All", "అన్నీ"],
            ["live", "Live sessions", "Live సెషన్లు"],
            ["qna", "Q&A sessions", "Q&A సెషన్లు"],
          ] as const).map(([k, en, te]) => (
            <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k} lang={lang}
              className={`focus-ring rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                filter === k ? "bg-ink-900 text-white" : "border border-ink-900/12 bg-white text-ink-700 hover:border-gold-400"}`}>
              {t(en, te)} ({count(k)})
            </button>
          ))}
          <div className="relative min-w-[14rem] flex-1">
            <input value={q} onChange={(e) => setQ(e.target.value)} lang={lang}
              placeholder={t("Search sessions by title…", "సెషన్ పేరుతో వెతకండి…")}
              className="focus-ring w-full rounded-xl border border-ink-900/12 bg-white px-4 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400" />
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true">🔍</span>
          </div>
          <span lang={lang} className="text-sm text-ink-500">{shown.length} {t("results", "ఫలితాలు")}</span>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-ink-900/5" />)}
          </div>
        ) : loadError ? (
          <p lang={lang} className="mt-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-800">
            {t("Could not load the recordings. Please refresh the page.", "రికార్డింగ్స్ లోడ్ కాలేదు. Page refresh చేయండి.")}
            {isAdmin && <span className="mt-1 block text-xs text-rose-600">({loadError})</span>}
          </p>
        ) : shown.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-ink-900/10 p-10 text-center">
            <p className="text-3xl" aria-hidden="true">🎬</p>
            <p lang={lang} className="mt-3 font-telugu font-semibold text-ink-900">
              {recorded.length === 0 ? t("No recordings yet", "ఇంకా రికార్డింగ్స్ లేవు") : t("No sessions match", "సరిపోయే సెషన్లు లేవు")}
            </p>
            <p lang={lang} className="mt-1 font-telugu text-sm text-ink-500">
              {recorded.length === 0
                ? t("Recordings of live sessions will appear here after each session.", "ప్రతి live సెషన్ తర్వాత దాని రికార్డింగ్ ఇక్కడ కనిపిస్తుంది.")
                : t("Try another word or filter.", "వేరే పదం లేదా filter ప్రయత్నించండి.")}
            </p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((r) => {
              return (
                <li key={r.id} className="relative">
                  <button type="button" onClick={() => setPlaying(r)}
                    className="card card-hover focus-ring flex h-full w-full flex-col overflow-hidden text-left">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-900 text-gold-300">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 001.52.85l10.6-6.8a1 1 0 000-1.7L9.52 4.35A1 1 0 008 5.2z" /></svg>
                        </span>
                        <span lang={lang} className="text-sm font-medium text-ink-500">{fmtDate(r.session_date, lang)}</span>
                      </div>
                      <p lang={titleLang(r)} className="mt-4 font-telugu text-[1.05rem] font-bold leading-snug text-ink-900">{title(r)}</p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <span lang={lang} className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[0.7rem] font-semibold text-gold-800">
                          {r.kind === "qna" ? t("Q&A session", "Q&A సెషన్") : t("Live session", "Live సెషన్")}
                        </span>
                        {r.duration_min ? (
                          <span lang={lang} className="rounded-full bg-ink-900/6 px-2.5 py-0.5 text-[0.7rem] font-semibold text-ink-600">
                            {r.duration_min} {t("min", "నిమి")}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                  {isAdmin && (
                    <button type="button" lang={lang}
                      onClick={async () => {
                        if (!window.confirm(t(`Delete "${r.title}"?`, `"${r.title}" తీసేయాలా?`))) return;
                        const { error } = await deleteLiveSession(r.id);
                        if (error) window.alert(error); else load();
                      }}
                      className="focus-ring absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-rose-700 shadow ring-1 ring-rose-200 hover:bg-rose-50">
                      {t("Delete", "తీసేయండి")}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {playing && <Player session={playing} onClose={() => setPlaying(null)} title={title(playing)} titleLang={titleLang(playing)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ player */
function Player({ session, title, titleLang, onClose }: { session: LiveSession; title: string; titleLang: string; onClose: () => void }) {
  const { t, lang } = useLang();
  const p = playable(session.video_url ?? "");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink-950/80 p-3 sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p lang={titleLang} className="font-telugu text-lg font-bold text-white">{title}</p>
          <button type="button" onClick={onClose} autoFocus lang={lang}
            className="focus-ring shrink-0 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
            ✕ {t("Close", "మూసివేయండి")}
          </button>
        </div>
        {!p ? (
          <p lang={lang} className="rounded-2xl bg-white p-8 text-center text-ink-700">{t("This video link can't be played.", "ఈ video link ప్లే కాదు.")}</p>
        ) : p.type === "iframe" ? (
          <iframe src={p.src} title={title} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen
            className="aspect-video w-full rounded-2xl bg-black" />
        ) : p.type === "video" ? (
          <video src={p.src} controls autoPlay playsInline className="aspect-video w-full rounded-2xl bg-black" />
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center">
            <p lang={lang} className="text-ink-700">{t("This recording opens on its own site.", "ఈ రికార్డింగ్ దాని site లో తెరుచుకుంటుంది.")}</p>
            <a href={p.href} target="_blank" rel="noopener noreferrer" lang={lang}
              className="btn-gold focus-ring mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold">
              {t("Open the recording", "రికార్డింగ్ తెరవండి")} ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ admin form */
function AdminForm({ onAdded }: { onAdded: () => void }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [kind, setKind] = useState<LiveKind>("live");
  const [when, setWhen] = useState("");
  const [link, setLink] = useState("");
  const [join, setJoin] = useState("");
  const [mins, setMins] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const p = link.trim() ? playable(link) : null;
  const linkProblem = link.trim() && !p
    ? t("This link isn't a YouTube, Google Drive, Vimeo or .mp4 link.", "ఇది YouTube, Google Drive, Vimeo లేదా .mp4 link కాదు.")
    : p?.type === "external" ? t("Zoom/Zoho pages can't play inside the site — it will open in a new tab. Better: upload to YouTube (Unlisted).", "Zoom/Zoho pages site లో ప్లే కావు — కొత్త tab లో తెరుచుకుంటుంది. YouTube (Unlisted) లో upload చేయడం మంచిది.")
    : "";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !when) return;
    setBusy(true); setMsg(null);
    // datetime-local is in the admin's local time (India) → store as a real moment.
    const { error } = await addLiveSession({
      title: title.trim(), title_te: titleTe.trim() || null, kind,
      session_date: new Date(when).toISOString(),
      video_url: link.trim() || null, join_url: join.trim() || null,
      duration_min: Number(mins) || null,
    });
    setBusy(false);
    if (error) { setMsg({ ok: false, text: error }); return; }
    setMsg({ ok: true, text: link.trim() ? t("Recording added ✓", "రికార్డింగ్ జోడించాం ✓") : t("Upcoming session added ✓", "రాబోయే సెషన్ జోడించాం ✓") });
    setTitle(""); setTitleTe(""); setLink(""); setJoin(""); setMins("");
    onAdded();
  }

  const field = "focus-ring mt-1.5 w-full rounded-xl border border-ink-900/12 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400";
  const label = "block text-xs font-semibold uppercase tracking-[0.1em] text-ink-500";

  return (
    <section className="mt-10 rounded-2xl border border-teal-200 bg-teal-50/50 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p lang={lang} className="font-telugu font-bold text-ink-900">
          🛠 {t("Admin: add a recording or an upcoming session", "Admin: రికార్డింగ్ లేదా రాబోయే సెషన్ జోడించండి")}
        </p>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)} lang={lang}>
          {open ? t("Hide", "దాచు") : t("Add", "జోడించండి")}
        </Button>
      </div>
      {open && (
        <form onSubmit={save} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2"><span lang={lang} className={label}>{t("Title (English) *", "పేరు (English) *")}</span>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="Website Building & AI SEO Session" /></label>
          <label className="sm:col-span-2"><span lang={lang} className={label}>{t("Title (Telugu, optional)", "పేరు (తెలుగు, ఐచ్ఛికం)")}</span>
            <input value={titleTe} onChange={(e) => setTitleTe(e.target.value)} lang="te" className={field} placeholder="వెబ్‌సైట్ బిల్డింగ్ & AI SEO సెషన్" /></label>
          <label><span lang={lang} className={label}>{t("Type", "రకం")}</span>
            <select value={kind} onChange={(e) => setKind(e.target.value as LiveKind)} className={field} lang={lang}>
              <option value="live">{t("Live session", "Live సెషన్")}</option>
              <option value="qna">{t("Q&A session", "Q&A సెషన్")}</option>
            </select></label>
          <label><span lang={lang} className={label}>{t("Date & time (IST) *", "తేదీ & సమయం (IST) *")}</span>
            <input required type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className={field} /></label>
          <label className="sm:col-span-2"><span lang={lang} className={label}>{t("Video link — leave empty for an upcoming session", "Video link — రాబోయే సెషన్ అయితే ఖాళీగా ఉంచండి")}</span>
            <input value={link} onChange={(e) => setLink(e.target.value)} className={field} placeholder="https://youtu.be/…  or  https://drive.google.com/file/d/…" />
            {linkProblem && <span lang={lang} className="mt-1 block text-xs text-rose-700">{linkProblem}</span>}
            {p && p.type !== "external" && <span lang={lang} className="mt-1 block text-xs text-teal-700">✓ {t("Plays inside the site", "Site లోనే ప్లే అవుతుంది")}</span>}</label>
          <label><span lang={lang} className={label}>{t("Join link (upcoming only)", "Join link (రాబోయే సెషన్ కి)")}</span>
            <input value={join} onChange={(e) => setJoin(e.target.value)} className={field} placeholder="https://meeting.zoho.in/…" /></label>
          <label><span lang={lang} className={label}>{t("Length (minutes)", "నిడివి (నిమిషాలు)")}</span>
            <input type="number" min="0" value={mins} onChange={(e) => setMins(e.target.value)} className={field} placeholder="90" /></label>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={busy || !!(link.trim() && !p)} lang={lang}>
              {busy ? t("Saving…", "సేవ్ చేస్తున్నాం…") : t("Save", "సేవ్ చేయండి")}
            </Button>
            {msg && <span lang={lang} role="status" className={`text-sm ${msg.ok ? "text-teal-700" : "text-rose-700"}`}>{msg.text}</span>}
          </div>
        </form>
      )}
    </section>
  );
}
