"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "../hooks/useCalendar";
import { useDateRange } from "../hooks/useDateRange";
import { useNotes } from "../hooks/useNotes";
import CalendarHeader from "./CalendarHeader";
import HeroImage from "./HeroImage";
import DateGrid from "./DateGrid";
import NotesPanel from "./NotesPanel";
import MonthNavigator from "./MonthNavigator";
import HolidayLegend from "./HolidayLegend";
import { getSeasonalAccent, formatDate } from "../utils/dateUtils";

export default function WallCalendar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("wall-calendar-theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("wall-calendar-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const {
    year,
    month,
    grid,
    goToNext,
    goToPrev,
    goToToday,
    isAnimating,
    animationDirection,
  } = useCalendar();

  const {
    startDate,
    endDate,
    selectionState,
    handleDateClick,
    handleDateHover,
    handleMouseLeave,
    clearRange,
    isStart,
    isEnd,
    isInRange,
    isInPreviewRange,
    isPreviewEnd,
  } = useDateRange();

  const { monthNote, setMonthNote, rangeNote, setRangeNote } = useNotes(
    year,
    month,
    startDate,
    endDate,
  );

  const seasonal = getSeasonalAccent(month);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-(--color-background) transition-colors duration-300">
      <div
        className="w-full max-w-4xl mx-auto"
        style={{
          "--seasonal-accent": seasonal.accent,
          "--seasonal-light": seasonal.light,
          "--seasonal-dark": seasonal.dark,
        }}
      >
        {/* Calendar Card */}
        <div
          className="bg-(--color-surface) overflow-hidden relative border border-(--color-border) transition-colors duration-300"
          style={{ boxShadow: "0 30px 50px -18px rgba(15, 23, 42, 0.28)" }}
        >
          {/* Spiral Binding */}
          <CalendarHeader />

          {/* Hero Image Section */}
          <div className="relative border-b border-(--color-border)">
            <HeroImage month={month} year={year} />
          </div>

          {/* Bottom Section: Notes + Grid */}
          <div className="relative bg-(--color-surface) transition-colors duration-300">
            {/* Month Navigation */}
            <MonthNavigator
              month={month}
              year={year}
              onPrev={goToPrev}
              onNext={goToNext}
              onToday={goToToday}
              seasonal={seasonal}
              isAnimating={isAnimating}
              theme={theme}
              onToggleTheme={toggleTheme}
            />

            {/* Selection indicator */}
            {(startDate || endDate) && (
              <div
                className="px-4 md:px-6 pb-2 flex items-center gap-2 flex-wrap animate-fade-slide-in"
                aria-live="polite"
              >
                <span className="text-[10px] font-semibold text-(--color-text-muted) uppercase tracking-[0.14em]">
                  Selected:
                </span>
                {startDate && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: seasonal.accent }}
                  >
                    {formatDate(startDate)}
                  </span>
                )}
                {endDate && (
                  <>
                    <span className="text-(--color-text-muted)">→</span>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                      style={{ backgroundColor: seasonal.accent }}
                    >
                      {formatDate(endDate)}
                    </span>
                  </>
                )}
                <button
                  onClick={clearRange}
                  className="ml-1 text-(--color-text-muted) hover:text-(--color-holiday) transition-colors text-xs cursor-pointer"
                  title="Clear selection"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Grid + Notes Layout */}
            <div className="flex flex-col md:flex-row">
              {/* Notes Panel (Left side on desktop) */}
              <div className="order-2 md:order-1 md:w-52 lg:w-56 shrink-0 border-t md:border-t-0 md:border-r border-(--color-border)">
                <NotesPanel
                  monthNote={monthNote}
                  onMonthNoteChange={setMonthNote}
                  rangeNote={rangeNote}
                  onRangeNoteChange={setRangeNote}
                  hasRange={selectionState === "selected"}
                  startDate={startDate}
                  endDate={endDate}
                  seasonal={seasonal}
                />
              </div>

              {/* Date Grid (Right side on desktop) */}
              <div className="order-1 md:order-2 flex-1 min-w-0">
                <div
                  className={`transition-all duration-300 ${
                    isAnimating && animationDirection
                      ? animationDirection === "next"
                        ? "animate-flip-out"
                        : "animate-flip-out"
                      : isAnimating
                        ? "animate-flip-in"
                        : ""
                  }`}
                  style={{ transformOrigin: "top center" }}
                >
                  <DateGrid
                    grid={grid}
                    seasonal={seasonal}
                    onDateClick={handleDateClick}
                    onDateHover={handleDateHover}
                    onMouseLeave={handleMouseLeave}
                    isStart={isStart}
                    isEnd={isEnd}
                    isInRange={isInRange}
                    isInPreviewRange={isInPreviewRange}
                    isPreviewEnd={isPreviewEnd}
                    selectionState={selectionState}
                  />
                </div>

                {/* Holiday legend */}
                <HolidayLegend month={month} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
