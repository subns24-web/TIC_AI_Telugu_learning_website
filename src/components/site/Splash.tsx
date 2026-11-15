"use client";

import { useEffect, useState } from "react";

/* The die is a real cube: six faces placed in 3D space, so the tumble shows
 * actual side faces rather than a flipbook. Opposite faces sum to seven, as
 * on a real die, and the front face — the one it lands on — is the 3. */

const HALF = 54; // half the 108px cube

/* Every face is lit identically. The light is a fixed layer that does not
   rotate with the cube, so the highlight stays put in the room while the die
   turns under it. Baking brightness into each face meant the "top" face
   stayed bright even once it had tumbled to the bottom. */
const FACES = [
  { value: 3, transform: `translateZ(${HALF}px)` }, // front — what it lands on
  { value: 4, transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { value: 1, transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { value: 6, transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { value: 2, transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { value: 5, transform: `rotateX(-90deg) translateZ(${HALF}px)` },
] as const;

/** Grid cells (row, column) for each face value, as a die arranges them. */
const PIPS: Record<number, [number, number][]> = {
  1: [[2, 2]],
  2: [
    [1, 1],
    [3, 3],
  ],
  3: [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  4: [
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3],
  ],
  5: [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3],
  ],
  6: [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
};

export function Splash() {
  /* Rendered in the server HTML so it is there on the very first paint —
     a splash that appears after hydration would flash the page first. */
  const [done, setDone] = useState(false);
  // Rendered outside LangProvider, so read the saved language directly.
  const [en, setEn] = useState(false);
  useEffect(() => {
    try { setEn(window.localStorage.getItem("ticai.lang") === "en"); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 1000 : 2420;

    const timer = window.setTimeout(() => setDone(true), total);
    // Anyone who has seen it once can tap straight past it.
    const skip = () => setDone(true);
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (done) return null;

  return (
    <div className="splash" role="status" aria-label="Loading TIC AI">
      <div className="splash-scene">
        <div className="splash-cube">
          {/* Three orthogonal planes fill the interior, so the die never
              shows the background through its own corners mid-tumble. */}
          <div className="splash-core" />
          <div className="splash-core splash-core--y" />
          <div className="splash-core splash-core--x" />
          {FACES.map((face) => (
            <div
              key={face.value}
              className="splash-face"
              style={{ transform: face.transform }}
            >
              {PIPS[face.value].map(([row, col]) => (
                <span
                  key={`${row}-${col}`}
                  className="splash-pip"
                  style={{ gridRow: row, gridColumn: col }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="splash-shadow" aria-hidden="true" />
        <div className="splash-light" aria-hidden="true" />
      </div>

      <div className="splash-word text-center">
        <p className="text-metal text-2xl font-bold tracking-tight">TIC AI</p>
        <p className="mx-auto mt-1.5 max-w-[15rem] text-[0.6rem] font-semibold uppercase leading-[1.4] tracking-[0.1em] text-ink-400">
          Telugu International Council for AI in Business
        </p>
        <p lang={en ? "en" : "te"} className="mt-1.5 font-telugu text-sm text-ink-400">
          {en ? "Learn AI in Telugu" : "తెలుగులో AI నేర్చుకోండి"}
        </p>
      </div>
    </div>
  );
}
