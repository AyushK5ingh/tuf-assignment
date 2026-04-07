"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getMonthKey, getRangeKey } from "../utils/dateUtils";

const STORAGE_KEY = "wall-calendar-notes";

/**
 * Custom hook for notes persistence with localStorage.
 * Supports both monthly notes and range-specific notes.
 */
export function useNotes(year, month, startDate, endDate) {
  const [allNotes, setAllNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimer = useRef(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAllNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load notes from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Debounced save to localStorage
  const saveToStorage = useCallback((notes) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn("Failed to save notes to localStorage:", e);
      }
    }, 300);
  }, []);

  // Get the current month's note
  const monthKey = getMonthKey(year, month);
  const monthNote = allNotes[monthKey] || "";

  // Get the current range's note (if a range is selected)
  const rangeKey = getRangeKey(startDate, endDate);
  const rangeNote = rangeKey ? allNotes[rangeKey] || "" : "";

  const setMonthNote = useCallback(
    (text) => {
      const updated = { ...allNotes, [monthKey]: text };
      setAllNotes(updated);
      saveToStorage(updated);
    },
    [allNotes, monthKey, saveToStorage]
  );

  const setRangeNote = useCallback(
    (text) => {
      if (!rangeKey) return;
      const updated = { ...allNotes, [rangeKey]: text };
      setAllNotes(updated);
      saveToStorage(updated);
    },
    [allNotes, rangeKey, saveToStorage]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, []);

  return {
    monthNote,
    setMonthNote,
    rangeNote,
    setRangeNote,
    isLoaded,
  };
}
