import { Link } from "react-router-dom";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface PrivacyTermsCheckboxProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const PrivacyTermsCheckbox = ({ register, error }: PrivacyTermsCheckboxProps) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-start gap-2 sm:gap-3 text-right bg-slate-50/50 p-3 sm:p-4 rounded-lg border border-slate-200">
        <input
          type="checkbox"
          id="termsAccepted"
          {...register}
          className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary-500 bg-white border-2 border-slate-300 rounded focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors duration-200"
        />
        <label
          htmlFor="termsAccepted"
          className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium cursor-pointer"
        >
          אני מאשר/ת כי קראתי והבנתי את{" "}
          <Link
            to="/terms"
            className="text-primary-600 hover:text-primary-700 underline font-semibold transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            תנאי השימוש
          </Link>
          {" "}ואת{" "}
          <Link
            to="/privacy"
            className="text-primary-600 hover:text-primary-700 underline font-semibold transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            מדיניות הפרטיות
          </Link>
          {" "}של האתר
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-xs sm:text-sm text-right font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PrivacyTermsCheckbox;