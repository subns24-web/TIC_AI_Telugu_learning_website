import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-tic flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-700">404</p>
      <h1 className="mt-4 font-telugu text-3xl font-bold tracking-tight text-ink-900">
        ఈ పేజీ కనిపించలేదు.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-500">
        That page does not exist. The catalogue is the best place to pick things up again.
      </p>
      <Link
        href="/courses"
        className="focus-ring mt-8 inline-flex rounded-xl bg-gold-500 px-6 py-3.5 font-semibold text-ink-950 transition hover:bg-gold-400"
      >
        కోర్సులు చూడండి
      </Link>
    </div>
  );
}
