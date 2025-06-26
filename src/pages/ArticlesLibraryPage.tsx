import { useState } from "react";
import { useArticlesByCategory } from "../hooks/useArticles";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import CategoryFilter from "../components/sections/articles_library_page/CategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";
import type { ArticlesLibraryPageProps } from "../types/library";

const ArticlesLibraryPage = ({ config }: ArticlesLibraryPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { 
    data: filteredArticles = [], 
    isLoading, 
    error 
  } = useArticlesByCategory(selectedCategory, config.pageType);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50/30 to-orange-50/50">
      <LibraryHeader config={config} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        pageType={config.pageType}
      />
      <ArticlesGrid
        articles={filteredArticles}
        selectedCategory={selectedCategory}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ArticlesLibraryPage;
