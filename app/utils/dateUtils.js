/**
 * Pure date utility functions for the calendar component.
 */

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const DAY_NAMES_SHORT = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/**
 * Returns the season for a given month (0-indexed).
 */
export function getSeason(month) {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

/**
 * Returns the seasonal accent color CSS variable name.
 */
export function getSeasonalAccent(month) {
  const season = getSeason(month);
  const accents = {
    spring: { accent: "#22c55e", light: "#dcfce7", dark: "#16a34a" },
    summer: { accent: "#f59e0b", light: "#fef3c7", dark: "#d97706" },
    autumn: { accent: "#f97316", light: "#ffedd5", dark: "#ea580c" },
    winter: { accent: "#0ea5e9", light: "#e0f2fe", dark: "#0284c7" },
  };
  return accents[season];
}

/**
 * Gets the gradient colors for each month (used when no hero image is provided).
 */
export function getMonthGradient(month) {
  const gradients = [
    // January - icy blue
    ["#a5f3fc", "#0ea5e9", "#0369a1"],
    // February - rose pink
    ["#fecdd3", "#fb7185", "#e11d48"],
    // March - spring green
    ["#bbf7d0", "#4ade80", "#16a34a"],
    // April - soft lavender to sky
    ["#c4b5fd", "#818cf8", "#4f46e5"],
    // May - warm golden
    ["#fde68a", "#fbbf24", "#d97706"],
    // June - sunset orange
    ["#fed7aa", "#fb923c", "#ea580c"],
    // July - deep blue ocean
    ["#93c5fd", "#3b82f6", "#1d4ed8"],
    // August - tropical teal
    ["#99f6e4", "#2dd4bf", "#0d9488"],
    // September - amber harvest
    ["#fde68a", "#f59e0b", "#b45309"],
    // October - burnt orange
    ["#fdba74", "#f97316", "#c2410c"],
    // November - russet brown
    ["#d6d3d1", "#a8a29e", "#78716c"],
    // December - frost silver to blue
    ["#e0e7ff", "#a5b4fc", "#6366f1"],
  ];
  return gradients[month];
}

/**
 * Builds a 6x7 grid of date objects for a given month/year.
 * Each entry: { date: Date, isCurrentMonth: boolean, isToday: boolean }
 */
export function buildCalendarGrid(year, month) {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  // getDay() returns 0=Sun. We want Mon=0, so shift.
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6; // Sunday → 6

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const grid = [];

  // Previous month overflow
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    grid.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    grid.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    });
  }

  // Next month overflow — fill to 42 cells (6 rows × 7 cols)
  const remaining = 42 - grid.length;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day);
    grid.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  return grid;
}

/**
 * Checks if two dates are the same calendar day.
 */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Checks if a date is between start and end (inclusive).
 */
export function isDateInRange(date, start, end) {
  if (!date || !start || !end) return false;
  const d = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return d >= s && d <= e;
}

/**
 * Formats a date to a short readable string.
 */
export function formatDate(date) {
  if (!date) return "";
  return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Returns a notes key for a specific month.
 */
export function getMonthKey(year, month) {
  return `${year}-${month}`;
}

/**
 * Returns a notes key for a date range.
 */
export function getRangeKey(start, end) {
  if (!start || !end) return null;
  const s = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
  const e = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;
  return `range_${s}_${e}`;
}
