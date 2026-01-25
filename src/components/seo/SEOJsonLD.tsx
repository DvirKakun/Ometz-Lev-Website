import { useLocation } from "react-router-dom";
import FaqSchema from "./FaqSchema";
import type { FAQPageType } from "../../types/faq";

interface SEOJsonLDProps {
  title: string;
  description: string;
  keywords?: string;
  pageType?: FAQPageType;
  author?: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  isHomePage?: boolean;
}

export default function SEOJsonLD({
  title,
  description,
  keywords,
  pageType,
  author = "אלעד שמעונוב - אומץ לב",
  imageUrl,
  datePublished,
  dateModified,
  isHomePage = false,
}: SEOJsonLDProps) {
  const location = useLocation();
  const baseUrl = "https://ometzlev.co.il";
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "בית",
        item: baseUrl,
      },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      let name = "";

      // Map paths to Hebrew names
      switch (segment) {
        case "therapy":
          name = "כלבנות טיפולית";
          break;
        case "training":
          name = "אילוף כלבים";
          break;
        case "activities":
          name = "פעילויות ";
          break;
        case "schools":
          name = "תוכנית גפן";
          break;
        case "articles":
          name = "ספריית מאמרים";
          break;
        case "videos":
          name = "ספריית וידאו";
          break;
        case "privacy":
          name = "מדיניות פרטיות";
          break;
        case "terms":
          name = "תנאי שימוש";
          break;
        case "accessibility":
          name = "הצהרת נגישות";
          break;
        default:
          name = segment;
      }

      breadcrumbs.push({
        "@type": "ListItem",
        position: index + 2,
        name,
        item: `${baseUrl}${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  // Website Schema (for homepage)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "אומץ לב - אילוף כלבים מקצועי, כלבנות טיפולית ופעילויות חברתיות",
    alternateName: ["אומץ לב", "Ometz Lev", "אומץ לב אלעד שמעונוב", "Ometz Lev - Elad Shimonov Dog Training & Therapy"],
    url: baseUrl,
    description:
      "אומץ לב - אלעד שמעונוב מאמן כלבים מקצועי ומטפל בכלבנות טיפולית. אומץ לב מציע אילוף כלבים מקצועי, טיפול בעזרת כלבים להתגברות על פחדים, קייטנות קיץ ופעילויות חברתיות לילדים ומבוגרים. אומץ לב - הפתרון המקצועי לכל צרכי הכלב שלכם",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "אומץ לב",
      alternateName: ["אומץ לב אלעד שמעונוב", "Ometz Lev"],
      url: baseUrl,
    },
    inLanguage: "he-IL",
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "אומץ לב - אילוף כלבים מקצועי, כלבנות טיפולית ופעילויות חברתיות",
    alternateName: ["אומץ לב", "Ometz Lev", "אומץ לב אלעד שמעונוב", "Ometz Lev - Elad Shimonov"],
    url: baseUrl,
    logo: `${baseUrl}/favicon-512x512.png`, // Square logo required by Google (512x512)
    image: [
      `${baseUrl}/favicon-512x512.png`, // Square logo for circular icons
      `${baseUrl}/assets/icons/Ometz-Lev-Large-Logo.png`  // Wide banner for knowledge panel & rich results
    ],
    description:
      "אומץ לב - אלעד שמעונוב מאמן כלבים מקצועי ומטפל בכלבנות טיפולית. אומץ לב מתמחה באילוף כלבים, טיפול בחרדות ופחדים בעזרת כלבים טיפוליים, וקייטנות קיץ לילדים. אומץ לב - השירות המקצועי והאמין לכלב שלכם",
    telephone: "+972-52-472-4700",
    founder: {
      "@type": "Person",
      name: "אלעד שמעונוב",
      alternateName: "Elad Shimonov",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
      addressLocality: "ישראל",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+972-52-472-4700", // Replace with actual phone when available
        contactType: "customer service",
        areaServed: "IL",
        availableLanguage: ["Hebrew", "English"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/share/1BZ6LUVmqB/",
      "https://www.instagram.com/eladshimoniv_omets_lev",
      "https://youtube.com/@eladshimonov6820?si=4vYpdv5hN_Mox1tU",
    ],
    serviceArea: {
      "@type": "Country",
      name: "Israel",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "שירותי אילוף כלבים וכלבנות טיפולית של אלעד שמעונוב",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "אילוף כלבים מקצועי ואישי",
            description:
              "אילוף כלבים מקצועי בבית הלקוח, פתרון בעיות התנהגות ואילוף ציות",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "כלבנות טיפולית להתגברות על פחדים",
            description:
              "טיפול בעזרת כלבים טיפוליים להתגברות על חרדות, פחדים ובעיות רגשיות",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "קייטנות קיץ ופעילויות חברתיות",
            description:
              "קייטנות קיץ לילדים עם כלבים, פעילויות חברתיות ותכניות חינוכיות",
          },
        },
      ],
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: generateBreadcrumbs(),
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: currentUrl,
    inLanguage: "he-IL",
    isPartOf: {
      "@type": "WebSite",
      name: "אומץ לב - אילוף כלבים מקצועי, כלבנות טיפולית ופעילויות חברתיות",
      url: baseUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: generateBreadcrumbs(),
    },
    ...(author && { author: { "@type": "Organization", name: author } }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(imageUrl && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
        description: title,
      },
    }),
    ...(keywords && { keywords: keywords.split(",").map((k) => k.trim()) }),
  };

  // Article Schema (for content pages)
  const articleSchema =
    pageType && !isHomePage
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          author: {
            "@type": "Person",
            name: "אלעד שמעונוב",
            alternateName: "Elad Shimonov",
            url: baseUrl,
          },
          publisher: {
            "@type": "Person",
            name: "אלעד שמעונוב - אומץ לב",
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/favicon-512x512.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": currentUrl,
          },
          ...(datePublished && { datePublished }),
          ...(dateModified && { dateModified }),
          ...(imageUrl && {
            image: {
              "@type": "ImageObject",
              url: imageUrl,
              description: title,
            },
          }),
          inLanguage: "he-IL",
        }
      : null;

  return (
    <>
      {/* Organization Schema - ALL PAGES (required for logo in search results) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Website Schema - only on homepage */}
      {isHomePage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}

      {/* Breadcrumb Schema - all pages except homepage */}
      {!isHomePage && location.pathname !== "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* WebPage Schema - all pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Article Schema - content pages */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* FAQ Schema - pages with FAQ */}
      {pageType && <FaqSchema pageType={pageType} />}
    </>
  );
}
