import { Dice } from "./Dice";

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
        <span
          className={`block text-[0.62rem] font-medium uppercase tracking-[0.14em] ${
            dark ? "text-ink-300" : "text-ink-400"
          }`}
        >
          AI for Business
        </span>
      </span>
    </span>
  );
}
