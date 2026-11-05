/** Where a lesson's video actually lives. Zoom share links refuse to be
 *  iframed, so they open externally instead of playing inline. */
export type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "mp4"; url: string; poster?: string }
  | { kind: "zoom"; url: string; passcode?: string };

export type Resource = {
  label: string;
  labelTe?: string;
  href: string;
  type: "pdf" | "sheet" | "prompt" | "template" | "link";
};

export type Lesson = {
  id: string;
  title: string;
  titleTe: string;
  minutes: number;
  video: VideoSource;
  summary?: string;
  summaryTe?: string;
  /** Free lessons play without enrolling — the hook for new learners. */
  preview?: boolean;
  resources?: Resource[];
};

export type Module = {
  id: string;
  title: string;
  titleTe: string;
  lessons: Lesson[];
};

export type Level = "beginner" | "intermediate" | "advanced";

export type Instructor = {
  name: string;
  role: string;
  roleTe: string;
  initials: string;
};

export type Course = {
  slug: string;
  title: string;
  titleTe: string;
  tagline: string;
  taglineTe: string;
  track: string;
  level: Level;
  /** Teaching language — the whole point of TIC AI. */
  language: "telugu" | "telugu-english";
  priceInr: number;
  /** Strike-through price, when there is one. */
  mrpInr?: number;
  accent: string;
  outcomes: string[];
  outcomesTe: string[];
  forWhom: string[];
  tools: string[];
  instructor: Instructor;
  modules: Module[];
  featured?: boolean;
  comingSoon?: boolean;
};

export type Track = {
  id: string;
  title: string;
  titleTe: string;
  blurb: string;
  blurbTe: string;
  icon: string;
};
