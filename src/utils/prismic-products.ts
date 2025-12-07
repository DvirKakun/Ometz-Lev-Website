import {
  createPrismicClient,
  handlePrismicError,
  getPrismicText,
  getPrismicImageUrl,
} from "./prismic-config";
import type {
  PrismicProduct,
  ProcessedProduct,
  ProductsData,
  ProcessedProductImage,
} from "../types/products";

// Function to process raw Prismic product data into consumable format
function processProduct(prismicProduct: PrismicProduct): ProcessedProduct {
  const { id, data } = prismicProduct;

  // Process images
  const images: ProcessedProductImage[] = data.product_images
    .map((imageItem) => {
      const url = getPrismicImageUrl(imageItem.product_image);
      if (!url) return null;

      return {
        url,
        alt: imageItem.product_image?.alt || "תמונת מוצר",
      };
    })
    .filter((image): image is ProcessedProductImage => image !== null);

  // Process link - safely check if it's a filled link
  let link = null;
  if (
    data.product_link &&
    "url" in data.product_link &&
    data.product_link.url
  ) {
    link = {
      url: data.product_link.url,
      target:
        ("target" in data.product_link && data.product_link.target) || "_blank",
    };
  }

  return {
    id,
    name: getPrismicText(data.product_name),
    description: getPrismicText(data.product_description),
    images,
    link,
  };
}

// Fetch and process products from Prismic
export async function fetchProducts(): Promise<ProductsData> {
  try {
    const client = createPrismicClient();

    const response = await client.getAllByType("product", {
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });

    const products = response.map((doc) =>
      processProduct(doc as PrismicProduct)
    );

    return { products };
  } catch (error) {
    console.error("Products fetch error:", error);
    handlePrismicError(error, "products");
    return { products: [] };
  }
}
