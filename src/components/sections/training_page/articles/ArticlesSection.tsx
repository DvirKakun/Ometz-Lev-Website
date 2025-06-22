import { motion } from "framer-motion";
import { articles } from "../../../../data/articles";
import ArticlesHeader from "./ArticlesHeader";
import ArticleCard from "./ArticleCard";

const ArticlesSection = () => {
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
          {/* Section Header */}
          <ArticlesHeader />

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;