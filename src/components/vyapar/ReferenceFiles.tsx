"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";

/* Attach your own screenshots and files, the way you would in ChatGPT.
 *
 * Nothing leaves the phone. There is no server here, and pretending
 * otherwise would be a lie told to people who are trusting us with their
 * sales data. What this does is let them gather the files in one place,
 * see them listed, and carry that list into step 4 — plus it names the
 * files inside the prompt so the AI knows what it is about to receive. */

export type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};

function readableSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ReferenceFiles({
  attachments,
  onChange,
}: {
  attachments: Attachment[];
  onChange: (next: Attachment[]) => void;
}) {
  const { t, lang } = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // Object URLs are a real leak if they are never released.
  useEffect(() => {
    return () => {
      attachments.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = (files: FileList | null) => {
    if (!files?.length) return;
    const next: Attachment[] = [];
    for (const file of Array.from(files)) {
      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    }
    onChange([...attachments, ...next]);
  };

  const remove = (id: string) => {
    const gone = attachments.find((a) => a.id === id);
    if (gone?.previewUrl) URL.revokeObjectURL(gone.previewUrl);
    onChange(attachments.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
          dragging ? "border-gold-500 bg-gold-50" : "border-ink-900/15 bg-white"
        }`}
      >
        <span className="text-2xl" aria-hidden="true">
          📎
        </span>
        <p lang={lang} className="mt-3 font-telugu font-semibold text-ink-900">
          {t(
            "Add your own screenshots or files",
            "మీ స్క్రీన్‌షాట్‌లు లేదా ఫైల్స్ పెట్టండి",
          )}
        </p>
        <p lang={lang} className="mx-auto mt-2 max-w-sm font-telugu text-sm leading-relaxed text-ink-500">
          {t(
            "A photo of a bill, a screenshot of a complaint, your Excel file — anything you want the AI to look at.",
            "బిల్లు ఫోటో, ఫిర్యాదు స్క్రీన్‌షాట్, మీ Excel ఫైల్ — AI చూడాలనుకునేవి ఏవైనా.",
          )}
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          lang={lang}
          className="focus-ring mt-4 inline-flex min-h-11 items-center rounded-xl border border-ink-900/15 bg-white px-4 text-sm font-semibold text-ink-800 transition hover:border-gold-500 hover:bg-gold-50"
        >
          {t("Choose files", "ఫైల్స్ ఎంచుకోండి")}
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.csv,.xlsx,.xls,.txt,.doc,.docx"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
      </div>

      {attachments.length > 0 && (
        <ul className="mt-4 space-y-2">
          {attachments.map((a) => (
            <li key={a.id} className="card flex items-center gap-3 p-3">
              {a.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.previewUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-ink-900/10"
                />
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ink-900/6 text-lg">
                  📄
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">{a.name}</p>
                <p className="text-xs text-ink-400">{readableSize(a.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(a.id)}
                aria-label={t("Remove", "తీసేయండి")}
                className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-xl text-ink-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p lang={lang} className="mt-3 font-telugu text-xs leading-relaxed text-ink-400">
        {t(
          "These stay on your phone — this page has no server and uploads nothing. Listing them here just reminds you what to attach in the chat, and tells the AI what is coming.",
          "ఇవి మీ ఫోన్‌లోనే ఉంటాయి — ఈ పేజీకి సర్వర్ లేదు, ఎక్కడికీ అప్‌లోడ్ కావు. చాట్‌లో ఏం జత చేయాలో గుర్తు చేయడానికి, AI కి ఏం వస్తుందో చెప్పడానికి మాత్రమే ఇక్కడ చూపిస్తున్నాం.",
        )}
      </p>
    </div>
  );
}
