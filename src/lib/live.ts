/* Live session recordings — stored in the Supabase table `live_sessions`
 * (see supabase/live_sessions.sql). Mastermind members can watch; admins add / delete. */
import { supabase } from "./auth";
import { parseVideoLink } from "./video";

export type LiveKind = "live" | "qna";

export type LiveSession = {
  id: string;
  title: string;
  title_te: string | null;
  kind: LiveKind;
  session_date: string;          // ISO
  video_url: string | null;      // empty → upcoming
  join_url: string | null;
  duration_min: number | null;
};

export async function listLiveSessions(): Promise<{ rows: LiveSession[]; error?: string }> {
  const sb = supabase();
  if (!sb) return { rows: [] };
  const { data, error } = await sb.from("live_sessions").select("*").order("session_date", { ascending: false });
  if (error) return { rows: [], error: error.message };
  return { rows: (data ?? []) as LiveSession[] };
}

export async function addLiveSession(row: Omit<LiveSession, "id">) {
  const sb = supabase();
  if (!sb) return { error: "not configured" };
  const { error } = await sb.from("live_sessions").insert(row);
  return { error: error?.message };
}

export async function deleteLiveSession(id: string) {
  const sb = supabase();
  if (!sb) return { error: "not configured" };
  const { error } = await sb.from("live_sessions").delete().eq("id", id);
  return { error: error?.message };
}

/* What the player should do with a link. */
export type Playable =
  | { type: "iframe"; src: string }
  | { type: "video"; src: string }
  | { type: "external"; href: string };

export function playable(link: string): Playable | null {
  const url = link.trim();
  if (!url) return null;
  // Google Drive: the file must be shared "Anyone with the link".
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/);
  if (drive) return { type: "iframe", src: `https://drive.google.com/file/d/${drive[1]}/preview` };
  const v = parseVideoLink(url);
  if (!v) return null;
  if (v.kind === "youtube") return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1` };
  if (v.kind === "vimeo") return { type: "iframe", src: `https://player.vimeo.com/video/${v.id}?autoplay=1` };
  if (v.kind === "mp4") return { type: "video", src: v.url };
  return { type: "external", href: v.url };      // Zoom / Zoho pages can't be embedded
}

export function thumbnail(link: string | null): string | null {
  if (!link) return null;
  const v = parseVideoLink(link);
  return v?.kind === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null;
}
