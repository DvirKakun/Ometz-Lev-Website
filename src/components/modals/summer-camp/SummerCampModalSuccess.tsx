import { ModalSuccess } from "../shared";

const SummerCampModalSuccess = () => {
  const successContent = (
    <div className="text-sm space-y-2">
      <p>הטופס התקבל בהצלחה, תודה על הרשמתכם!</p>
      <p>אצור אתכם קשר ממש בקרוב כדי להסדיר את מקדמת שמירת המקום (200 ₪).</p>
      <p>מיד לאחר ביצוע התשלום אשלח אליכם קישור להצהרת בריאות למילוי.</p>
      <p className="pt-2">מחכה לראות את ילדכם בקייטנת "אומץ לב" 🐾</p>
      <p className="font-semibold">אלעד – 052-4724700</p>
    </div>
  );

  return (
    <ModalSuccess
      title="היי 👋"
      content={successContent}
      iconMarginBottom="mb-3"
      contentAlignment="text-center"
    />
  );
};

export default SummerCampModalSuccess;
