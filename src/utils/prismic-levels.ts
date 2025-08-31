import type { PrismicDocument } from "@prismicio/client";
import type { Level } from "../types/levels";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Default "all" level
const DEFAULT_ALL_LEVEL = {
  id: "all",
  name: "כל הרמות",
  color: "#64748b",
};

// Type for the complete Prismic level document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicLevel = PrismicDocument<Record<string, any>>;

// Transform Prismic level to our format using color from API
export function mapPrismicLevel(prismicLevel: PrismicLevel): Level {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicLevel.data as any;

  const name = getPrismicText(data.name[0].text) || "";
  const color = data.color || "#64748b"; // Use color from Prismic or fallback to slate

  return {
    id: String(prismicLevel.id),
    name,
    color,
  };
}

// Fetch all levels from Prismic
export async function fetchLevelsFromPrismic(): Promise<Level[]> {
  try {
    const client = createPrismicClient();
    const response = await client.getAllByType("level");

    if (!response || !Array.isArray(response) || response.length === 0) {
      return [DEFAULT_ALL_LEVEL];
    }

    const levels = response.map(mapPrismicLevel);
    return [DEFAULT_ALL_LEVEL, ...levels];
  } catch (error) {
    handlePrismicError(error, "levels");
    return [DEFAULT_ALL_LEVEL];
  }
}
