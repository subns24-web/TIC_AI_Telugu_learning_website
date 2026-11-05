# TIC AI Academy

Telugu-first course platform for the **Telugu International Council of AI for Business**.
Next.js 16 · React 19 · Tailwind 4 · TypeScript. Static export friendly — deploys to Vercel as-is.

```bash
npm install
npm run dev     # http://localhost:3050
npm run build
```

## What is here

| Route | What it does |
| --- | --- |
| `/` | Marketing home — hero, why-Telugu, featured courses, paths, council |
| `/courses` | Catalogue with search + path/level filters |
| `/tracks` | The four learning paths, courses stacked in order |
| `/courses/[slug]` | Course page — outcomes, curriculum accordion, enrol card |
| `/courses/[slug]/learn/[lessonId]` | The player — video, tabs, notes, curriculum sidebar |
| `/my-learning` | Everything started, with progress and a resume button |
| `/community` | Council board, weekly rituals, open seats |
| `/admin` | Paste-a-link helper that writes the lesson snippet for you |

## Adding a recording

All content lives in one file: **`src/lib/courses.ts`**. There is no database yet, which
means adding a lesson is editing an array, and `/admin` writes that object for you.

1. Open `/admin`
2. Paste the video link, fill the Telugu and English titles, length and lesson id
3. Copy the generated snippet
4. Paste it into the right module's `lessons` array in `src/lib/courses.ts`
5. Save — the lesson gets its own URL immediately

### Supported video hosts

| Host | Plays inline? | How to use |
| --- | --- | --- |
| YouTube | Yes | `{ kind: "youtube", id: "dQw4w9WgXcQ" }` — unlisted works fine |
| Vimeo | Yes | `{ kind: "vimeo", id: "123456789" }` |
| Direct MP4 | Yes | `{ kind: "mp4", url: "https://…/lesson.mp4" }` — R2, S3, Bunny |
| Zoom | **No** | `{ kind: "zoom", url: "https://zoom.us/rec/share/…" }` |

**About Zoom recordings.** Zoom sends `X-Frame-Options` on its recording pages, so they
cannot be played inside this site — no workaround exists short of Zoom changing that.
A Zoom lesson therefore renders an "Open the recording" button that sends the learner to
Zoom in a new tab, with the passcode shown if you supply one.

For a proper in-site experience, download the MP4 from the Zoom cloud recording page and
re-upload it:

- **YouTube, unlisted** — free, fast, works everywhere, and the player is familiar. Best
  default for webinar recordings.
- **Cloudflare R2 / Bunny Stream** — if you want the video to be unreachable outside the
  site and are ready to pay for bandwidth.

Then paste the new link into `/admin`.

## Progress, enrolment and notes

Stored in `localStorage` under `ticai.completed`, `ticai.enrolled`, `ticai.notes` and
`ticai.lang`. No accounts, no server, nothing to run. That means progress is per-browser —
a learner who switches from phone to laptop starts the bar at zero.

`src/lib/progress.ts` is the only file that touches storage. When accounts and payments
arrive, swap the four functions in it for API calls and no component needs to change.

## Bilingual text

Telugu is the default; the toggle in the header switches the chrome to English. Every
piece of copy is a `t("English", "తెలుగు")` call from `useLang()`, and course titles carry
both `title` and `titleTe`. Telugu text is tagged `lang="te"` so it picks up Noto Sans
Telugu and the looser line height set in `globals.css`.

## Design tokens

Defined in `src/app/globals.css` under `@theme`:

- **ink** — deep navy ground, the authority colour
- **gold** — primary accent. Metallic, never flat: use `.btn-gold` for surfaces and
  `.text-metal` for numerals and display words, both of which shade vertically
- **silver** — cool metal for hairlines (`.hairline`), quiet chrome and `.text-silver`
- **teal** — progress and completion only
- **paper** — reading surfaces

Custom CSS sits inside `@layer base` and `@layer components`. Keep it there: unlayered CSS
outranks Tailwind's utility layer, and a global `*` border rule will silently beat
`border-white/25` on every button that tries to override it.

## Not built yet

- Accounts, payments and server-side enrolment
- Certificates on course completion
- Quizzes and assignments
- A CMS — content is a TypeScript file on purpose, until the course count justifies more
