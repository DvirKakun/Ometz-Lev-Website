import { useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ShoppingBag, ExternalLink } from "lucide-react";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import type { ProductsPageConfig } from "../types/library";
import { getKeywordsForPage } from "../data/seo-keywords";
import LoadingSpinner from "../components/common/StateLoadingSpinner";
import StateDisplay from "../components/common/StateDisplay";
import { useProducts } from "../hooks/useProducts";
import { useRouterModal } from "../hooks/useRouterModal";
import ImageDialog from "../components/sections/activities_page/ImageDialog";
import ProductCarousel from "../components/sections/products_page/ProductCarousel";
import { FAQSection } from "../components/sections/shared/faq";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface ProductsPageProps {
  config: ProductsPageConfig;
}

export default function ProductsPage({ config }: ProductsPageProps) {
  // Modal hook for image viewing
  const imageModal = useRouterModal<{
    imageUrl: string;
    alt: string;
    imageIndex: number;
    totalImages: number;
  }>({ modalKey: "image" });

  // SEO Configuration for Products Page
  const seoConfig = {
    title: "מוצרים | אלעד שמעונוב - אומץ לב",
    description:
      "גלה את מגוון המוצרים המומלצים של אלעד שמעונוב. מוצרי איכות לאילוף כלבים, כלבנות טיפולית ופעילויות חינוכיות. הזמינו עכשיו בלחיצה!",
    keywords: getKeywordsForPage("products"),
    imageUrl: "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "מוצרים מומלצים לאילוף כלבים וכלבנות טיפולית",
  };

  // Use React Query for data fetching with caching
  const {
    data: productsData,
    isLoading: loading,
    error,
    refetch,
  } = useProducts();

  const products = productsData?.products || [];

  const handleImageClick = useCallback(
    (imageUrl: string, index: number, alt: string, totalImages: number) => {
      imageModal.openModal({
        imageUrl,
        alt,
        imageIndex: index,
        totalImages,
      });
    },
    [imageModal]
  );

  const handleProductLink = useCallback((url: string, target: string) => {
    window.open(url, target);
  }, []);

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <LoadingSpinner
          title="טוען מוצרים..."
          description="אנא המתן בזמן שאנחנו מביאים עבורך את המוצרים העדכניים"
        />
      );
    }

    if (error) {
      return (
        <StateDisplay
          icon={AlertCircle}
          title="שגיאה בטעינת המוצרים"
          description={
            error instanceof Error ? error.message : "שגיאה בטעינת המוצרים"
          }
          iconClassName="w-12 h-12 text-red-500 mb-4"
          showAction={true}
          actionText="נסה שוב"
          actionVariant="default"
          onAction={() => refetch()}
        />
      );
    }

    if (products.length === 0) {
      return (
        <StateDisplay
          icon={ShoppingBag}
          title="אין מוצרים זמינים כרגע"
          description="כרגע אין מוצרים מומלצים. אנא חזור שוב בקרוב לעדכונים נוספים."
          iconClassName="w-16 h-16 text-gray-400 mb-6"
        />
      );
    }

    // Success state - render products grid
    return (
      <section className="py-6 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-start auto-rows-min">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <Card className="h-full shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4 h-full flex flex-col">
                      {/* Product Images Carousel */}
                      {product.images.length > 0 && (
                        <ProductCarousel
                          images={product.images}
                          onImageClick={(imageUrl, index) =>
                            handleImageClick(
                              imageUrl,
                              index,
                              product.images[index]?.alt || product.name,
                              product.images.length
                            )
                          }
                          className="mb-3 sm:mb-4"
                        />
                      )}

                      {/* Product Name */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 text-right leading-tight">
                        {product.name}
                      </h3>

                      {/* Product Description */}
                      <div className="flex-1 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-600 text-right leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Purchase Button */}
                      {product.link && (
                        <Button
                          onClick={() =>
                            handleProductLink(
                              product.link!.url,
                              product.link!.target
                            )
                          }
                          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 mt-auto"
                          size="sm"
                        >
                          לקנייה
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
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
        type="service"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType="products"
        imageUrl={seoConfig.imageUrl}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* SEO H1 - Hidden from users but visible to search engines */}
        <h1 className="sr-only">
          מוצרים מומלצים לאילוף כלבים וכלבנות טיפולית - אלעד שמעונוב | אומץ לב
        </h1>

        {/* Header Section */}
        <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {config.title}
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {config.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Content */}
        {renderContent()}

        {/* FAQ Section */}
        <FAQSection pageType="products" />
      </motion.div>

      {/* Image Modal */}
      {imageModal.modalData && (
        <ImageDialog
          isOpen={imageModal.isOpen}
          onClose={imageModal.closeModal}
          imageUrl={imageModal.modalData.imageUrl}
          alt={imageModal.modalData.alt}
          imageIndex={imageModal.modalData.imageIndex}
          totalImages={imageModal.modalData.totalImages}
        />
      )}
    </>
  );
}
