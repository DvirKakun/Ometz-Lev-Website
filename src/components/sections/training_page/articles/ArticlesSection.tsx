import { motion } from "framer-motion";
import { getDemoArticles } from "../../../../data/articles";
import ArticlesHeader from "./ArticlesHeader";
import ArticlesLibraryCTA from "./ArticlesLibraryCTA";
import ArticleCard from "../../articles_library_page/ArticleCard";

const ArticlesSection = () => {
  const demoArticles = getDemoArticles();

  return (
    <section
      id="articles"
      className="py-16 bg-gradient-to-br from-accent-50/30 to-orange-50/50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <ArticlesHeader />
          
          {/* Demo Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoArticles.map((article, index) => (
                <ArticleCard
                  key={article.articleKey || index}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <ArticlesLibraryCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;