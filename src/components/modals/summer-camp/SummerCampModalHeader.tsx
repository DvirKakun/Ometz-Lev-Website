import { Calendar } from "lucide-react";
import { ModalHeader } from "../shared";

interface SummerCampModalHeaderProps {
  activityData?: {
    registerFormTitle: string;
    title: string;
    registerFormMessage: React.ReactNode;
  };
}

const SummerCampModalHeader = ({ activityData }: SummerCampModalHeaderProps) => {
  const title = activityData?.registerFormTitle || 'הרשמה לקייטנת "אומץ לב"';
  
  return (
    <ModalHeader
      icon={Calendar}
      title={title}
      subtitle="מלאו את הפרטים להשלמת ההרשמה"
      iconSize="sm"
      titleSize="text-lg"
      subtitleSize="text-xs"
      marginBottom="mb-3"
    />
  );
};

export default SummerCampModalHeader;
