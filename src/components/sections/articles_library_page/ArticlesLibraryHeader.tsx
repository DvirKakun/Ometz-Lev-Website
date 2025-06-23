import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../../ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const ArticlesLibraryHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReturnToTraining = () => {
    const scrollPosition = location.state?.scrollPosition || 0;
    navigate("/training", {
      state: {
        returnFromLibrary: true,
        scrollPosition,
      },
    });
  };

  return (
    <section className="py-12 bg-gradient-to-br from-accent-600 via-accent-700 to-orange-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ספריית המאמרים
          </h1>
          <p className="text-xl text-orange-100 mb-6">
            מאמרים מקצועיים ומדריכים מפורטים לאילוף כלבים ובעיות התנהגות
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={handleReturnToTraining}
              variant="outline"
              className="group hover:bg-white/10 border-white/30 text-white hover:text-white"
            >
              <ArrowRight className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform rotate-180" />
              חזרה לעמוד האילוף
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesLibraryHeader;
