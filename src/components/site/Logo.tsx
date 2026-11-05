export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="btn-gold relative grid h-9 w-9 place-items-center rounded-xl text-ink-950">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
          {/* three nodes converging — a council, and a network */}
          <circle cx="6" cy="7" r="2.2" fill="currentColor" />
          <circle cx="18" cy="7" r="2.2" fill="currentColor" />
          <circle cx="12" cy="18" r="2.6" fill="currentColor" />
          <path
            d="M6 7 L12 18 M18 7 L12 18 M6 7 L18 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
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
