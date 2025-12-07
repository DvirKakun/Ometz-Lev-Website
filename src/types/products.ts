import type { ImageField, RichTextField, LinkField, PrismicDocument } from "@prismicio/types";

// Raw Prismic Product structure
export interface PrismicProductData {
  product_name: RichTextField;
  product_images: Array<{
    product_image: ImageField;
  }>;
  product_description: RichTextField;
  product_link: LinkField;
}

export type PrismicProduct = PrismicDocument<PrismicProductData & Record<string, any>, string, string>;

// Processed product image for easier consumption
export interface ProcessedProductImage {
  url: string;
  alt: string;
}

// Processed product for easier consumption
export interface ProcessedProduct {
  id: string;
  name: string;
  description: string;
  images: ProcessedProductImage[];
  link: {
    url: string;
    target: string;
  } | null;
}

// Hook return type
export interface ProductsData {
  products: ProcessedProduct[];
}