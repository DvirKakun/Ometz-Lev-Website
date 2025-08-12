import { useState, useEffect } from "react";
import { useArticlesByMultipleCategories, useArticles } from "../hooks/useArticles";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import MultipleCategoryFilter from "../components/sections/articles_library_page/MultipleCategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";
import type { ArticlesLibraryPageProps } from "../types/library";

const ArticlesLibraryPage = ({ config }: ArticlesLibraryPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
  
  // SEO metadata setup
  useEffect(() => {
    const seoData = {
      training: {
        title: "מאמרי אילוף כלבים | מדריכים וטיפים מקצועיים | אומץ לב",
        description: "קיראו מאמרי הדרכה מקצועיים לאילוף כלבים. מדריכים מפורטים, טכניקות מתקדמות ועצות מעמליים מומחים לפתרון כל בעיה התנהגותית."
      },
      therapy: {
        title: "מאמרי טיפול בכלבים | מדריכים טיפוליים מקצועיים | אומץ לב",
        description: "קיראו מאמרים מקצועיים על טיפול באמצעות כלבים. שיטות טיפול, עבודה עם חרדות וטכניקות לשיקום רגשי וחברתי עם כלבים מאומנים."
      }
    };

    const currentSEO = seoData[config.pageType];
    document.title = currentSEO.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", currentSEO.description);
    }
  }, [config.pageType]);

  const { 
    data: filteredArticles = [], 
    isLoading, 
    error 
  } = useArticlesByMultipleCategories(selectedCategories, config.pageType);
  
  // Get total articles count for empty state
  const { data: totalArticles = [] } = useArticles(config.pageType);
  
  // Determine if there are active filters
  const hasActiveFilters = !selectedCategories.includes("all") && selectedCategories.length > 0;

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
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
          const newSelection = prev.filter(id => id !== categoryId);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-orange-50/50">
      <LibraryHeader config={config} />
      <MultipleCategoryFilter
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onClearFilters={handleClearFilters}
        pageType={config.pageType}
      />
      <ArticlesGrid
        articles={filteredArticles}
        selectedCategory={selectedCategories.length === 0 ? "all" : "multiple"}
        isLoading={isLoading}
        error={error}
        hasActiveFilters={hasActiveFilters}
        totalArticlesCount={totalArticles.length}
      />
    </div>
  );
};

export default ArticlesLibraryPage;
