import { motion } from "framer-motion";
import { awards } from "../../../data/awards";

const SplashContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4 mt-4"
    >
      {/* Creator info */}
      <motion.p
        className="text-xl text-slate-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        אלעד שמעונוב
      </motion.p>

      {/* Tagline */}
      <motion.p
        className="text-base text-slate-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {awards.join(", ")}
      </motion.p>
    </motion.div>
  );
};

export default SplashContent;
