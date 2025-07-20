import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { useCategoryInfo } from "../../../hooks/useArticles";
import type { ArticleCardProps } from "../../../types/articles";

interface ArticleCardPropsWithOnClick extends ArticleCardProps {
  onClick?: () => void;
}

const ArticleCard = ({
  article,
  index,
  onClick,
}: ArticleCardPropsWithOnClick) => {
  const { name: categoryName, color: categoryColor } = useCategoryInfo(
    article.category
  );

  const getCategoryColorClasses = (color: string) => {
    const colorMap = {
      slate: "bg-slate-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      green: "bg-green-500 text-white",
      orange: "bg-orange-500 text-white",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      indigo: "bg-indigo-500 text-white",
      yellow: "bg-yellow-500 text-white",
      teal: "bg-teal-500 text-white",
      cyan: "bg-cyan-500 text-white",
      emerald: "bg-emerald-500 text-white",
      rose: "bg-rose-500 text-white",
      amber: "bg-amber-500 text-white",
      violet: "bg-violet-500 text-white",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-slate-500 text-white"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
        onClick={onClick}
      >
        {/* Article Header with Category Badge */}
        <div className="relative flex-shrink-0">
          <div className="aspect-video bg-gradient-to-br from-accent-50 to-orange-100 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-accent-800/10 group-hover:bg-accent-800/20 transition-colors">
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                  <span className="text-2xl text-white font-bold">א</span>
                </div>
                <span className="text-sm text-accent-700 font-medium">
                  מאמר
                </span>
              </motion.div>
            </div>

            {/* Read Time Badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {article.readTime} דק'
            </div>

            {/* Category Badge */}
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColorClasses(
                categoryColor
              )}`}
            >
              {categoryName}
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-accent-600 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-right text-sm mb-4 flex-1 line-clamp-3">
            {article.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-slate-500">
              <User className="w-4 h-4" />
              <span className="text-sm">{article.author}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{article.readTime} דק'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;
