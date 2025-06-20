import { motion } from "framer-motion";
import PhoneButton from "../../common/PhoneButton";
import WhatsAppButton from "../../common/WhatsAppButton";

interface HeaderCTAButtonsProps {
  isMobile?: boolean;
}

const HeaderCTAButtons: React.FC<HeaderCTAButtonsProps> = ({
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8, // Adjust based on nav items count
          duration: 0.3,
        }}
        className="pt-6 px-3"
      >
        <div className="grid grid-cols-1 gap-3">
          <WhatsAppButton
            phoneNumber="972524724700"
            message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
            variant="default"
            size="md"
            className="w-full justify-center"
          />
          <PhoneButton
            phoneNumber="052-472-4700"
            variant="outline"
            size="md"
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
