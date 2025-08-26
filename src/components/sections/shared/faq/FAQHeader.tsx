import React from "react";
import { HelpCircle } from "lucide-react";
import type { FAQHeaderProps } from "../../../../types/faq";

const FAQHeader: React.FC<FAQHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      {/* Simple icon */}
      <div
        className={`w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </div>

      {/* Clean title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-right">
        {title}
      </h2>

      {/* Simple description */}
      <p className="text-gray-600 text-right leading-relaxed">{description}</p>
    </div>
  );
};

export default FAQHeader;
