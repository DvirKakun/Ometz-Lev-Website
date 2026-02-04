import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { useArticles } from "../hooks/useArticles";
import PDFViewerHeader from "../components/sections/pdf_viewer/PDFViewerHeader";
import PDFControls from "../components/sections/pdf_viewer/PDFControls";
import PDFDocument from "../components/sections/pdf_viewer/PDFDocument";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ArticlePDFViewerPageProps {
  pageType: "training" | "therapy";
}

export default function ArticlePDFViewerPage({
  pageType,
}: ArticlePDFViewerPageProps) {
  const { articleKey } = useParams<{ articleKey: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: articles = [], isLoading } = useArticles(pageType);

  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.0);

  // Calculate PDF page width based on screen size
  const calculatePageWidth = () => {
    const screenWidth = window.innerWidth;
    // Account for padding: px-2 (16px), sm:px-4 (32px), md:px-6 (48px)
    const padding = screenWidth < 640 ? 32 : screenWidth < 768 ? 48 : 64;
    const maxWidth = 800;
    return Math.min(maxWidth, screenWidth - padding);
  };

  // Find the article
  const article = articles.find((a) => a.articleKey === articleKey);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(2.0, prev + 0.1));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.1));
  };

  const handleDownload = () => {
    if (article?.url) {
      window.open(article.url, "_blank");
    }
  };

  const handleClose = () => {
    const scrollPosition = location.state?.scrollPosition || 0;
    const returnPath = location.state?.returnPath;

    if (returnPath) {
      // Navigate to the specific return path with scroll restoration
      navigate(returnPath, {
        state: {
          scrollPosition,
          returnFromPDF: true,
        },
      });
    } else {
      // Fallback to browser back navigation
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-slate-600 text-sm sm:text-base">טוען מדריך...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-2">
            המדריך לא נמצא
          </h2>
          <button
            onClick={handleClose}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
          >
            חזרה לרשימת המדריכים
          </button>
        </div>
      </div>
    );
  }

  if (!article.url) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            קובץ PDF לא זמין
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">
            המדריך אינו כולל קובץ PDF
          </p>
          <button
            onClick={handleClose}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
          >
            חזרה לרשימת המדריכים
          </button>
        </div>
      </div>
    );
  }

  // SEO Configuration
  const pageTypeLabel = pageType === "training" ? "אילוף" : "טיפול";
  const seoConfig = {
    title: `${article.title} | מדריך ${pageTypeLabel} | אלעד שמעונוב - אומץ לב`,
    description:
      article.description ||
      `מדריך מקצועי בנושא ${article.title} מאת אלעד שמעונוב. קרא עכשיו ולמד טכניקות מתקדמות ועצות מומחים.`,
    canonicalUrl: `https://ometzlev.co.il/${pageType === "training" ? "training" : "therapy"}-articles-library/${article.articleKey}`,
    imageUrl: "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: article.title,
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        canonicalUrl={seoConfig.canonicalUrl}
        type="article"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        pageType={pageType}
        imageUrl={seoConfig.imageUrl}
      />

      <div className="min-h-screen bg-slate-50 overflow-x-hidden">
        <PDFViewerHeader
          title={article.title}
          description={article.description}
          onClose={handleClose}
          onDownload={handleDownload}
        />

        <PDFControls
          scale={scale}
          numPages={numPages}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />

        <PDFDocument
          url={article.url}
          scale={scale}
          numPages={numPages}
          onLoadSuccess={onDocumentLoadSuccess}
          calculatePageWidth={calculatePageWidth}
        />
      </div>
    </>
  );
}
