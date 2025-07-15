import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Dogs-Logo.png";

const HeaderLogo: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0"
    >
      <Link to="/home" className="flex items-center justify-center">
        <div
          className="w-16 h-16 lg:w-22 lg:h-22 flex items-center justify-center"
          style={{
            backgroundImage: `url(${OmetzLevLogo})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Link>
    </motion.div>
  );
};

export default HeaderLogo;
