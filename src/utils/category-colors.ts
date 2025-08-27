// 24 predefined colors for categories with better variety and distinction
const CATEGORY_COLORS = [
  "slate",
  "blue",
  "red",
  "green",
  "purple",
  "pink",
  "indigo",
  "yellow",
  "teal",
  "cyan",
  "emerald",
  "rose",
  "amber",
  "violet",
  "sky",
  "lime",
  "fuchsia",
  "ruby",
  "sapphire",
  "mint",
] as const;

// Comprehensive hash function for consistent color assignment with low collision rate
function hashString(str: string): number {
  // Normalize the string to reduce similar inputs
  const normalized = str.toLowerCase().trim().replace(/\s+/g, " ");

  // Use xxHash-inspired algorithm with multiple mixing steps
  const PRIME1 = 2654435761;
  const PRIME2 = 2246822519;
  const PRIME3 = 3266489917;
  const PRIME4 = 668265263;
  const PRIME5 = 374761393;

  let hash = PRIME5;

  // Process each character with position weighting
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);

    // Weight characters by their position to make order matter more
    const positionWeight = (i + 1) * PRIME4;
    const weightedChar = char + positionWeight;

    hash ^= weightedChar;
    hash = ((hash << 13) | (hash >>> 19)) >>> 0; // Rotate left 13 bits
    hash = (hash * PRIME1 + PRIME2) >>> 0;
  }

  // Additional avalanche mixing with different primes
  hash ^= normalized.length;
  hash ^= hash >>> 16;
  hash = (hash * PRIME3) >>> 0;
  hash ^= hash >>> 13;
  hash = (hash * PRIME1) >>> 0;
  hash ^= hash >>> 16;
  hash = (hash * PRIME2) >>> 0;
  hash ^= hash >>> 15;

  // Final mixing with character sum for extra variation
  let charSum = 0;
  for (let i = 0; i < normalized.length; i++) {
    charSum += normalized.charCodeAt(i) * (i + 1);
  }
  hash ^= charSum;
  hash = (hash * PRIME5) >>> 0;

  return Math.abs(hash);
}

/**
 * Assigns a consistent color to a category based on its name
 * Same category name will always get the same color
 */
export function getCategoryColor(categoryName: string): string {
  // Use multiple hash rounds with different seeds to reduce collision probability
  const normalized = categoryName.toLowerCase().trim();

  let hash1 = hashString(normalized);
  let hash2 = hashString(normalized + "_seed2");
  let hash3 = hashString(normalized + "_seed3");

  // Combine multiple hashes for better distribution
  const combinedHash = hash1 ^ (hash2 << 8) ^ (hash3 << 16);

  // Use a non-modulo approach for better distribution
  const normalized32 = combinedHash >>> 0; // Ensure positive 32-bit
  const colorIndex = Math.floor(
    (normalized32 / 0xffffffff) * CATEGORY_COLORS.length
  );
  if (categoryName === "מתקדמים") console.log(CATEGORY_COLORS[colorIndex]);
  return CATEGORY_COLORS[colorIndex];
}

/**
 * Get all available colors for reference
 */
export function getAvailableColors(): readonly string[] {
  return CATEGORY_COLORS;
}
