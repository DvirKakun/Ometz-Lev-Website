import { motion } from "framer-motion";
import WhatsAppButton from "../../common/WhatsAppButton";
import PhoneButton from "../../common/PhoneButton";

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

export default HeroCTAButtons;
