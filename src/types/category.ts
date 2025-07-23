export interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onClearFilters: () => void;
  pageType: "training" | "therapy";
}

export interface MultipleCategoryFilterProps {
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearFilters: () => void;
  pageType: "training" | "therapy";
}
