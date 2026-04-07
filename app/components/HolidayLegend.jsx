"use client";

import { getHolidaysForMonth, getHolidayColor } from "../utils/holidays";

/**
 * Compact holiday legend shown below the date grid.
 */
export default function HolidayLegend({ month }) {
  const holidays = getHolidaysForMonth(month);

  if (holidays.length === 0) return null;

  return (
    <div className="px-3 md:px-6 lg:px-8 pb-4 md:pb-6">
      <div className="border-t border-(--color-border-light) pt-3">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-muted) mb-2">
          Holidays & Observances
        </h4>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {holidays.map((h) => (
            <div
              key={h.day}
              className="flex items-center gap-1.5 text-[10px] md:text-xs text-(--color-text-secondary)"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: getHolidayColor(h.type) }}
              />
              <span className="font-medium">{h.day}</span>
              <span className="text-(--color-text-muted)">{h.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
