import type { VideoSource } from "./types";

/** Build the embed URL for an inline-playable source. Zoom is excluded on
 *  purpose: Zoom's recording pages send X-Frame-Options and refuse to load
 *  in an iframe, so those lessons link out instead. */
export function embedUrl(video: VideoSource): string | null {
  switch (video.kind) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&cc_load_policy=1`;
    case "vimeo":
      return `https://player.vimeo.com/video/${video.id}?title=0&byline=0&portrait=0`;
    case "mp4":
      return video.url;
    case "zoom":
      return null;
  }
}

export function posterUrl(video: VideoSource): string | null {
  if (video.kind === "youtube") return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  if (video.kind === "mp4") return video.poster ?? null;
  return null;
}

/** Pull a video source out of a pasted link. Powers the /admin helper so
 *  adding a recording is paste-and-copy rather than hand-written JSON. */
export function parseVideoLink(raw: string): VideoSource | null {
  const url = raw.trim();
  if (!url) return null;

  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([\w-]{11})/) ??
    url.match(/^([\w-]{11})$/);
  if (yt) return { kind: "youtube", id: yt[1] };

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", id: vimeo[1] };

  if (/zoom\.(us|com)\/rec\//.test(url)) return { kind: "zoom", url };

  if (/\.(mp4|m4v|webm|mov)(\?|$)/i.test(url)) return { kind: "mp4", url };

  return null;
}

export const VIDEO_HOST_LABEL: Record<VideoSource["kind"], string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  mp4: "Direct MP4",
  zoom: "Zoom recording",
};
