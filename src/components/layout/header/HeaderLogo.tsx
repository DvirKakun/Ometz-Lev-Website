import React from "react";
import { motion } from "framer-motion";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Dogs-Logo.png";

interface HeaderLogoProps {
  onClick?: () => void;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0 cursor-pointer focus:outline-none "
      aria-label="Navigate to home page"
    >
      <div
        className="w-16 h-16 lg:w-22 lg:h-22 flex items-center justify-center"
        style={{
          backgroundImage: `url(${OmetzLevLogo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.button>
  );
};

export default HeaderLogo;
