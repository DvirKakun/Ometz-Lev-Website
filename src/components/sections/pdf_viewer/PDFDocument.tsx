import { motion } from "framer-motion";
import { Document, Page } from "react-pdf";

interface PDFDocumentProps {
  url: string;
  scale: number;
  numPages: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  calculatePageWidth: () => number;
}

export default function PDFDocument({
  url,
  scale,
  numPages,
  onLoadSuccess,
  calculatePageWidth,
}: PDFDocumentProps) {
  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 pb-8 sm:pb-12 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 sm:gap-4 max-w-4xl mx-auto w-full"
        dir="ltr"
      >
        <Document
          file={url}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-600"></div>
            </div>
          }
          error={
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center px-4">
                <p className="text-red-600 font-medium mb-2 text-sm sm:text-base">
                  שגיאה בטעינת ה-PDF
                </p>
                <p className="text-slate-600 text-xs sm:text-sm">
                  אנא נסה שנית מאוחר יותר
                </p>
              </div>
            </div>
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={calculatePageWidth()}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-sm sm:shadow-md mb-3 sm:mb-4 bg-white w-full max-w-full rounded-sm overflow-hidden"
            />
          ))}
        </Document>
      </motion.div>
    </div>
  );
}
