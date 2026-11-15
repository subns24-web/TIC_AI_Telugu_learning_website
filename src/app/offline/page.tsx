import { OfflineMessage } from "@/components/site/OfflineMessage";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <div className="container-tic flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-900/6 text-ink-400">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 3l18 18" strokeLinecap="round" />
          <path d="M8.5 16.4a5 5 0 016.9-.1M5 13a9 9 0 013.3-2.1M19 13a9 9 0 00-4.5-2.4M2 9.3A14 14 0 017 6.4M22 9.3a14 14 0 00-8.6-3.2" strokeLinecap="round" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <OfflineMessage />
    </div>
  );
}
