import { motion } from "framer-motion";

const SplashContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4"
    >
      {/* Business name */}
      <motion.h1
        className="text-4xl font-bold text-slate-800 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        ברוכים הבאים ל
        <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mt-2">
          אומץ לב
        </span>
      </motion.h1>

      {/* Creator info */}
      <motion.p
        className="text-xl text-slate-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        אלעד שמעונוב - כלבן טיפולי
      </motion.p>

      {/* Tagline */}
      <motion.p
        className="text-base text-slate-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        טיפול וריפוי באמצעות כלבים
      </motion.p>
    </motion.div>
  );
};

export default SplashContent;