import { useState } from "react";
import {
  useArticlesByMultipleCategories,
  useArticles,
} from "../hooks/useArticles";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import MultipleCategoryFilter from "../components/sections/shared/filters/MultipleCategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../data/seo-keywords";
import type { ArticlesLibraryPageProps } from "../types/library";

const ArticlesLibraryPage = ({ config }: ArticlesLibraryPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);

  // SEO Configuration
  const getSEOConfig = (pageType: string) => {
    const seoData = {
      training: {
        title:
          "מאמרי אילוף כלבים | מדריכים וטיפים מקצועיים | אלעד שמעונוב - אומץ לב",
        description:
          "מאמרי הדרכה מקצועיים לאילוף כלבים מאת אלעד שמעונוב. מדריכים מפורטים, טכניקות מתקדמות ועצות מומחים לפתרון כל בעיה התנהגותית. קיראו עכשיו!",
        keywords: getKeywordsForPage("training"),
        imageAlt: "מאמרי אילוף כלבים מקצועיים מאת אלעד שמעונוב",
      },
      therapy: {
        title:
          "מאמרי כלבנות טיפולית | מדריכים טיפוליים מקצועיים | אלעד שמעונוב - אומץ לב",
        description:
          "מאמרים מקצועיים על כלבנות טיפולית מאת אלעד שמעונוב. שיטות טיפול, עבודה עם חרדות וטכניקות לשיקום רגשי וחברתי עם כלבים מאומנים. קיראו עכשיו!",
        keywords: getKeywordsForPage("therapy"),
        imageAlt: "מאמרי כלבנות טיפולית מקצועיים מאת אלעד שמעונוב",
      },
    } as const;
    return seoData[pageType as keyof typeof seoData] || seoData.training;
  };

  const seoConfig = {
    ...getSEOConfig(config.pageType),
    imageUrl:
      "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
  };

  const {
    data: filteredArticles = [],
    isLoading,
    error,
  } = useArticlesByMultipleCategories(selectedCategories, config.pageType);

  // Get total articles count for empty state
  const { data: totalArticles = [] } = useArticles(config.pageType);

  // Determine if there are active filters
  const hasActiveFilters =
    !selectedCategories.includes("all") && selectedCategories.length > 0;

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (categoryId === "all") {
        // If "All" is clicked, select only "All" and clear others
        return ["all"];
      } else {
        // If any other category is clicked
        const hasAll = prev.includes("all");
        const hasCategory = prev.includes(categoryId);

        if (hasAll) {
          // If "All" was selected, remove it and add the clicked category
          return [categoryId];
        } else if (hasCategory) {
          // Remove the category if it's already selected
          const newSelection = prev.filter((id) => id !== categoryId);
          // If no categories remain, default to "All"
          return newSelection.length === 0 ? ["all"] : newSelection;
        } else {
          // Add the category to selection
          return [...prev, categoryId];
        }
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories(["all"]);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        type="article"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType={config.pageType as "training" | "therapy"}
        imageUrl={seoConfig.imageUrl}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/30">
        <LibraryHeader config={config} />
        <MultipleCategoryFilter
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearFilters={handleClearFilters}
          pageType={config.pageType}
        />
        <ArticlesGrid
          articles={filteredArticles}
          selectedCategory={
            selectedCategories.length === 0 ? "all" : "multiple"
          }
          isLoading={isLoading}
          error={error}
          hasActiveFilters={hasActiveFilters}
          totalArticlesCount={totalArticles.length}
          pageType={config.pageType as "training" | "therapy"}
        />
      </div>
    </>
  );
};

export default ArticlesLibraryPage;
