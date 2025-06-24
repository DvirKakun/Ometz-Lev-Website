import { Calendar } from "lucide-react";
import { ModalHeader } from "../shared";

const SummerCampModalHeader = () => {
  return (
    <ModalHeader
      icon={Calendar}
      title='הרשמה לקייטנת "אומץ לב"'
      subtitle="מלאו את הפרטים להשלמת ההרשמה"
      iconSize="sm"
      titleSize="text-lg"
      subtitleSize="text-xs"
      marginBottom="mb-3"
    />
  );
};

export default SummerCampModalHeader;
