# Interactive Wall Calendar

A polished, interactive wall-calendar experience built with Next.js (App Router), React, and Tailwind CSS v4.

The goal of this project is to translate a static calendar-inspired design into a responsive, functional product with practical interactions: date range selection, notes, theme switching, and clear visual hierarchy.

## Design Goals

- Recreate a physical wall-calendar feel (hero strip, binding, sheet-like card layout)
- Keep date-range selection intuitive and visually obvious
- Make notes genuinely useful (month-level and selected-range notes)
- Support desktop and mobile usage without feature loss
- Preserve performance and simplicity by keeping business logic in hooks and rendering in components

## Core Features

### Calendar and Navigation

- Previous/next month navigation with arrow controls
- "Today" quick action
- Month/year title and contextual layout transitions
- Monday-first 6x7 date grid including overflow days from adjacent months

### Date Range Selection

- Click flow:
	1. First click sets start date
	2. Second click sets end date
	3. Clicking start/end again resets
- Hover preview while choosing end date
- Distinct states:
	- start and end date chips
	- connected in-range band
	- preview end-ring indicator
	- separate "today" highlight styling

### Notes

- Monthly notes panel (long-form)
- Range-specific note area shown when a valid range is selected
- Character limits with counters
- Local persistence via `localStorage`

### Visual and UX Enhancements

- Hero image section with month-driven imagery
- Spiral/binding-inspired top strip
- Holiday dots on dates + monthly holiday legend
- Light and dark mode toggle
- Theme preference persistence

### Accessibility

- ARIA labels for date cells
- Grid semantics for calendar structure
- Live updates for selected range summary

## Architecture Overview

The implementation separates concerns into reusable hooks + focused presentational components:

- `useCalendar`: month/year navigation and grid generation trigger
- `useDateRange`: range state machine and preview logic
- `useNotes`: note storage and retrieval behavior
- `DateGrid`: date cell rendering, selection visuals, and hover logic
- `WallCalendar`: composition root (header, hero, nav, notes, grid, legend)

This split keeps state transitions predictable and UI changes easy to iterate.

## Project Structure

- `app/page.js`: entry page rendering the calendar
- `app/layout.js`: app shell and global wrappers
- `app/globals.css`: global styles, color tokens, and theme variables
- `app/components/*`: UI building blocks (`WallCalendar`, `DateGrid`, `NotesPanel`, etc.)
- `app/hooks/*`: stateful behavior and persistence
- `app/utils/*`: date helpers and holiday metadata

## Local Development

### Requirements

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open: `http://localhost:3000`

### Production Build

```bash
npm run build
```

### Run Production Build

```bash
npm run start
```

## Implementation Notes

- Theme is applied using CSS custom properties and `data-theme` on the document root
- Notes and theme preferences are persisted in browser storage
- Date labeling is deterministic to avoid hydration mismatches between server and client

## Potential Next Improvements

- Keyboard day navigation and range selection shortcuts
- Drag-to-select range
- Mini month/year picker for faster jumps
- Export selected ranges/notes to `.ics` or JSON
