import { ModalSuccess } from "../shared";

const ContactModalSuccess = () => {
  return (
    <ModalSuccess
      content={
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            הודעה נשלחה בהצלחה!
          </h3>
          <p className="text-slate-700">נחזור אליכם בהקדם האפשרי</p>
        </div>
      }
      iconMarginBottom="mb-3"
      contentAlignment="text-center"
    />
  );
};

export default ContactModalSuccess;