import { motion } from "framer-motion";
import AwardsBadges from "./AwardsBadges";
import HeroBrandTitle from "./HeroBrandTitle";
import HeroSubtitle from "./HeroSubtitle";
import PrinciplesSection from "./PrinciplesSection";
import HeroCTAButtons from "./HeroCTAButtons";

const HeroContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex-1 text-center lg:text-right order-2 lg:order-1"
    >
      <AwardsBadges />
      <HeroBrandTitle />
      <HeroSubtitle />
      <PrinciplesSection />
      <HeroCTAButtons />
    </motion.div>
  );
};

export default HeroContent;
