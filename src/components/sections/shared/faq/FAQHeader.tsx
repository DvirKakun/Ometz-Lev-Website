import React from "react";
import type { FAQHeaderProps } from "../../../../types/faq";

const FAQHeader: React.FC<FAQHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
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
