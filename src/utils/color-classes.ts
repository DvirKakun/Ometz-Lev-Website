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
  orange: "bg-orange-500 text-white",
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
export function getInteractiveColorClasses(color: string, isSelected: boolean): string {
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

/**
 * Check if a color name is valid
 */
export function isValidColor(color: string): boolean {
  return color in COLOR_MAP;
}

/**
 * Get CTA-specific color classes with gradients and special styling
 * Used for Library CTA components that need gradient backgrounds and themed buttons
 */
export function getCTAColorClasses(accentColor: string) {
  const colorMap = {
    red: {
      bg: "from-red-500/5 to-red-600/10",
      pulse: "bg-red-500",
      text: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    accent: {
      bg: "from-accent-500/5 to-orange-600/10",
      pulse: "bg-accent-500",
      text: "text-accent-600",
      button: "bg-accent-600 hover:bg-accent-700",
    },
  };

  return colorMap[accentColor as keyof typeof colorMap] || colorMap.red;
}