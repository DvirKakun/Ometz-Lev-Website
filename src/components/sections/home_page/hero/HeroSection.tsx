import { motion } from "framer-motion";
import SlideHeroImage from "./images_slider/SlideHeroImage";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-primary-900 to-accent-900 overflow-hidden min-h-[80vh] flex items-center">
      <HeroBackground />

      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content - First on mobile, second on desktop */}
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>

          {/* Dynamic Image - Second on mobile, first on desktop (RTL) */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
              <SlideHeroImage />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
