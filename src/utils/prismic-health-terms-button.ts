import { createPrismicClient, handlePrismicError, getPrismicTitle } from "./prismic-config";
import type { HealthTermsButton } from "../types/health_terms_button";

// Transform Prismic health terms button to our format
export function mapPrismicHealthTermsButton(
  prismicData: any
): HealthTermsButton {
  return {
    title: getPrismicTitle(prismicData.title),
    link: prismicData.link,
  };
}

// Fetch health terms button from Prismic
export async function fetchHealthTermsButtonFromPrismic(): Promise<HealthTermsButton | null> {
  try {
    const client = createPrismicClient();

    // Get the single health declaration button document
    const response = await client.getSingle("health_declaration_button");

    if (!response || !response.data) {
      return null;
    }

    return mapPrismicHealthTermsButton(response.data);
  } catch (error) {
    handlePrismicError(error, "health terms button");
    return null;
  }
}