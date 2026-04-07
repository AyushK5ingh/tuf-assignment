"use client";

import { MONTH_NAMES } from "../utils/dateUtils";

/**
 * Month navigation controls with prev/next and today button.
 */
export default function MonthNavigator({
  month,
  year,
  onPrev,
  onNext,
  onToday,
  seasonal,
  isAnimating,
  theme,
  onToggleTheme,
}) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-2 md:py-3">
      {/* Prev button */}
      <button
        onClick={onPrev}
        disabled={isAnimating}
        className="group flex items-center gap-1 px-2 py-1 rounded text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors duration-150 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        id="nav-prev-month"
        aria-label="Previous month"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden md:inline text-sm font-semibold">
          {MONTH_NAMES[month === 0 ? 11 : month - 1].substring(0, 3)}
        </span>
      </button>

      {/* Center: Month/Year title + Today button */}
      <div className="flex items-center gap-2.5">
        <h2
          className="text-xl md:text-2xl font-bold tracking-tight"
          style={{ color: seasonal.dark }}
        >
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={onToday}
          disabled={isAnimating}
          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          style={{ backgroundColor: seasonal.accent }}
          id="nav-today"
        >
          Today
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onToggleTheme}
          className="px-2 py-1 rounded border border-(--color-border) text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-accent-lighter) transition-colors text-[10px] md:text-xs font-semibold"
          id="theme-toggle"
          aria-label="Toggle dark and light mode"
          title="Toggle theme"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <button
          onClick={onNext}
          disabled={isAnimating}
          className="group flex items-center gap-1 px-2 py-1 rounded text-(--color-text-muted) hover:text-(--color-text-secondary) transition-colors duration-150 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          id="nav-next-month"
          aria-label="Next month"
        >
          <span className="hidden md:inline text-sm font-semibold">
            {MONTH_NAMES[month === 11 ? 0 : month + 1].substring(0, 3)}
          </span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
