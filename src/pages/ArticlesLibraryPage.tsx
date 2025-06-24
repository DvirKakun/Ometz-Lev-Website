import { useState } from "react";
import { getArticlesByCategory } from "../data/articles";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import CategoryFilter from "../components/sections/articles_library_page/CategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";
import type { ArticlesLibraryPageProps } from "../types/library";

const ArticlesLibraryPage = ({ config }: ArticlesLibraryPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredArticles = getArticlesByCategory(
    selectedCategory,
    config.pageType
  );

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
      />
    </div>
  );
};

export default ArticlesLibraryPage;
