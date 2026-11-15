import { Dice } from "./Dice";

/* The lockup carries the full form, not a tagline. "AI for Business" read
 * like a strapline somebody chose; the council's actual name is the name. */

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* No plate behind it — the die is already a solid object, and boxing
          a 3D form inside a flat square flattens it. */}
      <Dice
        id={dark ? "logo-dark" : "logo-light"}
        className="h-9 w-9 shrink-0 drop-shadow-[0_2px_4px_rgba(14,21,39,0.28)]"
      />
      <span className="leading-none">
        <span
          className={`block text-[1.05rem] font-bold tracking-tight ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          TIC AI
        </span>
        {/* Wraps on a phone, where the header grows to take it; one line
            from sm up, where there is room and two lines looked cramped. */}
        <span
          className={`mt-0.5 block max-w-[11rem] text-[0.56rem] font-semibold uppercase leading-[1.3] tracking-[0.09em] sm:max-w-none sm:whitespace-nowrap ${
            dark ? "text-ink-300" : "text-ink-400"
          }`}
        >
          Telugu International Council for AI in Business
        </span>
      </span>
    </span>
  );
}
