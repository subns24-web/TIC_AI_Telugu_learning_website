"use client";

import { useEffect, useState } from "react";

/* The die is a real cube: six faces placed in 3D space, so the tumble shows
 * actual side faces rather than a flipbook. Opposite faces sum to seven, as
 * on a real die, and the front face — the one it lands on — is the 3. */

const HALF = 54; // half the 108px cube

const FACES = [
  { value: 3, shade: "", transform: `translateZ(${HALF}px)` }, // front — what it lands on
  { value: 4, shade: "", transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { value: 1, shade: "splash-face--side", transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { value: 6, shade: "splash-face--side", transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { value: 2, shade: "splash-face--top", transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { value: 5, shade: "splash-face--bottom", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
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

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 1000 : 2050;

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
          {FACES.map((face) => (
            <div
              key={face.value}
              className={`splash-face ${face.shade}`}
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
      </div>

      <div className="splash-word text-center">
        <p className="text-metal text-2xl font-bold tracking-tight">TIC AI</p>
        <p className="mt-1.5 font-telugu text-sm text-ink-400">తెలుగులో AI నేర్చుకోండి</p>
      </div>
    </div>
  );
}
