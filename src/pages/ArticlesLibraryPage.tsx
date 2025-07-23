import { useState } from "react";
import { useArticlesByMultipleCategories } from "../hooks/useArticles";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import MultipleCategoryFilter from "../components/sections/articles_library_page/MultipleCategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";
import type { ArticlesLibraryPageProps } from "../types/library";

const ArticlesLibraryPage = ({ config }: ArticlesLibraryPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
  const { 
    data: filteredArticles = [], 
    isLoading, 
    error 
  } = useArticlesByMultipleCategories(selectedCategories, config.pageType);

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
    <div className="min-h-screen bg-gradient-to-br from-accent-50/30 to-orange-50/50">
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
      />
    </div>
  );
};

export default ArticlesLibraryPage;
