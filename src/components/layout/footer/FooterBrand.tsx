import React from "react";
import { motion } from "framer-motion";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Large-Logo.png";
import SocialLinks from "./SocialLinks";

const FooterBrand: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:col-span-1"
    >
      <div className="h-[1.75rem] mb-6"></div>

      <div className="flex justify-end">
        <div
          className="w-44 h-44 lg:w-52 lg:h-[6rem]"
          style={{
            backgroundImage: `url(${OmetzLevLogo})`,
            backgroundSize: "contain",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      <div className="flex justify-end mt-8">
        <SocialLinks />
      </div>
    </motion.div>
  );
};

export default FooterBrand;
