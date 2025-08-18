import { motion } from "framer-motion";
import WhatsAppButton from "../../../common/WhatsAppButton";
import PhoneButton from "../../../common/PhoneButton";

// Mobile-optimized CTA buttons with enhanced touch ergonomics
const MobileOptimizedHeroCTAButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
      className="pt-2 sm:pt-4"
    >
      {/* Mobile-first button layout with thumb-reach optimization */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
        
        {/* Primary CTA - WhatsApp (positioned first for mobile thumb reach) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="flex-1 sm:flex-none"
        >
          <WhatsAppButton
            phoneNumber="972524724700"
            message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-14 sm:h-12 lg:h-14 text-base sm:text-sm lg:text-base font-semibold shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          />
        </motion.div>

        {/* Secondary CTA - Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="flex-1 sm:flex-none"
        >
          <PhoneButton
            phoneNumber="052-472-4700"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-14 sm:h-12 lg:h-14 text-base sm:text-sm lg:text-base font-semibold border-2 border-primary-400/60 hover:border-primary-400 bg-white/5 hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          />
        </motion.div>
      </div>

      {/* Mobile-specific visual enhancement - subtle glow for better focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent rounded-2xl pointer-events-none sm:hidden"></div>
    </motion.div>
  );
};

// Original version (commented for easy revert)
/*
const HeroCTAButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
    >
      <WhatsAppButton
        phoneNumber="972524724700"
        message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
        size="lg"
        className="flex-1 sm:flex-none"
      />
      <PhoneButton
        phoneNumber="052-472-4700"
        variant="outline"
        size="lg"
        className="flex-1 sm:flex-none"
      />
    </motion.div>
  );
};
*/

export default MobileOptimizedHeroCTAButtons;
