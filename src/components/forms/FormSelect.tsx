import React from "react";
import { ChevronDown } from "lucide-react";
import type { FormSelectProps } from "../../types/forms";

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  icon: Icon,
  placeholder,
  options,
  required = false,
  register,
  error,
  className = "",
  selectClassName = "",
}) => {
  return (
    <div className={className}>
      <label className="text-xs text-white block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <select
          {...register}
          className={`w-full py-1 pl-6 ${
            Icon ? "pr-8" : "pr-2"
          } bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-white/30 text-right text-xs appearance-none ${
            error ? "border-red-400" : ""
          } ${selectClassName}`}
          defaultValue=""
        >
          <option value="" disabled className="bg-gray-800 text-white">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-gray-800 text-white"
            >
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60 pointer-events-none" />
        {Icon && (
          <Icon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60 pointer-events-none" />
        )}
      </div>
      {error && <p className="text-red-300 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormSelect;
