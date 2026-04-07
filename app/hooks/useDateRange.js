"use client";

import { useState, useCallback } from "react";
import { isSameDay, isDateInRange } from "../utils/dateUtils";

/**
 * State machine for date range selection.
 * States: idle → selecting (start set) → selected (start + end set)
 * Click pattern: click1=start, click2=end, click3=reset
 */
export function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectionState, setSelectionState] = useState("idle"); // idle | selecting | selected

  const handleDateClick = useCallback(
    (date) => {
      switch (selectionState) {
        case "idle":
          setStartDate(date);
          setEndDate(null);
          setSelectionState("selecting");
          break;

        case "selecting":
          // Ensure start ≤ end
          if (date.getTime() < startDate.getTime()) {
            setEndDate(startDate);
            setStartDate(date);
          } else {
            setEndDate(date);
          }
          setSelectionState("selected");
          break;

        case "selected":
          // If clicking start or end again, reset
          if (isSameDay(date, startDate) || isSameDay(date, endDate)) {
            setStartDate(null);
            setEndDate(null);
            setSelectionState("idle");
          } else {
            // Start new selection
            setStartDate(date);
            setEndDate(null);
            setSelectionState("selecting");
          }
          break;

        default:
          break;
      }
    },
    [selectionState, startDate, endDate]
  );

  const handleDateHover = useCallback(
    (date) => {
      if (selectionState === "selecting") {
        setHoveredDate(date);
      }
    },
    [selectionState]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoveredDate(null);
    setSelectionState("idle");
  }, []);

  const isStart = useCallback(
    (date) => isSameDay(date, startDate),
    [startDate]
  );

  const isEnd = useCallback(
    (date) => isSameDay(date, endDate),
    [endDate]
  );

  const isInRange = useCallback(
    (date) => {
      if (selectionState === "selected" && startDate && endDate) {
        return (
          isDateInRange(date, startDate, endDate) &&
          !isSameDay(date, startDate) &&
          !isSameDay(date, endDate)
        );
      }
      return false;
    },
    [selectionState, startDate, endDate]
  );

  const isInPreviewRange = useCallback(
    (date) => {
      if (selectionState === "selecting" && startDate && hoveredDate) {
        return (
          isDateInRange(date, startDate, hoveredDate) &&
          !isSameDay(date, startDate) &&
          !isSameDay(date, hoveredDate)
        );
      }
      return false;
    },
    [selectionState, startDate, hoveredDate]
  );

  const isPreviewEnd = useCallback(
    (date) => {
      if (selectionState === "selecting" && hoveredDate) {
        return isSameDay(date, hoveredDate);
      }
      return false;
    },
    [selectionState, hoveredDate]
  );

  return {
    startDate,
    endDate,
    hoveredDate,
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
  };
}
