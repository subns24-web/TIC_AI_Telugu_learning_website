"use client";

import type { VideoSource } from "@/lib/types";
import { embedUrl, VIDEO_HOST_LABEL } from "@/lib/video";
import { useLang } from "@/lib/lang";
import { ButtonLink } from "@/components/ui/Bits";

export function VideoFrame({ video, title }: { video: VideoSource; title: string }) {
  const { t, lang } = useLang();
  const src = embedUrl(video);

  /* Zoom refuses to render inside an iframe, so the honest thing is to send
     people out to the recording rather than show them a broken black box. */
  if (video.kind === "zoom") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl bg-ink-950 p-8 text-center">
        <div className="absolute inset-0 grid-ink opacity-40" />
        <div className="relative">
          <p lang={lang} className="text-lg font-semibold text-white">
            {t("This lesson is a Zoom recording", "ఈ పాఠం ఒక Zoom రికార్డింగ్")}
          </p>
          <p lang={lang} className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-300">
            {t(
              "Zoom does not allow its recordings to play inside another site, so it opens in a new tab.",
              "Zoom తన రికార్డింగ్‌లను వేరే సైట్‌లో ప్లే కావడానికి అనుమతించదు, అందుకే కొత్త ట్యాబ్‌లో తెరుచుకుంటుంది.",
            )}
          </p>
          {video.passcode && (
            <p className="mt-4 inline-block rounded-lg bg-white/10 px-3 py-1.5 text-sm text-gold-200">
              <span lang={lang} className="text-ink-300">
                {t("Passcode", "పాస్‌కోడ్")}:{" "}
              </span>
              <code className="font-semibold">{video.passcode}</code>
            </p>
          )}
          <div className="mt-6">
            <ButtonLink href={video.url} target="_blank" rel="noopener noreferrer" lang={lang}>
              {t("Open the recording", "రికార్డింగ్ తెరవండి")} ↗
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  if (video.kind === "mp4") {
    return (
      <video
        key={video.url}
        controls
        playsInline
        poster={video.poster}
        preload="metadata"
        className="aspect-video w-full rounded-2xl bg-black"
      >
        <source src={video.url} />
        {t("Your browser cannot play this video.", "మీ బ్రౌజర్ ఈ వీడియో ప్లే చేయలేదు.")}
      </video>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <iframe
        key={src}
        src={src ?? undefined}
        title={`${title} — ${VIDEO_HOST_LABEL[video.kind]}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
        className="h-full w-full border-0"
      />
    </div>
  );
}
