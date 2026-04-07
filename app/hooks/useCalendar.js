"use client";

import { useState, useMemo, useCallback } from "react";
import { buildCalendarGrid } from "../utils/dateUtils";

/**
 * Custom hook for calendar navigation and grid computation.
 */
export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null); // "next" | "prev"

  const grid = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  const navigate = useCallback(
    (direction) => {
      if (isAnimating) return;

      setAnimationDirection(direction);
      setIsAnimating(true);

      // After flip-out animation, update month
      setTimeout(() => {
        if (direction === "next") {
          if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
          } else {
            setMonth((m) => m + 1);
          }
        } else {
          if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
          } else {
            setMonth((m) => m - 1);
          }
        }
        // After flip-in animation completes
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationDirection(null);
        }, 350);
      }, 300);
    },
    [month, isAnimating]
  );

  const goToNext = useCallback(() => navigate("next"), [navigate]);
  const goToPrev = useCallback(() => navigate("prev"), [navigate]);

  const goToToday = useCallback(() => {
    const t = new Date();
    setYear(t.getFullYear());
    setMonth(t.getMonth());
  }, []);

  const goToMonth = useCallback((newYear, newMonth) => {
    setYear(newYear);
    setMonth(newMonth);
  }, []);

  return {
    year,
    month,
    grid,
    goToNext,
    goToPrev,
    goToToday,
    goToMonth,
    isAnimating,
    animationDirection,
  };
}
