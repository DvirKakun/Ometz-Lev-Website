import { ZoomIn, ZoomOut } from "lucide-react";

interface PDFControlsProps {
  scale: number;
  numPages: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function PDFControls({
  scale,
  numPages,
  onZoomIn,
  onZoomOut,
}: PDFControlsProps) {
  return (
    <div className="bg-white border-b border-slate-200 py-1.5 sm:py-2 md:py-3 sticky top-[52px] sm:top-[60px] md:top-[80px] z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <button
              onClick={onZoomOut}
              className="p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={scale <= 0.5}
              aria-label="הקטן תצוגה"
            >
              <ZoomOut className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </button>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={onZoomIn}
              className="p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={scale >= 2.0}
              aria-label="הגדל תצוגה"
            >
              <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Page Count */}
          {numPages > 0 && (
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-600">
              {numPages} עמודים
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
