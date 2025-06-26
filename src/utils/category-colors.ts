// 15 predefined colors for categories
const CATEGORY_COLORS = [
  "slate", "blue", "red", "green", "orange", 
  "purple", "pink", "indigo", "yellow", "teal",
  "cyan", "emerald", "rose", "amber", "violet"
] as const;

// Simple hash function for consistent color assignment
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Assigns a consistent color to a category based on its name
 * Same category name will always get the same color
 */
export function getCategoryColor(categoryName: string): string {
  const hash = hashString(categoryName.toLowerCase().trim());
  const colorIndex = hash % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[colorIndex];
}

/**
 * Get all available colors for reference
 */
export function getAvailableColors(): readonly string[] {
  return CATEGORY_COLORS;
}