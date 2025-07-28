import { Clock, User } from "lucide-react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";
import type { Article } from "../../../types/articles";

interface ArticleModalContentProps {
  article: Article;
}

export const ArticleModalContent = ({ article }: ArticleModalContentProps) => {
  return (
    <div 
      className="overflow-y-auto bg-white" 
      dir="ltr"
      style={{
        WebkitOverflowScrolling: 'touch',
        maxHeight: 'calc(90vh - 120px)'
      }}
    >
      <div dir="rtl" className="p-4 sm:p-6 pb-8">
        <DialogHeader className="mb-6 text-right">
          <DialogTitle className="text-3xl font-bold text-slate-900 mb-4 text-right leading-tight">
            {article.title}
          </DialogTitle>
          
          <div className="flex items-center justify-start mb-4" dir="rtl">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{article.readTime} דק'</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-right text-base mb-6" dir="rtl">
            {article.description}
          </p>
        </DialogHeader>

        {/* Article Content */}
        <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 mb-6">
          <div className="max-w-none text-right" dir="rtl">
            <div className="text-slate-800 leading-relaxed whitespace-pre-wrap text-lg font-medium">
              {article.content || 'תוכן המאמר יתווסף בקרוב...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};