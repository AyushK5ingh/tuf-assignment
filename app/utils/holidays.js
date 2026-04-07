/**
 * Static holiday data for Indian national holidays and common observances.
 * Key format: "MM-DD" for fixed-date holidays.
 * Some holidays are approximate (lunar calendar based) — using 2026 dates.
 */

const HOLIDAYS = {
  // Fixed national holidays
  "01-01": { name: "New Year's Day", type: "observance" },
  "01-26": { name: "Republic Day", type: "national" },
  "08-15": { name: "Independence Day", type: "national" },
  "10-02": { name: "Gandhi Jayanti", type: "national" },
  "12-25": { name: "Christmas Day", type: "national" },

  // 2026 approximate dates for lunar holidays
  "01-14": { name: "Makar Sankranti", type: "festival" },
  "03-17": { name: "Holi", type: "festival" },
  "03-30": { name: "Eid al-Fitr", type: "festival" },
  "04-02": { name: "Ram Navami", type: "festival" },
  "04-06": { name: "Mahavir Jayanti", type: "festival" },
  "04-14": { name: "Dr. Ambedkar Jayanti", type: "national" },
  "04-18": { name: "Good Friday", type: "festival" },
  "05-12": { name: "Buddha Purnima", type: "festival" },
  "06-07": { name: "Eid al-Adha", type: "festival" },
  "07-06": { name: "Muharram", type: "festival" },
  "08-19": { name: "Janmashtami", type: "festival" },
  "09-05": { name: "Milad-un-Nabi", type: "festival" },
  "10-01": { name: "Navratri Begins", type: "festival" },
  "10-10": { name: "Dussehra", type: "festival" },
  "10-29": { name: "Diwali", type: "festival" },
  "11-05": { name: "Guru Nanak Jayanti", type: "festival" },
  "11-14": { name: "Children's Day", type: "observance" },
};

/**
 * Gets holiday info for a specific date.
 * @param {Date} date
 * @returns {{ name: string, type: string } | null}
 */
export function getHoliday(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;
  return HOLIDAYS[key] || null;
}

/**
 * Gets all holidays for a given month (0-indexed).
 * @param {number} month
 * @returns {Array<{ day: number, name: string, type: string }>}
 */
export function getHolidaysForMonth(month) {
  const monthStr = String(month + 1).padStart(2, "0");
  const result = [];
  for (const [key, value] of Object.entries(HOLIDAYS)) {
    if (key.startsWith(monthStr + "-")) {
      const day = parseInt(key.split("-")[1], 10);
      result.push({ day, ...value });
    }
  }
  return result.sort((a, b) => a.day - b.day);
}

/**
 * Returns a color for the holiday type.
 */
export function getHolidayColor(type) {
  switch (type) {
    case "national":
      return "#ef4444"; // red
    case "festival":
      return "#f59e0b"; // amber
    case "observance":
      return "#8b5cf6"; // purple
    default:
      return "#94a3b8"; // gray
  }
}
