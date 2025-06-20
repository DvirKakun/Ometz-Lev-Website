import { motion } from "framer-motion";
import SlideHeroImage from "../../common/SlideHeroImage";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-16 lg:pb-24 bg-gradient-to-br from-slate-900 via-primary-900 to-accent-900 overflow-hidden">
      <HeroBackground />

      <div className="container-max section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <HeroContent />

          {/* Dynamic Image - Left side for RTL */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 order-1 lg:order-2 relative max-w-md lg:max-w-lg"
          >
            <SlideHeroImage className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
