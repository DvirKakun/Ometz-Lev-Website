import React from "react";
import { Calendar } from "lucide-react";

interface FormAgeInputProps {
  label: string;
  registerYears: any;
  registerMonths: any;
  registerWeeks: any;
  errorYears?: string;
  errorMonths?: string;
  errorWeeks?: string;
  required?: boolean;
  className?: string;
}

const FormAgeInput: React.FC<FormAgeInputProps> = ({
  label,
  registerYears,
  registerMonths,
  registerWeeks,
  errorYears,
  errorMonths,
  errorWeeks,
  required = false,
  className = "",
}) => {
  const hasError = errorYears || errorMonths || errorWeeks;

  return (
    <div className={className}>
      <label className="text-xs text-slate-700 block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {/* Weeks - First (rightmost in RTL) */}
        <div>
          <div className="relative">
            <input
              {...registerWeeks}
              type="number"
              min="0"
              max="3"
              inputMode="numeric"
              placeholder="0"
              className={`w-full px-2 py-1 pr-7 bg-slate-50 border ${
                errorWeeks ? "border-red-400" : "border-slate-300"
              } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-center text-xs`}
            />
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
          <label className="text-xs text-slate-500 text-center block mt-0.5">
            שבועות
          </label>
        </div>

        {/* Months - Middle */}
        <div>
          <input
            {...registerMonths}
            type="number"
            min="0"
            max="11"
            inputMode="numeric"
            placeholder="0"
            className={`w-full px-2 py-1 bg-slate-50 border ${
              errorMonths ? "border-red-400" : "border-slate-300"
            } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-center text-xs`}
          />
          <label className="text-xs text-slate-500 text-center block mt-0.5">
            חודשים
          </label>
        </div>

        {/* Years - Last (leftmost in RTL) */}
        <div>
          <input
            {...registerYears}
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="0"
            className={`w-full px-2 py-1 bg-slate-50 border ${
              errorYears ? "border-red-400" : "border-slate-300"
            } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-center text-xs`}
          />
          <label className="text-xs text-slate-500 text-center block mt-0.5">
            שנים
          </label>
        </div>
      </div>
      {hasError && (
        <p className="text-red-500 text-xs text-right mt-1">
          {errorYears || errorMonths || errorWeeks}
        </p>
      )}
    </div>
  );
};

export default FormAgeInput;