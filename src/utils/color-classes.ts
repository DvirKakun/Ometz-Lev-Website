/**
 * Interactive color utility for filter buttons
 * Handles hex colors from Prismic data
 */

// Unselected state for interactive elements (filters, buttons)
const UNSELECTED_COLOR = "border-slate-300 text-slate-700 hover:bg-slate-50";

/**
 * Get Tailwind CSS classes for interactive elements with selected/unselected states
 * Used for filters, buttons, and toggleable elements
 */
export function getInteractiveColorClasses(
  color: string,
  isSelected: boolean
): string {
  if (isSelected) {
    // If it's a hex color, use CSS custom property approach
    if (color.startsWith("#")) {
      return `bg-[var(--interactive-color)] text-white`;
    }
    // Fallback for default colors like the "all" category
    return "bg-slate-500 text-white";
  }
  return UNSELECTED_COLOR;
}
