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

## Installable on mobile (PWA)

The site is a progressive web app, so it can be added to a phone's home screen and
opens without browser chrome.

- `src/app/manifest.ts` — name, icons, theme colour, `display: standalone`, shortcuts
- `public/sw.js` — service worker, registered from `ServiceWorker.tsx` **in production
  only** (in dev it would cache the HMR shell and make edits look like they did not apply)
- `InstallPrompt.tsx` — the add-to-home-screen card
- `/offline` — what shows when a page was never visited and the network is gone
- `public/icons/` — regenerate with the script in the commit history; maskable variants
  keep the mark inside Android's circular safe zone

**Two install paths, because the platforms differ.** Chrome, Edge and Samsung Internet
fire `beforeinstallprompt`, which the card captures and replays on tap. iOS Safari fires
nothing and exposes no API, so there the card shows the Share → Add to Home Screen steps
instead of a button. A dismissal is remembered for 30 days.

**What works offline:** pages already visited, plus the shell and fonts. **Videos never
cache** — one lesson recording would exhaust the storage quota, so an offline learner
gets the page and an honest message rather than a player that silently fails.

Bump `VERSION` in `public/sw.js` when the shell changes, or returning visitors keep the
old cached pages until their caches expire.

## Mobile

- Tap targets are at least 44px on phones via the `.tap` utility; chips and tabs use
  `min-h-11`
- `viewportFit: "cover"` plus `env(safe-area-inset-*)` keeps content clear of the notch,
  and `.safe-top` / `.safe-bottom` handle the status bar when installed
- Form fields are 16px minimum, which is what stops iOS Safari zooming on focus
- Zoom is deliberately **not** locked — people enlarge Telugu text

## The mark and the load screen

The logo is a die resting with the **3-face toward the viewer** — three being the
Trinetra number. Two implementations, deliberately:

- `Dice.tsx` — flat SVG for the header, footer and install card. Drawn in **cabinet
  projection**, not true isometric: isometric puts a vertical *edge* at the front, leaving
  no face to carry the pips.
- `Splash.tsx` — a real six-faced CSS cube in 3D space, so the roll shows genuine side
  faces instead of a flipbook. Opposite faces sum to seven, as on a real die.

The cube settles at `rotateX(-16deg) rotateY(-21deg)`. That exact pair puts the 3 square
to the viewer with the top and right faces raked back, matching the SVG. The positive-Y
equivalent reveals the **left** face instead, putting a 6 next to the 3 — noisy, and
inconsistent with the static mark. Face shading is by orientation (`--top`, `--side`,
`--bottom`); one flat gradient across all six makes the cube look like a decal.

The splash fades out **in CSS, not JavaScript**, so a script failure can never trap
someone behind an overlay. JS only removes the node afterwards and lets a tap skip it.
Total is about 2 seconds, and `prefers-reduced-motion` drops the tumble entirely.

## Not built yet

- Accounts, payments and server-side enrolment
- Certificates on course completion
- Quizzes and assignments
- A CMS — content is a TypeScript file on purpose, until the course count justifies more
