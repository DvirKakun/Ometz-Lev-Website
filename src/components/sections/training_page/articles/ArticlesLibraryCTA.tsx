import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { articles } from "../../../../data/articles";

const ArticlesLibraryCTA = () => {
  const navigate = useNavigate();

  // Calculate article count (25+ if over 25)
  const articleCount = articles.length > 25 ? "25+" : articles.length.toString();

  // Calculate total read time from articles
  const totalMinutes = articles.reduce((total, article) => {
    const minutes = parseInt(article.readTime.replace(/[^\d]/g, ""));
    return total + minutes;
  }, 0);
  const totalHours = Math.round(totalMinutes / 60);

  const handleViewAllArticles = () => {
    const scrollPosition = window.scrollY;
    navigate("/articles-library", { 
      state: { scrollPosition } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-gradient-to-l from-accent-50 to-orange-50 rounded-xl p-6 mb-8 border border-accent-100 text-center"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-3">
        ספריית מאמרים מקיפה
      </h3>
      <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-4">
        גשו לספריית המאמרים המלאה שלנו עם מדריכים מקצועיים ועצות מועילות
      </p>

      <div className="flex justify-center mb-4">
        <Button
          onClick={handleViewAllArticles}
          className="bg-accent-600 hover:bg-accent-700 text-white"
        >
          צפו בכל המאמרים
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-accent-600">{articleCount}</div>
          <div className="text-sm text-slate-600">מאמרי הדרכה</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-accent-600">{totalHours > 0 ? `${totalHours}+` : `${totalMinutes}`}</div>
          <div className="text-sm text-slate-600">{totalHours > 0 ? 'שעות קריאה' : 'דקות קריאה'}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticlesLibraryCTA;