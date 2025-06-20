import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DogIcon from "../../../assets/images/DogIcon.ico";

const HeaderLogo: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0"
    >
      <Link to="/" className="flex items-center space-x-4 space-x-reverse">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white relative overflow-hidden">
          <div
            className="w-6 h-6 lg:w-7 lg:h-7 relative z-10"
            style={{
              backgroundImage: `url(${DogIcon})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
            אומץ לב
          </h1>
          <p className="text-sm lg:text-base text-slate-600 -mt-1 font-medium">
            אילוף כלבים מקצועי
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeaderLogo;
