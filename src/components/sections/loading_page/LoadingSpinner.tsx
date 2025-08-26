import { motion } from "framer-motion";
import runningDogGif from "../../../assets/images/running-dog-loader.gif";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {/* Running Dog GIF */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={runningDogGif}
          alt="Loading..."
          className="w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-48 lg:h-14 object-contain mx-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
