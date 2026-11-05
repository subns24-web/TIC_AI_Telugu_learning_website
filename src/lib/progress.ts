"use client";

import { useCallback, useEffect, useState } from "react";

/* Progress and enrolment live in localStorage. It survives refreshes and
 * needs no backend — swap these four functions for API calls when accounts
 * and payments arrive, and nothing else in the UI has to change. */

const DONE_KEY = "ticai.completed";
const ENROL_KEY = "ticai.enrolled";

type DoneMap = Record<string, string[]>; // slug -> lesson ids

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("ticai:progress"));
  } catch {
    /* private browsing, blocked storage — progress just will not persist */
  }
}

/** Subscribes to storage changes so every mounted component agrees. */
function useStoreSync(load: () => void) {
  useEffect(() => {
    load();
    const onChange = () => load();
    window.addEventListener("ticai:progress", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("ticai:progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [load]);
}

export function useCourseProgress(slug: string, totalLessons: number) {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setDone(read<DoneMap>(DONE_KEY, {})[slug] ?? []);
    setReady(true);
  }, [slug]);

  useStoreSync(load);

  const toggle = useCallback(
    (lessonId: string) => {
      const map = read<DoneMap>(DONE_KEY, {});
      const current = map[slug] ?? [];
      map[slug] = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      write(DONE_KEY, map);
      setDone(map[slug]);
    },
    [slug],
  );

  const reset = useCallback(() => {
    const map = read<DoneMap>(DONE_KEY, {});
    delete map[slug];
    write(DONE_KEY, map);
    setDone([]);
  }, [slug]);

  const percent = totalLessons ? Math.round((done.length / totalLessons) * 100) : 0;

  return { done, ready, toggle, reset, percent, isDone: (id: string) => done.includes(id) };
}

export function useEnrolment(slug?: string) {
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setEnrolled(read<string[]>(ENROL_KEY, []));
    setReady(true);
  }, []);

  useStoreSync(load);

  const enrol = useCallback((s: string) => {
    const list = read<string[]>(ENROL_KEY, []);
    if (!list.includes(s)) {
      const next = [...list, s];
      write(ENROL_KEY, next);
      setEnrolled(next);
    }
  }, []);

  const leave = useCallback((s: string) => {
    const next = read<string[]>(ENROL_KEY, []).filter((x) => x !== s);
    write(ENROL_KEY, next);
    setEnrolled(next);
  }, []);

  return {
    enrolled,
    ready,
    enrol,
    leave,
    isEnrolled: slug ? enrolled.includes(slug) : false,
  };
}

/** Read-only snapshot for the My Learning page. */
export function useAllProgress() {
  const [map, setMap] = useState<DoneMap>({});
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setMap(read<DoneMap>(DONE_KEY, {}));
    setReady(true);
  }, []);

  useStoreSync(load);
  return { map, ready };
}
