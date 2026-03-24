import type { Handler } from "@netlify/functions";
import * as prismic from "@prismicio/client";

const BASE_URL = "https://ometzlev.co.il";

// Static pages configuration
const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/training", changefreq: "monthly", priority: "0.9" },
  { path: "/therapy", changefreq: "monthly", priority: "0.9" },
  { path: "/activities", changefreq: "weekly", priority: "0.9" },
  { path: "/schools", changefreq: "monthly", priority: "0.9" },
  { path: "/products", changefreq: "weekly", priority: "0.7" },
  { path: "/training-videos-library", changefreq: "weekly", priority: "0.8" },
  { path: "/training-articles-library", changefreq: "weekly", priority: "0.8" },
  { path: "/therapy-videos-library", changefreq: "weekly", priority: "0.8" },
  { path: "/therapy-articles-library", changefreq: "weekly", priority: "0.8" },
];

/**
 * Format date to YYYY-MM-DD for sitemap
 */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return new Date().toISOString().split("T")[0];
  }
  return dateString.split("T")[0];
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate sitemap XML dynamically from Prismic content
 */
export const handler: Handler = async () => {
  try {
    const prismicEndpoint = process.env.VITE_PRISMIC_API_ENDPOINT;

    if (!prismicEndpoint) {
      console.error("VITE_PRISMIC_API_ENDPOINT not configured");
      return {
        statusCode: 500,
        body: "Prismic endpoint not configured",
      };
    }

    const client = prismic.createClient(prismicEndpoint);

    // Start building XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Add static pages
    const today = new Date().toISOString().split("T")[0];
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${escapeXml(BASE_URL + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Fetch all articles from Prismic
    try {
      const articles = await client.getAllByType("article");

      for (const article of articles) {
        const page = article.data.page as string;
        const pageType =
          page === "אילוף כלבים" || page === "training" ? "training" : "therapy";
        const lastmod = formatDate(article.last_publication_date);

        xml += `
  <url>
    <loc>${escapeXml(`${BASE_URL}/${pageType}-articles-library/${article.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    } catch (articleError) {
      console.error("Error fetching articles:", articleError);
      // Continue without articles if fetch fails
    }

    // Close XML
    xml += `
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
      body: xml,
    };
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain",
      },
      body: `Error generating sitemap: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
