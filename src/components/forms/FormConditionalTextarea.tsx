import React from "react";

interface FormConditionalTextareaProps {
  label: string;
  placeholder: string;
  register: any;
  error?: string;
  showCondition: boolean;
  rows?: number;
  className?: string;
}

const FormConditionalTextarea: React.FC<FormConditionalTextareaProps> = ({
  label,
  placeholder,
  register,
  error,
  showCondition,
  rows = 3,
  className = "",
}) => {
  if (!showCondition) return null;

  return (
    <div className={`mr-6 mt-2 ${className}`}>
      <label className="text-xs text-slate-600 block text-right mb-1">
        {label}
      </label>
      <textarea
        {...register}
        rows={rows}
        className={`w-full px-2 py-1 bg-slate-50 border ${
          error ? "border-red-400" : "border-slate-300"
        } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right resize-none text-xs`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormConditionalTextarea;