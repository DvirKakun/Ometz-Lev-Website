import { motion } from "framer-motion";
import { Eye, Download } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "../../../ui/card";

interface Article {
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-accent-700 bg-accent-50 px-2 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-slate-500">
              {article.readTime}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 text-right group-hover:text-accent-600 transition-colors duration-300">
            {article.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-slate-600 leading-relaxed mb-4 text-right">
            {article.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                קרא עוד
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-slate-500">
              {article.author}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;