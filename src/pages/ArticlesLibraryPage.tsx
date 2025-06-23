import { useState } from "react";
import { getArticlesByCategory } from "../data/articles";
import ArticlesLibraryHeader from "../components/sections/articles_library_page/ArticlesLibraryHeader";
import CategoryFilter from "../components/sections/articles_library_page/CategoryFilter";
import ArticlesGrid from "../components/sections/articles_library_page/ArticlesGrid";

const ArticlesLibraryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredArticles = getArticlesByCategory(selectedCategory, "training");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50/30 to-orange-50/50">
      <ArticlesLibraryHeader />
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
      />
      <ArticlesGrid 
        articles={filteredArticles} 
        selectedCategory={selectedCategory} 
      />
    </div>
  );
};

export default ArticlesLibraryPage;