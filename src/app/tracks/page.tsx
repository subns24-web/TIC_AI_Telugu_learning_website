"use client";

import { courses, tracks } from "@/lib/courses";
import { useLang } from "@/lib/lang";
import { CourseCard } from "@/components/course/CourseCard";
import { SectionHead } from "@/components/ui/Bits";

export default function TracksPage() {
  const { t, lang } = useLang();

  return (
    <div className="container-tic py-14 md:py-20">
      <SectionHead
        eyebrow={t("Learning paths", "లెర్నింగ్ పాత్‌లు")}
        title={t("Four routes, in order", "నాలుగు దారులు, క్రమంలో")}
        blurb={t(
          "Courses stacked the way they build on each other. Follow one path end to end rather than jumping around.",
          "ఒకదానిపై ఒకటి ఆధారపడే క్రమంలో కోర్సులు. అటూ ఇటూ దూకకుండా ఒక పాత్ పూర్తిగా చేయండి.",
        )}
        lang={lang}
      />

      <div className="mt-14 space-y-16">
        {tracks.map((track) => {
          const list = courses.filter((c) => c.track === track.id);
          return (
            <section key={track.id} id={track.id} className="scroll-mt-24">
              <div className="flex flex-col gap-3 border-l-4 border-gold-500 pl-5">
                <h2 lang={lang} className="font-telugu text-2xl font-bold tracking-tight text-ink-900">
                  {t(track.title, track.titleTe)}
                </h2>
                <p lang={lang} className="max-w-2xl leading-relaxed text-ink-500">
                  {t(track.blurb, track.blurbTe)}
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <CourseCard key={c.slug} course={c} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
