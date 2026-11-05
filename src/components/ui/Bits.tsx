"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "teal" | "ink" | "outline" | "silver";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink-900/6 text-ink-600",
    gold: "bg-gold-100 text-gold-800 ring-1 ring-gold-300/60",
    teal: "bg-teal-100 text-teal-800",
    ink: "bg-ink-900 text-white",
    outline: "border border-ink-900/15 text-ink-500",
    silver: "bg-silver-100 text-silver-700 ring-1 ring-silver-300",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  percent,
  className = "",
  showLabel = false,
}: {
  percent: number;
  className?: string;
  showLabel?: boolean;
}) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/10"
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-teal-500 transition-[width] duration-500"
          style={{ width: `${safe}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right text-xs font-semibold tabular-nums text-ink-500">
          {safe}%
        </span>
      )}
    </div>
  );
}

type BtnProps = {
  /* `onDark` exists because stacking `border-white/20` onto `outline` let the
     two border-colour utilities fight, and the dark one usually won. */
  variant?: "primary" | "dark" | "ghost" | "outline" | "onDark";
  size?: "sm" | "md" | "lg";
};

const BTN_BASE =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

const BTN_VARIANT = {
  primary: "btn-gold",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  ghost: "text-ink-600 hover:bg-ink-900/6 hover:text-ink-900",
  outline: "border border-ink-900/15 text-ink-800 hover:border-gold-500/50 hover:bg-gold-50",
  onDark: "border border-silver-300/30 text-silver-100 hover:border-gold-400/60 hover:text-white hover:bg-white/6",
} as const;

const BTN_SIZE = {
  sm: "px-3 py-2 text-[0.8rem]",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[0.95rem]",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: BtnProps & ComponentProps<"button">) {
  return (
    <button
      className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`}
      {...rest}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: BtnProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`}
      {...rest}
    />
  );
}

export function SectionHead({
  eyebrow,
  title,
  blurb,
  lang,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  lang?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          lang={lang}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700"
        >
          {eyebrow}
        </p>
      )}
      <h2
        lang={lang}
        className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink-900 sm:text-[2.1rem]"
      >
        {title}
      </h2>
      {blurb && (
        <p lang={lang} className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">
          {blurb}
        </p>
      )}
    </div>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-5 w-5 shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" className="fill-teal-100" />
      <path
        d="M6 10.2l2.6 2.6L14 7.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal-700"
      />
    </svg>
  );
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6a1 1 0 001.52.85l10.6-6.8a1 1 0 000-1.7L9.52 4.35A1 1 0 008 5.2z" />
    </svg>
  );
}
