import { motion } from "framer-motion";
import PhoneButton from "../../common/PhoneButton";
import WhatsAppButton from "../../common/WhatsAppButton";
import type { HeaderCTAButtonsProps } from "../../../types/headers";

const HeaderCTAButtons: React.FC<HeaderCTAButtonsProps> = ({
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4, // Reduced delay for faster appearance
          duration: 0.3,
        }}
        className="pt-4 border-t border-slate-100"
      >
        <div className="grid grid-cols-2 gap-3">
          <WhatsAppButton
            phoneNumber="972524724700"
            message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
            variant="default"
            size="sm"
            className="w-full justify-center"
          />
          <PhoneButton
            phoneNumber="052-472-4700"
            variant="outline"
            size="sm"
            className="w-full justify-center"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="hidden xl:flex items-center space-x-2 space-x-reverse flex-shrink-0">
      <PhoneButton phoneNumber="052-472-4700" variant="outline" size="sm" />
      <WhatsAppButton phoneNumber="972524724700" variant="default" size="sm" />
    </div>
  );
};

export default HeaderCTAButtons;
