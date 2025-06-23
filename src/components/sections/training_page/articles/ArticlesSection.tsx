import { motion } from "framer-motion";
import ArticlesHeader from "./ArticlesHeader";
import ArticlesLibraryCTA from "./ArticlesLibraryCTA";

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
          <ArticlesHeader />
          <ArticlesLibraryCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;