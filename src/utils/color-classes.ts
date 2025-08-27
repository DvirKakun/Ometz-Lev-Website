/**
 * Centralized color mapping utility for consistent colors across the application
 * This utility provides Tailwind CSS classes for different color names
 */

// Base color mapping - maps color names to Tailwind CSS classes
const COLOR_MAP = {
  slate: "bg-slate-500 text-white",
  blue: "bg-blue-500 text-white",
  red: "bg-red-500 text-white",
  green: "bg-green-500 text-white",
  purple: "bg-purple-500 text-white",
  pink: "bg-pink-500 text-white",
  indigo: "bg-indigo-500 text-white",
  yellow: "bg-yellow-500 text-white",
  teal: "bg-teal-500 text-white",
  cyan: "bg-cyan-500 text-white",
  emerald: "bg-emerald-500 text-white",
  rose: "bg-rose-500 text-white",
  amber: "bg-amber-500 text-white",
  violet: "bg-violet-500 text-white",
  sky: "bg-sky-500 text-white",
  lime: "bg-lime-500 text-white",
  fuchsia: "bg-fuchsia-500 text-white",
  ruby: "bg-red-600 text-white",
  sapphire: "bg-blue-600 text-white",
  mint: "bg-emerald-400 text-white",
} as const;

// Default fallback color
const DEFAULT_COLOR = "bg-slate-500 text-white";

// Unselected state for interactive elements (filters, buttons)
const UNSELECTED_COLOR = "border-slate-300 text-slate-700 hover:bg-slate-50";

/**
 * Get Tailwind CSS classes for a color name
 * Used for badges, pills, and backgrounds
 */
export function getColorClasses(color: string): string {
  return COLOR_MAP[color as keyof typeof COLOR_MAP] || DEFAULT_COLOR;
}

/**
 * Get Tailwind CSS classes for interactive elements with selected/unselected states
 * Used for filters, buttons, and toggleable elements
 */
export function getInteractiveColorClasses(
  color: string,
  isSelected: boolean
): string {
  if (isSelected) {
    return getColorClasses(color);
  }
  return UNSELECTED_COLOR;
}

/**
 * Get available color names
 * Useful for TypeScript typing or validation
 */
export function getAvailableColors(): string[] {
  return Object.keys(COLOR_MAP);
}
