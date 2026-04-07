"use client";

/**
 * Decorative spiral binding strip across the top of the calendar.
 */
export default function CalendarHeader() {
  const spiralCount = 36;

  return (
    <div className="relative bg-(--color-surface) h-8 md:h-9 flex items-end justify-center overflow-hidden border-b border-(--color-border)">
      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-(--color-border)" />

      {/* Spiral wires */}
      <div className="relative z-1 flex items-end justify-between w-full px-2 md:px-4 pb-1">
        {Array.from({ length: spiralCount }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 md:w-1.5 h-3 md:h-3.5 rounded-full border border-(--color-text-secondary) bg-transparent"
          />
        ))}
      </div>

      {/* Binding rail behind coils */}
      <div className="absolute bottom-1.5 left-0 right-0 h-px bg-(--color-text-muted)" />

      {/* Hanger hook */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-2">
        <div className="w-px h-2 bg-(--color-text-secondary) mx-auto" />
        <div className="w-5 h-3 border border-(--color-text-secondary) rounded-b-full border-t-0" />
      </div>

      {/* subtle paper shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-b from-slate-900/7 to-transparent" />
    </div>
  );
}
