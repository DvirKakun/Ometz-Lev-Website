import { motion } from "framer-motion";

const HeroBrandTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-8"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        className="font-bold leading-none mb-4"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent drop-shadow-lg"
          style={{
            filter: "drop-shadow(0 0 20px rgba(20, 184, 166, 0.4))",
          }}
        >
          אומץ לב
        </span>
      </motion.h1>
    </motion.div>
  );
};

export default HeroBrandTitle;
