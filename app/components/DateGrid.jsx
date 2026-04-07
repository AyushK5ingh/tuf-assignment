"use client";

import { DAY_NAMES, DAY_NAMES_SHORT, MONTH_NAMES } from "../utils/dateUtils";
import { getHoliday, getHolidayColor } from "../utils/holidays";

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * The 7-column date grid with range selection support.
 */
export default function DateGrid({
  grid,
  seasonal,
  onDateClick,
  onDateHover,
  onMouseLeave,
  isStart,
  isEnd,
  isInRange,
  isInPreviewRange,
  isPreviewEnd,
  selectionState,
}) {
  const getAriaLabel = (
    cell,
    { isStartDate, isEndDate, inRange, inPreview, isPreEnd },
  ) => {
    const weekday = WEEKDAY_NAMES[cell.date.getDay()];
    const monthName = MONTH_NAMES[cell.date.getMonth()];
    const fullDate = `${weekday}, ${monthName} ${cell.date.getDate()}, ${cell.date.getFullYear()}`;

    const states = [];

    if (!cell.isCurrentMonth) states.push("outside current month");
    if (cell.isToday) states.push("today");
    if (isStartDate) states.push("range start");
    if (isEndDate) states.push("range end");
    if (inRange) states.push("in selected range");
    if (inPreview) states.push("in preview range");
    if (isPreEnd) states.push("preview end");

    return states.length ? `${fullDate}, ${states.join(", ")}` : fullDate;
  };

  return (
    <div className="p-3 md:p-5 lg:p-6" onMouseLeave={onMouseLeave}>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2 md:mb-2.5" role="row">
        {DAY_NAMES.map((day, i) => (
          <div
            key={day}
            role="columnheader"
            className={`text-center text-[11px] md:text-xs font-bold uppercase tracking-wide py-1.5 md:py-1.5 ${
              i >= 5
                ? "text-(--color-text-weekend)"
                : "text-(--color-text-secondary)"
            }`}
          >
            {/* Show short names on mobile */}
            <span className="hidden md:inline">{day}</span>
            <span className="md:hidden">{DAY_NAMES_SHORT[i]}</span>
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div
        className="grid grid-cols-7 gap-y-1"
        role="grid"
        aria-label="Calendar date grid"
      >
        {grid.map((cell, index) => {
          const holiday = cell.isCurrentMonth ? getHoliday(cell.date) : null;
          const dayOfWeek = index % 7;
          const isWeekend = dayOfWeek >= 5;
          const isStartDate = isStart(cell.date);
          const isEndDate = isEnd(cell.date);
          const inRange = isInRange(cell.date);
          const inPreview = isInPreviewRange(cell.date);
          const isPreEnd = isPreviewEnd(cell.date);
          const isEndpoint = isStartDate || isEndDate;
          const showPreviewRing = isPreEnd && !isStartDate && !isEndDate;
          const isSelectedBandCell =
            selectionState === "selected" && (isEndpoint || inRange);
          const isPreviewBandCell =
            selectionState === "selecting" &&
            (isStartDate || inPreview || isPreEnd);
          const isBandCell = isSelectedBandCell || isPreviewBandCell;
          const showTodayHighlight =
            cell.isToday && cell.isCurrentMonth && !isEndpoint && !isBandCell;

          const isAdjacentDay = (a, b) =>
            Math.abs(a.getTime() - b.getTime()) === 24 * 60 * 60 * 1000;

          const isBandAtIndex = (i) => {
            if (i < 0 || i >= grid.length) return false;

            const other = grid[i];
            const otherStart = isStart(other.date);
            const otherEnd = isEnd(other.date);
            const otherInRange = isInRange(other.date);
            const otherInPreview = isInPreviewRange(other.date);
            const otherPreEnd = isPreviewEnd(other.date);

            if (selectionState === "selected") {
              return otherStart || otherEnd || otherInRange;
            }

            if (selectionState === "selecting") {
              return otherStart || otherInPreview || otherPreEnd;
            }

            return false;
          };

          const hasPrevConnection =
            dayOfWeek > 0 &&
            isBandCell &&
            isBandAtIndex(index - 1) &&
            isAdjacentDay(cell.date, grid[index - 1].date);

          const hasNextConnection =
            dayOfWeek < 6 &&
            isBandCell &&
            isBandAtIndex(index + 1) &&
            isAdjacentDay(cell.date, grid[index + 1].date);

          const showHoverFill =
            cell.isCurrentMonth && !isBandCell && !showPreviewRing;

          // Build class string for the cell
          let cellText = "";
          let endpointStyle = {};
          let bandStyle = {};

          if (isEndpoint) {
            endpointStyle = { backgroundColor: seasonal.accent };
          } else if (inRange) {
            bandStyle = { backgroundColor: seasonal.light };
          }

          if (isPreviewBandCell) {
            bandStyle = {
              backgroundColor:
                selectionState === "selected"
                  ? seasonal.light
                  : `${seasonal.light}cc`,
            };
          }

          if (isSelectedBandCell) {
            bandStyle = { backgroundColor: seasonal.light };
          }

          if (!cell.isCurrentMonth) {
            cellText = "text-[var(--color-text-muted)] opacity-40";
          } else if (isEndpoint) {
            cellText = "text-white font-bold";
          } else if (showTodayHighlight) {
            cellText = "text-(--color-today-text) font-semibold";
          } else if (isBandCell) {
            cellText = "text-(--color-text-primary)";
          } else if (isWeekend) {
            cellText = "text-[var(--color-text-weekend)]";
          } else {
            cellText = "text-[var(--color-text-primary)]";
          }

          return (
            <button
              key={index}
              onClick={() => cell.isCurrentMonth && onDateClick(cell.date)}
              onMouseEnter={() => cell.isCurrentMonth && onDateHover(cell.date)}
              disabled={!cell.isCurrentMonth}
              role="gridcell"
              aria-label={getAriaLabel(cell, {
                isStartDate,
                isEndDate,
                inRange,
                inPreview,
                isPreEnd,
              })}
              aria-selected={isBandCell || isEndpoint}
              className={`
                group relative overflow-hidden flex flex-col items-center justify-center
                h-9 md:h-10 lg:h-11
                text-sm md:text-base leading-none
                transition-all duration-150
                cursor-pointer
                disabled:cursor-default
                ${cellText}
                ${selectionState === "selecting" ? "cursor-crosshair" : ""}
              `}
              title={holiday ? holiday.name : undefined}
              id={`date-${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`}
            >
              {/* Hover background */}
              {showHoverFill && (
                <div className="absolute inset-y-1.5 inset-x-1.5 rounded-xl bg-(--color-accent-lighter) opacity-0 transition-all duration-200 group-hover:opacity-100" />
              )}

              {/* Today chip */}
              {showTodayHighlight && (
                <div className="absolute inset-y-1.5 inset-x-1.5 rounded-full bg-(--color-today-bg) ring-1 ring-(--color-today-ring)/55" />
              )}

              {/* Connected range band with rounded row boundaries */}
              {isBandCell && (
                <div
                  className={`absolute inset-y-1.5 inset-x-0 transition-all duration-200 ${!hasPrevConnection ? "rounded-l-full" : ""} ${!hasNextConnection ? "rounded-r-full" : ""}`}
                  style={bandStyle}
                />
              )}

              {/* Start/End circle */}
              {isEndpoint && (
                <div
                  className="absolute z-1 left-1/2 top-1/2 h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/70 shadow-[0_4px_10px_-6px_rgba(15,23,42,0.45)]"
                  style={endpointStyle}
                />
              )}

              {/* Preview end ring */}
              {showPreviewRing && (
                <div
                  className="absolute z-1 left-1/2 top-1/2 h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-transparent"
                  style={{
                    borderColor: seasonal.accent,
                    boxShadow: `0 0 0 2px ${seasonal.light}cc`,
                  }}
                />
              )}

              {/* Date number */}
              <span className="relative z-2 font-medium">{cell.day}</span>

              {/* Today indicator */}
              {cell.isToday &&
                !isStartDate &&
                !isEndDate &&
                !showTodayHighlight && (
                  <div
                    className="absolute bottom-0.5 w-1 h-1 rounded-full"
                    style={{ backgroundColor: seasonal.accent }}
                  />
                )}

              {/* Holiday dot */}
              {holiday && !cell.isToday && !isStartDate && !isEndDate && (
                <div
                  className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ backgroundColor: getHolidayColor(holiday.type) }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
