import React from "react";
import { MapPin, Home, Building2, Hash } from "lucide-react";

interface FormAddressInputProps {
  registerCity: any;
  registerStreet: any;
  registerHouseNumber: any;
  registerFloor: any;
  registerEntranceCode: any;
  errorCity?: string;
  errorStreet?: string;
  errorHouseNumber?: string;
  errorFloor?: string;
  errorEntranceCode?: string;
  required?: boolean;
  className?: string;
}

const FormAddressInput: React.FC<FormAddressInputProps> = ({
  registerCity,
  registerStreet,
  registerHouseNumber,
  registerFloor,
  registerEntranceCode,
  errorCity,
  errorStreet,
  errorHouseNumber,
  errorFloor,
  errorEntranceCode,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="text-xs text-slate-700 block text-right mb-2">
        כתובת {required && "*"}
      </label>

      <div className="space-y-2">
        {/* City */}
        <div>
          <div className="relative">
            <input
              {...registerCity}
              type="text"
              placeholder="עיר"
              className={`w-full px-2 py-1 pr-7 bg-slate-50 border ${
                errorCity ? "border-red-400" : "border-slate-300"
              } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right text-xs`}
            />
            <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
          {errorCity && (
            <p className="text-red-500 text-xs text-right mt-1">{errorCity}</p>
          )}
        </div>

        {/* Street and House Number */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <div className="relative">
              <input
                {...registerStreet}
                type="text"
                placeholder="רחוב"
                className={`w-full px-2 py-1 pr-7 bg-slate-50 border ${
                  errorStreet ? "border-red-400" : "border-slate-300"
                } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right text-xs`}
              />
              <Home className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
            {errorStreet && (
              <p className="text-red-500 text-xs text-right mt-1">
                {errorStreet}
              </p>
            )}
          </div>

          <div>
            <input
              {...registerHouseNumber}
              type="text"
              placeholder="מספר"
              className={`w-full px-2 py-1 bg-slate-50 border ${
                errorHouseNumber ? "border-red-400" : "border-slate-300"
              } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-center text-xs`}
            />
            {errorHouseNumber && (
              <p className="text-red-500 text-xs text-right mt-1">
                {errorHouseNumber}
              </p>
            )}
          </div>
        </div>

        {/* Floor and Entrance Code */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="relative">
              <input
                {...registerFloor}
                type="text"
                placeholder="קומה"
                className={`w-full px-2 py-1 pr-7 bg-slate-50 border ${
                  errorFloor ? "border-red-400" : "border-slate-300"
                } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right text-xs`}
              />
              <Building2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
            {errorFloor && (
              <p className="text-red-500 text-xs text-right mt-1">
                {errorFloor}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                {...registerEntranceCode}
                type="text"
                placeholder="קוד כניסה (אופציונלי)"
                className={`w-full px-2 py-1 pr-7 bg-slate-50 border ${
                  errorEntranceCode ? "border-red-400" : "border-slate-300"
                } rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right text-xs`}
              />
              <Hash className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
            {errorEntranceCode && (
              <p className="text-red-500 text-xs text-right mt-1">
                {errorEntranceCode}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddressInput;