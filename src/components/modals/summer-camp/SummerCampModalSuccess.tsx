import { ModalSuccess } from "../shared";

interface SummerCampModalSuccessProps {
  activityData?: {
    registerFormMessage: React.ReactNode;
  };
}

const SummerCampModalSuccess = ({
  activityData,
}: SummerCampModalSuccessProps) => {
  const defaultContent = (
    <div className="text-sm space-y-2">
      <p>הטופס התקבל בהצלחה, תודה על הרשמתכם!</p>
      <p>אצור אתכם קשר ממש בקרוב כדי להסדיר את מקדמת שמירת המקום (200 ₪).</p>
      <p>מיד לאחר ביצוע התשלום אשלח אליכם קישור להצהרת בריאות למילוי.</p>
      <p className="pt-2">מחכה לראות את ילדכם בקייטנת "אומץ לב" 🐾</p>
      <p className="font-semibold">אלעד – 052-4724700</p>
    </div>
  );

  // Handle the formatted content from Prismic by creating proper paragraphs
  const formattedContent = activityData?.registerFormMessage ? (
    <div className="text-sm space-y-2">
      {String(activityData.registerFormMessage).split('\n').filter(line => line.trim()).map((line, index) => (
        <p key={index}>{line.trim()}</p>
      ))}
    </div>
  ) : defaultContent;

  return (
    <ModalSuccess
      content={formattedContent}
      iconMarginBottom="mb-3"
      contentAlignment="text-center"
    />
  );
};

export default SummerCampModalSuccess;
