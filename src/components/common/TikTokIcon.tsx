import React from "react";
import { ReactComponent as TikTokBlancSvg } from "../../assets/icons/Tiktok-blanc.svg";
import { ReactComponent as TikTokColorfulSvg } from "../../assets/icons/Tiktok-colorful.svg";

interface TikTokIconProps {
  className?: string;
}

const TikTokIcon: React.FC<TikTokIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <div className={`${className} relative`}>
      <TikTokBlancSvg className="w-full h-full absolute transition-opacity duration-300 group-hover:opacity-0" />
      <TikTokColorfulSvg className="w-full h-full absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default TikTokIcon;
