"use client";

import { formatDate } from "../utils/dateUtils";

/**
 * Notes panel — supports monthly notes and range-specific notes.
 * Styled like a lined notepad area.
 */
export default function NotesPanel({
  monthNote,
  onMonthNoteChange,
  rangeNote,
  onRangeNoteChange,
  hasRange,
  startDate,
  endDate,
  seasonal,
}) {
  const maxChars = 500;

  return (
    <div className="p-4 md:p-5 flex flex-col gap-4 h-full bg-(--color-surface) transition-colors duration-300">
      {/* Monthly Notes */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--color-text-secondary)">
            Notes
          </h3>
          <span className="text-[10px] text-(--color-text-muted)">
            {monthNote.length}/{maxChars}
          </span>
        </div>
        <textarea
          value={monthNote}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onMonthNoteChange(e.target.value);
            }
          }}
          className="w-full flex-1 min-h-30 md:min-h-36 resize-none text-xs text-(--color-text-primary) placeholder:text-(--color-text-muted) placeholder:text-xs bg-transparent lined-paper focus:outline-none focus:ring-0 p-0 pt-0.5"
          style={{ lineHeight: "27px" }}
          id="monthly-notes-textarea"
        />
      </div>

      {/* Range Notes — shown when a date range is selected */}
      {hasRange && startDate && endDate && (
        <div className="border-t border-(--color-border-light) pt-3 animate-fade-slide-in">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: seasonal.accent }}
            />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-(--color-text-secondary)">
              Range Note
            </h3>
          </div>
          <p className="text-[10px] text-(--color-text-muted) mb-1.5">
            {formatDate(startDate)} – {formatDate(endDate)}
          </p>
          <textarea
            value={rangeNote}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                onRangeNoteChange(e.target.value);
              }
            }}
            placeholder="Note for this date range..."
            className="w-full min-h-18 resize-none text-xs text-(--color-text-primary) placeholder:text-(--color-text-muted) placeholder:text-[10px] bg-accent-lighter/30 rounded p-2 focus:outline-none focus:ring-1 transition-all"
            style={{
              ["--tw-ring-color"]: seasonal.accent,
            }}
            id="range-notes-textarea"
          />
          <span className="text-[9px] text-(--color-text-muted) mt-1 block text-right">
            {rangeNote.length}/200
          </span>
        </div>
      )}
    </div>
  );
}
