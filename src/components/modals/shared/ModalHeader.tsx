import React from "react";
import type { ModalHeaderProps } from "../../../types/modals";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  icon: IconComponent,
  title,
  subtitle,
  iconSize = "md",
  titleSize = "text-xl",
  subtitleSize = "text-sm",
  marginBottom = "mb-4",
  className = "",
}) => {
  const getIconSizes = () => {
    switch (iconSize) {
      case "sm":
        return {
          container: "w-8 h-8",
          icon: "w-4 h-4",
        };
      case "lg":
        return {
          container: "w-12 h-12",
          icon: "w-6 h-6",
        };
      default: // md
        return {
          container: "w-10 h-10",
          icon: "w-5 h-5",
        };
    }
  };

  const iconSizes = getIconSizes();

  return (
    <div className={`text-center ${marginBottom} ${className}`}>
      {/* Icon */}
      <div
        className={`${iconSizes.container} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2`}
      >
        <IconComponent className={`${iconSizes.icon} text-white`} />
      </div>

      {/* Title */}
      <h2 className={`${titleSize} font-bold text-white mb-1`}>{title}</h2>

      {/* Subtitle */}
      <p className={`${subtitleSize} text-white/80`}>{subtitle}</p>
    </div>
  );
};

export default ModalHeader;
