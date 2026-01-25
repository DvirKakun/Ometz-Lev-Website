import { Mail } from "lucide-react";
import { ModalHeader } from "../shared";

const ContactModalHeader = () => {
  return (
    <ModalHeader
      icon={Mail}
      title="לייעוץ ראשוני"
      subtitle="מלאו את הפרטים ונחזור אליכם בהקדם"
      iconSize="md"
      titleSize="text-xl"
      subtitleSize="text-sm"
      marginBottom="mb-4"
    />
  );
};

export default ContactModalHeader;
